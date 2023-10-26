const fs = require('fs');
const vacationsPath = './vacations.json';

const transformVacations = () => {
  const vacationsData = JSON.parse(fs.readFileSync(vacationsPath, 'utf8'));

  const usersIdSet = new Set();

  vacationsData.forEach((it) => {
    usersIdSet.add(it.user._id);
  });
  const transVacationData = [];
  for (let id of usersIdSet) {
    const userObj = { userId: id, userName: '', vacations: [] };

    vacationsData.forEach((it) => {
      if (it.user._id == id) {
        userObj.userName = it.user.name;
        let vacationObj = {
          startDate: it.startDate,
          endDate: it.endDate,
        };

        userObj.vacations.push(vacationObj);
      }
    });

    transVacationData.push(userObj);
  }

  console.log(transVacationData);

  fs.writeFileSync(
    './vacationsTrans.json',
    JSON.stringify(transVacationData, null, 2)
  );
};

transformVacations();

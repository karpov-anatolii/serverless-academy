const fs = require('fs');
const dbPath = './db_users.txt';

class Service {
  listUsersObject() {
    try {
      const data = fs.readFileSync(dbPath, 'utf8');
      const usersArray = [];
      const userObject = {};
      const fields = ['user', 'gender', 'age'];
      data.split('\n').map((line) =>
        line.split(',').forEach((item, index) => {
          userObject[fields[index]] = item.trim();
          if (index == 2) usersArray.push(JSON.stringify(userObject));
        })
      );
      return usersArray.map((user) => JSON.parse(user));
    } catch (err) {
      console.error('Error reading data in DB:', err);
      return [];
    }
  }

  readDatabaseArray() {
    try {
      const data = fs.readFileSync(dbPath, 'utf8');
      return data.split('\n').map((line) => line.split(','));
    } catch (err) {
      console.error('Error reading data in DB:', err);
      return [];
    }
  }

  writeDatabase(data) {
    const formattedData = data.map((record) => record.join(',')).join('\n');
    fs.writeFileSync(dbPath, formattedData, 'utf8');
  }

  addUser(user, gender, age) {
    const database = this.readDatabaseArray();
    database.push([user, gender, age]);
    this.writeDatabase(database);
  }

  findUser(userName) {
    try {
      const userObject = {};
      const fields = ['user', 'gender', 'age'];
      const regexp = new RegExp(`${userName}`, 'i');
      const database = this.readDatabaseArray();
      database.forEach((userArray) => {
        if (userArray[0].match(regexp)) {
          userArray.forEach((item, index) => {
            userObject[fields[index]] = item.trim();
          });
        }
      });
      return userObject.user
        ? `User ${userName} was found \n` + JSON.stringify(userObject)
        : "There isn't user " + userName + ' in DataBase(';
    } catch (err) {
      console.log('Something went wrong with finding user.' + err);
    }
  }
}

module.exports = new Service();

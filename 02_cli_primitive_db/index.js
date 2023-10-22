const inquirer = require('inquirer');
const service = require('./services');

const errorLog = (error) => {
  if (error.isTtyError) {
    console.log("Prompt couldn't be rendered in the current environment");
  } else {
    console.log(' Something else went wrong');
  }
};

const qGenderAge = (answer1) => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'gender',
        message: 'Choose your Gender.',
        choices: ['male', 'femail'],
      },
      {
        type: 'input',
        name: 'age',
        message: 'Enter your age:',
      },
    ])
    .then((answer2) => {
      service.addUser(answer1.name, answer2.gender, answer2.age);
      main();
    })
    .catch((error) => {
      errorLog(error);
    });
};

const qFindUser = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the user's name you want to find in DB:",
      },
    ])
    .then((answer) => {
      console.log(service.findUser(answer.name));
    })
    .catch((error) => {
      errorLog(error);
    });
};

const qSearchDb = () => {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Would you like to search values in DB?',
      },
    ])
    .then((answer) => {
      if (answer.confirm) {
        console.log(service.listUsersObject());
        qFindUser();
      } else {
        console.log('Good bye! Hope to see you soon)');
      }
    })
    .catch((error) => {
      errorLog(error);
    });
};

const main = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the user's name. To cancel press ENTER:",
      },
    ])
    .then((answer1) => {
      if (answer1.name === '') {
        qSearchDb();
      } else {
        qGenderAge(answer1);
      }
    })
    .catch((error) => {
      errorLog(error);
    });
};

main();

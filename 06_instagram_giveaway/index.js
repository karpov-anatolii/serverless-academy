const fs = require('fs');

const uniqueValues = () => {
  console.time('uniqueValues');
  const uniqueUsernames = new Set();
  for (let fileNumber = 0; fileNumber < 20; fileNumber++) {
    const filePath = `./assets/out${fileNumber}.txt`;
    const content = fs.readFileSync(filePath, 'utf8');
    const words = content.split(/\s+/);
    words.forEach((word) => {
      uniqueUsernames.add(word);
    });
  }
  console.timeEnd('uniqueValues');
  return uniqueUsernames.size;
};

const existInAllFiles = () => {
  console.time('existInAllFiles');
  const userExistInFilesCount = {};
  for (let fileNumber = 0; fileNumber < 20; fileNumber++) {
    const filePath = `./assets/out${fileNumber}.txt`;
    const content = fs.readFileSync(filePath, 'utf8');
    const words = content.split(/\s+/);
    words.forEach((word) => {
      if (!userExistInFilesCount[word]) {
        userExistInFilesCount[word] = { count: 1, fileNumber };
      }
      if (
        userExistInFilesCount[word] &&
        userExistInFilesCount[word].fileNumber !== fileNumber
      ) {
        userExistInFilesCount[word].count++;
        userExistInFilesCount[word].fileNumber = fileNumber;
      }
    });
  }
  console.timeEnd('existInAllFiles');
  return Object.values(userExistInFilesCount).filter((it) => it.count === 20)
    .length;
};

const existInAtleastTen = () => {
  console.time('existInAtleastTen');
  const userExistInFilesCount = {};
  for (let fileNumber = 0; fileNumber < 20; fileNumber++) {
    const filePath = `./assets/out${fileNumber}.txt`;
    const content = fs.readFileSync(filePath, 'utf8');
    const words = content.split(/\s+/);
    words.forEach((word) => {
      if (!userExistInFilesCount[word]) {
        userExistInFilesCount[word] = { count: 1, fileNumber };
      }
      if (
        userExistInFilesCount[word] &&
        userExistInFilesCount[word].fileNumber !== fileNumber
      ) {
        userExistInFilesCount[word].count++;
        userExistInFilesCount[word].fileNumber = fileNumber;
      }
    });
  }
  console.timeEnd('existInAtleastTen');
  return Object.values(userExistInFilesCount).filter((it) => it.count >= 10)
    .length;
};

console.log(uniqueValues());
console.log(existInAllFiles());
console.log(existInAtleastTen());

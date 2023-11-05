const fs = require('fs');

function csvFileReader(filename) {
  const data = [];
  let keys = ['from', 'to', 'ISO', 'country'];

  fs.readFileSync(filename, { encoding: 'utf-8' })
    .split('\n')
    .map((row) => {
      let obj = {};
      row.split(',').forEach((it, index) => {
        obj[keys[index]] = it.trim().slice(1, -1);
      });
      data.push(obj);
    });

  return data;
}

module.exports = { csvFileReader };

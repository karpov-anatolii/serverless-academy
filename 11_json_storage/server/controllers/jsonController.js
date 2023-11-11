const path = require('path');
const fs = require('fs');

const jsonFolderPath = path.join(__dirname, '..', 'data');
if (!fs.existsSync(jsonFolderPath)) {
  fs.mkdirSync(jsonFolderPath);
}

class JsonController {
  writeFile(req, res) {
    const pathParams = req.params.path;

    const jsonData = JSON.stringify(req.body, null, 2);

    const filePath = path.join(jsonFolderPath, `${pathParams}.json`);

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing JSON' });
      }
      res.status(200).json(JSON.parse(jsonData));
    });
  }

  readFile(req, res) {
    const pathParams = req.params.path;
    const filePath = path.join(jsonFolderPath, `${pathParams}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(404).json({ message: 'Error reading JSON' });
      }
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    });
  }

  getAll(req, res) {
    fs.readdir(jsonFolderPath, (err, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error reading files' });
      }

      const fileList = files.map((file) => {
        return {
          name: file,
          path: path.join(jsonFolderPath, file),
        };
      });

      res.json({ files: fileList });
    });
  }
}

module.exports = new JsonController();

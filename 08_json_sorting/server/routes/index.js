const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/json-793', (req, res) => {
  const filePath = path.join(__dirname, '../assets', 'json-793.json');
  res.sendFile(filePath);
});

router.get('/json-955', (req, res) => {
  const filePath = path.join(__dirname, '../assets', 'json-955.json');
  res.sendFile(filePath);
});

router.get('/json-231', (req, res) => {
  const filePath = path.join(__dirname, '../assets', 'json-231.json');
  res.sendFile(filePath);
});

module.exports = router;

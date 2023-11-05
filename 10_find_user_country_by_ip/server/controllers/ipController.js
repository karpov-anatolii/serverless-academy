const { csvFileReader } = require('../csvFileReader');

const fileCSV = './assets/IP2LOCATION-LITE-DB1.CSV';

const ipToInt = (ip) => {
  return ip.split('.').reduce((acc, cur) => {
    return acc * 256 + parseInt(cur, 10);
  }, 0);
};

const getIpInfo = (ip) => {
  const ipDecimal = ipToInt(ip);

  const resultObj = csvFileReader(fileCSV).find((row) => {
    const from = parseInt(row.from, 10);
    const to = parseInt(row.to, 10);
    return ipDecimal >= from && ipDecimal <= to;
  });

  return resultObj;
};

class IpController {
  getCountryParam(req, res) {
    const { ip } = req.params;

    const ipInfo = getIpInfo(ip);

    if (ipInfo) {
      const response = `${ipInfo.country} - ${ip}`;
      console.log(response);
      res.status(200).send(response);
    } else {
      console.log('IP not found in database');
      res.send('IP not found in database');
    }
  }

  getCountryBody(req, res) {
    const { ip } = req.body;

    if (!ip)
      return res.send(
        'Pass IP in request body {"ip":"0.0.0.0"} or in URL as a param /0.0.0.0 '
      );
    const ipInfo = getIpInfo(ip);

    if (ipInfo) {
      const response = `${ipInfo.country} - ${ip}`;
      console.log(response);

      res.status(200).send(response);
    } else {
      console.log('IP not found in database');
      res.send('IP not found in database');
    }
  }
}

module.exports = new IpController();

const { nanoid } = require('nanoid');
const { Url } = require('../models/models');
const http = require('http');
const https = require('https');

class ShortLinkerController {
  async generateShortLink(req, res) {
    const originalUrl = req.body.url;

    if (!originalUrl) {
      return res.status(400).json({ error: 'Original Url is absent' });
    }

    if (!originalUrl.match(/^https?:\/\//)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    let urlExist = true;
    //Check if url exists
    try {
      const protocol = originalUrl.startsWith('https') ? https : http;
      await new Promise((resolve, reject) => {
        protocol
          .get(originalUrl, (res) => {
            const { statusCode } = res;
            if (statusCode !== 200) {
              urlExist = false;
            }
            resolve(true);
          })
          .on('error', (err) => {
            console.error(`Error apling to ${originalUrl}: ${err.message}`);
          });
      });
    } catch (error) {
      res.status(500).json({ 'Error: ': error });
    }

    if (!urlExist) {
      return res.status(400).json({
        error: `URL ${originalUrl} doesn't exist`,
      });
    }
    //If short link exists yet, just pass it
    const original = await Url.findOne({ where: { original: originalUrl } });

    if (original) {
      return res.json({
        shortUrl: `${process.env.DOMAIN}${original.short}`,
      });
    }

    //Count number of rows in the table and difine length of nanoid() string.
    const urlCount = await Url.count();

    const setUrlLength = (n) => {
      let result = 64 ** n;
      if (urlCount < result) {
        return n;
      } else {
        setUrlLength(n++);
      }
    };

    const urlLength = setUrlLength(1);

    //Create new shortUrl with checking existance this one
    const createUrl = async () => {
      const shortUrl = nanoid(urlLength);
      const result = await Url.findOne({ where: { short: shortUrl } });
      if (result) {
        createUrl();
      } else {
        return shortUrl;
      }
    };

    const shortUrl = await createUrl();

    //Write new shortUrl in DB
    try {
      const url = await Url.create({
        short: shortUrl,
        original: originalUrl,
      });

      res.json({
        shortUrl: `${process.env.DOMAIN}${url.short}`,
      });
    } catch (error) {
      console.error('Error executing create url', error);
      res.status(500).json({ error: 'Error executing create url' });
    }
  }

  async redirectOriginal(req, res) {
    const shortUrl = req.params.shorturl;
    try {
      const result = await Url.findOne({ where: { short: shortUrl } });
      if (result) return res.status(200).redirect(result.original);
      else return res.status(404).json({ error: 'Short URL not found' });
    } catch (error) {
      console.error('Error DB', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new ShortLinkerController();

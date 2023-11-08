const express = require('express');
const { Pool } = require('pg');
const shortid = require('shortid');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: 'your_postgres_user',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_postgres_password',
  port: 5432,
});

app.post('/shorten', async (req, res) => {
  const originalUrl = req.body.url;

  // Валидация URL (пример простой валидации)
  if (!originalUrl.match(/^https?:\/\//)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const shortUrl = shortid.generate();

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO urls (short_url, original_url) VALUES ($1, $2) RETURNING *',
      [shortUrl, originalUrl]
    );

    const insertedUrl = result.rows[0];
    client.release();

    res.json({
      shortUrl: `http://yourdomain.com/${insertedUrl.short_url}`,
    });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM urls WHERE short_url = $1',
      [shortUrl]
    );

    if (result.rows.length > 0) {
      const originalUrl = result.rows[0].original_url;
      client.release();
      return res.redirect(originalUrl);
    } else {
      client.release();
      return res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

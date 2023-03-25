const express = require('express');
const crypto = require('crypto');
const app = express();
const urls = {};

function shortenUrl(url) {
  const hash = crypto.createHash('sha256').update(url).digest('hex');
  const shortCode = hash.slice(0, 8);
  urls[shortCode] = url;
  return `http://localhost:8000/${shortCode}`;
}
function redirect(req, res) {
  const shortCode = req.params.shortCode;
  const url = urls[shortCode];
  if (url) {
    res.redirect(url);
  } else {
    res.status(404).send('Invalid URL');
  }
}
app.post('/shorten', express.urlencoded({ extended: true }), (req, res) => {
  const url = req.body.url;
  const shortUrl = shortenUrl(url);
  res.send(shortUrl);
});
app.get('/:shortCode', redirect);
const port = 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

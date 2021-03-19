const fs = require('fs')
const express = require('express')
const app = express()
const port = process.env.PORT || 8080;

(async () => {
  const getHitsData = () => {
    const hits_file = 'hits.txt'
    let hits;
    hits = parseInt(fs.readFileSync(hits_file, 'utf8')) + 1;
    fs.writeFileSync(hits_file, hits.toString());
    return parseInt(fs.readFileSync(hits_file, 'utf8'));
  }
  let hits = await getHitsData();

  app.get('/', function (req, res) {
    hits++;
    res.send(hits.toString());
  })

  app.listen(port);
})();

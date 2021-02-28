// Be in awe of this amazing app
const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
let hits = 0;
app.get('/', function (req, res) {
  hits++;
  res.send(hits.toString());
})
app.listen(port);

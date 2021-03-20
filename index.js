const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
(async () => {
  const getHitsData = async () => {
    let hits;
    const mongo_username = process.env.MONGO_DB_USER;
    const mongo_password = process.env.MONGO_DB_PASSWORD;
    const uri = 'mongodb+srv://' + mongo_username + ':' + mongo_password + '@cluster0.zioug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      await client.connect();
      const database = client.db('hitcounter');
      const collection = database.collection('hits');
      const query = {};
      const options = {'total': 1};
      const total = await collection.findOne(query, options);
      await collection.updateOne(query, {$set: {total: total.total + 1 }});
      const total_updated = await collection.findOne(query, options);
      hits = total_updated.total;
    } catch(error) {
      hits = 10000004;
    } finally {
      client.close();
      return hits;
    }
  }
  app.get('/', async function (req, res) {
    let hits = await getHitsData();
    res.send(hits.toString());
  })
  app.listen(port);
})();

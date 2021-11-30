const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

//connect to Mongo
MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
  console.log('Connected successfully to db server');

  //connect to bad-bank-project database
  db = client.db('bad-bank-project');
});

//create user account
const create = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    const doc = {name, email, password, balance: 0};
    collection.insertOne(doc, {w:1}, (err, result) => {
      err ? reject(err) : resolve(doc);
    });
  });
}

//all users
const allUsers = () => {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({})
      .toArray((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
  });
}

module.exports = {create, allUsers};
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4siiz.mongodb.net/bad-bank?retryWrites=true&w=majority`;
//client to connect to for data
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//collection where bad-bank data is housed
const collection = client.db("bad-bank").collection('users');

//create user account
const create = (name, email, password) => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      const doc = {name, email, password, balance: 0};
      collection.insertOne(doc, {w:1}, (err, result) => {
        err ? reject(err) : resolve(doc);
      });
    });
    
  });
}

//get all user accounts
const allUsers = () => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      collection.find({})
      .toArray((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
    });
  });
}

//update balance info
const updateBalance = (email, newBalance) => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      collection.updateOne(
        {"email": email}, 
        {
          $set: {"balance": Number(newBalance)}
        })
        .then(doc => {
          resolve(doc);
        })
        .catch(err => {
          reject(err);
        })
        if(err){
          console.log(err);
        }
      });
  });
}

//find one user, should return null if no existing user--if user exists, it will return user document
const checkForAccount = (email) => {
  return new Promise ((resolve, reject) => {
    client.connect(err => {
      collection.findOne(
        { email: email }
      )
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
    });
  });
}

//delete user account
const deleteAccount = (email) => {
  return new Promise ((resolve, reject) => {
    client.connect(err => {
      collection.findOneAndDelete(
        { "email": email }
      )
      .then((data) => {
        resolve(data.value);
      })
      .catch(err => {
        console.log(err)
        reject(err);
      });
    });
  });
}


module.exports = { create, allUsers, updateBalance, checkForAccount, deleteAccount };
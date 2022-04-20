const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const dal = require('./dal.js');

//allow cross origin access
app.use(cors());
app.use(express.static('build'));

//create user account
app.get('/account/create/:name/:email/:password', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const email = req.params.email;
  dal.checkForAccount(email)
    .then((user) => {
      if(user === null){
        dal.create(req.params.name, email, req.params.password)
          .then((user) => {
            console.log(user);
            res.send(user);
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      } else {
        res.status(409).send(`Cannot create new user, as ${req.params.email} is already attached to an existing account. Please log into your account or sign up for a new account with a unique email address.`)
      }
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
});

// login user
app.get('/account/login/:email/:password', (req, res) => {
  const email = req.params.email;
  dal.checkForAccount(email)
    .then((user) => {
      if(user !== null){
        if(req.params.password === user.password){
          res.send(user);
        } else {
          res.status(401).send(`Either user email or user password do not match our database. If you have not yet created an account, please do so by clicking 'Create An Account'`);
        }
      } else {
        res.status(409).send(`Either user email or user password do not match our database. If you have not yet created an account, please do so by clicking 'Create An Account'`);
      }
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
});

//all accounts
app.get('/account/all', (req, res) => {
  dal.allUsers().
    then((docs) => {
      //console.log(docs);
      res.send(docs);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
});

//update balance info
app.get('/account/updateBalance/:email/:balance', (req, res) => {
  const email = req.params.email;
  dal.updateBalance(email, req.params.balance)
    .then((doc) => {
      if(doc.modifiedCount === 1){
        dal.checkForAccount(req.params.email)
          .then(user => res.send(user))
          .catch(err => console.log(err))
      } 
    })
    .catch((err) => console.log(`Balance updated rejected due to error: ${err}`))
});

//check user
app.get('/account/checkUser/:email', (req, res) => {
  const email = req.params.email;
  dal.checkForAccount(email)
    .then(user => {
      if(user === null){
        res.status(409).send('Requested transfer recipient not a Bad Bank account holder. Cannot apply transfer.');
        return;
      }
      res.send(user);
    })
    .catch(err => {
      console.log(err);
    })
});

//delete user
app.delete('/account/deleteAccount/:email', (req, res) => {
  const email = req.params.email;
  if(email === 'tester@test.ing') {
    res.status(409).send('Cannot delete demo account.');
  }
  dal.deleteAccount(email)
    .then(data => {
      if(data.email === email){
        res.status(200);
        res.send('Deletion complete.');
      }
    })
    .catch(err => {
      console.log(err);
    })
})

//reroute any other routes back to root on refresh
app.get('*', (req, res) => {
  res.redirect(302, '/')
});

const port = 5000;
app.listen(port);
console.log(`Running on port: ${port}`);
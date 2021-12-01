const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');

//use to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

//create user account
app.get('/account/create/:name/:email/:password', (req, res) => {
  dal.create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

//login user
app.get('/account/login/:email/:password', (req, res) => {
  res.send({
    email: req.params.email,
    password: req.params.password
  });
});

//all accounts
app.get('/account/all', (req, res) => {
  dal.allUsers().
    then((docs) => {
      console.log(docs);
      res.send(docs);
    });
});

//update balance info
app.put('/account/:id/balance', (req, res) => {
  const { balance } = req.body;
});

const port = 3000;
app.listen(port);
console.log(`Running on port: ${port}`);
const express = require('express');
const router = express.Router();

const auth = require('./helpers/auth');
const fs = require('fs');

router.get('/', auth.login, (req, res, next) => {

  res.send('Show collection');
});

router.get('/add', auth.login, (req, res, next) => {

  const content = {
    title: 'Tag-it'
  };

  res.render('addCollection', content);
});


router.post('/add', auth.login, (req, res, next) => {

  const newItem = req.body; // reset req.body to new object
  newItem.tags = newItem.tags.split(' '); // rewrite tags sting to array
  delete newItem.button; // delete the button item in obj
  newItem.moment = new Date(); // add this moment to obj

  console.log(newItem);

  // TODO: write this data to Collection of user

  res.send('addCollection');
});

module.exports = router;

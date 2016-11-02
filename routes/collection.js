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

  // Convert POST data into data that's ready for the DB
  // ---------------------------------------------------
  const newItem = req.body; // reset req.body to new object
  newItem.tags = newItem.tags.split(','); // rewrite tags sting to array
  newItem.tags.forEach(tag => {
    tag.toString();
    tag.charAt(0) === ' ' ? tag = tag.substr(1) : tag = tag;
  });
  delete newItem.button; // delete the button item in obj
  newItem.moment = new Date(); // add this moment to obj
  console.log('New item created');
  // ---------------------------------------------------



  // Set data into the DB
  // ---------------------------------------------------
  const user = res.locals.user; // Get userData
  const collectionId = user.collectionId; // Get the CollectionId from the User data
  const collectionsPath = './routes/data/collections.json';

  // TODO: make this to module: getMatchingCollection
  fs.readFile(collectionsPath, (error, datas) => {
    if (error) { console.log(error); }

    const collections = JSON.parse(datas); // Parse data
    const userCollection = collections.filter(singleCollection => singleCollection.id === collectionId); // Filter the collections for the one that matches the users
    const currentCollection = userCollection[0].collection[0].links; // Get all links from the userCollection

    currentCollection.push(newItem);
    const newCollection = JSON.stringify(collections);

    fs.writeFile(collectionsPath, newCollection, err => {
      if (err) { throw err; }
      console.log('New collection is saved');
    });

    res.redirect('/');

  });
  // ---------------------------------------------------

});

module.exports = router;

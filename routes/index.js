const express = require('express');
const router = express.Router();

// const file = require('./helpers/file');
// const collection = require('./helpers/collection');
const auth = require('./helpers/auth');
const fs = require('fs');

router.get('/', auth.login, (req, res, next) => {

  const collectionsPath = './routes/data/collections.json';

  const user = res.locals.user;

    // Get all Collections
    fs.readFile(collectionsPath, (error, datas) => {
      if (error) { console.log(error); }

      const collectionId = user.collectionId; // Get the collectionId from this user
      const collections = JSON.parse(datas); // Parse data
      const userCollection = collections.filter(singleCollection => singleCollection.id === collectionId); // Filter the collections for the one that matches the users
      const currentCollection = userCollection[0].collection[0].links; // Get all links from the userCollection

      const content = {
        title: 'Tag-it',
        user: user,
        collection: currentCollection
      };

      res.render('index', content);
    });

});

module.exports = router;

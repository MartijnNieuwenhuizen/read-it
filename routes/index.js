const express = require('express');
const router = express.Router();

// const file = require('./helpers/file');
// const collection = require('./helpers/collection');
const auth = require('./helpers/auth');
const fs = require('fs');

router.get('/', auth.login, (req, res, next) => {

  const collectionsPath = './routes/data/collections.json';

  const user = res.locals.user;

    // Get Collections
    fs.readFile(collectionsPath, (error, datas) => {
      if (error) { console.log(error); }

      const collectionId = user.collectionId;

      const collections = JSON.parse(datas);
      const userCollection = collections.filter(singleCollection => singleCollection.id === collectionId);

      const currentCollection = userCollection[0].collection[0].links;

      console.log(userCollection[0].collection[0].links);

      const content = {
        title: 'Tag-it',
        user: user,
        collection: currentCollection
      };

      res.render('index', content);
    });

});

module.exports = router;

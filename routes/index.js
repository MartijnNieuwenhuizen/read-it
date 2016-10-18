const express = require('express');
const router = express.Router();

const file = require('./helpers/file');
const collection = require('./helpers/collection');

router.get('/', (req, res, next) => {

  const user = 'MartijnNieuwenhuizen'; // TODO: store this in sessions

  file.read('./routes/data/users.json')
  .then((data) => {
    // Filter the collection from the user
    collection.get(user, data)
    .then(collection.current) // Filter the collection from the user
    .then((bla) => {

      const content = {
        title: 'Tag-it',
        user: user,
        collection: bla
      };

      res.render('index', content);

    })
    .catch((err) => { console.log('Error: ', err); });
  })
  .catch((err) => { console.log('Error: ', err); });

});

module.exports = router;

var express = require('express');
var router = express.Router();

const fs = require('fs');

router.get('/login', (req, res, next) => {

  const content = {
    title: 'Tag-it',
    user: '',
  };

  res.render('login', content);
});

router.post('/login', (req, res, next) => {

  const userEmail = req.body.email.toLowerCase();
  const usersPath = './routes/data/users.json';

  fs.readFile(usersPath, (err, data) => {
    if (err) { console.log(err); }

    const users = JSON.parse(data);
    const user = users.filter( usersD => usersD.email === userEmail);

    if (user.length > 0) {
      const session = req.session;
      session.view = 1;
      session.userId = user[0].userId;

      res.redirect('/');
    } else {
      res.redirect('/users/sign-up');
    }
  });




  // const content = {
  //   title: 'Tag-it',
  //   user: '',
  // };

  // res.render('login', content);
});

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;

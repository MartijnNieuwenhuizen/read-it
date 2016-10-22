const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Middleware - Sessions
app.set('trust proxy', 1);
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'E=MC2'
}));

// Check auth
app.use((req, res, next) => {

  // If there's a session and a logedin user
  if (req.session && req.session.userId) {

    fs.readFile('./routes/data/users.json', (err, data) => {
      if (err) { console.log(err); }

      const usersData = JSON.parse(data);
      const userD = usersData.filter( usersD => usersD.userId === req.session.userId);
      res.locals.user = userD[0];
      next();
    });
  } else {
    next();
  }
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

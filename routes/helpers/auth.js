module.exports = {
  login: function(req, res, next) {
    if (req.session && !req.session.userId) {
      res.redirect('/users/login');
    } else {
      next();
    }
  }
};

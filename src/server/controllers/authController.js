const passport = require('passport');
const crypto = require('crypto'); // this module is included with node
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = function(req, res, next) {
  console.log('login')
  passport.authenticate('local', function(err, user, info) {
    if (!user) {
      res.status(400).send('User not found');
      return;
    }
    req.logIn(user, function(err) {
      res.status(200).send('logged in');
      return;
    });
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy(function () {
    res
      .clearCookie('connect.sid', { path: '/' })
      .status(200)
      .send('Cookie deleted.');
  });
};

exports.isLoggedIn = (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ status: 'logged in' });
  } else {
    res.send({ status: 'not logged in' });
  }
  res.end();
};

const mongoose = require('mongoose');
const User = mongoose.model('User');
const ChordSheet = mongoose.model('ChordSheet');
const { promisify } = require('es6-promisify');

// exports.createUser = async (req, res) => {
//   const chordSheet = new ChordSheet({title: 'Test Chord Sheet', chords: [['Em','0','2','2','0','0','0' ]]});
//   await chordSheet.save();
//   const user = new User(Object.assign({}, req.body, { chordSheets: [chordSheet] }));
//   await user.save();
//   res.send('done');
// }

exports.createUser = (req, res, next) => {
  console.log(req.body)
  res.redirect('http://localhost:3000');
}

exports.validateRegister = (req, res, next) => {
  // sanitize data from form and ensure they are not blank
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('email', 'That email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'You must supply a password').notEmpty();
  req.checkBody('confirmedPassword', 'Confirmed password cannot be blank').notEmpty();
  // checks that passwords match
  req.checkBody('confirmedPassword', 'Your passwords do not match').equals(req.body.password);

  // if errors log them and end the function
  const errors = req.validationErrors();
  if (errors) {
    errors.map(err => console.log(err))
    res.redirect('http://localhost:3000/register')
    return;
  }
  // else proceed to next middleware
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name, password: req.body.password });
  // .register is exposed from the passportLocalMongoose plugin used in our User schema
  await User.register(user, req.body.password);
  res.redirect('http://localhost:3000');
  next();
}

// exports.loginUser = async (req, res) => {
//   console.log('Session', req.session.userId);
//   const userQuery = User.where({ name: req.body.username, password: req.body.password });
//   const user = await userQuery.findOne();
//   req.session.userId = user._id;
//   res.redirect('http://localhost:3000');
// }

exports.createChordSheet = async (req, res) => {
  if(req.session.userId) {
    const userQuery = User.where({ _id: req.session.userId });
    const user = await userQuery.findOne();
    const newChordSheet = new ChordSheet({title: 'Test Chord Sheet', chords: [['Em','0','2','2','0','0','0' ]]});
    let chordSheet = await newChordSheet.save();
    // add chord sheet to user's chord sheets array on model
    user.chordSheets.push({_id: chordSheet._id});
    user.save();
    res.redirect('http://localhost:3000');
  }
}

exports.getChordSheets = async (req, res) => {
  if(req.session.userId) {
    const userQuery = User.where({ _id: req.session.userId });
    const user = await userQuery.findOne().populate('chordSheets');
    console.log(user.chordSheets);
    res.redirect('http://localhost:3000');
  }
}
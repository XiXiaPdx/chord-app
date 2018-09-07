const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Please enter an email',
    lowercase:true,
    trim: true
  },
  name: {
    type: String,
    required: 'Please enter a name',
    trim: true
  },
  password: {
    type: String,
    required: 'Please enter a password'
  },
  // chordSheets is an array of ObjectId's, the ref tells Mongoose what model to use during population
  // all id's stored here must be id's from the ChordSheet Model.
  chordSheets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChordSheet'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
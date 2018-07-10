const mongoose = require('mongoose');


// Import variables.env file
require('dotenv').config({path: 'variables.env'});

// Connect to database
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', err => {
  console.error(err.message);
});

// Start app
const app = require('./app');
app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), () => {
  console.log(`App running on ${server.address().port}`);
});



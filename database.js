import Sequelize from 'sequelize';
import credentials from './credentials.js';


//instantiate new sequelize instance
var db =  new Sequelize(`postgres://${credentials.username}:${credentials.password}@localhost:5432/chordapp`);

//test database connection
db
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


//define users table. dont need to specify id since it has been created in DB
var Users = db.define('users', {
  name: {
    type: Sequelize.TEXT
  },
  email: {
    type: Sequelize.TEXT
  }
},
{
  timestamps: false
});


/*
//sync, then add and return new data
Users.sync().then(function() {
  var data = {
    name: 'Gilbert',
    email: 'gilbert@dog.com'
  }

  Users.create(data).then(function(data) {
    console.log(data.get());
  })
});
*/

//returns are records for users table
var userData = []
Users.findAll().then(function(allUsers) {
  allUsers.forEach((val, userIndex) => {
    userData.push( allUsers[userIndex].dataValues )
  })
})



module.exports = {
  Users,
  userData
}
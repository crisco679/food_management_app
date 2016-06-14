var pg = require('pg');
var connectionString = 'postgres://localhost:5432/food_management';

function initializeDB(){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('Error connecting to DB', err);
      process.exit(1);
    } else {
      var query = client.query('CREATE TABLE IF NOT EXISTS foodBought (' +
      'id SERIAL PRIMARY KEY,' +
      'name varchar(80) NOT NULL,' +
      'address text);');

      query.on('end', function(){
        console.log('Successfully ensured schema exists');
        done();
      });
      query.on('error', function(){
        console.log('error creating schema');
        process.exit(1);
      });
    }
  });
}
module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;

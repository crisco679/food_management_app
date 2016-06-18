var pg = require('pg');
var connectionString = 'postgres://localhost:5432/food_management';

function initializeExpense() {
  pg.connect(connectionString, function(err, client, done) {
    if ( err ) {
      console.log('Error connecting to DB', err);
      process.exit(1);
    } else {
      var query = client.query('CREATE TABLE IF NOT EXISTS "expense" (' +
      'expense_id serial PRIMARY KEY,' +
      'name varchar(80) NOT NULL,' +
      'price varchar(10) NOT NULL,' +
      'category varchar(50),' +
      'description text);');

      query.on('end', function() {
        console.log('Successfully ensured Expense schema exists.');
        done();
      });

      query.on('error', function() {
        console.log('Error creating Expense schema.' + err);
        process.exit(1);
      });
    }
  });
}

function initializeAccount() {
  pg.connect(connectionString, function(err, client, done) {
    if ( err ) {
      console.log('Error connecting to DB', err);
      process.exit(1);
    } else {
      var query = client.query('CREATE TABLE IF NOT EXISTS "account" (' +
      'account_id serial PRIMARY KEY,' +
      'username varchar(80) NOT NULL,' +
      'password varchar(50) NOT NULL,' +
      'email_address varchar(50));');

      query.on('end', function() {
        console.log('Successfully ensured Account schema exists.');
        done();
      });

      query.on('error', function() {
        console.log('Error creating Expense schema.' + err);
        process.exit(1);
      });
    }
  });
}

module.exports.connectionString = connectionString;
module.exports.initializeExpense = initializeExpense;
module.exports.initializeAccount = initializeAccount;

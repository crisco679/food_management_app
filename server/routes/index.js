var router = require('express').Router();
var path = require("path");
var connection = require('../db/connection');
var connectionString = connection.connectionString;
var pg = require('pg');

//*************
//Syntax to update table
//*************

// UPDATE budget
// SET budget = 500
// WHERE budget_id = 10;

//***************

router.post('/budget', function(req, res){
  console.log('router.post to /budget');
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('err posting budget', err);
      res.status(500).send(err);
    } else {
      console.log(req.body);
      var budget = req.body.budget;
      var remainder = req.body.budget;
      var month = req.body.month;
      var year = req.body.year;
      var results = [];
      var query = client.query('INSERT INTO budget(month, year, budget, remaining)' + 'VALUES ($1, $2, $3, $4) RETURNING *',
          [month, year, budget, remainder]);
      query.on('error', function(error){
        console.log(error);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      });
      query.on('end', function(){
        res.send(results);
        done();
      });
    }
  });
});

router.get('/budget', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      var query = client.query('SELECT * FROM budget');
      var results = [];

      query.on('error', function(error){
        console.log(error);
        res.sendStatus(500);
      });
      query.on('row',function(rowData){
        results.push(rowData);
      });
      query.on('end',function(){
        res.send(results);
        done();
      });
    }
  });
});

router.delete('/budget/:id', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log('req.params', req.params);
      var id = req.params.id;
      console.log('req.params.id', req.params.id);
      var query = client.query('DELETE FROM budget WHERE budget_id=($1)', [id]);
      var results = [];

      query.on('error', function(error){
        console.log(error);
        res.sendStatus(500);
      });

      query.on('row', function(rowData){
        results.push(rowData);
      });

      query.on('end', function(){
        res.send(results);
        done();
      });
    }
  });
});

router.get('/purchases', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/subtractBudget.html'));
});

/** TODO: try to use transaction query
**/
router.get('/purchases/:id', function(req, res) {
  var id = req.params.id;
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log('Error retrieving monthly');
      res.status(500).send(err);
    } else {
      var results = {};

      client.query('SELECT * FROM budget AS b WHERE b.budget_id = $1;', [id], function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          results.info = result.rows;
          client.query('SELECT * FROM expense AS e WHERE e.budget_id = $1;', [id], function(err, result) {
            if (err) {
              console.log(err);
              res.status(500).send(err);
              process.exit(1);
            } else {
              results.purchases = result.rows;
              res.send(results);
              done();
            }
          });
        }
      });
    }
  });
});

router.post('/purchases/:id', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    var rollback = function(client) {
      client.query('ROLLBACK', function() {
        client.end();
      });
    };

    client.query('BEGIN', function(err, result) {
      if(err) return rollback(client);
      client.query('INSERT INTO expense AS e (name, price, budget_id) VALUES ($1, $2, $3)', [req.body.name, req.body.price, req.params.id], function(err, result) {
        if(err) {
          return rollback(client);
        } else {
          client.query('UPDATE budget AS b ' +
          'SET remaining = remaining - $1 ' +
          'WHERE budget_id = $2;', [req.body.price, req.params.id], function(err, result) {
            if (err) {
              return rollback(client);
            } else {
              client.query('COMMIT', client.end.bind(client));
              res.send(result.rows);
            }
          });
        }
      });
    });
  });
});

module.exports = router;

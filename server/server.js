var express       = require('express');
var app           = express();
var router        = require('./routes/router.js');
var bodyParser    = require('body-parser');
var pg            = require('pg');
var dbConnection  = require('./db/connection.js');

//[[[[[[[[[[[[[[[[[[[[Database]]]]]]]]]]]]]]]]]]]]
dbConnection.initializeExpense();
dbConnection.initializeAccount();

app.use(express.static('server/public'));
//[[[[[[[[[[[[[[[[[[[Router]]]]]]]]]]]]]]]]]]]

app.use(bodyParser.json());

app.use('/', router);

//[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]

//[[[[[[[[[[[[[[[[[[[[[[Server]]]]]]]]]]]]]]]]]]]]]]
var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  console.log('Listening on port', port);
});

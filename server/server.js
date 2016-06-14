var express = require('express');
var app = express();
var router = require('./routes/router.js');
var pg = require('pg');
var bodyParser = require('body-parser');
//[[[[[[[[[[[[[[[[[[[[Database]]]]]]]]]]]]]]]]]]]]
var initializeDB = require('./db/connection.js').initializeDB;

app.use(express.static('server/public'));
//[[[[[[[[[[[[[[[[[[[Router]]]]]]]]]]]]]]]]]]]
app.use(bodyParser.json());
app.use('/', router);

//[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]
initializeDB();
//[[[[[[[[[[[[[[[[[[[[[[Server]]]]]]]]]]]]]]]]]]]]]]
var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  console.log('Listening on port', port);
})

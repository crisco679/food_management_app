var express = require('express');
var app = express();
var router = require('./routes/router.js');

app.use(express.static('server/public'));
//[[[[[[[[[[[[[[[[[[[Router]]]]]]]]]]]]]]]]]]]
app.use('/', router);
//[[[[[[[[[[[[[[[[[[[[[[Server]]]]]]]]]]]]]]]]]]]]]]
var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  console.log('Listening on port', port);
})

var router = require('express').Router();
var path = require('path');
var index = require('./index.js');
router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});



//Keep at bottom
router.use('/', index)

module.exports = router;

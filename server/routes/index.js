var router = require('express').Router();

router.get('/', function(req, res){
  console.log('%*%*%*%*%*%*%*%*%%*', req);
})
router.post('/', function(req, res){
  console.log('%$%$%$%$%$%%$%$%%$$', req);
})
module.exports = router;

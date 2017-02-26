var express = require('express');
var router = express.Router();

var result = {result: 0};

router.get('/', function(req,res){
  res.status(200).send(result);
})

router.post('/add', function(req,res){
  var x = parseInt(req.body.x);
  var y = parseInt(req.body.y);
  result.result = x + y;
  res.sendStatus(200);
})

router.post('/subtract', function(req,res){
  var x = parseInt(req.body.x);
  var y = parseInt(req.body.y);
  result.result = x - y;
  res.sendStatus(200);
})
//add other post functions here for the /multiply, /divide, /subtract requests
router.post('/multiply', function(req,res){
  var x = parseInt(req.body.x);
  var y = parseInt(req.body.y);
  result.result = x * y;
  res.sendStatus(200);
})

router.post('/divide', function(req,res){
  var x = parseInt(req.body.x);
  var y = parseInt(req.body.y);
  if(y==0){
    res.status(500).send('Divide by zero error');
  } else {
    result.result = x / y;
    res.sendStatus(200);
  }
})

module.exports = router;

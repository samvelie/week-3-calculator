//This file routes requests based on what math operation was requested. The posts update a result property. The get obtains the result object.
var express = require('express');
var router = express.Router();

var result = {result: 0};

router.get('/', function(req,res){
  res.status(200).send(result);
})

router.post('/add', function(req,res){
  var x = parseFloat(req.body.x);
  var y = parseFloat(req.body.y);
  result.result = x + y;
  res.sendStatus(200);
})

router.post('/subtract', function(req,res){
  var x = parseFloat(req.body.x);
  var y = parseFloat(req.body.y);
  result.result = x - y;
  res.sendStatus(200);
})

router.post('/multiply', function(req,res){
  var x = parseFloat(req.body.x);
  var y = parseFloat(req.body.y);
  result.result = x * y;
  res.sendStatus(200);
})

router.post('/divide', function(req,res){
  var x = parseFloat(req.body.x);
  var y = parseFloat(req.body.y);
  if(y==0){
    res.status(500).send('Divide by zero error');
  } else {
    result.result = x / y;
    res.sendStatus(200);
  }
})

module.exports = router;

//This file routes requests based on what math operation was requested. The posts update a result property and return a result object.
var express = require('express');
var router = express.Router();

var result = {result: 0};

//calculator works with just POST routes

router.post('/add', function(req,res){
  var x = parseFloat(req.body.x);
  var y = parseFloat(req.body.y);
  result.result = x + y;
  res.send(result);
})

router.post('/subtract', function(req,res){
  var x = parseFloat(req.body.x);
  var y = parseFloat(req.body.y);
  result.result = x - y;
  res.send(result);
})

router.post('/multiply', function(req,res){
  var x = parseFloat(req.body.x);
  var y = parseFloat(req.body.y);
  result.result = x * y;
  res.send(result);
})

router.post('/divide', function(req,res){
  var x = parseFloat(req.body.x);
  var y = parseFloat(req.body.y);
  if(y==0){
    res.status(400).send('Divide by zero error'); //to respond to bad input, i.e. 0 as the divisor
  } else {
    result.result = x / y;
    res.send(result);
  }
})

module.exports = router;

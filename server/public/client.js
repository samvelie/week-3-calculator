var x = '';
var y = '';
var operation = '';
var result = '';
var numberClicked = false;
var operatorClicked = false;
var equalsClicked = false;

$(document).ready(function(){
  $('.number').on('click', function(){
    var thisNum = $(this).text();
    if(equalsClicked){
      $('.display').text(thisNum);
      console.log('x= ' + x + ' opr= ' + operation + ' y= ' + y);
    } else if(operatorClicked){
      y+= thisNum;
      $('.display').text(y);
      console.log('x= ' + x + ' opr= ' + operation + ' y= ' + y);
    } else {
      x += thisNum;

      console.log('x= ' + x + ' opr= ' + operation + ' y= ' + y);
      $('.display').text(x);
    }
    numberClicked = true;
    equalsClicked = false;
  });

  $('.operator').on('click', function(){
    var thisOperator = $(this).attr('id');
    if(numberClicked == false && equalsClicked==false){
      //don't do anything
    } else if(operatorClicked && numberClicked){
      var cheating = $('#'+operation).attr('value');
      x = eval(parseInt(x) + cheating + parseInt(y));
      y = '';
      operation = thisOperator;
      operatorClicked = true;
      numberClicked = false;
      $('.display').text(x);
      console.log('x= ' + x + ' opr= ' + operation + ' y= ' + y);
    } else if(numberClicked){
      operation = thisOperator;
      operatorClicked = true;
      numberClicked =false;
      console.log('x= ' + x + ' opr= ' + operation + ' y= ' + y);
    } else if(equalsClicked){
      operation = thisOperator;
      y = '';
      operatorClicked = true;
      numberClicked = false;
      equalsClicked = false;
      console.log('x= ' + x + ' opr= ' + operation + ' y= ' + y);
    }

  })

  $('#getResult').on('click', function(){
    mathAtServer(x, y, operation);

    equalsClicked = true;
    numberClicked = false;
    operatorClicked = false;

    console.log('x= ' + x + ' op= ' + operation + ' y= ' + y);
  })

  $('#clear').on('click', function(){
    $('.display').text('');
    x = '';
    y = '';
    operation = '';
    result = '';
    numberClicked = false;
    operatorClicked = false;
    equalsClicked = false;
  });

}); // end document ready

function mathAtServer(num1, num2, operator){
  var mathObject = {};
  mathObject.x = num1;
  mathObject.y = num2;
  mathObject.operation = operator;
  console.log('mathObject', mathObject);
  $.ajax({
    type: 'POST',
    url: '/operations/' + operator,
    data: mathObject,
    success: function(response){
      console.log(response);
    },
    error: function(response){
      alert(response);
    }
  });

  $.ajax({
    type: 'GET',
    url: '/operations',
    success: function(data){
      result = data.result;
      $('.display').text(result);
      x = result;
      // y = '';
    }
  });
}

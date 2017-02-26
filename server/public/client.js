//All these variables are blank strings to start, even though this is a calculator.
var x = '';
var y = '';
var operation = '';
var result = '';  //this variable could probably be discarded

//These booleans help decide what to do on each button click depending on the order buttons were clicked and get changed depending on what conditions were met
var numberClicked = false;
var operatorClicked = false;
var equalsClicked = false;
//Boolean specific to the decimal button
var decimalNotClicked = true;

$(document).ready(function(){
  displayThis(0);  // this 0 helps indicate the calculator is on
  $('.number').on('click', function(){
    var thisNum = $(this).text();  //grabs text of clicked button and stores it
    if(equalsClicked && result.length > 0){  //when the equals button has retrieved a result, don't want clicking other numbers to affect the result
    displayThis(thisNum);
  } else if(operatorClicked){  //when operator has been clicked, this shifts the number buttons to building the y variable
    y+= thisNum;
    displayThis(y);
    console.log('x= ' + x + ' oper= ' + operation + ' y= ' + y);
  } else {  //this builds the x variable by default
    x += thisNum;
    displayThis(x);
  }
  numberClicked = true;
  equalsClicked = false;
});

$('.operator').on('click', function(){
  var thisOperator = $(this).attr('id'); //grabs the id which

  if(numberClicked == false && equalsClicked==false && x==''){ //this condition should only work when this operator is clicked first, and not if operator is clicked multiple times
    x = 0;
    operation = thisOperator; //I would put this assignment automatically at the button click if I could figure out how to handle the next condtion type
  } else if(operatorClicked && numberClicked){ //this specific conditional responds to strings of inputs like 22-11+4*4, evaluating the result of the previous two numbers and the chosen operation. I struggled to get this check to work with a server call/response and have this current local fix.
    var cheating = $('#'+operation).attr('value'); //this obtains the operation symbol that JavaScript can evaluate
    x = eval(parseFloat(x) + cheating + parseFloat(y)); //this makes x the result of this calculation
    y = ''; //resets y to nothing to accept further inputs
    operation = thisOperator; //now resets the operation variable for future operations
    displayThis(x);
  } else if(numberClicked){
    operation = thisOperator;
  } else if(equalsClicked){
    operation = thisOperator;
    y = ''; //this resets y, since the most likely next button clicked will be a number
    equalsClicked = false;
  }

  operatorClicked = true;
  decimalNotClicked = true;
  numberClicked = false;
  console.log('x= ' + x + ' oper= ' + operation + ' y= ' + y);
})

$('#getResult').on('click', function(){
  if(x === ''){
    x = 0;
  } else if(y ==='' || operation === ''){
    displayThis(x);
  } else {

    mathAtServer(x, y, operation);

    equalsClicked = true;
    numberClicked = false;
    operatorClicked = false;
    decimalNotClicked = true;
  }
})

$('#clear').on('click', function(){
  displayThis(0);
  x = '';
  y = '';
  operation = '';
  result = '';
  numberClicked = false;
  operatorClicked = false;
  equalsClicked = false;
  decimalNotClicked = true;
});

$('#decimal').on('click', function(){
  if (operatorClicked && decimalNotClicked) {
    y+= '.';
    displayThis(y);
    decimalNotClicked = false;
  } else if(decimalNotClicked){
    x += '.';
    displayThis(x);
    decimalNotClicked = false;
  }
})

}); // end document ready

function displayThis(string){
  $('.display').text(string);
}

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
      alert(response.responseText);
    }
  });

  $.ajax({
    type: 'GET',
    url: '/operations',
    success: function(data){
      result = data.result;
      displayThis(result);
      x = result; //this prepares the calculator for further operations
    }
  });
}

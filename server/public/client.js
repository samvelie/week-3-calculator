//All these variables are blank strings to start, even though this is a calculator.
var x = '';
var y = '';
var operation = '';
var result = '';

//These booleans help decide what to do on each button click depending on the order buttons were clicked and get changed depending on what conditions were met
var numberClicked = false;
var operatorClicked = false;
var equalsClicked = false;
//Boolean specific to the decimal button
var decimalNotClicked = true;

$(document).ready(function(){
  displayThis(0);  // this 0 helps indicate the calculator is on
  $('.number').on('click', function(){
    var thisNum = $(this).text();
    if(equalsClicked && result.length > 0){    //when the equals button has retrieved a result, don't want clicking other numbers to affect the result
      displayThis(thisNum);
    } else if(operatorClicked){ // when operator has been clicked, this shifts the number buttons to building the y variable
      y+= thisNum;
      displayThis(y);
      console.log('x= ' + x + ' oper= ' + operation + ' y= ' + y);
    } else {  //this builds the x variable
      x += thisNum;
      displayThis(x);
    }
    numberClicked = true;
    equalsClicked = false;
  });

  $('.operator').on('click', function(){
    var thisOperator = $(this).attr('id');

    if(numberClicked == false && equalsClicked==false){ //this condition works when this is clicked first
      x = 0;
      operation = thisOperator;
      operatorClicked = true;
      console.log('x= ' + x + ' oper= ' + operation + ' y= ' + y);
    } else if(operatorClicked && numberClicked){ //this specific conditional responds to strings of inputs like 22-11+4*4, evaluating the result of the previous two numbers and the chosen operation. I struggled to get this check to work with a server call/response and have this current local fix.
      var cheating = $('#'+operation).attr('value'); //this obtains the operation symbol that JavaScript can evaluate
      x = eval(parseFloat(x) + cheating + parseFloat(y)); //this makes x the result of this calculation
      y = ''; //resets y to nothing to accept further inputs
      operation = thisOperator; //takes
      operatorClicked = true;
      decimalNotClicked = true;
      numberClicked = false;
      displayThis(x);
    } else if(numberClicked){
      operation = thisOperator;
      operatorClicked = true;
      decimalNotClicked = true;
      numberClicked =false;
    } else if(equalsClicked){
      operation = thisOperator;
      y = '';
      operatorClicked = true;
      decimalNotClicked = true;
      numberClicked = false;
      equalsClicked = false;
    }
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

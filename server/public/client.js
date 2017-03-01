//All these variables are blank strings to start, even though this is a calculator.
var x = '';
var y = '';
var operation = '';
var result = '';  //keeping this variable for later experimentation

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
    if(equalsClicked &&  x!== ''){  //when the equal button has retrieved a result, clicking a number will be read as the beginning of a new operation
      x = thisNum;
      displayThis(x);
      decimalNotClicked = true;
    } else if(operatorClicked){  //when operator has been clicked, this shifts the number buttons to building the y variable
      y+= thisNum;
      displayThis(y);
    } else {  //this builds the x variable by default
      x += thisNum;
      displayThis(x);
    }
    numberClicked = true;
    equalsClicked = false;
  }); //end number click listener function

  $('.operator').on('click', function(){
    var thisOperator = $(this).attr('id'); //grabs the id which is used to find the correct server route

    if(numberClicked == false && equalsClicked==false && x==''){ //this condition should only work when the operator button is being clicked before other buttons, when x has no value
      x = 0;
      operation = thisOperator; //I would put this assignment automatically at the button click but I need it to happen after some calculating in the next condition
    }

    /*This entire else if can be removed and the calculator will still have basic function. This specific conditional responds to strings of inputs like 22-11+4*4, evaluating the result of the previous two numbers and the chosen operation. This will need to be replaced by a server call, perhaps using an array of user inputs? */
    else if(operatorClicked && numberClicked){
      var local = $('#'+operation).attr('value'); //this obtains the operation symbol that JavaScript can evaluate
      x = eval(parseFloat(x) + local + parseFloat(y)); //this makes x the result of this calculation
      operation = thisOperator; //now resets the operation variable for future operations
      displayThis(x);
    } //end experimental else if

    else if(numberClicked){
      operation = thisOperator;
    } else if(equalsClicked){
      operation = thisOperator;
      equalsClicked = false;
    };

    //To make it feel like the calculator is thinking
    $('.display').fadeOut(50);
    $('.display').fadeIn(50);

    y = ''; //resets y to nothing to prepare for a number being clicked next
    operatorClicked = true;
    decimalNotClicked = true;
    numberClicked = false;
  })//end operator click listener function

  $('#getResult').on('click', function(){
    if(x === ''){
      x = 0;
      $('.display').fadeOut(50);
      $('.display').fadeIn(50);
    } else if(y ==='' || operation === ''){
      displayThis(x);
      $('.display').fadeOut(50);
      $('.display').fadeIn(50);
    } else {
      mathAtServer(x, y, operation); //this is where math goes to the server and comes back
    }

    equalsClicked = true;
    numberClicked = false;
    operatorClicked = false;
    decimalNotClicked = false; //making this false here to prevent from modifying the result with decimals
  })//end equals button listener function

  //This function makes the calculator like new
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
  });//end clear button listener function

  //Allows for decimals to be added once per number
  $('#decimal').on('click', function(){
    if (operatorClicked && decimalNotClicked) {
      if(y==''){
        y='0.'
        displayThis(y);
      } else {
        y+= '.';
        displayThis(y);
      }
    } else if(decimalNotClicked){
      if(x==''){
        x='0.'
        displayThis(x);
      } else {
        x+= '.';
        displayThis(x);
      }
    }
    decimalNotClicked = false;
  })//end decimal button listener function
}); // end document ready

function displayThis(string){
  $('.display').text(string);
}

function mathAtServer(num1, num2, operator){ //function does not necessarily need params, kept here with the thought they might be useful for later experimentation
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
      console.log('serverResponse', response);
      result = response.result;
      displayThis(result);
      x=result; //sets x to result to prepare for operator being clicked to begin new calculations
    },
    error: function(response){
      alert(response.responseText); //for divide by zero errors
    }
  });
}

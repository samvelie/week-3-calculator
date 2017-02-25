console.log('client.js sourced');

var operation;
var x; //first number
var y; //second number

var aNumber = '';
var bNumber = '';
var operatorClickedYet = false;

$(document).ready(function(){
  console.log('jquery sourced');

  //listener on operation button click
  //will take in x and y from both buttons and type of operations
  //will send this information to the server to get calculated (post)
  //will retrieve the result of this operation (get) and show in DOM this result
  $('.operator').on('click', function(){
    operation = $(this).attr('id');
    console.log('operation:', operation);
    operatorClickedYet = true;
    $('#display').text($(this).text()); //this would show the operator
    var currentNumber = $('#display').text();
  });

  $('.number').on('click', function(){
    if(operatorClickedYet){
        bNumber += $(this).text();
        $('#secondNumber').val(bNumber);
    } else {
      aNumber += $(this).text();
      $('#firstNumber').val(aNumber);
    }
  })

  $('#getResult').on('click', function(){
    console.log('button clicked');
    var x = $('#firstNumber').val();
    var y = $('#secondNumber').val();

    var mathObject = {};

    mathObject.x = x;
    mathObject.y = y;
    mathObject.operation = operation;
    console.log('math object:', mathObject);

    $.ajax({
      type: 'POST',
      url: '/operations/' + operation,
      data: mathObject,
      success: function(response){
        console.log(response);
      }
    });

    $.ajax({
      type: 'GET',
      url: '/operations',
      success: function(data){
        $('#result').text(data.result);
      }
    })
  })

  $('#clear').on('click', function(){
    $('#firstNumber').val('');
    $('#secondNumber').val('');
    $('#result').text('');
    aNumber = '';
    bNumber = '';
    operatorClickedYet = false;
  })
});

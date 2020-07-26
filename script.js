/**
 * Sorry for cluttering the script with conditional statements. 
 */

// All the global variables.
var result='';
var firstOperand='', lastOperand='', operator='none', display = '';


/**Event delegation methods to capture button click from all the button 0 - 9 */
document.getElementById('numbers').addEventListener('click', event => { 
  let value = event.target.value;
  if(value !== undefined){
  takeInput(event.target.value, 'numbers');
  }
});
/**Event delegation methods to capture button click from the control group : clear, backSpace, calculate*/
document.getElementById('controls').addEventListener('click', event => { 
  let value = event.target.value;
  if(value !== undefined){
  takeInput(event.target.value, 'controls');
  }
});
/**Event delegation methods to capture button click from operator group : +,-,/,*,^2 */
document.getElementById('operators').addEventListener('click', event => { 
  let value = event.target.value;
  if(value !== undefined){
  takeInput(event.target.value, 'operators');
  }
});

/**takeInput functions first varifies and then takes input from all the buttons. */

function takeInput(buttonValue, specifier){
  switch(specifier){
    case 'numbers': 
              
               if(operator === 'none'){
               if(firstOperand.length <= 5){
               firstOperand += buttonValue;
               display = firstOperand;
                print('input');
               }
               } else{
                 if(lastOperand.length <= 5){
                 lastOperand += buttonValue;
                 display += buttonValue;
                 print('input');
               }
               }
               break;  
    case 'operators':
               if(operator === 'none' && firstOperand !== ''){
                 operator = buttonValue;
                 display = operator;
                 print('input');
               }
               break;     
    case 'controls':
               actionHandeller(buttonValue);
  }
}


  /** takes two parameter 'input' or 'output' to display numbers in the 
   *  calculator screen in the specified region.
  */ 
  function print(destination){
    if(Number.isNaN(result) === true){
      result = "Math Error";
    }
    if(result.length > 11){
      result = "Range Error!"
    }
    if(destination === 'input'){
    document.getElementById('input').innerText = display;
    }
    else if(destination === 'output'){
      document.getElementById('output').innerText = result;
    }
    else{
    document.getElementById('input').innerText = 'Input';
    document.getElementById('output').innerText = 'Output';
    }
  }
  
  /**Handels the control panel: Clear, delete, and Calculate. */
  function actionHandeller(value){
    if(value === 'clear'){
      reset();
      print();
    }
    else if(value === 'calculate'){
       calculate();
    }
    else{
       backSpace(); // delete one character.
    }
  }

  /**The backspace function to : Acts like a backSpace */
  function backSpace(){
   let phase = calcPhase();
    if(phase == 0){
      print();
    }
    else if(phase == 1){
     if(firstOperand.length > 0){
     firstOperand = firstOperand.substr(0, firstOperand.length -1);
     }
     display = (firstOperand.length == 0) ? 'Input' : firstOperand;
     print('input');
    }
    else if(phase == 2){
      operator = 'none';
      display = 'Input Operator'
      print('input');
    }
    else{
      if(lastOperand.length > 0){
        lastOperand = lastOperand.substr(0, lastOperand.length -1);
        console.log(lastOperand);
        console.log(lastOperand.length);
        }
        display = (lastOperand.length === 0 ) ? operator :(operator+lastOperand);
        console.log(display);
        if(display.length >= 1){
          print('input');
        }
    }
  }
  

/** Whe the [=] is pressed in the controls pannel this function calculates the result. */
  function calculate(){
    if(firstOperand !== '' && operator === '^2'){
      firstOperand = parseInt(firstOperand);
      display = firstOperand + operator;
      result = firstOperand * firstOperand;
      print('input');
      print('output')
    }
    if(firstOperand !== '' &&  lastOperand !== ''){
      display = firstOperand + operator + lastOperand;
      firstOperand = parseInt(firstOperand);
      lastOperand = parseInt(lastOperand);
      if(operator === '+')
      result = firstOperand + lastOperand;
      else if(operator === '-')
      result = firstOperand - lastOperand;
      else if(operator === '*')
      result = firstOperand * lastOperand;
      else
      result = firstOperand / lastOperand;
      print('input');
      print('output')
    }
    reset();
  }

 /** After any calculation this function resets all the variables to their initaial value */
  function reset(){
    display = '';
    firstOperand = '';
    lastOperand = '';
    operator = 'none';
  }
/** The calcPhase is needed for backSpace() function to determine which variable to trim */
  function calcPhase(){
    if(firstOperand !=='' && operator ==='none'){
      return 1;
    }
    else if(operator !== 'none' && lastOperand === ''){
      return 2;
    }
    else if(operator!== 'none' && lastOperand !== ''){
      return 3;
    }
    else{
      return 0;
    }
    
  }

  
  
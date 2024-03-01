const btnPlus = document.querySelector('#btnPlus');
const btnMinus = document.querySelector('#btnMinus');
const btnMulti = document.querySelector('#btnMulti');
const btnDiv = document.querySelector('#btnDiv');
const btnDot = document.querySelector('#btnDot');
const btnEqual = document.querySelector('#btnEqual');
const btnDel = document.querySelector('#btnDel');
const screen = document.querySelector('#screenResult');
const btnClear = document.querySelector('#btnClear');


const screenLength = 14;

let firstNum = 0;
let secondNum = 0;
let displayValue = '0';
let operatorPressed = false;
let result = 0;
let evaluation = false;



// a quick way to assign all the number buttons
for (let i = 0; i <= 9; i++) {
    document.querySelector(`#btn${i}`).addEventListener('click', () => populateDisplay(i))
}

btnPlus.onclick = () => operation('plus');
btnMinus.onclick = () => operation('minus');
btnDiv.onclick = () => operation('div');
btnMulti.onclick = () => operation('multi');

btnDot.onclick = () => addDot(".");
btnClear.onclick = () => clearScreen();
btnDel.onclick = () => del();
btnEqual.onclick = () => eval();




// functions

function populateDisplay(num) {
        if (operatorPressed || screen.textContent === '0') {
            screen.textContent = ""
            evaluation = operatorPressed;
            operatorPressed = false;
        }
        
        if (screen.textContent.length != screenLength) {
            screen.textContent += num;
            displayValue = screen.textContent;   
        }
         
}

function operation(operator) {
    if (evaluation) {
        eval();
    }
    firstNum = Number(displayValue);
    operatorPressed = operator;
    console.log ("first :", firstNum)
}

function addDot() {
    if (!displayValue.includes("."))
    {
        if (screen.textContent === '0') {
            populateDisplay('0.');
        }
        else {
            populateDisplay('.');
        }
    } else if (operatorPressed) {
        populateDisplay('0.');
    }
}

function eval() {
    if (firstNum != 0){
    secondNum = Number(displayValue);
    console.log ("second :", secondNum)
    switch (evaluation) {
        case 'plus':
            result = firstNum + secondNum;
        break;

        case 'minus':
            result = firstNum - secondNum;
        break;

        case 'div':
            result = firstNum / secondNum;
        break;

        case 'multi':
            result = firstNum * secondNum;
        break;
    
        default:
            break;
    }
    
    console.log('result: ', result)
    displayValue =  `${result.toFixed(12)}`;
    firstNum = 0;
    operatorPressed = true;
    evaluation = false;
    
    // check if float will fit into display
    while (displayValue.includes('.') && displayValue.length > screenLength) {
        displayValue = displayValue.slice(0, -1);
    }
    
    // we would also like to get rid of extra zero digits
    while (displayValue.includes('.') && displayValue.lastIndexOf('0') == displayValue.length - 1) {
        displayValue = displayValue.slice(0, -1);
        console.log ('slicin')
    }

    // we don't want our dot to be the last element of the string
        if (displayValue.indexOf('.') == displayValue.length - 1) {
            displayValue = displayValue.slice(0, -1);
        }

    // if still too big, display error
    if (displayValue.length > screenLength) {
        screen.textContent = 'ERROR'
        displayValue = '0';
    } else {
      screen.textContent = displayValue;
     
    }
    
}
   
}

function clearScreen() {
    screen.textContent = "0";
    displayValue = '0';
    firstNum = 0;
    secondNum = 0;
    evaluation = false;
    operatorPressed = false;
}

function del() {
    if (screen.textContent !== '0') {
        if (screen.textContent.length == 1) {
            displayValue = '0';
        } else displayValue = screen.textContent.slice(0, -1);
    screen.textContent = displayValue;
    }
}
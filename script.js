const btnPlus = document.querySelector('#btnPlus');
const btnMinus = document.querySelector('#btnMinus');
const btnMulti = document.querySelector('#btnMulti');
const btnDiv = document.querySelector('#btnDiv');
const btnDot = document.querySelector('#btnDot');
const btnEqual = document.querySelector('#btnEqual');
const btnDel = document.querySelector('#btnDel');
const screen = document.querySelector('#screenResult');
const btnClear = document.querySelector('#btnClear');
const btnMod = document.querySelector('#btnMod');
const message = document.querySelector('#message');


const screenLength = 14;

let firstNum = 0;
let secondNum = 0;
let displayValue = '0';
let operatorPressed = false;
let result = 0;
let evaluation = false;



// a quick way to assign all the number buttons
for (let i = 0; i <= 9; i++) {
    document.querySelector(`#btn${i}`).addEventListener('click', () => populateDisplay(i));
}

btnPlus.onclick = () => operation('plus');
btnMinus.onclick = () => operation('minus');
btnDiv.onclick = () => operation('div');
btnMulti.onclick = () => operation('multi');
btnMod.onclick = () => operation('mod');
btnDot.onclick = () => addDot();
btnClear.onclick = () => clearScreen();
btnDel.onclick = () => del();
btnEqual.onclick = () => eval();

// assign keyboard keys
window.addEventListener('keydown', (event) => {
    if (Number.isInteger(parseInt(event.key))) populateDisplay(event.key)
    else {
        if (event.key == ".") addDot();
        if (event.key == "Backspace") del();
        if (event.key == "%") operation('mod');
        if (event.key == "/") operation('div');
        if (event.key == "*") operation('multi');
        if (event.key == "+") operation('plus');
        if (event.key == "-") operation('minus');
        if (event.key == "=" || event.key == "Enter") eval();
        if (event.key == "Escape") clearScreen();
    }
})


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
    messageText(firstNum, operator);
    console.log('first ', firstNum)
}

function messageText(num, operator) {
    if (!evaluation) {
        message.textContent = '';
    }
    let sign;
    if (operator == 'plus') sign = '+';
    if (operator == 'minus') sign = '-';
    if (operator == 'div') sign = '÷';
    if (operator == 'multi') sign = 'x';
    if (operator == 'mod') sign = '%';
    if (operator == 'equal') sign = '=';
    message.textContent += `${num} ${sign} `
    
}

function addDot() {
    if (!displayValue.includes(".")) {
        if (screen.textContent === '0') populateDisplay('0.');
        else populateDisplay('.');
    } else if (operatorPressed) populateDisplay('0.');
}

function eval() {
    if (firstNum !== 0) {
    secondNum = Number(displayValue);
    messageText(secondNum, 'equal');
    console.log('second ', secondNum)
    if (evaluation == 'plus') result = firstNum + secondNum;
    if (evaluation == 'minus') result = firstNum - secondNum;
    if (evaluation == 'div') result = firstNum / secondNum;
    if (evaluation == 'multi') result = firstNum * secondNum;
    if (evaluation == 'mod') result = firstNum % secondNum;    
    
    // avoiding float hell 
    if (result < Math.pow(10, -7)) result = 0;

    // write the result and reset the evaluation process
    displayValue =  `${result.toFixed(screenLength - 2)}`;
    firstNum = 0;
    operatorPressed = true;
    evaluation = false;
    
    // check if float will fit into display
    while (displayValue.includes('.') && displayValue.length > screenLength) {
        displayValue = displayValue.slice(0, -1);
    }
    
    // we would also like to get rid of extra zero digits
    while (displayValue.includes('.') && displayValue.endsWith('0')) {
        displayValue = displayValue.slice(0, -1);     
    }

    // we don't want our dot to be the last element of the string
        if (displayValue.endsWith('.')) {
            displayValue = displayValue.slice(0, -1);
        }

    // if still too big, display error
    if (displayValue.length > screenLength || result > Math.pow(10, screenLength) - 1) {
        screen.textContent = 'ERROR'
        displayValue = '0';
    } else screen.textContent = displayValue;
    }
    console.log(result)  
}

function clearScreen() {
    screen.textContent = "0";
    displayValue = '0';
    firstNum = 0;
    secondNum = 0;
    evaluation = false;
    operatorPressed = false;
    message.textContent = '';
}

function del() {
    if (screen.textContent !== '0') {
        if (screen.textContent.length == 1) {
            displayValue = '0';
        } else displayValue = screen.textContent.slice(0, -1);
    screen.textContent = displayValue;
    }
}
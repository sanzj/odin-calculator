//Currently on getting inputs to show on the display and be stored in logic

let termOne = '';
let termTwo = '';
let operator = '';
let newPhase = true;

let display = document.querySelector('#display');
let numpad = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator')

for(let i = 0; i < numpad.length; i++){
    numpad[i].addEventListener('click', () => {
        if(newPhase){
            display.textContent = '';
            newPhase = false;
        }
        updateDisplay(numpad[i].textContent);
    });
}

for(let i = 0; i < operators.length; i++){
    operators[i].addEventListener('click', () => {
        if(!termOne && display.textContent){
            operator = operators[i].textContent;
            termOne = display.textContent;
            newPhase = true;
        }
        else if (termOne && display.textContent){
            termTwo = display.textContent;
            display.textContent = operate(operator, termOne, termTwo);
            termOne = display.textContent;
            operator = operators[i].textContent;
            termTwo = '';
            newPhase = true;
        }
    });
}

document.querySelector('#equal-btn').addEventListener('click', () => {
    if(termOne && operator && display.textContent) {
        termTwo = display.textContent;
        display.textContent = operate(operator, termOne, termTwo);
        termOne = termTwo = operator = '';
        newPhase = true;
    }
});

document.querySelector('#clear-btn').addEventListener('click', () => {
    display.textContent = ''
    termOne = termTwo = operator = '';
    newPhase = true;
});


//FUNCTION INITIALIZATIONS
function addition(first, second){
    return +first + +second;
}

function subtraction(first, second){
    return +first - +second;
}

function multiplication(first, second){
    return +first * +second;
}

function division(first, second){
    return +first / +second;
}

function operate(operation, first, second){
    switch(operation){
        case '+':
            return addition(first, second).toFixed(10);
        case '-':
            return subtraction(first, second).toFixed(10);
        case 'X':
            return multiplication(first, second).toFixed(10);
        case '/':
            return division(first, second).toFixed(10);
    }
}

function updateDisplay(character){
    display.textContent += character;
}

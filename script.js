let termOne = '';
let termTwo = '';
let operator = '';
let newPhase = true;

let display = document.querySelector('#display');
let numpad = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator')

let validNums = ['0','1','2','3','4','5','6','7','8','9']
let validOperators = ['+','-','x','/'];

//Gets rid of focus effect messing up enter and causing problems
let buttons = document.querySelectorAll('button');
for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('focus', (e) => {e.target.blur()});
}

//Keyboard Input
document.addEventListener('keydown', (e) => {
    if(validNums.indexOf(e.key) != -1){
        onNumpadClick(e);
    }
    else if(validOperators.indexOf(e.key) != -1){
        onOperatorClick(e);
    }
    else if(e.key == '.') onDecimalClick();
    else if(e.key == '=' || e.key == 'Enter') onEqualClick();
    else if(e.key == 'Backspace') onBackspaceClick();
});

//Initialize Button Events
for(let i = 0; i < numpad.length; i++){
    numpad[i].addEventListener('click', onNumpadClick);
}

for(let i = 0; i < operators.length; i++){
    operators[i].addEventListener('click', onOperatorClick);
}

document.querySelector('#decimal').addEventListener('click', onDecimalClick);

document.querySelector('#equal-btn').addEventListener('click', onEqualClick)

document.querySelector('#clear-btn').addEventListener('click', onClearClick)

document.querySelector('#backspace').addEventListener('click', onBackspaceClick)


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
            return parseFloat(addition(first, second).toFixed(10));
        case '-':
            return parseFloat(subtraction(first, second).toFixed(10));
        case 'X':
            return parseFloat(multiplication(first, second).toFixed(10));
        case '/':
            if(second == '0') return 'who made you this way';
            else return parseFloat(division(first, second).toFixed(10));
    }
}

//Misc Functions
function updateDisplay(character){
    display.textContent += character;
}

function onNumpadClick(e){
    if(newPhase){
        display.textContent = '';
        newPhase = false;
    }

    if(display.textContent.length <= 20){
        if(e instanceof MouseEvent)  updateDisplay(this.textContent);
        else updateDisplay(e.key);
    }
}

function onOperatorClick(e){
    if(!termOne && display.textContent){
        if(e instanceof MouseEvent) operator = this.textContent;
        else operator = e.key;

        termOne = display.textContent;
        newPhase = true;
    }
    else if (termOne && display.textContent){
        termTwo = display.textContent;
        display.textContent = operate(operator, termOne, termTwo);
        termOne = display.textContent;

        if(e instanceof MouseEvent) operator = this.textContent;
        else operator = e.key;
        
        termTwo = '';
        newPhase = true;
    }
}

function onDecimalClick(){
    if(!display.textContent.includes('.') && display.textContent.length <= 20) updateDisplay('.');  
}

function onEqualClick(){
    if(termOne && operator && display.textContent) {
        termTwo = display.textContent;
        display.textContent = operate(operator, termOne, termTwo);
        termOne = termTwo = operator = '';
        newPhase = true;
    }
}

function onClearClick(){
    display.textContent = ''
    termOne = termTwo = operator = '';
    newPhase = true;
}

function onBackspaceClick(){
    if(newPhase){
        onClearClick();
    }

    if(display.textContent){
        display.textContent = display.textContent.slice(0, display.textContent.length-1)
    }
}
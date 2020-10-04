//variables
let result;
let state;
let counter = 0;
//selectors
const numInput = document.querySelector("section");
const stateInput = document.querySelector(".state");
const resultInput = document.querySelector(".result");

//Event Listeners
numInput.addEventListener('click', calculate);
document.addEventListener('DOMContentLoaded', setDefault);

//Functions

function calculate(e) {

    let item = e.target;
    console.log(item);
    console.log(item.textContent);

    let targetClass = item.classList[0];
    let value;
    switch(targetClass) {
        case 'clear':
            break;
        case 'delete':
            break;
        case 'division':
            break;
        case 'multiply':
            break;
        case 'add':
            counter =1;
            break;
        case 'subtract':
            break;
        case 'dot':
            break;    
        case 'equals':
            break;
        case 'num':
            result = parseInt(item.textContent);
            setResult(result);
            break;
        default:
            break;            
    }
}

function sum() {

}

function setDefault() {
    setResult();
}

function setResult(result) {

    if(result) {
        temp = resultInput.innerHTML;
        temp = temp ? temp+result : 0;
    }
    else
        temp=0;    
    resultInput.innerHTML = temp;
}

function setState(state) {
    stateInput.innerHTML = state;
}
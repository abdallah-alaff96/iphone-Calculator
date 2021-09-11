
// NOTE: this code is totally different from the link code soultion on the website.

let runningTotal = 0; // it keeps traking the old vaule number
let buffer = "0"; // waiting for user input instanuasly
// buffer is string because the screen shows string not number
let previousOperator = null; // to trak and save the last operator such as + - * /
const screen = document.querySelector(".screen");

document.querySelector('.calc-buttons').addEventListener('click', function(event){
    buttonClick(event.target.innerText);
})

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender(); // to write pressed number into screen
}

function handleNumber(value){
    if (buffer === "0"){
        buffer = value;
    } else {
        buffer += value; // to append numbers to 7 ex. 7589 
    }
}

function handleSymbol(value){
    switch (value){
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case "=":
            if (previousOperator === null){
                return;
            }
            flushOperator(parseInt(buffer)); // it means ex. do the summation right now or (*, - or /)
            previousOperator = null;
            buffer = "" + runningTotal;  // imp: it converts runningTotal(numb) to (String) to be written in screen
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1){
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function rerender(){
    screen.innerText = buffer;
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (previousOperator === null){
        runningTotal = intBuffer;
    } else {
        flushOperator(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
}

function flushOperator(intBuffer){
    if (previousOperator === "+"){
        runningTotal += intBuffer;
    } else if (previousOperator === "-"){
        runningTotal -= intBuffer;
    } else if (previousOperator === "×"){
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}
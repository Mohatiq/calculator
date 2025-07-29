let number1 = "";
let number2 = "";
let operator = "";
let currentInput = "";
let validoperator = ['+', '=', '*', '/', '-'];
const display = document.getElementById("display");
const digitButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".op");
const clearButton = document.querySelector(".clear");
const refreshButton = document.querySelector(".restart");
const equalButton = document.querySelector(".equal");

function add(a, b) {
    return a + b;
}
function multiply(a, b) {
    return a * b;
}
function subtract(a, b) {
    return a - b;
}
function divide(a, b) {
    return b !== 0 ? a / b : "ERROR";
}
function operate(number1, number2, operator) {
    switch(operator) {
        case "+":
            return add(number1, number2);
        case "-":
            return subtract(number1, number2);
        case "*":
            return multiply(number1, number2);
        case "/":
            return divide(number1, number2);
        default:
            return "Invalid Operator";
    }
}
function clearCalculator() {
    if (currentInput.length > 0) {
        // Backspace last digit of current input
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || "";
    } else if (operator !== "") {
        // Remove operator if input is empty
        operator = "";
        display.textContent = number1 || "";
    } else if (number1.length > 0) {
        // Backspace last digit of number1
        number1 = number1.slice(0, -1);
        display.textContent = number1 || "";
    } else {
        // If everything is empty, show 0
        display.textContent = "";
    }
}

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        const digit = button.textContent;
        currentInput += digit;
        display.textContent = currentInput;
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const oper = button.textContent;
        // Only allow operator selection if there is a current input or number1 already set
        if (validoperator.includes(oper)) {
            if (currentInput === "" && number1 === "") {
                // Prevent operator on empty input (no error message)
                return;
            }
            if (number1 === "") {
                number1 = currentInput;
                operator = oper;
                display.textContent = oper;
                currentInput = "";
            } else if (currentInput !== "") {
                number2 = currentInput;
                const result = operate(Number(number1), Number(number2), operator);
                display.textContent = result;
                number1 = result.toString();
                operator = oper;
                currentInput = "";
                number2 = "";
            } else {
                operator = oper;
                display.textContent = oper;
            }
        }
    });
});

function resetCalculator() {
    number1 = "";
    number2 = "";
    operator = "";
    currentInput = "";
    display.textContent = "0";
}

clearButton.addEventListener('click', clearCalculator);
refreshButton.addEventListener('click', resetCalculator);

equalButton.addEventListener('click', () => {
    if (number1 !== "" && operator !== "" && currentInput !== "") {
        number2 = currentInput;
        const result = operate(Number(number1), Number(number2), operator);
        display.textContent = result;
        number1 = result.toString();
        currentInput = "";
        operator = "";
        number2 = "";
    } else if (number1 === "" && currentInput === "") {
        // Do nothing if everything is empty (i.e., after reset)
        return;
    } else {
        display.textContent = "Your operation is incomplete!!";
    }
});

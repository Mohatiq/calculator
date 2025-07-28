let number1="";
let number2="";
let operator="";
let currentInput="";
let validoperator=['+','=','*','/','-'];
const display=document.getElementById("display");
const digitButtons=document.querySelectorAll(".num");
const operatorButtons=document.querySelectorAll(".op");
const clearButton=document.querySelector(".clear");
const refreshButton=document.querySelector(".restart");
const equalButton=document.querySelector(".equal");

function add(a,b){
    return a+b;
};
function multiply(a,b){
    return a*b;
};
function substruct(a,b){
    return a-b;
};
function divide(a,b){
    return b !==0?a/b:"ERROR";
};
function operate(number1,number2,operator){
    switch(operator){
        case "+":
            return add(number1,number2);
        case "-":
            return substruct(number1,number2);
        case "*":
            return multiply(number1,number2);
        case "/":
            return divide(number1,number2);
        default:
            return "Invalid Operator";
    }
};
digitButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        const digit=button.textContent;
        currentInput+=digit;
        display.textContent=currentInput;
    });
});
operatorButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        const oper=button.textContent;
        if (validoperator.includes(oper)) {
            if (number1 === "") {
                operator = oper;
                display.textContent = oper;
                number1 = currentInput;
                currentInput = "";
            } else if (currentInput !== "") {
                number2 = currentInput;
                const result = operate(Number(number1), Number(number2), operator);
                display.textContent = result;
                number1 = result.toString();
                operator = oper;
                currentInput = "";
            } else {
                operator = oper;
                display.textContent = oper;
            }
        } else {
            display.textContent = "PLEASE INSERT AN OPERATOR";
        }
    });
});

clearButton.addEventListener('click',()=>{display.textContent="0";});
refreshButton.addEventListener('click',()=>{display.textContent="0";});
equalButton.addEventListener('click',()=>{
    if(number1!=="" && operator!=="" && currentInput!==""){
        number2=currentInput;
        const result=operate(Number(number1),Number(number2),operator);
        display.textContent=result;
        // reset for the next calculation by keeping the result value in number1 
        number1=result.toString();
        currentInput="";
        operator="";
    }else{
        display.textContent="Your operation is incomplete!!";
    };
});
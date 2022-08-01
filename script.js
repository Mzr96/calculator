"use strict";

let inputs = {};
let isEraserOn = false;

const btnEqual = document.querySelector(".equal");
const btnClear = document.querySelector(".clear");
const display = document.querySelector(".display");
const btnDecimalPoint = document.querySelector(".decimal");
const btnDigits = Array.from(document.querySelectorAll(".digit"));
const btnOperators = Array.from(document.querySelectorAll(".operator"));

const add = function (num1, num2) {
  return num1 + num2;
};

const subtract = function (num1, num2) {
  return num1 - num2;
};

const multiply = function (num1, num2) {
  return num1 * num2;
};

const divide = function (num1, num2) {
  return num1 / num2;
};

const operate = function (operator, num1, num2) {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "÷") {
    return divide(num1, num2);
  } else if (operator === "×") {
    return multiply(num1, num2);
  }
};

const calculate = function () {
  inputs.sNumber = Number(display.textContent);
  console.table(inputs);
  const result = operate(inputs.operator, inputs.fNumber, inputs.sNumber);
  display.textContent = Math.round(result * 100) / 100;
  inputs = {};
};

const pushDigit = function (e) {
  console.log(e);
  if (isEraserOn) {
    display.textContent = this ? this.textContent : e.key;
    isEraserOn = false;
  } else {
    display.textContent += this ? this.textContent : e.key;
  }
};

const pushOperator = function (e) {
  console.log(e);
  isEraserOn = true;
  if (!inputs.sNumber && inputs.fNumber && display.textContent) {
    calculate();
    inputs.fNumber = Number(display.textContent);
  } else if (!inputs.fNumber && display.textContent) {
    inputs.fNumber = Number(display.textContent);
  }
  // This part is for keyboar functionality.
  inputs.operator = this ? this.textContent : e.key;
  if (!this && e.key === "/") inputs.operator = "÷";
  if (!this && e.key === "*") inputs.operator = "×";
};

const pushEqual = function () {
  if (inputs.fNumber && inputs.operator) {
    isEraserOn = true;
    calculate();
  }
};

const pushDecimalPoint = function () {
  if (display.textContent.indexOf(".") === -1) {
    if (isEraserOn) {
      display.textContent = "0.";
      isEraserOn = false;
    } else {
      display.textContent += ".";
    }
  } else if (isEraserOn) {
    display.textContent = "0.";
    isEraserOn = false;
  }
};

const pushClear = function () {
  inputs = {};
  display.textContent = "";
  isEraserOn = false;
};

const pushBackspace = function () {
  if (display.textContent) {
    display.textContent = display.textContent.slice(0, -1);
  }
};

btnDigits.forEach((btnDigit) => btnDigit.addEventListener("click", pushDigit));
btnOperators.forEach((btnOperator) =>
  btnOperator.addEventListener("click", pushOperator)
);
btnEqual.addEventListener("click", pushEqual);
btnDecimalPoint.addEventListener("click", pushDecimalPoint);
btnClear.addEventListener("click", pushClear);

// Add keyboard
window.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key >= 0 && e.key <= 9) {
    pushDigit(e);
  } else if (e.key === ".") {
    pushDecimalPoint();
  } else if (e.key === "=" || e.key === "Enter") {
    if (inputs.fNumber && inputs.operator) {
      pushEqual();
    }
  } else if (e.key === "+" || e.key === "-") {
    pushOperator(e);
  } else if (e.key === "/" || e.key === "*") {
    pushOperator(e);
  } else if (e.key === "Backspace") {
    pushBackspace();
  }
});

// List of bugs
// 1. Start number by zero!
// 2. Can not change the operator after first assign.
// 3. Backspace work for result.
// 4. Not appropriate result for dividing by 0.

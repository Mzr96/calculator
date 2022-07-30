"use strict";

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const divide = (num1, num2) => num1 / num2;
const multiply = (num1, num2) => num1 * num2;
const inputs = {};
const display = document.querySelector(".display");
const btnDigits = Array.from(document.querySelectorAll(".digit"));
const btnOperators = Array.from(document.querySelectorAll(".operator"));
const btnEqual = document.querySelector(".equal");

btnDigits.forEach((btnDigit) =>
  btnDigit.addEventListener("click", function () {
    display.textContent += btnDigit.textContent;
  })
);

btnOperators.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    const numberOnDisplay = Number(display.textContent);
    const operator = e.target.textContent;
    inputs.fNumber = numberOnDisplay;
    inputs.operator = operator;
    display.textContent = "";
  })
);

btnEqual.addEventListener("click", function () {
  const numberOnDisplay = Number(display.textContent);
  inputs.sNumber = numberOnDisplay;
  console.log(inputs);
  const result = operate(inputs.operator, inputs.fNumber, inputs.sNumber);
  console.log(result);
  display.textContent = result;
});

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

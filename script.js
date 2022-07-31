"use strict";

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const divide = (num1, num2) => num1 / num2;
const multiply = (num1, num2) => num1 * num2;
let inputs = {};
let isEraserOn = false;
const display = document.querySelector(".display");
const btnDigits = Array.from(document.querySelectorAll(".digit"));
const btnOperators = Array.from(document.querySelectorAll(".operator"));
const btnEqual = document.querySelector(".equal");
const btnClear = document.querySelector(".clear");
const btnDecimalPoint = document.querySelector(".decimal");

btnClear.addEventListener("click", function () {
  reset();
});

btnDecimalPoint.addEventListener("click", function () {
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
});
// Add keyboar

btnDigits.forEach((btnDigit) =>
  btnDigit.addEventListener("click", function () {
    if (isEraserOn) {
      display.textContent = btnDigit.textContent;
      isEraserOn = false;
    } else {
      display.textContent += btnDigit.textContent;
    }
  })
);

// Add keyboard
window.addEventListener("keypress", function (e) {
  console.log(e.key);
  if (e.key >= 0 && e.key <= 9) {
    if (isEraserOn) {
      display.textContent = e.key;
      isEraserOn = false;
    } else {
      display.textContent += e.key;
    }
  } else if (e.key === ".") {
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
  } else if (e.key === "=" || e.key === "Enter") {
    if (inputs.fNumber && inputs.operator) {
      e.preventDefault();
      isEraserOn = true;
      calc();
    }
  } else if (e.key === "+" || e.key === "-") {
    isEraserOn = true;
    if (!inputs.sNumber && inputs.fNumber && display.textContent) {
      calc();
      inputs.fNumber = Number(display.textContent);
    } else if (!inputs.fNumber && display.textContent) {
      inputs.fNumber = Number(display.textContent);
    }
    inputs.operator = e.key;
  } else if (e.key === "/" || e.key === "*") {
    isEraserOn = true;
    if (!inputs.sNumber && inputs.fNumber && display.textContent) {
      calc();
      inputs.fNumber = Number(display.textContent);
    } else if (!inputs.fNumber && display.textContent) {
      inputs.fNumber = Number(display.textContent);
    }
    inputs.operator = e.key === "/" ? "÷" : "×";
  }
});

btnOperators.forEach((btnOperator) =>
  btnOperator.addEventListener("click", function (e) {
    isEraserOn = true;
    if (!inputs.sNumber && inputs.fNumber && display.textContent) {
      calc();
      inputs.fNumber = Number(display.textContent);
    } else if (!inputs.fNumber && display.textContent) {
      inputs.fNumber = Number(display.textContent);
    }
    inputs.operator = e.target.textContent;
  })
);

btnEqual.addEventListener("click", function () {
  if (inputs.fNumber && inputs.operator) {
    isEraserOn = true;
    calc();
  }
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

const calc = function () {
  inputs.sNumber = Number(display.textContent);
  console.table(inputs);
  const result = operate(inputs.operator, inputs.fNumber, inputs.sNumber);
  display.textContent = Math.round(result * 100) / 100;
  inputs = {};
};

const reset = function () {
  inputs = {};
  display.textContent = "";
  isEraserOn = false;
};

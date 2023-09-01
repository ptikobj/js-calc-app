let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value) {
  console.log(value);
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = "0";
  console.log(runningTotal);
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "-":
      runningTotal -= intBuffer;
      break;
    case "÷":
      runningTotal /= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      console.log("clear");
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      console.log("equals");
      if (previousOperator === null) {
        // need two numbers to do the math operation
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      console.log("back arrow");
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        // buffer = buffer.substring(0, buffer.length - 1);
        buffer = buffer.slice(0, 1);
      }
      break;
    case "+":
    case "-":
    case "÷":
    case "×":
      console.log("symbol");
      handleMath(symbol);
      break;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() {
  console.log("hello");
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}
init();

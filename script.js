class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }

  clear() {
    this.currentOperation = "";
    this.previousOperation = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperation.includes(".")) return;
    this.currentOperation =
      this.currentOperation.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperation === "") return;
    if (this.previousOperation !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperation = this.currentOperation;
    this.currentOperation = "";
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousOperation);
    const current = parseFloat(this.currentOperation);
    if (isNaN(prev) || isNaN(current)) return;
    if (this.operation === "+") result = prev + current;
    if (this.operation === "-") result = prev - current;
    if (this.operation === "x") result = prev * current;
    if (this.operation === "÷") result = prev / current;
    if (this.operation === "%") result = prev % current;
    this.currentOperation = result;
    this.operation = undefined;
    this.previousOperation = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
    // ********* Below is a naive broken approach *****
    // const floatNumber = parseFloat(number)
    // if (isNaN(floatNumber)) return '';
    // return floatNumber.toLocaleString('en');
  }

  updateDisplay() {
    this.currentTextElement.innerText = this.getDisplayNumber(
      this.currentOperation
    );
    this.previousTextElement.innerText = this.previousOperation;
    if (this.operation != null) {
      this.previousTextElement.innerText = `${this.getDisplayNumber(this.previousOperation)} ${this.operation}`;
    } else {
      this.previousTextElement.innerText = ''
    }
  }
}

const symbols = document.querySelectorAll("[symbol]");
const numbers = document.querySelectorAll("[number]");
const equals = document.querySelector("[equals]");
const previousTextElement = document.querySelector("[previous]");
const currentTextElement = document.querySelector("[current]");
const allClear = document.querySelector("[AC]");
const deleteBtn = document.querySelector("[DEL]");

const calculator = new Calculator(previousTextElement, currentTextElement);

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText);
    calculator.updateDisplay();
  });
});

symbols.forEach((symbol) => {
  symbol.addEventListener("click", () => {
    calculator.chooseOperation(symbol.innerText);
    calculator.updateDisplay();
  });
});

equals.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClear.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

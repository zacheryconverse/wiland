class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement
    this.currentTextElement = currentTextElement
    this.clear();
  }

  clear() {
    this.currentOperation = '';
    this.previousOperation = '';
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperation.includes('.')) return;
    this.currentOperation = this.currentOperation.toString() + number.toString();
  }

  chooseOperation(operation) {
    this.operation = operation;
    this.previousOperation = this.currentOperation
    this.currentOperation = ''
  }

  compute() {

  }

  updateDisplay() {
    this.currentTextElement.innerText = this.currentOperation
    this.previousTextElement.innerText = this.previousOperation
  }

}

const symbols = document.querySelectorAll('[symbol]');
const numbers = document.querySelectorAll('[number]');
const equals = document.getElementsByClassName('equals');
const previousTextElement = document.querySelector('[data-previous]');
const currentTextElement = document.querySelector('[data-current]');

// set initial 'to be calculated' state to empty string
// set calculated state to empty string
// update state onChange

const calculator = new Calculator(previousTextElement, currentTextElement);

numbers.forEach(number => {
  number.addEventListener('click', () => {
    calculator.appendNumber(number.innerText);
    calculator.updateDisplay();
  });
});

symbols.forEach(symbol => {
  symbol.addEventListener('click', () => {
    calculator.chooseOperation(symbol.innerText);
    calculator.updateDisplay();
  });
});

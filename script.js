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
    if (this.currentOperation === '') return;
    if (this.previousOperation !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperation = this.currentOperation
    this.currentOperation = ''
  }

  compute() {
    let result
    const prev = parseFloat(this.previousOperation)
    const current = parseFloat(this.currentOperation)
    if (isNaN(prev) || isNaN(current)) return;
    if (this.operation === '+') result = prev + current;
    if (this.operation === '-') result = prev - current;
    if (this.operation === 'x') result = prev * current;
    if (this.operation === '÷') result = prev / current;
    if (this.operation === '%') result = prev % current;
    this.currentOperation = result;
    this.operation = undefined;
    this.previousOperation = ''
  }

  updateDisplay() {
    this.currentTextElement.innerText = this.currentOperation
    this.previousTextElement.innerText = this.previousOperation
  }

}

const symbols = document.querySelectorAll('[symbol]');
const numbers = document.querySelectorAll('[number]');
const equals = document.querySelector('[equals]');
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

equals.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

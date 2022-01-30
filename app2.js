class Calculator {
  constructor(currentOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    console.log(prev);
    console.log(current);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case 'X':
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';

  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    const floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) return '';
    return floatNumber.toLocaleString('en');
  }
}

const numberKeys = document.querySelectorAll("[data-number]");
const operationKeys = document.querySelectorAll("[data-operation]");
const resetKey = document.querySelector("[data-reset]");
const deleteKey = document.querySelector("[data-delete]");
const equalsKey = document.querySelector("[data-equals]");
const screen = document.querySelector(".screen");

const calculator = new Calculator(screen);

numberKeys.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationKeys.forEach(button => {
  button.addEventListener('click', () => {
    console.log(button.innerText);
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsKey.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})

deleteKey.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})

resetKey.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

const nums = document.querySelectorAll('.num');
const output = document.getElementsByName('output')[0];
const clear = document.querySelector('.clear');
const operators = document.querySelectorAll('.operator');
const result = document.querySelector('.result');
const backspace = document.querySelector('.backspace');
const dot = document.querySelector('.dot');
const historyContainer = document.querySelector('.history');

let operatorCheck = false;
let dotCheck = false;

nums.forEach((num) => {
  num.addEventListener('click', () => {
    output.value += num.value;
    operatorCheck = false;
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    if (!operatorCheck) {
      output.value += operator.value;
      operatorCheck = true;
      dotCheck = false;
    }
    output.value = output.value.slice(0, -1) + operator.value;
  });
});

result.addEventListener('click', () => {
  try {
    const calculation = output.value;
    let evaluatedValue = eval(output.value);

    if (!Number.isInteger(evaluatedValue)) {
      evaluatedValue = parseFloat(evaluatedValue.toFixed(2));
    }

    output.value = evaluatedValue;

    const historyItem = document.createElement('div');
    historyItem.textContent = `${calculation} = ${output.value}`;
    historyContainer.appendChild(historyItem);

    dotCheck = output.value.includes('.');
  } catch (error) {
    output.value = 'Error, Try it again';
    setTimeout(() => {
      clear.click();
    }, 3000);
  }
});

dot.addEventListener('click', () => {
  if (!dotCheck) {
    output.value += '.';
    dotCheck = true;
  }
});

backspace.addEventListener('click', () => {
  const lastChar = output.value.slice(-1);
  output.value = output.value.slice(0, -1);
  if (lastChar === '.') {
    dotCheck = false;
  }
  if (['+', '-', '*', '/'].includes(lastChar)) {
    operatorCheck = false;
  }
});

clear.addEventListener('click', () => {
  output.value = '';
  operatorCheck = false;
  dotCheck = false;
  output.focus();
});

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key >= '0' && key <= '9') {
    output.value += key;
    operatorCheck = false;
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    if (!operatorCheck) {
      output.value += key;
      operatorCheck = true;
      dotCheck = false;
    }
  } else if (key === 'Enter') {
    result.click();
  } else if (key === 'Backspace') {
    backspace.click();
  } else if (key === '.') {
    if (!dotCheck) {
      output.value += '.';
      dotCheck = true;
    }
  } else if (key === 'Escape' || key === 'Delete') {
    clear.click();
  }
});

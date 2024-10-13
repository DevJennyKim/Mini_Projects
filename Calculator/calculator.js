const nums = document.querySelectorAll('.num');
const output = document.getElementsByName('output')[0];
const clear = document.querySelector('.clear');
const operators = document.querySelectorAll('.operator');
const result = document.querySelector('.result');

let operatorCheck = false;

nums.forEach((num) => {
  num.addEventListener('click', () => {
    output.value += num.value;
    operatorCheck = false;
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    if (!operatorCheck) {
      if (operator.value === 'x') {
        output.value += '*';
      } else {
        output.value += operator.value;
      }
      operatorCheck = true;
    } else {
      output.value = output.value.slice(0, -1) + operator.value;
    }
  });
});

result.addEventListener('click', () => {
  try {
    output.value = eval(output.value);
  } catch (error) {
    output.value = 'Error';
  }
});

clear.addEventListener('click', () => {
  output.value = '';
  operatorCheck = false;
});

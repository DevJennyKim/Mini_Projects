const submitBtn = document.querySelector('#submitBtn');
const wordleDiv = document.querySelector('.wordle_game');

const fiveLetterWords = [
  'apple',
  'bread',
  'candy',
  'dance',
  'earth',
  'flute',
  'grape',
  'house',
  'igloo',
  'joker',
  'knife',
  'lemon',
  'money',
  'noble',
  'ocean',
  'pearl',
  'quiet',
  'river',
  'sheep',
  'tiger',
  'umbra',
  'vivid',
  'water',
  'xenon',
  'yacht',
  'zebra',
  'beach',
  'cloud',
  'dream',
  'eagle',
  'faith',
  'gamer',
  'heart',
  'index',
  'jolly',
  'knack',
  'laser',
  'mango',
  'noted',
  'olive',
  'plant',
  'quest',
  'robin',
  'scale',
  'trust',
  'unity',
  'valve',
  'whale',
  'youth',
  'zesty',
  'amber',
  'brave',
  'charm',
  'doubt',
  'elbow',
  'frown',
  'globe',
  'honor',
  'ideal',
  'jewel',
  'kneel',
  'laser',
  'mocha',
  'naval',
  'oasis',
  'peace',
  'query',
  'radio',
  'salad',
  'train',
  'upset',
  'voter',
];

const answer =
  fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];

console.log(answer);
let win = false;
let count = 0;
const maxCount = 6;

let input = document.querySelectorAll('.input');
function keyEvent() {
  input.forEach((eachInput, index) => {
    eachInput.addEventListener('keydown', (event) => {
      if (event.key !== 'Backspace' && event.key.length === 1) {
        if (eachInput.value) {
          if (index < input.length - 1) {
            eachInput.nextElementSibling.focus();
          }
        }
      }

      if (event.key === 'Enter') {
        if (index < input.length - 1) {
          eachInput.nextElementSibling.focus();
        }
      }

      if (event.key === 'Backspace') {
        if (!eachInput.value && eachInput.previousElementSibling) {
          eachInput.previousElementSibling.focus();
        }
      }
    });
  });
}

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (win) return;

  let currentValue = '';
  let enterAll = true;

  for (let i = 0; i < input.length; i++) {
    currentValue += input[i].value;

    if (!input[i].value) {
      enterAll = false;
      alert('Please enter more.');
      return;
    }
  }

  for (let i = 0; i < input.length; i++) {
    if (input[i].value == answer[i]) {
      input[i].style.background = '#71aa61';
      input[i].style.color = 'white';
      input[i].style.fontWeight = 'bold';
      input[i].style.border = `2px solid #71aa61`;
    } else if (answer.includes(input[i].value)) {
      input[i].style.background = '#c6b451';
      input[i].style.color = 'white';
      input[i].style.fontWeight = 'bold';
      input[i].style.border = `2px solid #c6b451`;
    } else {
      input[i].style.background = 'lightgrey';

      input[i].style.color = 'white';
      input[i].style.fontWeight = 'bold';
      input[i].style.border = `2px solid lightgrey`;
    }
    input[i].classList.remove('input');
  }

  count++;
  if (count === maxCount) {
    alert(`You Lose! The answer is ${answer}!`);
    return;
  }

  if (currentValue === answer) {
    win = true;
    alert('Congratulations!! You Win!!');
    return;
  } else {
    const newDiv = document.createElement('div');
    newDiv.classList.add('input_container');

    for (let i = 0; i < 5; i++) {
      const newInput = document.createElement('input');
      newInput.classList.add('input');
      newInput.setAttribute('maxlength', '1');
      newDiv.appendChild(newInput);
    }

    const newHiddenBtn = document.createElement('button');
    newHiddenBtn.classList.add('hidden');
    newDiv.appendChild(newHiddenBtn);
    wordleDiv.appendChild(newDiv);
    input = document.querySelectorAll('.input');
    keyEvent();
  }
});

keyEvent();

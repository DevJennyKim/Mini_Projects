const submitBtn = document.querySelector('#submitBtn');
const wordleDiv = document.querySelector('.wordle_game');
const apiURL =
  'https://www.dictionaryapi.com/api/v3/references/sd2/json/school?key=eeadc88f-3228-4551-8165-d3ee0929bcae';

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
submitBtn.addEventListener('click', () => {
  /*
   * 1)check the order = green
   * 2)if the order is not right = yellow
   * 3)if nothing right = gray
   */
  let input = document.querySelectorAll('.input');
  for (let i = 0; i < input.length; i++) {
    if (input[i].value == answer[i]) {
      input[i].style.background = 'green';
    } else if (answer.includes(input[i].value)) {
      input[i].style.background = 'yellow';
    } else {
      input[i].style.background = 'lightgrey';
    }
    input[i].classList.remove('input');
  }

  const newDiv = document.createElement('div');
  newDiv.classList.add('input_container');
  wordleDiv.appendChild(newDiv);

  for (let i = 0; i < 5; i++) {
    const newInput = document.createElement('input');
    newInput.classList.add('input');
    newDiv.appendChild(newInput);
  }
});

import { quizApi } from './trivia_api.js';

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.answers = [];
  }

  incrementScore(amount) {
    this.score += amount;
  }
}
const questionDiv = document.querySelector('.question');

function renderQuiz(question, index) {
  questionDiv.innerHTML = '';
  const quizNumber = document.createElement('h2');
  quizNumber.classList.add('question__title');
  quizNumber.innerText = `Question ${index}`;
  questionDiv.appendChild(quizNumber);
  const quizQuestion = document.createElement('div');
  quizQuestion.classList.add('question__quiz');

  quizQuestion.innerText = decode(question.question);
  questionDiv.appendChild(quizQuestion);
}

function decode(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

class Game {
  constructor() {
    this.questions = [];
    this.currentQuestion = null;
    this.currentRound = 0;
    this.players = [new Player('Player 1'), new Player('Player 2')];
    this.generator = null;
    this.keydownHandler = this.keydownHandler.bind(this);
  }

  keydownHandler() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'w') {
        this.players[0].answers.length < this.currentRound &&
          this.players[0].answers.push('True');
      } else if (e.key === 's') {
        this.players[0].answers.length < this.currentRound &&
          this.players[0].answers.push('False');
      } else if (e.key === 'ArrowUp') {
        this.players[1].answers.length < this.currentRound &&
          this.players[1].answers.push('True');
      } else if (e.key === 'ArrowDown') {
        this.players[1].answers.length < this.currentRound &&
          this.players[1].answers.push('False');
      }
    });
  }

  async fetchQuestions() {
    const questions = await quizApi.getQuizzes();
    this.questions = questions.results;
    return this.questions;
  }

  *questionGenerator(questions) {
    for (let i = 0; i < questions.length; i++) {
      yield questions[i];
    }
  }

  getNextQuestion() {
    this.currentQuestion = this.generator.next();
    let currentTime = 10;
    document.querySelector('.time').innerHTML = 'Time: ' + currentTime;

    const timer = setInterval(() => {
      document.querySelector('.time').innerText = 'Time: ' + currentTime;
      currentTime--;
    }, 1000);

    if (!this.currentQuestion.done) {
      this.currentRound++;
      renderQuiz(this.currentQuestion.value, this.currentRound);
      setTimeout(() => {
        if (this.players[0].answers.length < this.currentRound) {
          this.players[0].answers.push(null);
        }
        if (this.players[1].answers.length < this.currentRound) {
          this.players[1].answers.push(null);
        }
        this.updateScores();
        this.getNextQuestion();
        clearInterval(timer);
      }, 12000);
    } else {
      clearInterval(timer);
      window.removeEventListener('keydown', this.keydownHandler);
      this.updateScores();
      const scores = document.querySelector('.scores');
      scores.style.display = 'block';
      const player1Scoreboard = document.querySelector('.player1__score');
      player1Scoreboard.innerText = `Player 1: ${this.players[0].score}`;
      const player2Scoreboard = document.querySelector('.player2__score');
      player2Scoreboard.innerText = `Player 2: ${this.players[1].score}`;
    }
  }

  async startGame() {
    this.questions = await this.fetchQuestions();
    this.generator = this.questionGenerator(this.questions);
    this.generateScoreTracker(this.questions.length);
    this.getNextQuestion();
    window.addEventListener('keydown', this.keydownHandler);
  }

  updateScores() {
    let player1Score = 0;
    let player2Score = 0;
    for (let i = 0; i < this.players[0].answers.length; i++) {
      if (this.players[0].answers[i] === this.questions[i].correct_answer) {
        player1Score++;
      }
      if (this.players[1].answers[i] === this.questions[i].correct_answer) {
        player2Score++;
      }
    }
    this.players[0].score = player1Score;
    this.players[1].score = player2Score;
    this.updateP1ScoreTracker(this.players[0].answers);
    this.updateP2ScoreTracker(this.players[1].answers);
  }

  generateScoreTracker(n) {
    const p1ScoreTracker = document.querySelector('.p1ScoreTracker');
    const p2ScoreTracker = document.querySelector('.p2ScoreTracker');
    for (let i = 0; i < n; i++) {
      const p1ScoreBox = document.createElement('li');
      p1ScoreTracker.appendChild(p1ScoreBox);
      const p2ScoreBox = document.createElement('li');
      p2ScoreTracker.appendChild(p2ScoreBox);
    }
  }

  updateP1ScoreTracker(answers) {
    for (let i = 0; i < answers.length; i++) {
      const scoreTrackerBox = document.querySelector(
        `.p1ScoreTracker :nth-child(${i + 1})`
      );
      console.log(scoreTrackerBox);
      scoreTrackerBox.innerText = answers[i] ? '✅' : '❌';
    }
  }

  updateP2ScoreTracker(answers) {
    for (let i = 0; i < answers.length; i++) {
      const scoreTrackerBox = document.querySelector(
        `.p2ScoreTracker :nth-child(${i + 1})`
      );
      console.log('player answer: ', answers[i]);
      console.log('correct answer: ', this.questions[i].correct_answer);
      scoreTrackerBox.innerText =
        answers[i] === this.questions[i].correct_answer ? '✅' : '❌';
    }
  }
}

const game = new Game();
game.startGame();

export { game };

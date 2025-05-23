const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  {
    question: "What is the capital of France?",
    options: ["1. Paris", "2. Rome", "3. Madrid", "4. Berlin"],
    answer: 1
  },
  {
    question: "Which language runs in a web browser?",
    options: ["1. Java", "2. C", "3. Python", "4. JavaScript"],
    answer: 4
  },
  {
    question: "How many continents are there on Earth?",
    options: ["1. 5", "2. 6", "3. 7", "4. 8"],
    answer: 3
  }
];

let score = 0;
let currentQuestion = 0;
const gameDuration = 30000; // 30 seconds
let gameTimer;

function startGame() {
  console.log("🎉 Welcome to the Trivia Game!");
  console.log(`⏱️ You have ${gameDuration / 1000} seconds to answer all questions.`);
  console.log("Let's begin!\n");

  gameTimer = setTimeout(() => {
    console.log("\n⏰ Time's up!");
    endGame();
  }, gameDuration);

  askQuestion();
}

function askQuestion() {
  if (currentQuestion >= questions.length) {
    clearTimeout(gameTimer);
    return endGame();
  }

  const q = questions[currentQuestion];
  console.log(`\n${q.question}`);
  q.options.forEach(option => console.log(option));

  rl.question("Your answer (1-4): ", (input) => {
    validateAnswer(input);
  });
}

function validateAnswer(input) {
  const answer = parseInt(input);
  const correct = questions[currentQuestion].answer;

  if (answer === correct) {
    console.log("✅ Correct!");
    score++;
  } else {
    console.log(`❌ Incorrect. The correct answer was ${correct}.`);
  }

  currentQuestion++;
  askQuestion();
}

function endGame() {
  console.log(`\n🎮 Game Over! Your score: ${score} out of ${questions.length}`);
  rl.close();
}

startGame();

const targetTextEl = document.getElementById("target-text");
const inputEl = document.getElementById("input-text");
const timerEl = document.getElementById("timer");
const resultBox = document.getElementById("result");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const errorsEl = document.getElementById("errors");
const timeTakenEl = document.getElementById("time-taken");

const sampleTexts = [
  "Practice makes perfect, so keep typing every day to get better and faster.",
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "Typing is a skill that improves with consistent practice and effort.",
  "JavaScript allows you to create dynamic and interactive web pages easily."
];

let currentText = "";
let timer;
let timeLeft = 60;
let timeUsed = 0;
let isStarted = false;

function setRandomText() {
  const randomIndex = Math.floor(Math.random() * sampleTexts.length);
  currentText = sampleTexts[randomIndex];
  targetTextEl.textContent = currentText;
  inputEl.disabled = false;
  inputEl.focus();
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timeUsed++;
      timerEl.textContent = timeLeft;
    } else {
      clearInterval(timer);
      submitTest(); // auto submit when time is over
    }
  }, 1000);
}

inputEl.addEventListener("input", () => {
  if (!isStarted) {
    isStarted = true;
    startTimer();
  }
});

function submitTest() {
  clearInterval(timer);
  inputEl.disabled = true;

  const userInput = inputEl.value.trim();
  const words = userInput.split(/\s+/).filter(Boolean);
  const totalWords = words.length;
  const totalChars = userInput.length;

  let correctChars = 0;
  let errors = 0;

  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === currentText[i]) {
      correctChars++;
    } else {
      errors++;
    }
  }

  const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
  const wpm = timeUsed > 0 ? Math.round((totalWords / timeUsed) * 60) : 0;

  // show results
  resultBox.classList.remove("hidden");
  timeTakenEl.textContent = timeUsed;
  wpmEl.textContent = wpm;
  accuracyEl.textContent = accuracy;
  errorsEl.textContent = errors;
}

function restartTest() {
  clearInterval(timer);
  timeLeft = 60;
  timeUsed = 0;
  isStarted = false;

  inputEl.value = "";
  inputEl.disabled = true;
  timerEl.textContent = timeLeft;
  resultBox.classList.add("hidden");

  setRandomText();
}

window.onload = () => {
  setRandomText();
};

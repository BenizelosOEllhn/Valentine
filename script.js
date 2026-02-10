const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const prompt = document.getElementById("prompt");
const answer = document.getElementById("answer");
const valentineYes = document.getElementById("valentineYes");

const phrases = [
  "Nice try...",
  "Are you sure?",
  "Nope button is shy.",
  "That button is enchanted.",
  "I dare you to say yes.",
];

let dodgeCount = 0;

const spawnHeart = () => {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.style.left = `${Math.random() * 80 + 10}%`;
  heart.style.bottom = "20px";
  document.body.appendChild(heart);
  window.setTimeout(() => heart.remove(), 2600);
};

const showPrompt = () => {
  prompt.hidden = false;
  answer.hidden = true;
};

const showAnswer = () => {
  answer.hidden = false;
  prompt.hidden = true;
  spawnHeart();
  window.setTimeout(spawnHeart, 400);
  window.setTimeout(spawnHeart, 800);
};

const moveNoButton = () => {
  dodgeCount += 1;
  const card = document.querySelector(".card");
  const bounds = card.getBoundingClientRect();
  const padding = 12;
  const maxX = bounds.width - noButton.offsetWidth - padding * 2;
  const maxY = bounds.height - noButton.offsetHeight - padding * 2;
  const nextX = Math.max(padding, Math.random() * maxX);
  const nextY = Math.max(padding, Math.random() * maxY);

  noButton.classList.add("fleeing");
  noButton.style.transform = `translate(${nextX}px, ${nextY}px)`;
  noButton.textContent = phrases[dodgeCount % phrases.length];

  if (dodgeCount > 2) {
    showPrompt();
  }
};

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("click", moveNoButton);

yesButton.addEventListener("click", () => {
  showPrompt();
  showAnswer();
});

valentineYes.addEventListener("click", showAnswer);

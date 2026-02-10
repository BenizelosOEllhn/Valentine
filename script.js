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
let audioContext;

const spawnHeart = () => {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.style.left = `${Math.random() * 80 + 10}%`;
  heart.style.bottom = "20px";
  document.body.appendChild(heart);
  window.setTimeout(() => heart.remove(), 2600);
};

const spawnSparkle = (x, y) => {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle-trail";
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  document.body.appendChild(sparkle);
  window.setTimeout(() => sparkle.remove(), 1000);
};

const spawnConfetti = () => {
  const colors = ["#e4566c", "#e2483b", "#f7c44c", "#2c7da0", "#f6b1c0"];
  const burstCount = 18;
  for (let i = 0; i < burstCount; i += 1) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    const left = Math.random() * (window.innerWidth - 20) + 10;
    const top = Math.random() * 120 + 10;
    const hue = colors[i % colors.length];
    confetti.style.left = `${left}px`;
    confetti.style.top = `${top}px`;
    confetti.style.background = hue;
    confetti.style.animationDelay = `${Math.random() * 0.4}s`;
    document.body.appendChild(confetti);
    window.setTimeout(() => confetti.remove(), 2000);
  }
};

const playDodgeSound = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(520 + Math.random() * 120, now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.2);
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
  spawnConfetti();
};

const moveNoButton = () => {
  dodgeCount += 1;
  const padding = 16;
  const maxX = Math.max(
    padding,
    window.innerWidth - noButton.offsetWidth - padding
  );
  const maxY = Math.max(
    padding,
    window.innerHeight - noButton.offsetHeight - padding
  );
  const nextX = Math.random() * (maxX - padding) + padding;
  const nextY = Math.random() * (maxY - padding) + padding;

  noButton.classList.remove("fleeing");
  void noButton.offsetWidth;
  noButton.classList.add("fleeing");
  noButton.style.position = "fixed";
  noButton.style.left = `${nextX}px`;
  noButton.style.top = `${nextY}px`;
  noButton.style.transform = "translate(0, 0)";
  noButton.textContent = phrases[dodgeCount % phrases.length];

  playDodgeSound();
  const centerX = nextX + noButton.offsetWidth / 2;
  const centerY = nextY + noButton.offsetHeight / 2;
  for (let i = 0; i < 3; i += 1) {
    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = (Math.random() - 0.5) * 40;
    spawnSparkle(centerX + offsetX, centerY + offsetY);
  }

  if (dodgeCount > 1) {
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

// Script controlling the Valentine Week interaction

// Define each day of Valentine Week with a title, question, and sweet message.
// The final step includes a special flag so we know when to show the overlay
// and celebration effects.
const steps = [
  {
    title: 'Rose Day',
    question: 'Divu, did I give you a rose on Rose Day?',
    message: 'Because you deserve all the roses in the world! 🌹',
  },
  {
    title: 'Propose Day',
    question: 'Divu, did I pour my heart out on Propose Day?',
    message: 'My heart belongs to you forever.',
  },
  {
    title: 'Chocolate Day',
    question: 'Divu, did I sweeten your day with chocolates?',
    message: 'Every moment with you is as sweet as chocolate.',
  },
  {
    title: 'Teddy Day',
    question: 'Divu, did I gift you a cuddly teddy?',
    message: 'So you always have a hug whenever you need one.',
  },
  {
    title: 'Promise Day',
    question: 'Divu, did I make promises to always be there?',
    message: 'Promises of love, trust, and endless support.',
  },
  {
    title: 'Hug Day',
    question: 'Divu, did I hug you tightly on Hug Day?',
    message: 'Your hugs are my safe place.',
  },
  {
    title: 'Kiss Day',
    question: 'Divu, did I seal our love with a kiss?',
    message: 'Every kiss with you is magical.',
  },
  {
    title: "Valentine's Day",
    question: 'Divu, will you be my Valentine?',
    message: 'I love you more each and every day.',
    final: true,
  },
];

let currentStep = 0;

// Grab DOM elements once to avoid repeated lookups
const dayTitleEl = document.getElementById('day-title');
const questionEl = document.getElementById('question');
const messageEl = document.getElementById('message');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const overlay = document.getElementById('overlay');

// Function to render the current step's content
function showStep(index) {
  const step = steps[index];
  dayTitleEl.textContent = step.title;
  questionEl.textContent = step.question;
  messageEl.textContent = step.message;
}

// Event handler for the Yes button
yesBtn.addEventListener('click', () => {
  const step = steps[currentStep];
  if (step.final) {
    // On the final step, show the overlay and start celebrations
    overlay.classList.remove('hidden');
    startCelebration();
  } else {
    currentStep++;
    showStep(currentStep);
  }
});

// The No button escapes: move it randomly when hovered or clicked
function moveButton() {
  const buttonWidth = noBtn.offsetWidth;
  const buttonHeight = noBtn.offsetHeight;
  const x = Math.random() * (window.innerWidth - buttonWidth);
  const y = Math.random() * (window.innerHeight - buttonHeight);
  noBtn.style.position = 'fixed';
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);

// Start confetti and heart animations for celebration
function startCelebration() {
  const duration = 5000; // 5 seconds
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const confettiInterval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(confettiInterval);
      return;
    }
    // Launch a small burst of confetti from a random position
    confetti({
      particleCount: 6,
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: ['#e14d75', '#ff9a9e', '#fad0c4'],
    });
  }, 250);

  // Create falling hearts continuously during the celebration
  const heartInterval = setInterval(() => {
    createHeart();
  }, 300);
  setTimeout(() => clearInterval(heartInterval), duration);
}

// Create a heart element and animate its fall
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  // Random horizontal start position
  heart.style.left = Math.random() * 100 + 'vw';
  // Random animation duration so hearts fall at different speeds
  heart.style.animationDuration = Math.random() * 2 + 3 + 's';
  document.body.appendChild(heart);
  // Remove the heart after it finishes its animation
  setTimeout(() => {
    heart.remove();
  }, 5000);
}

// Initialize the first step
showStep(currentStep);
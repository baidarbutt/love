// ============== Date Ideas Data ==============
const dateIdeas = [
  { emoji: "🌹", title: "Romantic Dinner", description: "Cook a candlelit dinner together at home" },
  { emoji: "🎬", title: "Movie Marathon", description: "Watch your favorite romantic movies with cozy blankets" },
  { emoji: "🌅", title: "Sunset Picnic", description: "Pack snacks and watch the sunset at a scenic spot" },
  { emoji: "💃", title: "Dance Night", description: "Put on music and slow dance in your living room" },
  { emoji: "📝", title: "Love Letters", description: "Write heartfelt letters to each other and exchange" },
  { emoji: "🧁", title: "Bake Together", description: "Make heart-shaped cookies or a cake together" },
  { emoji: "⭐", title: "Stargazing", description: "Find a quiet spot and gaze at the stars together" },
  { emoji: "🎨", title: "Paint & Sip", description: "Get art supplies and paint portraits of each other" },
  { emoji: "🎮", title: "Game Night", description: "Play board games or video games as a team" },
  { emoji: "💆", title: "Spa Day", description: "Create a relaxing spa experience at home" },
  { emoji: "📸", title: "Photo Walk", description: "Take romantic photos at beautiful locations" },
  { emoji: "🎵", title: "Create a Playlist", description: "Make a playlist of songs that define your relationship" },
];

// ============== Floating Hearts ==============
function createFloatingHearts() {
  const container = document.getElementById('floating-hearts');
  const isMobile = window.innerWidth < 640;
  const heartCount = isMobile ? 8 : 15;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    const size = (isMobile ? 12 : 16) + Math.random() * (isMobile ? 16 : 24);
    const left = Math.random() * 100;
    const duration = 12 + Math.random() * 8;
    const delay = Math.random() * 10;

    heart.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" style="width: ${size}px; height: ${size}px;">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`;
    heart.className = 'floating-heart absolute text-primary';
    heart.style.cssText = `
      left: ${left}%;
      color: hsla(340, 80%, 60%, 0.3);
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(heart);
  }
}

// ============== Love Question ==============
function initLoveQuestion() {
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');
  const questionContent = document.getElementById('question-content');
  const answerContent = document.getElementById('answer-content');
  const heartExplosion = document.getElementById('heart-explosion');

  let noPosition = { x: 0, y: 0 };

  // No button moves away on hover
  function handleNoMovement(e) {
    e.preventDefault();
    const isMobile = window.innerWidth < 640;
    const rangeX = isMobile ? 100 : 200;
    const rangeY = isMobile ? 80 : 150;
    noPosition.x = (Math.random() - 0.5) * rangeX;
    noPosition.y = (Math.random() - 0.5) * rangeY;
    noBtn.style.transform = `translate(${noPosition.x}px, ${noPosition.y}px)`;
  }

  noBtn.addEventListener('mouseenter', handleNoMovement);
  noBtn.addEventListener('touchstart', handleNoMovement);

  // Yes button click
  yesBtn.addEventListener('click', function() {
    // Show heart explosion
    heartExplosion.classList.remove('hidden');
    heartExplosion.innerHTML = '';

    for (let i = 0; i < 30; i++) {
      const heart = document.createElement('div');
      const tx = (Math.random() - 0.5) * window.innerWidth;
      const ty = -Math.random() * window.innerHeight - 100;
      const scale = 0.5 + Math.random() * 1.5;
      const delay = Math.random() * 0.5;

      heart.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" style="width: ${24 * scale}px; height: ${24 * scale}px;">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>`;
      heart.className = 'heart-explode absolute text-primary';
      heart.style.cssText = `
        left: 50%;
        top: 100%;
        --tx: ${tx}px;
        --ty: ${ty}px;
        animation-delay: ${delay}s;
      `;
      heartExplosion.appendChild(heart);
    }

    // Show answer
    setTimeout(() => {
      questionContent.classList.add('hidden');
      answerContent.classList.remove('hidden');
      answerContent.style.animation = 'fade-in 0.5s ease-out forwards';
    }, 300);

    // Hide explosion after animation
    setTimeout(() => {
      heartExplosion.classList.add('hidden');
    }, 3000);
  });
}

// ============== Date Ideas Picker ==============
function initDateIdeas() {
  const pickBtn = document.getElementById('pick-date-btn');
  const pickText = document.getElementById('pick-date-text');
  const shuffleIcon = document.getElementById('shuffle-icon');
  const emptyCard = document.getElementById('date-idea-empty');
  const ideaCard = document.getElementById('date-idea-card');
  const emojiEl = document.getElementById('date-idea-emoji');
  const titleEl = document.getElementById('date-idea-title');
  const descEl = document.getElementById('date-idea-description');
  const perfectEl = document.getElementById('date-idea-perfect');
  const emojiButtons = document.querySelectorAll('.emoji-btn');

  let isSpinning = false;

  function showIdea(idea, spinning = false) {
    emptyCard.classList.add('hidden');
    ideaCard.classList.remove('hidden');
    emojiEl.textContent = idea.emoji;
    titleEl.textContent = idea.title;
    descEl.textContent = idea.description;
    
    if (!spinning) {
      perfectEl.classList.remove('hidden');
      perfectEl.style.animation = 'fade-in 0.3s ease-out 0.3s forwards';
      perfectEl.style.opacity = '0';
    } else {
      perfectEl.classList.add('hidden');
    }
    
    ideaCard.style.animation = spinning ? 'none' : 'fade-in 0.5s ease-out forwards';
  }

  function pickRandom() {
    if (isSpinning) return;
    
    isSpinning = true;
    pickBtn.disabled = true;
    pickText.textContent = 'Finding your perfect date...';
    shuffleIcon.classList.add('animate-spin');
    
    let spins = 0;
    const interval = setInterval(() => {
      const randomIdea = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
      showIdea(randomIdea, true);
      spins++;
      
      if (spins >= 10) {
        clearInterval(interval);
        isSpinning = false;
        pickBtn.disabled = false;
        pickText.textContent = 'Pick a Date Idea';
        shuffleIcon.classList.remove('animate-spin');
        
        const finalIdea = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
        showIdea(finalIdea, false);
      }
    }, 100);
  }

  pickBtn.addEventListener('click', pickRandom);

  emojiButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      showIdea(dateIdeas[index], false);
    });
  });
}

// ============== Scroll Animations ==============
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

// ============== Initialize ==============
document.addEventListener('DOMContentLoaded', function() {
  createFloatingHearts();
  initLoveQuestion();
  initDateIdeas();
  initScrollAnimations();
});

// Recreate floating hearts on resize
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    const container = document.getElementById('floating-hearts');
    container.innerHTML = '';
    createFloatingHearts();
  }, 250);
});

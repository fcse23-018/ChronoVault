document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     Quiz Functionality - Era-specific quizzes with localStorage tracking
     ========================================================================== */
  function setupQuiz() {
    const quizData = {
      egypt: { question: 'Who built the Great Pyramid of Giza?', options: ['Khufu', 'Cleopatra', 'Ramses II', 'Tutankhamun'], correct: 'Khufu' },
      rome: { question: 'What was the smallest unit of the Roman army?', options: ['Legion', 'Cohort', 'Centuria', 'Phalanx'], correct: 'Centuria' },
      medieval: { question: 'What document limited the power of the English monarchy in 1215?', options: ['Domesday Book', 'Magna Carta', 'Charter of Liberties', 'Treaty of Verdun'], correct: 'Magna Carta' },
      renaissance: { question: 'Who invented the movable type printing press?', options: ['Leonardo da Vinci', 'Johannes Gutenberg', 'Michelangelo', 'Raphael'], correct: 'Johannes Gutenberg' },
      industrial: { question: 'Who is credited with inventing the practical incandescent light bulb?', options: ['Thomas Edison', 'Nikola Tesla', 'James Watt', 'George Stephenson'], correct: 'Thomas Edison' },
      modern: { question: 'Who invented the World Wide Web?', options: ['Tim Berners-Lee', 'Bill Gates', 'Elon Musk', 'Steve Jobs'], correct: 'Tim Berners-Lee' }
    };

    const quiz = document.getElementById('quiz');
    if (!quiz) return;

    const era = document.body.className.split('-')[0];
    const data = quizData[era];
    if (!data) return;

    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const resultElement = document.getElementById('result');

    questionElement.textContent = data.question;
    optionsElement.innerHTML = '';

    data.options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'quiz-option';
      button.textContent = option;
      button.addEventListener('click', () => {
        optionsElement.querySelectorAll('button').forEach(btn => btn.disabled = true);
        if (option === data.correct) {
          resultElement.textContent = 'Correct!';
          resultElement.style.color = '#28A745';
          button.style.background = '#28A745';
          button.style.color = '#FFFFFF';
          localStorage.setItem(`${era}QuizCompleted`, 'true');
          localStorage.setItem(`${era}CompletionTime`, new Date().toISOString());
          setTimeout(() => {
            checkUnlockExplorer();
          }, 1000);
        } else {
          resultElement.textContent = 'Incorrect. Try again!';
          resultElement.style.color = '#DC3545';
          button.style.background = '#DC3545';
          button.style.color = '#FFFFFF';
          button.classList.add('shake');
          setTimeout(() => button.classList.remove('shake'), 500);
        }
      });
      optionsElement.appendChild(button);
    });
  }

  /* ==========================================================================
     Badge Animation - Show era badge on first visit
     ========================================================================== */
  function setupBadge() {
    const badge = document.getElementById('badge');
    const era = document.body.className.split('-')[0];
    if (badge && !localStorage.getItem(`${era}BadgeShown`)) {
      badge.style.display = 'block';
      setTimeout(() => {
        badge.style.display = 'none';
        localStorage.setItem(`${era}BadgeShown`, 'true');
      }, 3000);
    }
  }

  /* ==========================================================================
     Explorer Unlock - Enable explorer page after all quizzes completed
     ========================================================================== */
  function checkUnlockExplorer() {
    const quizzesCompleted = [
      'egyptQuizCompleted',
      'romeQuizCompleted',
      'medievalQuizCompleted',
      'renaissanceQuizCompleted',
      'industrialQuizCompleted',
      'modernQuizCompleted'
    ].every(key => localStorage.getItem(key) === 'true');

    const unlockButton = document.getElementById('unlock-explorer');
    if (quizzesCompleted && unlockButton) {
      unlockButton.disabled = false;
      unlockButton.addEventListener('click', () => {
        window.location.href = 'explorer.html';
      });
    }
  }

  /* ==========================================================================
     Explorer Page - Populate visited eras, badges, timeline, and map
     ========================================================================== */
  function setupExplorer() {
    const visitedErasList = document.getElementById('visited-eras');
    const badgesGrid = document.querySelector('.badges-grid');
    const timelineEntries = document.querySelector('.timeline-entries');
    const map = document.querySelector('map[name="era-map"]');
    if (!visitedErasList || !badgesGrid || !timelineEntries || !map) return;

    const eraData = [
      { id: 'egypt', name: 'Ancient Egypt', icon: '🏛️', url: 'egypt.html', badge: 'images/egypt-badge.webp', mapCoords: '100,200,50' },
      { id: 'rome', name: 'Ancient Rome', icon: '⚔️', url: 'rome.html', badge: 'images/rome-badge.webp', mapCoords: '300,250,50' },
      { id: 'medieval', name: 'Medieval Era', icon: '🏰', url: 'medieval.html', badge: 'images/medieval-badge.webp', mapCoords: '350,200,50' },
      { id: 'renaissance', name: 'Renaissance', icon: '🎨', url: 'renaissance.html', badge: 'images/renaissance-badge.webp', mapCoords: '320,220,50' },
      { id: 'industrial', name: 'Industrial Revolution', icon: '🏭', url: 'industrial.html', badge: 'images/industrial-badge.webp', mapCoords: '400,300,50' },
      { id: 'modern', name: 'Modern Era', icon: '💻', url: 'modern.html', badge: 'images/modern-badge.webp', mapCoords: '500,350,50' }
    ];

    // Populate visited eras
    visitedErasList.innerHTML = eraData.map(era => {
      const completed = localStorage.getItem(`${era.id}QuizCompleted`) === 'true';
      return `
        <div class="era-item" data-era="${era.id}">
          <h3>${era.name}</h3>
          <span class="status ${completed ? 'completed' : 'incomplete'}"></span>
          <a href="${era.url}" class="era-link">Visit</a>
        </div>
      `;
    }).join('');

    // Populate badges
    badgesGrid.innerHTML = eraData.map(era => {
      const completed = localStorage.getItem(`${era.id}QuizCompleted`) === 'true';
      return `
        <div class="badge-item" data-era="${era.id}">
          <img src="${era.badge}" alt="${era.name} Badge" class="${completed ? '' : 'grayscale'}">
          <p>${era.name}</p>
        </div>
      `;
    }).join('');

    // Populate timeline
    timelineEntries.innerHTML = eraData
      .filter(era => localStorage.getItem(`${era.id}QuizCompleted`) === 'true')
      .map(era => {
        const time = localStorage.getItem(`${era.id}CompletionTime`) || 'Unknown';
        return `
          <div class="timeline-entry">
            <img src="${era.badge}" alt="${era.name} Icon">
            <p>Completed ${era.name}: ${new Date(time).toLocaleDateString()}</p>
          </div>
        `;
      }).join('');

    // Populate map
    map.innerHTML = eraData.map(era => `
      <area shape="circle" coords="${era.mapCoords}" href="${era.url}" alt="${era.name}" data-info="${era.name}">
    `).join('');

    // Random Era button
    window.randomEra = function() {
      const completedEras = eraData.filter(era => localStorage.getItem(`${era.id}QuizCompleted`) === 'true');
      if (completedEras.length > 0) {
        const randomEra = completedEras[Math.floor(Math.random() * completedEras.length)];
        window.location.href = randomEra.url;
      } else {
        alert('No eras completed yet!');
      }
    };

    // Share Achievement button
    const shareButton = document.querySelector('button[aria-label="Share your Master Explorer achievement"]');
    if (shareButton) {
      shareButton.addEventListener('click', async () => {
        const completedCount = eraData.filter(era => localStorage.getItem(`${era.id}QuizCompleted`) === 'true').length;
        const shareData = {
          title: 'ChronoVault Master Explorer',
          text: `I’m a Master Explorer in ChronoVault, having conquered ${completedCount} historical eras! Join me at chronovault.com!`,
          url: window.location.origin + '/explorer.html'
        };
        try {
          if (navigator.share) {
            await navigator.share(shareData);
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareData.text);
            alert('Achievement text copied to clipboard! Share it with your friends.');
          } else {
            alert(`Share this: ${shareData.text}`);
          }
        } catch (err) {
          console.error('Share failed:', err);
          alert(`Failed to share. Copy this: ${shareData.text}`);
        }
      });
    }

    // Confetti
    if (eraData.every(era => localStorage.getItem(`${era.id}QuizCompleted`) === 'true') && typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  /* ==========================================================================
     Gallery Functionality - Manual scrolling and flip cards
     ========================================================================== */
  function setupGallery() {
    // Art Gallery Wrapper - Manual scrolling
    const galleries = document.querySelectorAll('.art-gallery-wrapper .art-gallery');
    galleries.forEach(gallery => {
      const prevButton = gallery.parentElement.querySelector('.slideshow-prev');
      const nextButton = gallery.parentElement.querySelector('.slideshow-next');
      const items = gallery.querySelectorAll('.gallery-item');
      let currentIndex = 0;
      const totalItems = items.length;

      function updateSlide() {
        const width = window.innerWidth;
        const itemWidth = width <= 480 ? 120 : width <= 768 ? 150 : width <= 1024 ? 200 : 250;
        const flippedItems = gallery.querySelectorAll('.flip-card-inner.flipped');
        const extraWidth = flippedItems.length * (width <= 480 ? 24 : width <= 768 ? 30 : width <= 1024 ? 40 : 50);
        gallery.style.transition = 'transform 0.5s ease';
        gallery.style.transform = `translateX(-${currentIndex * (itemWidth + 20) + extraWidth}px)`;
      }

      prevButton.addEventListener('click', () => {
        currentIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
        updateSlide();
      });

      nextButton.addEventListener('click', () => {
        currentIndex = currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
        updateSlide();
      });

      // Flip card functionality for gallery items
      items.forEach(item => {
        const inner = item.querySelector('.flip-card-inner');
        item.addEventListener('click', () => {
          inner.classList.toggle('flipped');
          setTimeout(updateSlide, 300); // Adjust for enlargement
        });
      });

      window.addEventListener('resize', updateSlide);
      updateSlide(); // Initial position
    });

    // Flip card functionality for standalone flip cards
    document.querySelectorAll('.flip-card').forEach(item => {
      const inner = item.querySelector('.flip-card-inner');
      item.addEventListener('click', () => {
        inner.classList.toggle('flipped');
      });
    });
  }

  /* ==========================================================================
     Video Functionality - Autoplay muted intro video with white screen toggle
     ========================================================================== */
  function setupVideo() {
    const introVideo = document.querySelector('.intro-video');
    if (!introVideo) return;

    introVideo.muted = true;
    introVideo.play().catch(error => console.log('Autoplay failed:', error));
    introVideo.addEventListener('play', () => introVideo.classList.add('playing'));
    introVideo.addEventListener('pause', () => introVideo.classList.remove('playing'));
    introVideo.addEventListener('ended', () => introVideo.classList.remove('playing'));
  }

  /* ==========================================================================
     Form Validation - Validate contact form fields and display errors
     ========================================================================== */
  function setupFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');

    // Update character count for message
    function updateCharCount() {
      const count = messageInput.value.length;
      charCount.textContent = `${count}/500`;
      charCount.style.color = count > 500 ? '#DC3545' : '#000000';
    }

    messageInput.addEventListener('input', updateCharCount);
    updateCharCount();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear previous errors
      form.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
        error.parentElement.querySelector('input, textarea')?.classList.remove('shake');
      });

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        isValid = false;
        const error = nameInput.parentElement.querySelector('.error');
        error.textContent = 'Name must be at least 2 characters';
        nameInput.classList.add('shake');
        setTimeout(() => nameInput.classList.remove('shake'), 500);
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        const error = emailInput.parentElement.querySelector('.error');
        error.textContent = 'Enter a valid email address';
        emailInput.classList.add('shake');
        setTimeout(() => emailInput.classList.remove('shake'), 500);
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length > 500) {
        isValid = false;
        const error = messageInput.parentElement.querySelector('.error');
        error.textContent = messageInput.value.trim() ? 'Message cannot exceed 500 characters' : 'Message is required';
        messageInput.classList.add('shake');
        setTimeout(() => messageInput.classList.remove('shake'), 500);
      }

      // Handle valid form
      if (isValid) {
        const success = document.createElement('div');
        success.textContent = 'Form submitted successfully!';
        success.style.color = '#28A745';
        success.style.marginTop = '10px';
        form.appendChild(success);
        form.reset();
        updateCharCount();
        setTimeout(() => success.remove(), 3000);
      }
    });
  }

  /* ==========================================================================
     Initialize Components - Run relevant setups based on page content
     ========================================================================== */
  if (document.getElementById('quiz')) {
    setupQuiz();
  }
  if (document.getElementById('badge')) {
    setupBadge();
  }
  if (document.getElementById('visited-eras')) {
    setupExplorer();
  }
  if (document.querySelector('.art-gallery-wrapper .art-gallery') || document.querySelector('.flip-card')) {
    setupGallery();
  }
  if (document.querySelector('.intro-video')) {
    setupVideo();
  }
  if (document.getElementById('contact-form')) {
    setupFormValidation();
  }
});

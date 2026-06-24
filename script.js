// 1. Global Navigation Scroll Effect
const nav = document.querySelector('.global-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// 5. Core Features Glow Effect
const featureCards = document.querySelectorAll('.interactive-glow');

featureCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// 8. Value Proposition Progress Rings
const progressRings = document.querySelectorAll('.progress-ring');

const ringObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const ring = entry.target;
      const targetValue = parseInt(ring.getAttribute('data-target'));
      
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 1;
        const deg = (currentProgress / 100) * 360;
        ring.style.background = `conic-gradient(var(--brand-cyan) ${deg}deg, var(--glass-bg) 0deg)`;
        
        if (currentProgress >= targetValue) {
          clearInterval(interval);
        }
      }, 15);
      
      observer.unobserve(ring);
    }
  });
}, { threshold: 0.5 });

progressRings.forEach(ring => ringObserver.observe(ring));

// 9. FAQ Accordion Interaction
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const button = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    
    // Close all open items
    faqItems.forEach(otherItem => {
      otherItem.classList.remove('is-open');
      otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      otherItem.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isOpen) {
      // Open the clicked item
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

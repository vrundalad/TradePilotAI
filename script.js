document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Global Navigation Scroll Listener
  const nav = document.querySelector('.global-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // 7. Product Showcase UI Carousel (Tab Logic)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const canvasPanels = document.querySelectorAll('.canvas-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      canvasPanels.forEach(p => p.classList.remove('active'));
      
      // Add active to clicked
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // 10. Performance Outcomes & Benefits (Intersection Observer for Stat Bars)
  const statFills = document.querySelectorAll('.stat-fill');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = width;
        observer.unobserve(fill);
      }
    });
  }, observerOptions);

  statFills.forEach(fill => statObserver.observe(fill));

  // 11. Accessible FAQ Accordion Stack
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all
      accordionItems.forEach(acc => {
        acc.classList.remove('active');
        acc.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        acc.querySelector('.accordion-content').style.maxHeight = null;
      });

      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

});

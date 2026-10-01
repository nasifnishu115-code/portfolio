/**
 * NASIF | MERN STACK DEVELOPER TRAINEE PORTFOLIO
 * Vanilla JavaScript Implementation
 * Features: Typewriter, Mobile Menu, Scroll Spy, Reveal Animations,
 * Project Filters, Interactive Modal, Form Validation, Back-To-Top, Toast System
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Dynamic Typewriter Animation
  // --------------------------------------------------------------------------
  const typewriterElement = document.getElementById('typewriter');
  const words = [
    'MERN Stack Developer Trainee',
    'Full-Stack Web Enthusiast',
    'Frontend & Node.js Learner',
    'Passionate Problem Solver'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
      typewriterElement.textContent = currentWord.substring(0, charIndex);
      typingSpeed = 40;
    } else {
      charIndex++;
      typewriterElement.textContent = currentWord.substring(0, charIndex);
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1600; // Pause at the end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 450; // Pause before typing new word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // --------------------------------------------------------------------------
  // 2. Navigation, Sticky Header & Scroll Progress
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // Scroll progress bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Scrolled header background
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to top click action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Hamburger Menu
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking any nav link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Close when clicking outside of mobile menu
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Active Navigation Link Highlighting on Scroll (ScrollSpy)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function highlightCurrentNav() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightCurrentNav, { passive: true });

  // --------------------------------------------------------------------------
  // 5. Scroll Reveal Animations (Intersection Observer)
  // --------------------------------------------------------------------------
  const revealItems = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    // Fallback for older browsers
    revealItems.forEach(item => item.classList.add('revealed'));
  }

  // --------------------------------------------------------------------------
  // 6. Project Data & Interactive Preview Modal
  // --------------------------------------------------------------------------
  const projectDatabase = {
    todo: {
      title: 'To-Do List Application',
      category: 'Vanilla JS / DOM',
      img: 'assets/images/project-todo.jpg',
      desc: 'A responsive task management application built using vanilla JavaScript DOM manipulation, event listeners, and localStorage. Users can create tasks, mark items as complete, filter between active and completed states, and preserve their task lists across browser sessions without any backend dependency.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation', 'LocalStorage', 'Flexbox'],
      github: 'https://github.com',
      demo: '#projects'
    },
    calc: {
      title: 'Interactive Calculator',
      category: 'Math Logic & DOM',
      img: 'assets/images/project-calculator.jpg',
      desc: 'A simple and interactive calculator built with clean JavaScript functions, event bubbling, and dynamic DOM manipulation. Handles multi-step arithmetic operations, floating-point calculations, percentage conversions, and input validation with a sleek modern dark interface.',
      tags: ['HTML5', 'CSS Grid', 'JavaScript', 'State Logic', 'Keyboard Events'],
      github: 'https://github.com',
      demo: '#projects'
    },
    quiz: {
      title: 'Interactive Quiz Application',
      category: 'State & Arrays',
      img: 'assets/images/project-quiz.jpg',
      desc: 'An interactive quiz web application powered by JavaScript arrays, objects, conditional flows, and DOM manipulation. Features timed questions, visual answer confirmation, dynamic score tallying, custom streak indicators, and an instant replay mode.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Arrays & Objects', 'DOM Rendering', 'Timers'],
      github: 'https://github.com',
      demo: '#projects'
    },
    expense: {
      title: 'Expense Tracker Dashboard',
      category: 'Financial Calculations',
      img: 'assets/images/project-expense.jpg',
      desc: 'An expense tracking application featuring calculations, form management, array operations, and localStorage. Dynamically computes total income, total expenditures, and current net balance while organizing entries by category and date.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage', 'Array Methods', 'Data Math'],
      github: 'https://github.com',
      demo: '#projects'
    },
    movie: {
      title: 'Movie Search App',
      category: 'Asynchronous APIs',
      img: 'assets/images/project-movie.jpg',
      desc: 'A movie discovery web application integrating an external REST API using modern JavaScript fetch and async/await syntax. Dynamically parses movie data, renders poster cards, provides instant search filters, and displays detailed synopsis modals.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Fetch API', 'Async/Await', 'JSON Handling'],
      github: 'https://github.com',
      demo: '#projects'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalGithubLink = document.getElementById('modalGithubLink');
  const modalLiveDemoBtn = document.getElementById('modalLiveDemoBtn');

  function openProjectModal(projectId) {
    const project = projectDatabase[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalBadge.textContent = project.category;
    modalImg.src = project.img;
    modalImg.alt = project.title;
    modalDesc.textContent = project.desc;
    modalGithubLink.href = project.github;

    // Render tech tags
    modalTechStack.innerHTML = '';
    project.tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'tag tag-accent';
      tagSpan.textContent = tag;
      modalTechStack.appendChild(tagSpan);
    });

    modalLiveDemoBtn.onclick = (e) => {
      e.preventDefault();
      closeProjectModal();
      showToast(`Launching demo preview for "${project.title}"!`);
    };

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Trigger modal from project cards
  document.querySelectorAll('.project-modal-trigger, .demo-btn').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-project');
      if (projectId && projectDatabase[projectId]) {
        openProjectModal(projectId);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        closeProjectModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Project Category Filter
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          // Add re-animation
          card.classList.remove('revealed');
          setTimeout(() => card.classList.add('revealed'), 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 8. Code Window Snippet Copy
  // --------------------------------------------------------------------------
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const heroCodeSnippet = document.getElementById('heroCodeSnippet');

  if (copyCodeBtn && heroCodeSnippet) {
    copyCodeBtn.addEventListener('click', () => {
      const codeText = heroCodeSnippet.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        copyCodeBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
        showToast('Code snippet copied to clipboard!');
        setTimeout(() => {
          copyCodeBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2200);
      }).catch(() => {
        showToast('Failed to copy code.');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. Contact Info Quick Copy Button
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'nasif.dev.contact@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
        showToast('Email address copied to clipboard!');
        setTimeout(() => {
          copyEmailBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2200);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. Contact Form Live Validation & Submission
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const userNameInput = document.getElementById('userName');
  const userEmailInput = document.getElementById('userEmail');
  const userMessageInput = document.getElementById('userMessage');
  const charCount = document.getElementById('charCount');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const formSuccessBanner = document.getElementById('formSuccessBanner');
  const dismissSuccessBtn = document.getElementById('dismissSuccessBtn');

  // Real-time character counter
  if (userMessageInput && charCount) {
    userMessageInput.addEventListener('input', () => {
      const length = userMessageInput.value.length;
      charCount.textContent = `${length} / 500`;
      if (length > 500) {
        charCount.style.color = '#f43f5e';
      } else {
        charCount.style.color = '#64748b';
      }
    });
  }

  // Validation Helpers
  function validateName() {
    const val = userNameInput.value.trim();
    if (!val) {
      nameError.textContent = 'Please enter your name.';
      userNameInput.closest('.input-wrapper').classList.add('error');
      return false;
    }
    if (val.length < 2) {
      nameError.textContent = 'Name must be at least 2 characters.';
      userNameInput.closest('.input-wrapper').classList.add('error');
      return false;
    }
    nameError.textContent = '';
    userNameInput.closest('.input-wrapper').classList.remove('error');
    return true;
  }

  function validateEmail() {
    const val = userEmailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      emailError.textContent = 'Please enter your email address.';
      userEmailInput.closest('.input-wrapper').classList.add('error');
      return false;
    }
    if (!emailRegex.test(val)) {
      emailError.textContent = 'Please enter a valid email address.';
      userEmailInput.closest('.input-wrapper').classList.add('error');
      return false;
    }
    emailError.textContent = '';
    userEmailInput.closest('.input-wrapper').classList.remove('error');
    return true;
  }

  function validateMessage() {
    const val = userMessageInput.value.trim();
    if (!val) {
      messageError.textContent = 'Please enter your message.';
      userMessageInput.closest('.input-wrapper').classList.add('error');
      return false;
    }
    if (val.length < 10) {
      messageError.textContent = 'Message should be at least 10 characters.';
      userMessageInput.closest('.input-wrapper').classList.add('error');
      return false;
    }
    if (val.length > 500) {
      messageError.textContent = 'Message cannot exceed 500 characters.';
      userMessageInput.closest('.input-wrapper').classList.add('error');
      return false;
    }
    messageError.textContent = '';
    userMessageInput.closest('.input-wrapper').classList.remove('error');
    return true;
  }

  // Live input events to clear errors
  if (userNameInput) userNameInput.addEventListener('input', validateName);
  if (userEmailInput) userEmailInput.addEventListener('input', validateEmail);
  if (userMessageInput) userMessageInput.addEventListener('input', validateMessage);

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isMessageValid = validateMessage();

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        showToast('Please correct the highlighted errors before submitting.');
        return;
      }

      // Simulate sending state
      submitBtn.disabled = true;
      btnText.textContent = 'Sending Message...';
      submitBtn.style.opacity = '0.75';

      setTimeout(() => {
        // Reset form and state
        contactForm.reset();
        if (charCount) charCount.textContent = '0 / 500';
        submitBtn.disabled = false;
        btnText.textContent = 'Send Message';
        submitBtn.style.opacity = '1';

        // Display Success Feedback Banner
        if (formSuccessBanner) {
          formSuccessBanner.classList.add('show');
          formSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        showToast('Message sent! Thank you for reaching out.');
      }, 900);
    });
  }

  // Dismiss success banner
  if (dismissSuccessBtn && formSuccessBanner) {
    dismissSuccessBtn.addEventListener('click', () => {
      formSuccessBanner.classList.remove('show');
    });
  }

  // --------------------------------------------------------------------------
  // 11. Toast Alert Utility
  // --------------------------------------------------------------------------
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, duration = 3500) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid fa-circle-info"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  // --------------------------------------------------------------------------
  // 12. Dynamic Year in Footer
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});

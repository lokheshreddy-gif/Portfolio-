document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // TYPEWRITER EFFECT
    // ==========================================================================
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "Intelligent AI Solutions",
        "Scalable Web Systems",
        "Responsible ML Models",
        "Clean & Performant Code"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at the end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    if (typewriterElement) {
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // THEME SWITCHER (DARK/LIGHT MODE)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check persistent storage or user preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        body.className = savedTheme;
    } else {
        body.className = systemPrefersDark ? 'dark-theme' : 'light-theme';
    }

    themeToggleBtn.addEventListener('click', () => {
        // Temporarily add a transition helper class to body to smoothly fade colors
        body.classList.add('theme-transitioning');
        
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('portfolio-theme', 'light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('portfolio-theme', 'dark-theme');
        }

        // Remove the transition helper class after the transition is complete
        setTimeout(() => {
            body.classList.remove('theme-transitioning');
        }, 400);
    });

    // ==========================================================================
    // MOBILE MENU TOGGLE
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // ==========================================================================
    // SCROLL ACTIONS (HEADER SCROLL, BACK-TO-TOP, ACTIVE NAV LINKS)
    // ==========================================================================
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Header resize and blur on scroll
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Show/hide Back-to-Top Button
        if (scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Update active nav link based on section position
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset for fixed header
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*=${sectionId}]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
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

    // ==========================================================================
    // PROJECTS FILTER
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // Animate out card
                card.style.opacity = '0';
                card.style.transform = 'scale(0.85)';
                card.style.pointerEvents = 'none';

                setTimeout(() => {
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        // Trigger reflow/animation in
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                            card.style.pointerEvents = 'auto';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // ==========================================================================
    // INTERSECTION OBSERVER FOR SCROLL REVEAL
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Reveal only once
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }

    // ==========================================================================
    // CONTACT FORM INTERACTIVE SUBMISSION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const formSubmitBtn = document.getElementById('form-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Disable submit button and show loading text
            formSubmitBtn.disabled = true;
            const originalBtnText = formSubmitBtn.innerHTML;
            formSubmitBtn.innerHTML = `<span>Sending...</span> <svg class="spinning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`;

            // Simulate form submission to backend/service
            setTimeout(() => {
                // Success styling
                formFeedback.className = 'form-feedback success';
                formFeedback.textContent = 'Thank you! Your message has been sent successfully.';
                
                // Clear fields
                contactForm.reset();

                // Restore button
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = originalBtnText;

                // Hide feedback after 5 seconds
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                    formFeedback.className = 'form-feedback';
                }, 5000);

            }, 1500);
        });
    }
});

// CSS transition styling for the theme switch
const styleSheet = document.createElement("style");
styleSheet.innerText = `
.theme-transitioning,
.theme-transitioning *,
.theme-transitioning *::before,
.theme-transitioning *::after {
    transition: background-color 0.4s ease !important;
}
@keyframes spin {
    to { transform: rotate(360deg); }
}
.spinning {
    animation: spin 1s linear infinite;
}
`;
document.head.appendChild(styleSheet);

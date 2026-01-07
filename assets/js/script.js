// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('backToTop');
const blobs = document.querySelectorAll('.parallax-blob');

window.addEventListener('scroll', () => {
    // Navbar background on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to Top button visibility
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }

    // Parallax background blobs
    const scrolled = window.scrollY;
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.2;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Back to Top Click
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typewriter Effect
class Typewriter {
    constructor(el, words, wait = 3000) {
        this.el = el;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = this.txt;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init Typewriter
document.addEventListener('DOMContentLoaded', () => {
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        const words = ['Backend Engineer', 'Data Analyst', 'DevOps Enthusiast'];
        new Typewriter(typewriterEl, words);
    }
});

// Mouse Spotlight Glow Effect
const cards = document.querySelectorAll('.skill-card, .project-card, .about-details-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// Intersection Observer for staggered reveals
const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a small staggered delay for children elements if they exist
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('active');
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

// Stagger Skill Cards
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.classList.add('reveal', 'reveal-up');
    card.dataset.delay = index * 100;
    revealObserver.observe(card);
});

// Observe existing reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    if (!el.classList.contains('skill-card')) {
        revealObserver.observe(el);
    }
});

// Project Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;

        projectCards.forEach(card => {
            const categories = card.dataset.category.split(' ');
            if (filter === 'all' || categories.includes(filter)) {
                card.classList.remove('hidden');
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }, 400);
            }
        });
    });
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const mode = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);
});

// Dynamic Time-Based Greeting
const updateGreeting = () => {
    const greetingEl = document.getElementById('greeting');
    if (!greetingEl) return;

    const hour = new Date().getHours();
    let greeting = "";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";
    else greeting = "Good Evening";

    greetingEl.textContent = greeting;
};
updateGreeting();

// Custom Cursor & Reading Progress
document.body.insertAdjacentHTML('beforeend', `
    <div class="custom-cursor"></div>
    <div class="reading-progress"></div>
`);

const cursor = document.querySelector('.custom-cursor');
const progress = document.querySelector('.reading-progress');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.pageYOffset / totalHeight) * 100;
    progress.style.width = scrollPercentage + '%';
});

// Project Modal Interaction
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');

projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent GitHub redirect initially

        const title = card.querySelector('.project-title').textContent;
        const type = card.querySelector('.project-type').textContent;
        const desc = card.querySelector('.project-description').innerHTML;
        const img = card.querySelector('.project-image').src;
        const tags = card.querySelector('.project-tags').innerHTML;
        const github = card.getAttribute('href');

        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalType').textContent = type;
        document.getElementById('modalDesc').innerHTML = desc;
        document.getElementById('modalImg').src = img;
        document.getElementById('modalTech').innerHTML = tags;
        document.getElementById('modalGithub').href = github;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Unlock scroll
});// Resume Preview Toggle
const toggleResumeBtn = document.getElementById('toggleResume');
const resumeViewer = document.getElementById('resumeViewer');

if (toggleResumeBtn && resumeViewer) {
    toggleResumeBtn.addEventListener('click', () => {
        resumeViewer.classList.toggle('active');
        const isActive = resumeViewer.classList.contains('active');
        toggleResumeBtn.innerHTML = isActive ?
            '<i class="fas fa-times"></i> Close Resume Preview' :
            '<i class="fas fa-file-pdf"></i> Preview Full Resume';

        if (isActive) {
            resumeViewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
// Pointer cursor expansion
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
});

// 3D Tilt Effect for Project Cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Magnetic Button Effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Glowing pulse effect on scroll progress bar
setInterval(() => {
    const progress = document.querySelector('.reading-progress');
    if (progress) {
        progress.style.boxShadow = `0 0 ${10 + Math.sin(Date.now() / 500) * 5}px rgba(0, 212, 255, ${0.5 + Math.sin(Date.now() / 500) * 0.2})`;
    }
}, 50);

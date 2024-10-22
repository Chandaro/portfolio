// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.className = savedTheme;
    icon.className = savedTheme === 'dark-mode' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    if (body.className === 'light-mode') {
        body.className = 'dark-mode';
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.className = 'light-mode';
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light-mode');
    }
});

// Navigation Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the form data to a server
    // For demo purposes, we'll just log it and show a success message
    console.log({
        name,
        email,
        message
    });
    
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Download CV Functionality
const downloadCV = document.getElementById('download-cv');
downloadCV.addEventListener('click', (e) => {
    e.preventDefault();
    // Replace with actual CV download logic
    alert('CV download functionality will be implemented here');
});

// Blog Posts Data (Sample data - replace with actual blog posts)
const blogPosts = [
    {
        title: 'Getting Started with Python',
        excerpt: 'Learn the basics of Python programming and start your coding journey.',
        date: '2024-03-15',
        image: '/api/placeholder/300/200'
    },
    {
        title: 'Java Development Best Practices',
        excerpt: 'Essential tips and tricks for writing better Java code.',
        date: '2024-03-10',
        image: '/api/placeholder/300/200'
    },
    {
        title: 'The Future of Programming',
        excerpt: 'Exploring upcoming trends in software development.',
        date: '2024-03-05',
        image: '/api/placeholder/300/200'
    }
];

// Populate Blog Section
function populateBlogPosts() {
    const blogGrid = document.querySelector('.blog-grid');
    
    blogPosts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'blog-post';
        article.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-content">
                <h3>${post.title}</h3>
                <p class="date">${new Date(post.date).toLocaleDateString()}</p>
                <p>${post.excerpt}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        `;
        blogGrid.appendChild(article);
    });
}

// Initialize blog posts
populateBlogPosts();

// Lazy Loading Images
document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Progressive Web App Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
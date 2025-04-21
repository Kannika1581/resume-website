// Wait for the DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
    // Sparkle effect elements
    createSparkles();
    initializeTilt();
    sectionAnimation();
    
    // Theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', toggleTheme);
    
    // Add sparkle effect on hover for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', createSparkleEffect);
    });
    
    // Add sparkle effect on hover for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', createSparkleEffect);
        ctaButton.addEventListener('mousemove', function(e) {
            const sparkleBtn = this.querySelector('.sparkle-btn');
            createSparkleOnButton(e, sparkleBtn);
        });
    }
    
    // Add mouse trail sparkle effect
    document.addEventListener('mousemove', createTrailEffect);
});

// Toggle between day and night mode
function toggleTheme() {
    document.body.classList.toggle('day-mode');
    document.body.classList.toggle('night-mode');
}

// Create random sparkles throughout the page
function createSparkles() {
    const sparklesContainer = document.querySelector('.sparkles-container');
    const numberOfSparkles = 30;
    
    for (let i = 0; i < numberOfSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        sparkle.style.left = `${x}%`;
        sparkle.style.top = `${y}%`;
        
        // Random size
        const size = Math.random() * (12 - 5) + 5;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        
        // Random delay for animation
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        
        sparklesContainer.appendChild(sparkle);
    }
}

// Create sparkle effect when hovering over elements
function createSparkleEffect(e) {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    
    // Create 5 sparkles around the element
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Position sparkles around the element
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        
        // Random size
        const size = Math.random() * (10 - 5) + 5;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
}

// Create sparkle on button during mousemove
function createSparkleOnButton(e, container) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    // Random size
    const size = Math.random() * (8 - 4) + 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    container.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Create trail effect following mouse cursor
function createTrailEffect(e) {
    // Create trail every 50ms to avoid too many elements
    if (window.lastTrailTime && Date.now() - window.lastTrailTime < 50) {
        return;
    }
    
    window.lastTrailTime = Date.now();
    
    const trail = document.createElement('div');
    trail.classList.add('sparkle');
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
    
    // Smaller size for trail
    const size = Math.random() * (6 - 3) + 3;
    trail.style.width = `${size}px`;
    trail.style.height = `${size}px`;
    
    document.body.appendChild(trail);
    
    // Remove trail after animation
    setTimeout(() => {
        trail.remove();
    }, 800);
}

// Initialize tilt effect for skill cards
function initializeTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    if (window.VanillaTilt && tiltElements.length > 0) {
        VanillaTilt.init(tiltElements, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
        });
    }
}

// Section animation on scroll
function sectionAnimation() {
    const sections = document.querySelectorAll('.section');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Function to add visible class to elements in viewport
    function checkVisibility() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible');
            }
        });
    }
    
    // Check on load
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
}

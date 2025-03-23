// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode is now handled directly in HTML
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.bg-white.rounded-lg, .border-l-4');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('hover-scale');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
    
    // Update active link in navigation based on current section
    const updateActiveLink = function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-500');
            link.classList.add('text-gray-600', 'dark:text-gray-300');
            
            const href = link.getAttribute('href').substring(1);
            if (href === currentSectionId) {
                link.classList.remove('text-gray-600', 'dark:text-gray-300');
                link.classList.add('text-blue-500');
            }
        });
    };
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Run once on page load
    updateActiveLink();
    
    // Add typing effect to the hero section
    const heroText = document.querySelector('.text-xl.md\\:text-2xl');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a slight delay
        setTimeout(typeWriter, 500);
    }
}); 
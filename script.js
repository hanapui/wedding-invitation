// Language switching functionality
let currentLang = 'zh'; // Default to Chinese

const langBtn = document.getElementById('langBtn');
const langText = langBtn.querySelector('.lang-text');

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if language preference is stored in localStorage
    const savedLang = localStorage.getItem('weddingLang');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage();
    }
    
    // Set initial button text
    updateButtonText();
    
    // Initial language update
    updateLanguage();
});

// Language button click handler
langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    updateLanguage();
    updateButtonText();
    localStorage.setItem('weddingLang', currentLang);
});

function updateLanguage() {
    const body = document.body;
    
    if (currentLang === 'en') {
        body.classList.add('lang-en');
    } else {
        body.classList.remove('lang-en');
    }
    
    // Update all elements with both data-zh and data-en attributes
    const elements = document.querySelectorAll('[data-zh][data-en]');
    elements.forEach(element => {
        const zhText = element.getAttribute('data-zh');
        const enText = element.getAttribute('data-en');
        
        if (zhText && enText) {
            // For menu link text, just update the text
            if (element.classList.contains('menu-link-text')) {
                const newText = currentLang === 'zh' ? zhText : enText;
                element.textContent = newText;
            }
            // For elements that contain images (like menu items with vegan icons), 
            // we need to preserve the image
            else if (element.querySelector('img')) {
                const img = element.querySelector('img');
                const newText = currentLang === 'zh' ? zhText : enText;
                element.innerHTML = newText + ' ' + img.outerHTML;
            } else {
                element.textContent = currentLang === 'zh' ? zhText : enText;
            }
        }
    });
}

function updateButtonText() {
    const zhText = langText.getAttribute('data-zh');
    const enText = langText.getAttribute('data-en');
    langText.textContent = currentLang === 'zh' ? zhText : enText;
}

// Full Page Menu functionality
const menuBtn = document.getElementById('menuBtn');
const fullPageMenu = document.getElementById('fullPageMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const menuLinks = document.querySelectorAll('.menu-link');

// Open menu
menuBtn.addEventListener('click', () => {
    fullPageMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
});

// Close menu
closeMenuBtn.addEventListener('click', () => {
    fullPageMenu.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close menu when clicking on menu item
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Close menu first
        fullPageMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Scroll to section with offset for top bar
        if (targetSection) {
            const topBarHeight = 60;
            const targetPosition = targetSection.offsetTop - topBarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Close menu when clicking outside of it
fullPageMenu.addEventListener('click', (e) => {
    if (e.target === fullPageMenu) {
        fullPageMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Top bar scroll functionality
document.addEventListener('DOMContentLoaded', () => {
    const topBar = document.querySelector('.top-bar');
    const heroSection = document.querySelector('.hero-section');
    
    function handleScroll() {
        if (!heroSection || !topBar) return;
        
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollPosition >= heroBottom) {
            topBar.classList.add('scrolled');
        } else {
            topBar.classList.remove('scrolled');
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();
});


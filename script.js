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
            // For elements that contain links, preserve the link structure
            else if (element.querySelector('a')) {
                const link = element.querySelector('a');
                const newText = currentLang === 'zh' ? zhText : enText;
                link.textContent = newText;
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
    
    // Copy address button functionality with toast notification
    const copyAddressBtn = document.getElementById('copyAddressBtn');
    const venueAddress = document.getElementById('venueAddress');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    function showToast(message) {
        if (toast && toastMessage) {
            // Update toast message based on current language
            const toastText = currentLang === 'zh' 
                ? '地址已複製到剪貼板！' 
                : 'Address copied to clipboard!';
            toastMessage.textContent = message || toastText;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }
    }
    
    if (copyAddressBtn && venueAddress) {
        copyAddressBtn.addEventListener('click', async () => {
            const textToCopy = venueAddress.textContent.trim();
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                showToast();
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showToast();
                } catch (err) {
                    console.error('Failed to copy:', err);
                    const errorMsg = currentLang === 'zh' 
                        ? '複製失敗' 
                        : 'Failed to copy address';
                    showToast(errorMsg);
                }
                document.body.removeChild(textArea);
            }
        });
    }
    
    // Heart button animation functionality
    const heartBtn = document.getElementById('heartBtn');
    
    if (heartBtn && heroSection) {
        heartBtn.addEventListener('click', (e) => {
            // Create flying heart
            const heart = document.createElement('span');
            heart.className = 'flying-heart';
            heart.textContent = '🩷';
            
            // Get button position relative to hero section
            const buttonRect = heartBtn.getBoundingClientRect();
            const heroRect = heroSection.getBoundingClientRect();
            
            // Calculate position relative to hero section
            const startX = buttonRect.left - heroRect.left + buttonRect.width / 2;
            const startY = buttonRect.top - heroRect.top + buttonRect.height / 2;
            
            heart.style.left = startX + 'px';
            heart.style.top = startY + 'px';
            
            // Generate random direction for animation
            const randomX = (Math.random() - 0.5) * 200; // -100 to 100px
            const randomY = -50 - Math.random() * 100; // -50 to -150px (upward)
            
            heart.style.setProperty('--random-x', randomX + 'px');
            heart.style.setProperty('--random-y', randomY + 'px');
            
            // Add to hero section
            heroSection.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        });
    }
});


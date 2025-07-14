
window.addEventListener('load', () => {
  const image = document.querySelector('.dropi');
  const text = document.querySelector('.dropt');

  // Remove animation classes in case of reload
  image.classList.remove('animate');
  text.classList.remove('animate');

  // Force reflow to reset animation
  void image.offsetWidth;
  void text.offsetWidth;

  // Add animation classes with delay
  setTimeout(() => {
    image.classList.add('animate');
  }, 100);

  setTimeout(() => {
    text.classList.add('animate');
  }, 400);
});
// fallingEffect.js

// Configuration: Set the selectors for the elements you want to animate
const fallingElements = [
  { selector: '.dropi', hasFallen: false },
  { selector: '.dropt', hasFallen: false }
];

// Helper: Detect if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  );
}

// Helper: Random rotation for a more dynamic drop
function getRandomRotation() {
  const min = -10, max = 10;
  return Math.random() * (max - min) + min;
}

// Add falling animation CSS once
(function injectFallingStyle() {
  if (document.getElementById('falling-effect-style')) return;
  const style = document.createElement('style');
  style.id = 'falling-effect-style';
  style.textContent = `
  .falling-animate {
    animation: fallingEffect 0.8s cubic-bezier(.47,1.64,.41,.8);
    will-change: transform, opacity;
    z-index: 99 !important;
    position: relative;
  }
  @keyframes fallingEffect {
    0% {
      opacity: 0.5;
      transform: translateY(-80vh) rotate(var(--fall-rot, 0deg)) scale(0.9);
    }
    80% {
      opacity: 1;
      transform: translateY(30px) rotate(var(--fall-rot, 0deg)) scale(1.07);
    }
    100% {
      opacity: 1;
      transform: translateY(0) rotate(0deg) scale(1);
    }
  }
  `;
  document.head.appendChild(style);
})();

// Main function to apply effect
function applyFallingEffect() {
  fallingElements.forEach((item, idx) => {
    const el = document.querySelector(item.selector);
    if (!el) return;

    if (isInViewport(el)) {
      // Only animate if not currently animating
      if (!el.classList.contains('falling-animate')) {
        // Reset animation to allow repeat
        el.style.setProperty('--fall-rot', getRandomRotation() + 'deg');
        el.classList.remove('falling-animate');
        // Force reflow to restart animation
        void el.offsetWidth; 
        el.classList.add('falling-animate');
      }
    } else {
      // Remove animation class if out of view, so it can repeat
      el.classList.remove('falling-animate');
    }
  });
}

// Listen to scroll and on load
window.addEventListener('scroll', applyFallingEffect, { passive: true });
window.addEventListener('resize', applyFallingEffect);
window.addEventListener('DOMContentLoaded', applyFallingEffect);

// typing text effect .typing-text//
document.addEventListener('DOMContentLoaded', () => {
    // Target the element with the class 'typing-text'
    const typingElement = document.querySelector('.typing-text');
    
    // Check if the element exists
    if (typingElement) {
        // Store the original text content and remove leading/trailing whitespace
        const originalText = typingElement.textContent.trim();
        // Clear the element's content to prepare for the typing effect
        typingElement.textContent = ''; 

        // Function to implement the typing effect
        function typeWriter(element, text, speed) {
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    // Add the next character to the element
                    element.textContent += text.charAt(i);
                    i++;
                    // Call the function recursively with a delay (speed)
                    setTimeout(type, speed);
                }
            }
            
            // Start the typing process
            type();
        }

        // Set the typing speed (e.g., 100ms per character)
        const typingSpeed = 100; 
        typeWriter(typingElement, originalText, typingSpeed);
    }
});
// roadmap button 
document.querySelector('.futuristic-button').addEventListener('click', () => {
            alert('Roadmap button clicked!');
        });

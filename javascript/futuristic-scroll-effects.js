// Futuristic Scroll Animation for ITI Electrician Page

document.addEventListener('DOMContentLoaded', () => {
  // Neon Header Animation on Scroll
  const header = document.querySelector('header');
  const h1 = header.querySelector('h1');
  const p = header.querySelector('p');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Fade and glow effect for header
    if (scrollY > 40) {
      header.style.boxShadow = "0 4px 38px 0 #38e8fc44, 0 2px 4px #23234a44";
      header.style.background = "linear-gradient(90deg, #23244e 30%, #38e8fc 100%)";
      h1.style.textShadow = "0 0 30px #38e8fc, 0 0 10px #181828";
      p.style.textShadow = "0 0 20px #38e8fc88";
    } else {
      header.style.boxShadow = "";
      header.style.background = "linear-gradient(90deg, #23244e 50%, #4fd0e8 100%)";
      h1.style.textShadow = "0 0 18px #4fd0e880, 0 0 4px #181828";
      p.style.textShadow = "0 0 6px #4fd0e844";
    }

    // Card float up and neon border effect
    document.querySelectorAll('.container, h2, ol li').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
        if (el.tagName === 'LI') {
          el.style.boxShadow = "0 0 18px #4fd0e844";
          el.style.borderColor = "#38e8fc";
        }
      } else {
        el.style.transform = 'translateY(50px)';
        el.style.opacity = '0.5';
        if (el.tagName === 'LI') {
          el.style.boxShadow = "0 2px 8px #4fd0e81c";
          el.style.borderColor = "#4fd0e8";
        }
      }
    });

    // Neon glow for the download button
    const dlBtn = document.querySelector('.download-btn');
    if (scrollY > document.body.scrollHeight - window.innerHeight - 130) {
      dlBtn.style.boxShadow = "0 0 30px #38e8fc99, 0 0 8px #fff";
      dlBtn.style.background = "linear-gradient(90deg, #38e8fc 20%, #23244e 100%)";
    } else {
      dlBtn.style.boxShadow = "0 2px 8px #4fd0e844";
      dlBtn.style.background = "linear-gradient(90deg, #4fd0e8 20%, #23244e 100%)";
    }
  });

  // Parallax Space Stars Effect (for backgrounds using ::before/::after)
  let starShift = 0, starShift2 = 0;
  window.addEventListener('scroll', () => {
    starShift = window.scrollY * 0.2;
    starShift2 = window.scrollY * 0.1;
    document.body.style.setProperty('--starShift', `${starShift}px`);
    document.body.style.setProperty('--starShift2', `${starShift2}px`);
    // If CSS uses these variables for background position, backgrounds will shift gently
  });

  // Floating subject highlight effect
  document.querySelectorAll('.subject-link').forEach(subject => {
    subject.addEventListener('mouseenter', () => {
      subject.style.textShadow = "0 0 12px #38e8fc, 0 0 18px #4fd0e8";
      subject.style.background = "#232c4a";
      subject.style.color = "#fff";
      subject.style.borderRadius = "8px";
      subject.style.transition = "all .3s";
    });
    subject.addEventListener('mouseleave', () => {
      subject.style.textShadow = "";
      subject.style.background = "none";
      subject.style.color = "#38e8fc";
    });
  });

  // Animate in cards on load
  setTimeout(() => {
    document.querySelectorAll('.container, h2, ol li').forEach((el, i) => {
      el.style.transition = 'transform .7s cubic-bezier(.19,1,.22,1), opacity .7s';
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
    });
  }, 150);
});

//Typing text effect 
document.addEventListener('DOMContentLoaded', () => {
    // Target the element with the class 'typing-text'
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        // Store the original text content and trim any whitespace
        const originalText = typingElement.textContent.trim();
        // Clear the element's content to start the typing effect
        typingElement.textContent = ''; 

        // Function to implement the typing effect
        function typeWriter(element, text, speed) {
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    // Append the next character to the element
                    element.textContent += text.charAt(i);
                    i++;
                    // Call the function again after a delay (speed)
                    setTimeout(type, speed);
                }
            }
            
            // Start the typing process
            type();
        }

        // Execute the typing effect with a speed of 100 milliseconds per character
        const typingSpeed = 100; 
        typeWriter(typingElement, originalText, typingSpeed);
    }
});

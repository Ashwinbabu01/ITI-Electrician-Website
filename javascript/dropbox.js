// Scroll direction aware falling/rising animation for feature boxes

let lastScrollY = window.scrollY;
const animatedMap = new Map(); // box => {down:bool, up:bool}

function getHeadingY() {
  const heading = document.querySelector('.target-text');
  if (!heading) return 0;
  const rect = heading.getBoundingClientRect();
  return rect.top + window.scrollY;
}
function getFooterY() {
  const footer = document.querySelector('footer');
  if (!footer) return document.body.scrollHeight;
  const rect = footer.getBoundingClientRect();
  return rect.top + window.scrollY;
}
function animateBox(box, direction, headingY, footerY) {
  if (!animatedMap.has(box)) animatedMap.set(box, { down: false, up: false });
  const state = animatedMap.get(box);

  // Prevent repeat animation for same direction
  if ((direction === 'down' && state.down) || (direction === 'up' && state.up)) return;

  // Initial state
  let offsetY = 0;
  if (direction === 'down') {
    // Falling from heading
    const boxRect = box.getBoundingClientRect();
    const boxY = boxRect.top + window.scrollY;
    offsetY = boxY - headingY - 48;
    box.style.transform = `translateY(${-offsetY}px) scale(0.95)`;
  } else {
    // Rising from footer
    const boxRect = box.getBoundingClientRect();
    const boxY = boxRect.top + window.scrollY;
    offsetY = (footerY - boxY) + 48;
    box.style.transform = `translateY(${offsetY}px) scale(0.95)`;
  }
  box.style.opacity = '0';
  box.style.transition = 'none';

  // Force reflow
  void box.offsetWidth;

  // Animate to normal position
  box.style.transition = 'transform 0.7s cubic-bezier(.19,1,.22,1), opacity 0.5s';
  setTimeout(() => {
    box.classList.add('visible');
    box.style.transitionDelay = '0s';
    box.style.transform = '';
    box.style.opacity = '';
    if (direction === 'down') state.down = true;
    if (direction === 'up') state.up = true;
  }, 20);
}

// Detect scroll direction
function getScrollDirection() {
  const curr = window.scrollY;
  let dir = 'down';
  if (curr < lastScrollY) dir = 'up';
  lastScrollY = curr;
  return dir;
}

function handleBoxEntry(entry, observer) {
  const direction = getScrollDirection();
  const headingY = getHeadingY();
  const footerY = getFooterY();
  if (entry.isIntersecting) {
    animateBox(entry.target, direction, headingY, footerY);
  }
}

// IntersectionObserver setup
function setupFeatureBoxAdvanced() {
  // Center alignment for box content
  document.querySelectorAll('.feature.box').forEach(box => {
    box.style.display = 'flex';
    box.style.justifyContent = 'center';
    box.style.alignItems = 'center';
    box.style.textAlign = 'center';
    box.classList.remove('visible');
    animatedMap.set(box, { down: false, up: false });
  });

  // Make observer fire when 60% of box is in view
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => handleBoxEntry(entry, observer));
  }, { threshold: 0.6 });

  document.querySelectorAll('.feature.box').forEach(box => observer.observe(box));
}

window.addEventListener('DOMContentLoaded', setupFeatureBoxAdvanced);
window.addEventListener('resize', setupFeatureBoxAdvanced); // Optional: rebind on resize

// For accessibility: If you want to reset animation on page reload, clear .visible and animatedMap
let lastScrollY = window.scrollY;
let scrollDirection = 'down';
const animatedMap = new Map(); // box => {down:bool, up:bool}

// Listen for scroll and update scrollDirection globally
window.addEventListener('scroll', () => {
  const curr = window.scrollY;
  scrollDirection = curr > lastScrollY ? 'down' : (curr < lastScrollY ? 'up' : scrollDirection);
  lastScrollY = curr;
}, { passive: true });

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

  let offsetY = 0;
  if (direction === 'down') {
    // Falling from heading
    const boxRect = box.getBoundingClientRect();
    const boxY = boxRect.top + window.scrollY;
    offsetY = boxY - headingY - 48;
    box.style.transform = `translateY(${-offsetY}px) scale(0.97)`;
  } else {
    // Rising from footer
    const boxRect = box.getBoundingClientRect();
    const boxY = boxRect.top + window.scrollY;
    offsetY = (footerY - boxY) + 48;
    box.style.transform = `translateY(${offsetY}px) scale(0.97)`;
  }
  box.style.opacity = '0';
  box.style.transition = 'none';

  // Force reflow
  void box.offsetWidth;

  // Animate to normal position, use a natural cubic-bezier
  box.style.transition = 'transform 0.65s cubic-bezier(.23,1.12,.56,1.01), opacity 0.5s';
  setTimeout(() => {
    box.classList.add('visible');
    box.style.transitionDelay = '0s';
    box.style.transform = '';
    box.style.opacity = '';
    if (direction === 'down') state.down = true;
    if (direction === 'up') state.up = true;
  }, 16); // 1 frame delay
}

function handleBoxEntry(entry) {
  const headingY = getHeadingY();
  const footerY = getFooterY();
  if (entry.isIntersecting) {
    animateBox(entry.target, scrollDirection, headingY, footerY);
  }
}

// IntersectionObserver setup
function setupFeatureBoxAdvanced() {
  document.querySelectorAll('.feature.box').forEach(box => {
    box.style.display = 'flex';
    box.style.justifyContent = 'center';
    box.style.alignItems = 'center';
    box.style.textAlign = 'center';
    box.classList.remove('visible');
    animatedMap.set(box, { down: false, up: false });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => handleBoxEntry(entry));
  }, { threshold: 0.6 });

  document.querySelectorAll('.feature.box').forEach(box => observer.observe(box));
}

window.addEventListener('DOMContentLoaded', setupFeatureBoxAdvanced);
window.addEventListener('resize', setupFeatureBoxAdvanced);

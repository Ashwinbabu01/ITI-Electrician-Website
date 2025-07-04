// Uses IntersectionObserver for per-box "falling" animation

function getHeadingY() {
  const heading = document.querySelector('.target-text');
  if (!heading) return 0;
  const rect = heading.getBoundingClientRect();
  return rect.top + window.scrollY;
}

function fallIn(box, headingY, index = 0) {
  if (box.classList.contains('visible')) return;

  // Get the Y position of the box
  const boxRect = box.getBoundingClientRect();
  const boxY = boxRect.top + window.scrollY;
  const fallDist = boxY - headingY - 48;

  // Set initial style for "falling" effect
  box.style.transform = `translateY(${-(fallDist)}px) scale(0.95)`;
  box.style.opacity = '0';
  box.style.transition = 'none';

  // Force reflow for the transition to take effect
  void box.offsetWidth;

  // Apply transition and animate to final position
  box.style.transition = 'transform 0.65s cubic-bezier(.19,1,.22,1), opacity 0.5s';
  setTimeout(() => {
    box.classList.add('visible');
    box.style.transitionDelay = '0s';
    box.style.transform = '';
    box.style.opacity = '';
  }, 20); // 20ms to allow browser to register the initial state
}

// Observer callback
function handleFeatureBox(entries, observer) {
  const headingY = getHeadingY();
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fallIn(entry.target, headingY);
      observer.unobserve(entry.target); // Animate only once
    }
  });
}

function setupFeatureBoxAnimations() {
  // For center alignment if not set
  document.querySelectorAll('.feature.box').forEach(box => {
    box.style.display = 'flex';
    box.style.justifyContent = 'center';
    box.style.alignItems = 'center';
    box.style.textAlign = 'center';
    box.classList.remove('visible'); // reset if needed
  });

  const observer = new IntersectionObserver(handleFeatureBox, {
    threshold: 0.6 // 60% of box must be visible before triggering
  });

  document.querySelectorAll('.feature.box').forEach(box => {
    observer.observe(box);
  });
}

window.addEventListener('DOMContentLoaded', setupFeatureBoxAnimations);
window.addEventListener('resize', () => {
  // Optional: re-calculate or re-observe on resize if large layout shifts are possible
});

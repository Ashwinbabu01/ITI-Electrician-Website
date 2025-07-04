// Glassmorph "fall from heading" animation for feature boxes with improved viewport trigger

function isInViewportHalf(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  // Trigger when the box's center is in the bottom half of the viewport or higher (50% visible)
  const elemCenter = rect.top + rect.height / 2;
  return elemCenter < windowHeight && elemCenter > 0;
}

function animateFeatureBoxes() {
  const boxes = Array.from(document.querySelectorAll('.feature.box'));
  if (boxes.length === 0) return;

  // Find the "target-text" heading to get its Y position
  const heading = document.querySelector('.target-text');
  let headingRect = heading ? heading.getBoundingClientRect() : null;
  let headingY = headingRect ? headingRect.top + window.scrollY : 0;

  // If any box is at least half in viewport, start animation
  let anyVisible = boxes.some(box => isInViewportHalf(box));
  if (!anyVisible) return;

  // Avoid reanimating boxes already animated and visible
  boxes.forEach(box => {
    box.classList.remove('visible');
    box.style.transitionDelay = '0s';
  });

  // Animate each box with delay and "fall" effect from the heading
  boxes.forEach((box, i) => {
    // Start position: just beneath the heading
    const boxRect = box.getBoundingClientRect();
    const boxY = boxRect.top + window.scrollY;
    const fallDist = boxY - headingY - 48; // 48px offset from heading

    box.style.transform = `translateY(${-(fallDist)}px) scale(0.95)`;
    box.style.opacity = '0';

    setTimeout(() => {
      box.classList.add('visible');
      box.style.transitionDelay = `${i * 0.25 + 0.5}s`; // stagger and initial delay
      box.style.transform = '';
      box.style.opacity = '';
    }, 80); // smaller timeout for snappier effect
  });
}

function handleScrollForFeatureBoxes() {
  // Only trigger if boxes are in viewport (50% or more)
  const boxes = document.querySelectorAll('.feature.box');
  if (boxes.length === 0) return;

  let anyInView = Array.from(boxes).some(isInViewportHalf);
  if (anyInView) animateFeatureBoxes();
}

// Re-animate every time boxes enter viewport
window.addEventListener('scroll', handleScrollForFeatureBoxes, { passive: true });
window.addEventListener('resize', handleScrollForFeatureBoxes);
window.addEventListener('DOMContentLoaded', () => {
  // Add center alignment for box text (in case not set)
  document.querySelectorAll('.feature.box').forEach(box => {
    box.style.display = 'flex';
    box.style.justifyContent = 'center';
    box.style.alignItems = 'center';
    box.style.textAlign = 'center';
  });
  handleScrollForFeatureBoxes();
});
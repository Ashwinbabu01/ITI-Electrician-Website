function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom > 0
  );
}

function animateFeatureBox(box, i, headingY) {
  const boxRect = box.getBoundingClientRect();
  const boxY = boxRect.top + window.scrollY;
  const fallDist = boxY - headingY - 48;

  box.style.transform = `translateY(${-(fallDist)}px) scale(0.95)`;
  box.style.opacity = '0';

  setTimeout(() => {
    box.classList.add('visible');
    box.style.transitionDelay = `${i * 0.15}s`; // lighter stagger, adjust if you want
    box.style.transform = '';
    box.style.opacity = '';
  }, 10); // almost instant
}

function handleScrollForFeatureBoxes() {
  const boxes = Array.from(document.querySelectorAll('.feature.box'));
  if (boxes.length === 0) return;

  const heading = document.querySelector('.target-text');
  let headingRect = heading ? heading.getBoundingClientRect() : null;
  let headingY = headingRect ? headingRect.top + window.scrollY : 0;

  boxes.forEach((box, i) => {
    if (!box.classList.contains('visible') && isInViewport(box)) {
      animateFeatureBox(box, i, headingY);
    }
  });
}

window.addEventListener('scroll', handleScrollForFeatureBoxes, { passive: true });
window.addEventListener('resize', handleScrollForFeatureBoxes);
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.feature.box').forEach(box => {
    box.style.display = 'flex';
    box.style.justifyContent = 'center';
    box.style.alignItems = 'center';
    box.style.textAlign = 'center';
    box.classList.remove('visible'); // reset on load
  });
  handleScrollForFeatureBoxes();
});

// Soft reveal-on-scroll effect for boxes
function revealOnScroll() {
  const boxes = document.querySelectorAll('.feature.box');
  const observer = new window.IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-effect');
        } else {
          entry.target.classList.remove('reveal-effect');
        }
      });
    },
    { threshold: 0.38 }
  );
  boxes.forEach(box => observer.observe(box));
}

// Click to reveal/hide content
function enableBoxToggle() {
  document.querySelectorAll('.feature.box').forEach(box => {
    box.addEventListener('click', function (e) {
      // Prevent link navigation if it's a link
      if (e.target === box || e.target.closest('.feature.box')) {
        box.classList.toggle('expanded');
      }
    });
  });
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  enableBoxToggle();
});
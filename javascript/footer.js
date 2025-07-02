document.addEventListener("DOMContentLoaded", () => {
  const designer = document.querySelector(".designer span");
  const columns = document.querySelectorAll(".footer-column");

  // Highlight designer text permanently
  if (designer) {
    designer.classList.add("highlight-animate");
  }

  // Add continuous scroll-triggered animation
  const animateOnScroll = () => {
    columns.forEach(col => {
      const rect = col.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        col.classList.add("visible");
      } else {
        col.classList.remove("visible");
      }
    });
  };

  // Trigger animation on load and scroll
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Initial call
});
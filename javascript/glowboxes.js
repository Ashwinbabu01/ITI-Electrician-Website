document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".feature.box");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      } else {
        entry.target.classList.remove("animate"); // repeat animation
      }
    });
  }, {
    threshold: 0.4
  });

  boxes.forEach(box => observer.observe(box));
});
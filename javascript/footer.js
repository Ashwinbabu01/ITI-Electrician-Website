document.addEventListener("DOMContentLoaded", () => {
  const designer = document.querySelector(".designer span");

  if (designer) {
    designer.classList.add("highlight-animate");
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".footer-column").forEach(el => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
});
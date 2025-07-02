document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".target-text");
  const boxes = [
    document.querySelector(".box3"),
    document.querySelector(".box2"),
    document.querySelector(".box1")
  ];

  let lastScrollY = window.scrollY;

  const animateBoxes = () => {
    boxes.forEach((box, i) => {
      setTimeout(() => {
        box.classList.add("show");
      }, i * 300);
    });
  };

  const resetBoxes = () => {
    boxes.forEach(box => box.classList.remove("show"));
  };

  const handleScroll = () => {
    const rect = target.getBoundingClientRect();
    const scrollingDown = window.scrollY > lastScrollY;
    lastScrollY = window.scrollY;

    if (scrollingDown && rect.top < window.innerHeight && rect.bottom > 0) {
      animateBoxes();
    } else if (rect.bottom < 0 || rect.top > window.innerHeight) {
      resetBoxes();
    }
  };

  window.addEventListener("scroll", handleScroll);
});
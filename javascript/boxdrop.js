document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".target-text");
  const boxes = [
    document.querySelector(".box3"),
    document.querySelector(".box2"),
    document.querySelector(".box1")
  ];

  let hasAnimated = false;

  const animateBoxes = () => {
    boxes.forEach((box, i) => {
      setTimeout(() => {
        box.classList.add("show");
      }, i * 300); // delay per box
    });
  };

  const resetBoxes = () => {
    boxes.forEach(box => box.classList.remove("show"));
  };

  const handleScroll = () => {
    const rect = target.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (inView && !hasAnimated) {
      hasAnimated = true;
      animateBoxes();
    } else if (!inView && hasAnimated) {
      hasAnimated = false;
      resetBoxes();
    }
  };

  window.addEventListener("scroll", handleScroll);
});
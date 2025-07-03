document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".target-text");
  const boxes = [
    document.querySelector(".box3"),
    document.querySelector(".box2"),
    document.querySelector(".box1")
  ];

  let animated = false;

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
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView && !animated) {
      animated = true;
      animateBoxes();
    } else if (!isInView && animated) {
      animated = false;
      resetBoxes();
    }
  };

  window.addEventListener("scroll", handleScroll);
});
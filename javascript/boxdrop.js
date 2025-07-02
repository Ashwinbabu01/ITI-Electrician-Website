document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".target-text");
  const boxes = [
    document.querySelector(".box3"),
    document.querySelector(".box2"),
    document.querySelector(".box1")
  ];

  let isInView = false;

  const animateBoxes = () => {
    boxes.forEach((box, index) => {
      setTimeout(() => {
        box.classList.add("show");
      }, index * 300);
    });
  };

  const resetBoxes = () => {
    boxes.forEach(box => box.classList.remove("show"));
  };

  const onScroll = () => {
    const rect = target.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;

    if (visible && !isInView) {
      isInView = true;
      animateBoxes();
    } else if (!visible && isInView) {
      isInView = false;
      resetBoxes();
    }
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // Initial check
});
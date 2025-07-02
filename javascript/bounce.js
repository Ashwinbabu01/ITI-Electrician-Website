
window.addEventListener('load', () => {
  const image = document.querySelector('.dropi');
  const text = document.querySelector('.dropt');

  // Remove animation classes in case of reload
  image.classList.remove('animate');
  text.classList.remove('animate');

  // Force reflow to reset animation
  void image.offsetWidth;
  void text.offsetWidth;

  // Add animation classes with delay
  setTimeout(() => {
    image.classList.add('animate');
  }, 100);

  setTimeout(() => {
    text.classList.add('animate');
  }, 400);
});

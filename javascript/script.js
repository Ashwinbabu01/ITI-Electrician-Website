
window.addEventListener('load', () => {
  const image = document.querySelector('.dropi');
  const text = document.querySelector('.dropt');

  // Ensure opacity is 0 before animation
  image.style.opacity = '0';
  text.style.opacity = '0';

  // Trigger animation after small delay
  setTimeout(() => {
    image.classList.add('dropi');  // animation already in CSS
  }, 100);

  setTimeout(() => {
    text.classList.add('dropt');
  }, 400);
});

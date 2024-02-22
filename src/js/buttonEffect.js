export const buttonEffect = () => {
  const searchBtn = document.querySelectorAll('.search-btn');

  searchBtn.forEach(button => {
    button.addEventListener('click', e => {
      const ANIMATION_SPEED = 500;

      let x = e.clientX - e.target.offsetLeft;
      let y = e.clientY - e.target.offsetTop;

      const ripple = document.createElement('div');
      ripple.classList.add('ripple-div');

      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, ANIMATION_SPEED);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.services-btn');
  const blocks = document.querySelectorAll('.services-cards');

  function showBlock(targetClass) {
    blocks.forEach(block => {
      block.classList.remove('active');
      block.style.display = 'none';
    });

    const target = document.querySelector(`.${targetClass}`);
    target.style.display = 'flex';
    setTimeout(() => target.classList.add('active'), 10);
  }

  showBlock('services-first-block');
  buttons[0].classList.add('active');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      if (button.classList.contains('services-first-btn')) {
        showBlock('services-first-block');
      } else if (button.classList.contains('services-second-btn')) {
        showBlock('services-second-block');
      } else if (button.classList.contains('services-third-btn')) {
        showBlock('services-third-block');
      } else if (button.classList.contains('services-fourth-btn')) {
        showBlock('services-fourth-block');
      } else if (button.classList.contains('services-fifth-btn')) {
        showBlock('services-fifth-block');
      }
    });
  });
});
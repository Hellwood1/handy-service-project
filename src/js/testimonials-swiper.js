import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.testimonials-swiper-init', {
  loop: true,
  navigation: {
    nextEl: '',
    prevEl: '',
  },
  allowTouchMove: true,
  autoHeight: true,
  slidesPerView: 'auto',
  spaceBetween: 12,
  centeredSlides: true,
});

document.querySelectorAll('')
  .forEach(btn => {
    btn.addEventListener('click', () => {
      btn.blur();
    });
  });

  // Ще не закінчив з наралшуванням під ПК!
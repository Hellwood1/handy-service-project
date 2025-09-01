import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.testimonials-swiper-init', {
  loop: false,
  slidesPerView: 1, // старт для мобільного
  spaceBetween: 12, // мобільний — 12px
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 24,
    },
    // десктоп і більше
    1440: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 94,
    },
  },
});
import dk from '../locales/dk.json';
import en from '../locales/en.json';

const translations = { dk, en };

function setFormTranslations(lang = 'dk') {
  const t = translations[lang];

  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const commentInput = document.getElementById('comment');

  if (nameInput) nameInput.placeholder = t['contact-form-name'] || '';
  if (phoneInput) phoneInput.placeholder = t['contact-form-number'] || '';
  if (commentInput) commentInput.placeholder = t['contact-form-comment'] || '';

  // Активна кнопка
  document.querySelectorAll('#btn-en, #btn-dk').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-${lang}`);
  if (activeBtn) activeBtn.classList.add('active');

  // зберегти вибір мови
  localStorage.setItem('siteLang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  // перевіряємо чи є вибір мови в localStorage
  const savedLang = localStorage.getItem('siteLang') || 'dk';

  setFormTranslations(savedLang);

  const btnEn = document.getElementById('btn-en');
  const btnDk = document.getElementById('btn-dk');

  if (btnEn) btnEn.addEventListener('click', () => setFormTranslations('en'));
  if (btnDk) btnDk.addEventListener('click', () => setFormTranslations('dk'));

  // Обробка сабміту форми
  const form = document.getElementById('contactForm');
  const thankYouDiv = document.getElementById('formThankYou');
  const closeBtn = document.getElementById('closeThankYou');
  const closeBtn2 = document.getElementById('closeThankYou2');


  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const comment = document.getElementById('comment').value.trim();

      console.log('Form data:', { name, phone, comment });

      form.reset();

      if (thankYouDiv) thankYouDiv.style.display = 'block';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (thankYouDiv) thankYouDiv.style.display = 'none';
    });
  }
  if (closeBtn2) {
    closeBtn2.addEventListener('click', () => {
      if (thankYouDiv) thankYouDiv.style.display = 'none';
    });
  }
});
import dk from '../locales/dk.json';
import en from '../locales/en.json';

const translations = { dk, en };

function setFormTranslations(lang = 'dk') {
  const t = translations[lang];

  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const commentInput = document.getElementById('comment');

  if (nameInput) nameInput.placeholder = t['contact-form-name'] || 'Ім\'я';
  if (phoneInput) phoneInput.placeholder = t['contact-form-number'] || 'Телефон';
  if (commentInput) commentInput.placeholder = t['contact-form-comment'] || 'Повідомлення';

  document.querySelectorAll('#btn-en, #btn-dk').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-${lang}`);
  if (activeBtn) activeBtn.classList.add('active');

  localStorage.setItem('siteLang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('siteLang') || 'dk';
  setFormTranslations(savedLang);

  const btnEn = document.getElementById('btn-en');
  const btnDk = document.getElementById('btn-dk');
  if (btnEn) btnEn.addEventListener('click', () => setFormTranslations('en'));
  if (btnDk) btnDk.addEventListener('click', () => setFormTranslations('dk'));

  const form = document.getElementById('contactForm');
  const thankYouDiv = document.getElementById('formThankYou');
  const closeBtn = document.getElementById('closeThankYou');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      if (thankYouDiv) thankYouDiv.style.display = 'block';
      form.reset();

      fetch(form.action, {
        method: 'POST',
        body: formData,
      }).catch(err => {
        console.error('Помилка при відправці форми:', err);
      });
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (thankYouDiv) thankYouDiv.style.display = 'none';
    });
  }
});
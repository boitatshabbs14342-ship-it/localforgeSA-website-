import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('audit-form');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('client-name').value;
      const business = document.getElementById('business-name').value;

      // Show operational feedback
      const modalTitle = document.getElementById('modal-title');
      const modalMessage = document.getElementById('modal-message');

      modalTitle.textContent = `Audit Request Received!`;
      modalMessage.textContent = `Thank you, ${name}. We have queued a local SEO & Google Maps diagnostic report for ${business}.`;

      modalOverlay.classList.remove('hidden');
      form.reset();
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.add('hidden');
    });
  }
});

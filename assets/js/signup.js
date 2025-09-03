document.addEventListener("DOMContentLoaded", () => {
  (function () {
    const form   = document.getElementById('early-access-form');
    const btn    = form.querySelector('button[type="submit"]');
    const wrap   = document.getElementById('signup-container');
    const thanks = document.getElementById('thankyou-message');
    const errBox = document.getElementById('signup-error');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const roleChecked = form.querySelector('input[name="entry.789540134"]:checked');
      if (!roleChecked) {
        form.querySelector('#role-student').focus();
        return;
      }
      const role = roleChecked.value;

      const originalText = btn.textContent;
      btn.disabled = true;
      if (btn.dataset.loadingText) btn.textContent = btn.dataset.loadingText;

      if (errBox) errBox.style.display = 'none';

      try {
        const fd = new FormData(form);
        await fetch(form.action, {
          method: 'POST',
          body: fd,
          mode: 'no-cors'
        });

        wrap.style.display = 'none';
        thanks.style.display = 'block';
        form.reset();

        gtag('event', 'signup', {
          role: role,
          form_type: 'early_access'
        });

      } catch (err) {
        if (errBox) errBox.style.display = 'block';
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  })();
});

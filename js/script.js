/* =========================================================
   TEKVANZA — script.js
   Hardened version: every feature runs independently so a
   missing element on one page never breaks another feature
   (most importantly, the language toggle).
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  const htmlRoot = document.getElementById('htmlRoot') || document.documentElement;
  function isAr() { return htmlRoot.getAttribute('lang') === 'ar'; }

  /* ---------- Preloader ---------- */
  try {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hide'), 300);
      });
      setTimeout(() => preloader.classList.add('hide'), 1500);
    }
  } catch (err) { console.error('Preloader error:', err); }

  /* ---------- Year ---------- */
  try {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  } catch (err) { console.error('Year error:', err); }

  /* ---------- Header scroll state ---------- */
  try {
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    if (header || backToTop) {
      const onScroll = () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 40);
        if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
      };
      window.addEventListener('scroll', onScroll);
      onScroll();
    }
  } catch (err) { console.error('Header/back-to-top error:', err); }

  /* ---------- Mobile menu ---------- */
  try {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('mainNav');
    if (burger && nav) {
      burger.setAttribute('aria-controls', 'mainNav');
      burger.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-label', isAr() ? 'القائمة الرئيسية' : 'Main navigation');
      const closeMenu = () => {
        burger.classList.remove('open');
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      };
      burger.addEventListener('click', () => {
        const isOpen = burger.classList.toggle('open');
        nav.classList.toggle('open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
      });
      nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.classList.contains('open')) {
          closeMenu();
          burger.focus();
        }
      });
    }
  } catch (err) { console.error('Mobile menu error:', err); }

  /* ==========================================================
     Language toggle (EN / AR)
     ========================================================== */
  try {
    const langToggle = document.getElementById('langToggle');
    const langLabel = document.getElementById('langLabel');

    const bilingualEls = document.querySelectorAll('[data-en][data-ar]');
    const titledEls = document.querySelectorAll('[data-title-en][data-title-ar]');
    const placeholderEls = document.querySelectorAll('[data-placeholder-en][data-placeholder-ar]');

    function applyLanguage(lang) {
      bilingualEls.forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text !== null) el.textContent = text;
      });
      titledEls.forEach(el => {
        const t = el.getAttribute('data-title-' + lang);
        if (t !== null) el.setAttribute('title', t);
      });
      placeholderEls.forEach(el => {
        const p = el.getAttribute('data-placeholder-' + lang);
        if (p !== null) el.setAttribute('placeholder', p);
      });

      if (lang === 'ar') {
        htmlRoot.setAttribute('lang', 'ar');
        htmlRoot.setAttribute('dir', 'rtl');
        if (langLabel) langLabel.textContent = 'English';
      } else {
        htmlRoot.setAttribute('lang', 'en');
        htmlRoot.setAttribute('dir', 'ltr');
        if (langLabel) langLabel.textContent = 'العربية';
      }

      try { localStorage.setItem('tekvanza_lang', lang); } catch (e) { /* ignore */ }

      // Re-apply dynamic phone hints (country-specific) since their text
      // is language-dependent too.
      document.querySelectorAll('.country-select').forEach(sel => {
        sel.dispatchEvent(new Event('change'));
      });
    }

    if (langToggle) {
      langToggle.addEventListener('click', () => {
        const current = htmlRoot.getAttribute('lang') === 'ar' ? 'ar' : 'en';
        applyLanguage(current === 'ar' ? 'en' : 'ar');
      });
    }

    let savedLang = null;
    try { savedLang = localStorage.getItem('tekvanza_lang'); } catch (e) { /* ignore */ }
    if (savedLang === 'ar' || savedLang === 'en') {
      applyLanguage(savedLang);
    }
  } catch (err) {
    console.error('Language toggle error:', err);
  }

  /* ---------- Scroll reveal ---------- */
  try {
    const revealTargets = document.querySelectorAll(
      '.vm-card, .service-card, .process-step, .info-card, .floating-card, .about-visual, .why-content, .contact-form, .project-card, .testimonial-card'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(el => revealObserver.observe(el));
  } catch (err) { console.error('Scroll reveal error:', err); }

  /* ---------- Counter animation ---------- */
  try {
    const counters = document.querySelectorAll('.num');
    let countersStarted = false;
    function animateCounters() {
      if (countersStarted) return;
      countersStarted = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          counter.textContent = current;
        }, 25);
      });
    }
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { animateCounters(); statsObserver.disconnect(); }
        });
      }, { threshold: 0.4 });
      statsObserver.observe(heroStats);
    }
  } catch (err) { console.error('Counter animation error:', err); }

  /* ---------- Projects filter (Projects page only) ---------- */
  try {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterBtns.length && projectCards.length) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.getAttribute('data-filter');
          projectCards.forEach(card => {
            const cat = card.getAttribute('data-category');
            card.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
          });
        });
      });
    }
  } catch (err) { console.error('Projects filter error:', err); }

  /* ---------- FAQ accordion ---------- */
  try {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          const otherQuestion = other.querySelector('.faq-question');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
          if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  } catch (err) { console.error('FAQ accordion error:', err); }

  /* ==========================================================
     GENERIC FORM FIELD VALIDATION MODULE
     ========================================================== */
  const Validation = (() => {
    const NAME_RE = /^[A-Za-z\u0600-\u06FF]+(?:[\s'-][A-Za-z\u0600-\u06FF]+)+$/;
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const MESSAGES = {
      required: { en: 'This field is required.', ar: 'هذا الحقل مطلوب.' },
      name: { en: 'Please enter your first and last name using letters only.', ar: 'برجاء إدخال الاسم الأول والأخير بحروف فقط.' },
      email: { en: 'Please enter a valid email address.', ar: 'برجاء إدخال بريد إلكتروني صحيح.' },
      phoneLength: { en: 'Phone number length does not match the selected country.', ar: 'عدد أرقام الهاتف لا يتطابق مع الدولة المختارة.' },
      minLength: { en: 'This field is too short.', ar: 'هذا الحقل قصير جدًا.' },
      selectRequired: { en: 'Please select an option.', ar: 'برجاء اختيار قيمة.' }
    };

    function msg(key) { return isAr() ? MESSAGES[key].ar : MESSAGES[key].en; }

    function setState(input, errorEl, valid, message) {
      if (valid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        if (errorEl) errorEl.textContent = '';
      } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        if (errorEl) errorEl.textContent = message || '';
      }
      return valid;
    }

    function clearState(input, errorEl) {
      input.classList.remove('is-invalid', 'is-valid');
      if (errorEl) errorEl.textContent = '';
    }

    function validateName(input, errorEl) {
      const value = input.value.trim();
      if (!value) return setState(input, errorEl, false, msg('required'));
      if (value.length < (parseInt(input.getAttribute('minlength'), 10) || 3)) {
        return setState(input, errorEl, false, msg('minLength'));
      }
      if (!NAME_RE.test(value)) return setState(input, errorEl, false, msg('name'));
      return setState(input, errorEl, true);
    }

    function validateEmail(input, errorEl) {
      const value = input.value.trim();
      if (!value) return setState(input, errorEl, false, msg('required'));
      if (!EMAIL_RE.test(value)) return setState(input, errorEl, false, msg('email'));
      return setState(input, errorEl, true);
    }

    function validatePhone(input, errorEl, countrySelect) {
      const digits = input.value.replace(/\D/g, '');
      if (input.value !== digits) input.value = digits;
      if (!digits) return setState(input, errorEl, false, msg('required'));
      const expectedDigits = countrySelect && countrySelect.selectedOptions[0]
        ? parseInt(countrySelect.selectedOptions[0].getAttribute('data-digits'), 10)
        : null;
      if (expectedDigits && digits.length !== expectedDigits) {
        return setState(input, errorEl, false, msg('phoneLength'));
      }
      return setState(input, errorEl, true);
    }

    function validateRequiredText(input, errorEl) {
      const value = input.value.trim();
      const minLen = parseInt(input.getAttribute('minlength'), 10) || 0;
      if (!value) return setState(input, errorEl, false, msg('required'));
      if (minLen && value.length < minLen) return setState(input, errorEl, false, msg('minLength'));
      return setState(input, errorEl, true);
    }

    function validateSelectRequired(select, errorEl) {
      if (!select.value) return setState(select, errorEl, false, msg('selectRequired'));
      return setState(select, errorEl, true);
    }

    function shake(el) {
      el.classList.remove('shake');
      void el.offsetWidth;
      el.classList.add('shake');
    }

    return { validateName, validateEmail, validatePhone, validateRequiredText, validateSelectRequired, clearState, shake, msg };
  })();

  /* ==========================================================
     Dynamic phone hint + placeholder based on selected country
     ========================================================== */
  function wireCountryHint(selectId, inputId, hintId, errorId) {
    try {
      const select = document.getElementById(selectId);
      const input = document.getElementById(inputId);
      const hint = document.getElementById(hintId);
      const errorEl = errorId ? document.getElementById(errorId) : null;
      if (!select || !input || !hint) return;

      function refresh() {
        const opt = select.selectedOptions[0];
        if (!opt) return;
        const hintText = opt.getAttribute(isAr() ? 'data-hint-ar' : 'data-hint-en');
        if (hintText) hint.textContent = hintText;
        const ph = opt.getAttribute('data-ph');
        if (ph) input.setAttribute('placeholder', ph);
        if (input.value && errorEl) Validation.validatePhone(input, errorEl, select);
      }

      select.addEventListener('change', refresh);
      refresh();
    } catch (err) {
      console.error('Country hint wiring error (' + selectId + '):', err);
    }
  }
  wireCountryHint('countryCode', 'phoneInput', 'phoneHint', 'phoneError');
  wireCountryHint('careerCountryCode', 'careerPhoneInput', 'careerPhoneHint', 'careerPhoneError');

  /* ==========================================================
     Contact form — real-time validation + AJAX submit
     ========================================================== */
  try {
    const contactForm = document.getElementById('contactForm');
    const formNote = document.getElementById('formNote');
    const submitBtn = document.getElementById('submitBtn');
    const nameInput = document.getElementById('nameInput');
    const nameError = document.getElementById('nameError');
    const emailInput = document.getElementById('emailInput');
    const emailError = document.getElementById('emailError');
    const phoneInput = document.getElementById('phoneInput');
    const phoneError = document.getElementById('phoneError');
    const phoneFull = document.getElementById('phoneFull');
    const countryCode = document.getElementById('countryCode');
    const messageInput = document.getElementById('messageInput');
    const messageError = document.getElementById('messageError');

    function syncContactPhone() {
      if (!countryCode || !phoneInput || !phoneFull) return;
      const code = countryCode.value;
      const digits = phoneInput.value.replace(/\D/g, '');
      phoneFull.value = digits ? `+${code}${digits}` : '';
    }

    if (contactForm) {
      if (nameInput) {
        nameInput.addEventListener('input', () => Validation.validateName(nameInput, nameError));
        nameInput.addEventListener('blur', () => Validation.validateName(nameInput, nameError));
      }
      if (emailInput) {
        emailInput.addEventListener('input', () => Validation.validateEmail(emailInput, emailError));
        emailInput.addEventListener('blur', () => Validation.validateEmail(emailInput, emailError));
      }
      if (phoneInput) {
        phoneInput.addEventListener('input', () => { Validation.validatePhone(phoneInput, phoneError, countryCode); syncContactPhone(); });
        phoneInput.addEventListener('blur', () => Validation.validatePhone(phoneInput, phoneError, countryCode));
      }
      if (countryCode) {
        countryCode.addEventListener('change', () => {
          syncContactPhone();
          if (phoneInput && phoneInput.value) Validation.validatePhone(phoneInput, phoneError, countryCode);
        });
      }
      if (messageInput) {
        messageInput.addEventListener('input', () => Validation.validateRequiredText(messageInput, messageError));
        messageInput.addEventListener('blur', () => Validation.validateRequiredText(messageInput, messageError));
      }

      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        syncContactPhone();

        let valid = true;
        if (nameInput && !Validation.validateName(nameInput, nameError)) { valid = false; Validation.shake(nameInput); }
        if (emailInput && !Validation.validateEmail(emailInput, emailError)) { valid = false; Validation.shake(emailInput); }
        if (phoneInput && !Validation.validatePhone(phoneInput, phoneError, countryCode)) { valid = false; Validation.shake(phoneInput); }
        if (messageInput && !Validation.validateRequiredText(messageInput, messageError)) { valid = false; Validation.shake(messageInput); }

        if (!valid) {
          if (formNote) {
            formNote.textContent = isAr() ? '⚠️ برجاء تصحيح الحقول المظللة باللون الأحمر قبل الإرسال.' : '⚠️ Please correct the highlighted fields before submitting.';
            formNote.className = 'form-note error';
          }
          const firstInvalid = contactForm.querySelector('.is-invalid');
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        if (!formNote || !submitBtn) return;
        const endpoint = contactForm.getAttribute('action');
        if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
          formNote.textContent = isAr() ? '⚠️ لسه محتاج تحط رابط Formspree بتاعك في الكود (action attribute).' : '⚠️ Please set your Formspree endpoint in the form action attribute.';
          formNote.className = 'form-note error';
          return;
        }
        submitBtn.disabled = true;
        const originalLabel = submitBtn.textContent;
        submitBtn.textContent = isAr() ? 'جارٍ الإرسال...' : 'Sending...';
        try {
          const formData = new FormData(contactForm);
          const response = await fetch(endpoint, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
          if (response.ok) {
            formNote.textContent = isAr() ? '✅ تم استلام رسالتك بنجاح، سنتواصل معك في أقرب وقت.' : '✅ Your message has been sent successfully. We will contact you shortly.';
            formNote.className = 'form-note success';
            contactForm.reset();
            if (nameInput) Validation.clearState(nameInput, nameError);
            if (emailInput) Validation.clearState(emailInput, emailError);
            if (phoneInput) Validation.clearState(phoneInput, phoneError);
            if (messageInput) Validation.clearState(messageInput, messageError);
          } else {
            throw new Error('Submission failed with status ' + response.status);
          }
        } catch (err) {
          console.error('Form submission error:', err);
          formNote.textContent = isAr() ? '❌ حدث خطأ أثناء الإرسال، برجاء المحاولة مرة أخرى أو التواصل عبر الهاتف.' : '❌ Something went wrong. Please try again or contact us by phone.';
          formNote.className = 'form-note error';
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
          setTimeout(() => { formNote.textContent = ''; formNote.className = 'form-note'; }, 7000);
        }
      });
    }
  } catch (err) { console.error('Contact form error:', err); }

  /* Careers submissions use the mailto link on careers.html; no upload form is configured. */

  /* ---------- Animated network canvas (hero) ---------- */
  try {
    const canvas = document.getElementById('networkCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let particles = [];
      let width, height;
      function resize() { width = canvas.width = canvas.offsetWidth; height = canvas.height = canvas.offsetHeight; }
      function initParticles() {
        const count = Math.min(70, Math.floor((width * height) / 18000));
        particles = Array.from({ length: count }, () => ({
          x: Math.random() * width, y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.6 + 0.6
        }));
      }
      function draw() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        });
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i], b = particles[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) {
              ctx.strokeStyle = `rgba(62,198,255,${0.16 * (1 - dist / 140)})`;
              ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
        }
        particles.forEach(p => {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(100,209,255,0.8)'; ctx.fill();
        });
        requestAnimationFrame(draw);
      }
      resize(); initParticles(); draw();
      window.addEventListener('resize', () => { resize(); initParticles(); });
    }
  } catch (err) { console.error('Network canvas error:', err); }

  /* Technology list is static; no carousel animation is required. */

});

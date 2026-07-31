/* Villa Dew — the only script on the page. Kept deliberately small. */
(function () {
  'use strict';

  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Sticky bar appears once the hero is behind you. */
  var bar = document.getElementById('bar');
  var hero = document.getElementById('top');
  if (bar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      bar.classList.toggle('is-on', !entries[0].isIntersecting);
    }, { rootMargin: '-70% 0px 0px 0px' }).observe(hero);
  }

  /* Section reveals on scroll. */
  if (!calm && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.story__head, .story__body, .breath, .triad, .band,' +
      '.villa__title, .villa__intro, .facts, .villa .pull,' +
      '.gallery__title, .mosaic > *, .location__grid > *, .cta__inner > *'
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });

    targets.forEach(function (el, i) {
      el.classList.add('o');
      el.style.transitionDelay = (i % 4) * 90 + 'ms';
      io.observe(el);
    });
  }

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* Peek: hovering (or focusing / tapping) a marked place name shows its photo. */
  var peeks = document.querySelectorAll('.peek');
  if (peeks.length) {
    var card = document.createElement('figure');
    card.className = 'peekcard';
    card.setAttribute('aria-hidden', 'true');
    var img = new Image();
    img.alt = '';
    var cap = document.createElement('figcaption');
    card.appendChild(img);
    card.appendChild(cap);
    document.body.appendChild(card);

    var current = null;

    function place(el) {
      var r = el.getBoundingClientRect();
      var cw = card.offsetWidth || 320;
      var ch = card.offsetHeight || 260;
      var x = Math.min(Math.max(r.left + r.width / 2 - cw / 2, 12), innerWidth - cw - 12);
      var y = r.top - ch - 14;               /* prefer above the term */
      if (y < 12) y = r.bottom + 14;          /* fall below if no room */
      card.style.left = x + 'px';
      card.style.top = y + 'px';
    }

    function show(el) {
      current = el;
      img.src = 'assets/img/' + el.getAttribute('data-peek') + '.webp';
      cap.textContent = el.getAttribute('data-cap') || '';
      place(el);
      if (img.complete) { card.classList.add('is-on'); place(el); }
      else img.onload = function () { if (current === el) { card.classList.add('is-on'); place(el); } };
    }
    function hide() { current = null; card.classList.remove('is-on'); }

    peeks.forEach(function (el) {
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', el.textContent.trim() + ' — photo preview');
      el.addEventListener('mouseenter', function () { show(el); });
      el.addEventListener('mouseleave', hide);
      el.addEventListener('focus', function () { show(el); });
      el.addEventListener('blur', hide);
      el.addEventListener('click', function (e) {   /* touch: tap toggles */
        e.preventDefault();
        current === el ? hide() : show(el);
      });
    });
    addEventListener('scroll', function () { if (current) place(current); }, { passive: true });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
    document.addEventListener('pointerdown', function (e) {
      if (current && !e.target.closest('.peek')) hide();
    });
  }
})();

// Dark mode toggle, persisted per visitor
(function () {
  const KEY = 'kevin-otieno-theme';
  const saved = localStorage.getItem(KEY);
  if (saved === 'dark') document.body.classList.add('dark-mode');

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.textContent = document.body.classList.contains('dark-mode') ? '☀' : '☾';
    btn.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem(KEY, isDark ? 'dark' : 'light');
      btn.textContent = isDark ? '☀' : '☾';
    });
  });
})();

// Scroll-reveal for elements marked .reveal
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(function (el) { observer.observe(el); });
});

// Animated counters for elements with data-count-to
document.addEventListener('DOMContentLoaded', function () {
  const counters = document.querySelectorAll('.count-target');
  if (!counters.length) return;
  const animate = function (el) {
    const target = parseFloat(el.getAttribute('data-count-to'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : 0;
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(function (el) { observer.observe(el); });
});

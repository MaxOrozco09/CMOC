// shared.js — nav, footer, scroll reveal, canvas bg

const LOGO_SVG = `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="18" cy="18" r="17" stroke="#00E5CC" stroke-width="1.4"/>
  <rect x="16" y="5"  width="4" height="4" rx="0.8" fill="white"/>
  <rect x="12" y="11" width="4" height="4" rx="0.8" fill="white"/>
  <rect x="16" y="11" width="4" height="4" rx="0.8" fill="#00E5CC"/>
  <rect x="20" y="11" width="4" height="4" rx="0.8" fill="white"/>
  <rect x="8"  y="17" width="4" height="4" rx="0.8" fill="white"/>
  <rect x="12" y="17" width="4" height="4" rx="0.8" fill="#00E5CC" opacity="0.35"/>
  <rect x="16" y="17" width="4" height="4" rx="0.8" fill="#00E5CC"/>
  <rect x="20" y="17" width="4" height="4" rx="0.8" fill="#00E5CC" opacity="0.35"/>
  <rect x="24" y="17" width="4" height="4" rx="0.8" fill="white"/>
  <rect x="16" y="23" width="4" height="4" rx="0.8" fill="white"/>
  <rect x="16" y="29" width="4" height="4" rx="0.8" fill="#00E5CC"/>
</svg>`;

function injectNav(activePage) {
  const pages = [
    { href: 'index.html',     label: 'Inicio' },
    { href: 'servicios.html', label: 'Servicios' },
    { href: 'nosotros.html',  label: 'Nosotros' },
    { href: 'proceso.html',   label: 'Proceso' },
    { href: 'contacto.html',  label: 'Contacto', cta: true },
  ];

  const links = pages.map(p => {
    const isActive = p.href === activePage;
    const cls = [isActive ? 'active' : '', p.cta ? 'nav-cta' : ''].filter(Boolean).join(' ');
    return `<li><a href="${p.href}" class="${cls}">${p.label}</a></li>`;
  }).join('');

  document.getElementById('nav-placeholder').innerHTML = `
  <nav>
    <a href="index.html" class="nav-logo">
      ${LOGO_SVG}
      <div class="nav-wordmark">
        <b>CMOC DIGITAL CONSULTING</b>
        <small>TECH · STRATEGY · GROWTH</small>
      </div>
    </a>
    <ul class="nav-links">${links}</ul>
  </nav>`;
}

function injectFooter() {
  document.getElementById('footer-placeholder').innerHTML = `
  <footer>
    <div class="footer-top">
      <div class="footer-brand">
        <a href="index.html" class="nav-logo" style="margin-bottom:0.5rem;">
          ${LOGO_SVG}
          <div class="nav-wordmark"><b>CMOC DIGITAL CONSULTING</b><small>TECH · STRATEGY · GROWTH</small></div>
        </a>
        <p>Transformamos negocios con tecnología de clase mundial. Soluciones digitales hechas a la medida para empresas que quieren crecer sin límites.</p>
      </div>
      <div class="footer-col">
        <h5>Servicios</h5>
        <ul>
          <li><a href="servicios.html#consultoria">Consultoría</a></li>
          <li><a href="servicios.html#automatizacion">Automatización</a></li>
          <li><a href="servicios.html#presencia">Presencia Digital</a></li>
          <li><a href="servicios.html#desarrollo">Desarrollo</a></li>
          <li><a href="servicios.html#it">Gestión IT</a></li>
          <li><a href="servicios.html#marketing">Marketing</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Empresa</h5>
        <ul>
          <li><a href="nosotros.html">Nosotros</a></li>
          <li><a href="proceso.html">Nuestro proceso</a></li>
          <li><a href="contacto.html">Contacto</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Contacto</h5>
        <ul>
          <li><a href="mailto:contacto@cmocdigital.mx">contacto@cmocdigital.mx</a></li>
          <li><a href="https://wa.me/521550000000" target="_blank">WhatsApp</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 CMOC Digital — Todos los derechos reservados</p>
      <p>Hecho con precisión y propósito</p>
    </div>
  </footer>`;
}

// ── CANVAS PARTICLE BG ──
function initParticleBg(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const TEAL = '#00E5CC';
  const COUNT = 72;
  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.3,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    alpha: Math.random() * 0.5 + 0.08,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Connect lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,229,204,${0.07 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,229,204,${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// ── GRID PULSE BG ──
function initGridPulse(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let t = 0;
  const CELL = 48;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t += 0.008;

    const cols = Math.ceil(canvas.width  / CELL) + 1;
    const rows = Math.ceil(canvas.height / CELL) + 1;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * CELL;
        const y = j * CELL;
        const wave = Math.sin(t + i * 0.4 + j * 0.4) * 0.5 + 0.5;
        const alpha = wave * 0.045;

        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,204,${alpha})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ── SCROLL REVEAL ──
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', initReveal);

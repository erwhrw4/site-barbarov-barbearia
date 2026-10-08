/* ============================================================
   VON BARBAROV — ECOSSISTEMA DIGITAL
   JavaScript Principal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- HEADER: SCROLL EFFECT ---------- */
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  /* ---------- MENU TOGGLE (MOBILE) ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('open');
      nav.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Fechar menu ao clicar em um link
    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- REVEAL ANIMATIONS (Intersection Observer) ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: mostrar tudo se IntersectionObserver não for suportado
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ---------- SERVICE CATEGORY FILTER (SERVIÇOS) ---------- */
  const categoryFilters = document.querySelectorAll('.category-filter');
  const serviceItems = document.querySelectorAll('.service-item');

  if (categoryFilters.length > 0 && serviceItems.length > 0) {
    categoryFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Ativar botão
        categoryFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        const category = filter.dataset.category;

        serviceItems.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = '';
            setTimeout(() => item.classList.add('visible'), 50);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- UNITS TABS (UNIDADES) ---------- */
  const unitsTabs = document.querySelectorAll('.units-tab');
  const unitPanels = document.querySelectorAll('.unit-panel');

  if (unitsTabs.length > 0 && unitPanels.length > 0) {
    unitsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const unitId = tab.dataset.unit;

        // Ativar tab
        unitsTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Mostrar painel correspondente
        unitPanels.forEach(panel => {
          panel.classList.remove('active');
          if (panel.id === `panel-${unitId}`) {
            panel.classList.add('active');
          }
        });
      });
    });
  }

  /* ---------- SMOOTH SCROLL PARA ÂNCORAS INTERNAS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- LAZY LOADING DE IMAGENS (fallback nativo) ---------- */
  // O atributo loading="lazy" já está presente nas imagens.
  // Esta é uma verificação para navegadores que não suportam.

  if (!('loading' in HTMLImageElement.prototype)) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
          }
        });
      });
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  /* ---------- BOTÃO AGENDAR: LINK CONFIGURÁVEL ---------- */
  // Todos os botões "AGENDAR" apontam para o sistema CashBarber.
  // Para alterar o link, modifique diretamente no HTML ou use esta função:
  // window.VON_BARBAROV_AGENDAR_URL = 'https://...';

  const agendarButtons = document.querySelectorAll('a[href*="cashbarber.com.br"]');
  agendarButtons.forEach(btn => {
    // Garantir que abre em nova aba
    if (!btn.hasAttribute('target')) {
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
    }
  });

});
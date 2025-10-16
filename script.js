// === Глобальные переменные ===
  let isModalOpen = false;

  // === Instagram Modal ===
  const instagramModal = document.getElementById('instagramModal');
  const instagramContent = document.getElementById('instagramContent');
  const closeInstagramBtn = document.getElementById('closeInstagram');

  function openInstagramModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    closeMenu();
    isModalOpen = true;
    instagramModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => instagramContent.classList.add('active'), 10);
  }

  function closeInstagramModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    instagramContent.classList.remove('active');
    setTimeout(() => {
      instagramModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      isModalOpen = false;
    }, 300);
  }

  // === WhatsApp Modal ===
  const whatsappModal = document.getElementById('whatsappModal');
  const whatsappContent = document.getElementById('whatsappContent');
  const closeWhatsAppBtn = document.getElementById('closeWhatsApp');

  function openWhatsAppModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    closeMenu();
    isModalOpen = true;
    whatsappModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => whatsappContent.classList.add('active'), 10);
  }

  function closeWhatsAppModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    whatsappContent.classList.remove('active');
    setTimeout(() => {
      whatsappModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      isModalOpen = false;
    }, 300);
  }

  // === Calculator Modal ===
  const calculatorModal = document.getElementById('calculatorModal');
  const calculatorContent = document.getElementById('calculatorContent');
  const closeCalculatorBtn = document.getElementById('closeCalculator');

  function openCalculator(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    closeMenu();
    isModalOpen = true;
    calculatorModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      calculatorContent.classList.add('active');
      // Автофокус на первое поле
      document.getElementById('length').focus();
    }, 10);
  }

  function closeCalculator(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    calculatorContent.classList.remove('active');
    setTimeout(() => {
      calculatorModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      isModalOpen = false;
    }, 300);
  }

  // === Hamburger Menu ===
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuContent = document.getElementById('menuContent');
  const closeMenuBtn = document.getElementById('closeMenu');

  function openMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    isModalOpen = true;
    menuOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => menuContent.classList.add('active'), 10);
  }

  function closeMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    menuContent.classList.remove('active');
    setTimeout(() => {
      menuOverlay.style.display = 'none';
      document.body.style.overflow = 'auto';
      isModalOpen = false;
    }, 300);
  }


// === Инициализация обработчиков событий ===
function initializeEventHandlers() {
  // Защита от двойных срабатываний
  let lock = false;
  function safeRun(fn, e) {
    if (lock) return;
    lock = true;
    fn(e);
    setTimeout(() => lock = false, 500);
  }

  // Кнопки закрытия модальных окон
  const closeInstagramBtn = document.getElementById('closeInstagram');
  const closeWhatsAppBtn = document.getElementById('closeWhatsApp');
  const closeCalculatorBtn = document.getElementById('closeCalculator');
  const closeMenuBtn = document.getElementById('closeMenu');

  [closeInstagramBtn, closeWhatsAppBtn, closeCalculatorBtn, closeMenuBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (btn === closeInstagramBtn) safeRun(closeInstagramModal, e);
        if (btn === closeWhatsAppBtn) safeRun(closeWhatsAppModal, e);
        if (btn === closeCalculatorBtn) safeRun(closeCalculator, e);
        if (btn === closeMenuBtn) safeRun(closeMenu, e);
      }, { passive: false });
    }
  });

  // Гамбургер (открытие меню)
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      safeRun(openMenu, e);
    }, { passive: false });
  }

  // CTA кнопки (Рассчитать / Связаться) - ИСКЛЮЧАЕМ КНОПКУ КАРТЫ
  const ctaButtons = document.querySelectorAll('.cta-btn:not(.map-btn)');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (btn.classList.contains('primary')) safeRun(openCalculator, e);
      if (btn.classList.contains('secondary')) safeRun(openWhatsAppModal, e);
    }, { passive: false });
  });

  // Закрытие при клике по фону
  const modals = [
    { modal: document.getElementById('instagramModal'), close: closeInstagramModal },
    { modal: document.getElementById('whatsappModal'), close: closeWhatsAppModal },
    { modal: document.getElementById('calculatorModal'), close: closeCalculator },
    { modal: document.getElementById('menuOverlay'), close: closeMenu }
  ];
  modals.forEach(item => {
    if (item.modal) {
      item.modal.addEventListener('click', (e) => {
        if (e.target === item.modal) safeRun(item.close, e);
      });
    }
  });

  // Кнопка карты - разрешаем стандартное поведение ссылки
  const mapBtn = document.querySelector('.cta-btn.map-btn');
  if (mapBtn) {
    mapBtn.addEventListener('click', (e) => {
      // НЕ блокируем стандартное поведение - ссылка откроется нормально
      // Только останавливаем всплытие, чтобы другие обработчики не сработали
      e.stopPropagation();
    });
  }
}


  // === Calculator Functions ===
  function validateCalculator() {
    const length = document.getElementById('length').value;
    const width = document.getElementById('width').value;
    
    if (!length || !width || length <= 0 || width <= 0) {
      alert('Пожалуйста, заполните длину и ширину комнаты корректными значениями');
      return false;
    }
    
    return true;
  }

  function calculateCost() {
    if (!validateCalculator()) return;
    
    const length = parseFloat(document.getElementById('length').value) || 0;
    const width = parseFloat(document.getElementById('width').value) || 0;
    
    const area = length * width;
    const costPerM2 = 1000;
    const total = area * costPerM2;

    document.getElementById('areaResult').textContent = area.toFixed(1) + ' м²';
    document.getElementById('totalCost').textContent = total.toLocaleString('ru-RU') + ' ₸';

    document.getElementById('calculatorResult').classList.add('show');
  }

  function clearCalculator() {
    document.getElementById('length').value = '';
    document.getElementById('width').value = '';
    document.getElementById('calculatorResult').classList.remove('show');
  }

  // === Раскрывающиеся контакты ===
  function toggleNumbers() {
    const numbersList = document.getElementById('numbersList');
    const expandBtn = document.querySelector('.expand-btn');
    
    numbersList.style.display = numbersList.style.display === 'block' ? 'none' : 'block';
    expandBtn.parentElement.classList.toggle('expanded');
  }

  // === Scroll Animation ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

  // === Smooth scrolling for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // === Fix for mobile viewport height ===
  function setVH() {
    let vh = window.innerHeight * 0.01;
    newFunction();

    function newFunction() {
      document.documentElement.style.setProperty('--vh', '${ vh }px');
    }
  }

  setVH();
  window.addEventListener('resize', setVH);

  // === Scroll to Top ===
  const scrollToTopBtn = document.getElementById('scrollToTop');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.display = 'flex';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });

  // === Инициализация при загрузке ===
  document.addEventListener('DOMContentLoaded', function() {
    initializeEventHandlers();
  });
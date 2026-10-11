(function () {
  const lb = document.getElementById('lb');
  const lbImg = document.getElementById('lbimg');
  const closeBtn = lb ? lb.querySelector('.close') : null;
  let lastFocus = null;
  let scrollY = 0;
  let isOpen = false;

  function openImage(src, trigger) {
    if (!lb || !lbImg || !src) return;
    lastFocus = trigger || document.activeElement;
    scrollY = window.scrollY || window.pageYOffset || 0;
    lbImg.src = src;
    lbImg.classList.add('show');
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lb-open');
    document.body.style.top = '-' + scrollY + 'px';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    isOpen = true;
    if (closeBtn) closeBtn.focus();
  }

  function closeLB() {
    if (!lb || !lbImg || !isOpen) return;
    lb.classList.remove('open');
    lbImg.classList.remove('show');
    lbImg.removeAttribute('src');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lb-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
    isOpen = false;
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
    lastFocus = null;
  }

  function backdropClose(event) {
    if (event.target === lb) closeLB();
  }

  window.openImage = function (srcOrBtn) {
    if (typeof srcOrBtn === 'string') {
      openImage(srcOrBtn, document.activeElement);
      return;
    }
    if (srcOrBtn && srcOrBtn.querySelector) {
      const img = srcOrBtn.querySelector('img');
      if (img && img.src) openImage(img.src, srcOrBtn);
    }
  };
  window.closeLB = closeLB;

  if (lb) {
    lb.addEventListener('click', backdropClose);
    lb.setAttribute('aria-hidden', 'true');
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Увеличенное изображение');
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      closeLB();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (!isOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLB();
      return;
    }
    if (event.key === 'Tab' && closeBtn) {
      event.preventDefault();
      closeBtn.focus();
    }
  });
})();

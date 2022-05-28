'use strict';

(function (window, document, undefined) {
  /* global gsap */

  var _progressStart = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 1,
    defaults: {
      duration: 1,
      ease: 'power2.inOut',
    },
  });
  var _progressComplete = gsap.timeline({
    paused: true,
    defaults: {
      duration: 1,
      ease: 'power2.inOut',
    },
  });

  function initialize() {
    init();
  }

  function init() {
    document.querySelectorAll('#secondary a').forEach((anchor) => {
      anchor.addEventListener('click', handleSecondary);
    });
    document.querySelectorAll('#tertiary a').forEach((anchor) => {
      anchor.addEventListener('click', handleTertiary);
    });
    document.getElementById('iframe').addEventListener('load', handleIframe);

    createProgressbar();
  }

  /**
   * Event Listeners
   */

  function handleSecondary(e) {
    if (/^((https?|ftp):)?\/\//.test(this.getAttribute('href'))) {
      return;
    }

    e.preventDefault();

    setProgressStart();
    setActiveClass(this.parentElement);
    setIframeSrc(this.getAttribute('href'));
    setSidebarMerge(this);

    if (/^#/.test(this.getAttribute('href'))) {
      setHashString(this);
    }

    return false;
  }

  function handleTertiary(e) {
    if (/^((https?|ftp):)?\/\//.test(this.getAttribute('href'))) {
      return;
    }

    e.preventDefault();

    setProgressStart();
    setActiveClass(this.parentElement);
    setIframeSrc(this.getAttribute('href'));

    return false;
  }

  function handleIframe() {
    _progressStart.timeScale(2).tweenFromTo(0, 1, {
      onComplete: () => {
        _progressComplete.timeScale(2).tweenFromTo(0, 1);
      },
    });

    const body = this.contentWindow.document.body;
    this.width = body.scrollWidth;
    this.height = body.scrollHeight;
  }

  /**
   * Progressbar
   */

  function createProgressbar() {
    const div = document.getElementById('progress-bar');
    const divStyle =
      '\
      overflow: hidden;\
      position: relative;\
      width: 100%;\
      height: 3px;\
      background-color: transparent;\
    ';
    setStyle(div, divStyle);

    const span = document.createElement('span');
    const spanStyle =
      '\
      display: block;\
      position: absolute;\
      top: 0;\
      left: 0;\
      width: 0;\
      height: 100%;\
      background-color: #ba2d0b;\
      background-image: linear-gradient(319deg, #ba2d0b 0%, #fe7f2d 37%, #ffbf46 100%);\
    ';
    setStyle(span, spanStyle);

    _progressStart.fromTo(span, { left: 0, width: 0 }, { left: 0, width: '100%' });
    _progressComplete.fromTo(span, { left: 0, width: '100%' }, { left: '200%', width: 0 });

    div.appendChild(span);

    return div;
  }

  /**
   * Setter
   */

  function setSidebarMerge(anchor) {
    if (!document.body.matches('.has-sidebar--2')) {
      return;
    }
    const main = document.getElementById('primary');
    const sidebar2 = document.getElementById('tertiary');
    const width = window.getComputedStyle(sidebar2).getPropertyValue('width');

    if (anchor.hasAttribute('data-sidebar-merge')) {
      main.style.setProperty('width', 'calc(100% - ' + width + ')');
      sidebar2.style.setProperty('display', 'none');
    } else {
      main.style.setProperty('width', null);
      sidebar2.style.setProperty('display', null);
    }
  }

  function setHashString(anchor) {
    const hashElement = document.querySelector(anchor.hash);

    [].slice.call(hashElement.parentElement.children).forEach((sibling) => {
      sibling !== hashElement && sibling.style.setProperty('display', 'none');
    });

    hashElement.style.setProperty('display', 'block');
    hashElement.querySelector('a').dispatchEvent(new Event('click'));
  }

  function setProgressStart() {
    _progressStart.timeScale(2).play();
  }

  function setIframeSrc(src) {
    document.getElementById('iframe').src = src;
  }

  /**
   * Helper
   */

  function setActiveClass(element) {
    [].slice.call(element.parentElement.children).forEach((sibling) => {
      sibling !== element && sibling.classList.remove('active');
    });
    element.classList.add('active');
  }

  function setStyle(element, style) {
    typeof style === 'string' &&
      style &&
      style.split(';').forEach((property) => {
        property = property.trim();
        if (property) {
          const prop = property.split(':').map((currentValue) => {
            return currentValue.trim();
          });
          element.style.setProperty(prop[0], prop[1]);
        }
      });
  }

  initialize();
})(window, document);

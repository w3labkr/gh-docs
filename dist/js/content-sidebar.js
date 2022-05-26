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
    sidebarHandler();
    iframeHandler();
    progressHandler();
  }

  function sidebarHandler() {
    document.querySelectorAll('#tertiary a').forEach(function (anchor) {
      if (!!anchor.target && anchor.target !== '_self') {
        return;
      }
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        setActiveClass(this.parentElement);
        setIframe(this);

        return false;
      });
    });
  }

  function setIframe(anchor) {
    _progressStart.timeScale(2).play();

    var iframe = document.getElementById('iframe');

    var anchorScrolling = anchor.getAttribute('data-scrolling');
    var iframeScrolling = iframe.getAttribute('data-scrolling');

    if (anchorScrolling) {
      iframe.scrolling = anchorScrolling;
    } else if (iframeScrolling) {
      iframe.scrolling = iframeScrolling;
    }

    iframe.src = anchor.getAttribute('href');
  }

  function iframeHandler() {
    document.getElementById('iframe').addEventListener('load', function () {
      _progressStart.timeScale(2).tweenFromTo(0, 1, {
        onComplete: function () {
          _progressComplete.timeScale(2).tweenFromTo(0, 1);
        },
      });

      var body = this.contentWindow.document.body;
      this.width = body.scrollWidth;
      this.height = body.scrollHeight;
    });
  }

  function progressHandler() {
    var div = document.getElementById('progress-bar');
    var divStyle =
      '\
      overflow: hidden;\
      position: relative;\
      width: 100%;\
      height: 3px;\
      background-color: transparent;\
    ';
    setStyle(div, divStyle);

    var span = document.createElement('span');
    var spanStyle =
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

    div.appendChild(span);

    _progressStart.fromTo(span, { left: 0, width: 0 }, { left: 0, width: '100%' });
    _progressComplete.fromTo(span, { left: 0, width: '100%' }, { left: '200%', width: 0 });
  }

  function setActiveClass(element) {
    [].slice.call(element.parentElement.children).forEach(function (sibling) {
      sibling !== element && sibling.classList.remove('active');
    });
    element.classList.add('active');
  }

  function setStyle(element, style) {
    typeof style === 'string' &&
      style &&
      style.split(';').forEach(function (property) {
        property = property.trim();
        if (property) {
          var prop = property.split(':').map(function (currentValue) {
            return currentValue.trim();
          });
          element.style.setProperty(prop[0], prop[1]);
        }
      });
  }

  function getClosest(element, selector) {
    var el = element;
    do {
      if (el.matches(selector)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  }

  initialize();
})(window, document);

(function (window, document, undefined) {
  function initialize() {
    navHandler();
    iframeHandler();
  }

  function navHandler() {
    var anchors = document.querySelectorAll('#page-nav a');
    anchors.forEach(function (anchor) {
      if (!!anchor.target && anchor.target !== '_self') {
        return;
      }
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        setActiveClass(this);
        setIframe(this);

        return false;
      });
    });
  }

  function setActiveClass(target) {
    var siblings = [].slice.call(target.parentNode.children).filter(function (sibling) {
      return sibling !== target;
    });

    siblings.forEach(function (sibling) {
      sibling.classList.remove('active');
    });

    target.classList.add('active');
  }

  function setIframe(target) {
    var iframe = document.getElementById('iframe');
    var scrolling = null;

    if (target.dataset.scrolling) {
      scrolling = target.dataset.scrolling;
    } else if (iframe.dataset.scrolling) {
      scrolling = iframe.dataset.scrolling;
    }

    iframe.scrolling = scrolling;
    iframe.src = target.getAttribute('href');
  }

  function iframeHandler() {
    var iframe = document.getElementById('iframe');
    iframe.addEventListener('load', function () {
      var body = this.contentWindow.document.body;
      this.width = body.scrollWidth;
      this.height = body.scrollHeight;
      this.style.height = body.scrollHeight + 'px';
    });
  }

  initialize();
})(window, document);

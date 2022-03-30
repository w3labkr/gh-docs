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

sidebarHandler();
iframeHandler();
progressHandler();

function sidebarHandler() {
  var anchors = document.querySelectorAll('#secondary a, #tertiary a');
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
  var parentNode = target.parentNode;
  var siblings = [].slice.call(parentNode.parentNode.children).filter(function (sibling) {
    return sibling !== target;
  });

  siblings.forEach(function (sibling) {
    sibling.classList.remove('active');
  });

  parentNode.classList.add('active');
}

function setIframe(target) {
  _progressStart.timeScale(2).play();

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
  div.style.overflow = 'hidden';
  div.style.position = 'relative';
  div.style.width = '100%';
  div.style.height = '3px';
  div.style.backgroundColor = 'transparent';

  var span = document.createElement('span');
  span.style.display = 'block';
  span.style.position = 'absolute';
  span.style.top = '0';
  span.style.left = '0';
  span.style.width = '0';
  span.style.height = '100%';
  span.style.backgroundColor = '#ba2d0b';
  span.style.backgroundImage = 'linear-gradient(319deg, #ba2d0b 0%, #fe7f2d 37%, #ffbf46 100%)';

  div.appendChild(span);

  _progressStart.fromTo(span, { left: 0, width: 0 }, { left: 0, width: '100%' });
  _progressComplete.fromTo(span, { left: 0, width: '100%' }, { left: '200%', width: 0 });
}

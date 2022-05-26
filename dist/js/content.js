(function (window, document, undefined) {
  function initialize() {
    main();
  }

  function main() {
    document.getElementById('iframe').addEventListener('load', function () {
      var body = this.contentWindow.document.body;
      this.width = body.scrollWidth;
      this.height = body.scrollHeight;
      this.style.setProperty('height', body.scrollHeight + 'px');
    });
  }

  initialize();
})(window, document);

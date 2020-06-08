class ScrollToLink {
  constructor(nodeElement) {
    this.nodeElement = nodeElement;

    this.targetElement = document.querySelector(this.nodeElement.getAttribute('href'));
    if (!this.targetElement) {
      return;
    }

    this.init();
  }

  init() {
    this.nodeElement.addEventListener('click', e => {
      e.preventDefault();

      setTimeout(() => {
        raf2x(() => {
          startScrollTo(this.targetElement);
        });
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-scroll-to').forEach(element => new ScrollToLink(element));
});

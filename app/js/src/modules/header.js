class Header {
  constructor(nodeElement) {
    this.nodeElement = nodeElement;
    this.viewportHeight = null;
    this.main = document.querySelector('.page__container');

    this.addEvents();
  }

  addEvents() {
    onResize(this.updateCache.bind(this));
    onScroll(this.onScroll.bind(this));
    this.calcContentMargin();
    onResize(this.calcContentMargin.bind(this));
  }

  setAsFixed() {
    this.nodeElement.classList.add('fixed-start');
    this.nodeElement.classList.add('fixed');
  }

  setAsNotFixed() {
    this.nodeElement.classList.remove('fixed');
  }

  calcContentMargin() {
    this.main.style.marginTop = `${this.nodeElement.getBoundingClientRect().height + 20}px`;
  }

  onScroll() {
    const scrollTop = getScrollPos();
    this.calcContentMargin();

    if (scrollTop > window.innerHeight) {
      this.setAsFixed();
    } else {
      this.setAsNotFixed();
    }

    if (scrollTop < 300) {
      this.nodeElement.classList.remove('fixed-start');
    }
  }

  updateCache() {
    this.viewportHeight = window.innerHeight;
  }

  static init(elem) {
    new Header(elem);
  }
}

class HeaderUI {
  static init() {
    const header = document.querySelector('.js-header');
    if (header) Header.init(header);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  HeaderUI.init();
});

window.HeaderUI = HeaderUI;

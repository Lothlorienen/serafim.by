class Header {
  constructor(nodeElement) {
    this.nodeElement = nodeElement;
    this.topElement = nodeElement.querySelector('.header__top');
    this.topElementOffset = null;
    this.addEvents();
  }

  addEvents() {
    this.setOffset();
    onScroll(this.onScroll.bind(this));
    onResize(this.setOffset.bind(this));
  }

  setOffset() {
    this.topElementOffset = this.topElement.getBoundingClientRect().height;
    const height = this.nodeElement.getBoundingClientRect().height;
    const nextElement = this.nodeElement.nextElementSibling;
    nextElement.style.marginTop = `${height + 40}px`;
  }

  setAsFixed() {
    this.nodeElement.classList.add('fixed');
  }

  setAsNotFixed() {
    this.nodeElement.classList.remove('fixed');
  }

  onScroll() {
    const scrollTop = getScrollPos();
    if (scrollTop > 0) {
      this.setAsFixed();
    } else {
      this.setAsNotFixed();
    }
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

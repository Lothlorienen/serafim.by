class Header {
  constructor(nodeElement) {
    this.nodeElement = nodeElement;
    this.isMenuFixed = false;
    this.viewportHeight = null;

    this.updateCache();
    this.init();
  }

  setAsFixed() {
    if (this.isMenuFixed) return;

    this.nodeElement.classList.add('fixed');
    this.isMenuFixed = true;
  }

  setAsNotFixed() {
    if (!this.isMenuFixed) return;

    this.nodeElement.classList.remove('fixed');
    this.isMenuFixed = false;
  }

  isMobileMenuOpened() {
    return document.querySelector('.main-menu-toggler__button').classList.contains('opened');
  }

  onScroll() {
    if (this.isMobileMenuOpened()) {
      return;
    }

    const scrollTop = getScrollPos();
    if (scrollTop > 80) {
      this.setAsFixed();
    } else {
      this.setAsNotFixed();
    }
  }

  updateCache() {
    this.viewportHeight = window.innerHeight;
  }

  init() {
    onResize(this.updateCache.bind(this));
    onScroll(this.onScroll.bind(this));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const headerElement = document.querySelector('.js-header');
  if (headerElement) new Header(headerElement);
});

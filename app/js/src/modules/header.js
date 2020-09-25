class Header {
  constructor(node) {
    this.$node = node;
    this.main = document.querySelector('.page__container');

    this.scrollEvents = this.scrollEvents.bind(this);

    this.events();
  }

  events() {
    onScroll(this.scrollEvents);
  }

  scrollEvents() {
    getScrollPos() > window.innerHeight ? this.setAsFixed() : this.setAsNotFixed();

    if (getScrollPos() < 300) this.$node.classList.remove('fixed-start');
  }

  setAsFixed() {
    this.$node.classList.add('fixed-start');
    this.$node.classList.add('fixed');
  }

  setAsNotFixed() {
    this.$node.classList.remove('fixed');
  }

  static init(elem) {
    new Header(elem);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.js-header');
  if (header) Header.init(header);
});

window.Header = Header;

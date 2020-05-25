class Collapse {
  constructor(item) {
    this.nodeElement = item;
    this.addEvents();
  }

  addEvents() {
    const toggleButton = this.nodeElement.querySelector('.collapse-btn');
    const content = this.nodeElement.querySelector('.collapse-content');

    toggleButton.addEventListener('click', () => {
      if (this.nodeElement.classList.contains('_opened')) {
        Collapse.collapse(content);
        Collapse.removeActive(this.nodeElement);
      } else {
        Collapse.setActive(this.nodeElement);
        Collapse.expand(content);
      }
    });
  }

  static collapse(elem) {
    const height = {
      from: elem.scrollHeight,
      to: 0,
    };

    Collapse.animate(elem, height);
  }

  static expand(elem) {
    const height = {
      from: 0,
      to: elem.scrollHeight,
    };

    Collapse.animate(elem, height);
  }

  static animate(elem, height) {
    const handler = e => {
      if (e.target !== e.currentTarget) return false;
      elem.removeEventListener(endEvents.transition, handler);
      elem.classList.remove('animate');
      elem.style.height = '';
    };
    elem.addEventListener(endEvents.transition, handler);

    elem.classList.add('animate');
    elem.style.height = `${height.from}px`;
    raf2x(() => {
      elem.style.height = `${height.to}px`;
    });
  }

  static setActive(elem) {
    elem.classList.add('_opened');
  }

  static removeActive(elem) {
    elem.classList.remove('_opened');
  }

  static init(elem) {
    new Collapse(elem);
  }
}

class CollapseUI {
  static init() {
    const collapseItems = document.querySelectorAll('.js-collapse');
    collapseItems.forEach(item => {
      Collapse.init(item);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  CollapseUI.init();
});

window.Collapse = Collapse;
window.CollapseUI = CollapseUI;

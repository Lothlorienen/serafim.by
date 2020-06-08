class MenuToggler {
  constructor(nodeElement) {
    this.nodeElement = nodeElement;

  }

  addEvents() {

  }

  showMenu(elem) {

  }

  hideMenu(elem) {

  }

  static setOpened(elem) {
    elem.classList.add('opened')
  }

  static removeOpened(elem) {
    elem.classList.remove('opened');
  }

  static init(elem) {
    new MenuToggler(elem);
  }
}

class MenuTogglerUI {
  static init() {
    const element = document.querySelector('.js-header-menu');
    if (element) MenuToggler.init(element);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  MenuTogglerUI.init();
});

window.MenuToggler = MenuToggler;
window.MenuTogglerUI = MenuTogglerUI;

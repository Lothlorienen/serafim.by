class MenuToggler {
  constructor(nodeElement) {
    this.nodeElement = nodeElement;
    this.header = nodeElement.closest('.header-main');
    this.addEvents();
  }

  addEvents() {
    const menu = document.querySelector('.header__nav');

    this.nodeElement.addEventListener('click', () => {
      if (this.nodeElement.classList.contains('opened')) {
        this.hideMenu(menu);
      } else {
        this.showMenu(menu);
      }
    });

    const anchors = menu.querySelectorAll('.js-scroll-to');

    anchors.forEach(item => {
      item.addEventListener('click', e => {
        this.hideMenu(menu);
      });
    })
  }

  showMenu(elem) {
    if(Layout.isMobileLayout()) MenuToggler.setOpened(this.header);
    MenuToggler.setOpened(elem);
    MenuToggler.setOpened(this.nodeElement);
    Collapse.expand(elem);
    hideScrollbar();
  }

  hideMenu(elem) {
    if(Layout.isMobileLayout()) MenuToggler.removeOpened(this.header);
    Collapse.collapse(elem);
    MenuToggler.removeOpened(elem);
    MenuToggler.removeOpened(this.nodeElement);
    showScrollbar();
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

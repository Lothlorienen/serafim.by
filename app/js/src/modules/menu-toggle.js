class MenuToggle {
  constructor(nodeElement) {
    this.nodeElement = nodeElement;
    this.menu = document.querySelector('.js-menu-mobile');
    this.header = document.querySelector('.js-header');
    this.busy = false;

    this.addEvents();
    onResize(this.addEvents.bind(this))
  }

  addEvents() {
    if(!isTabletLayout()) return;

    if (!this.busy) {
      this.nodeElement.addEventListener('click', this.menuHandler.bind(this));

      this.busy = true;
    }

    this.calcTopPosition();
    onScroll(this.calcTopPosition.bind(this));
    onResize(this.calcTopPosition.bind(this));
  }

  menuHandler() {
    if (this.nodeElement.classList.contains('_opened')) {
      const waiter = new Promise((resolve, reject) => {
        resolve(this.hideSubmenu());
      });

      waiter.then(() => {
        setTimeout(() => {
          this.closeMenu();
        }, 350);
      });
    } else {
      this.showMenu();
    }
  }

  showMenu() {
    hideScrollbar();
    Collapse.setActive(this.nodeElement);
    Collapse.setActive(this.header);
    Collapse.setActive(this.menu);
    Collapse.expand(this.menu);
  }

  closeMenu() {
    showScrollbar();
    Collapse.collapse(this.menu);
    Collapse.removeActive(this.nodeElement);
    Collapse.removeActive(this.header);
    Collapse.removeActive(this.menu);
  }

  calcTopPosition() {
    if(!isTabletLayout()) return;
    this.menu.style.top = `${this.header.getBoundingClientRect().height}px`;
  }


  hideSubmenu() {
    const submenus = document.querySelectorAll('.nav-menu__submenu');
    submenus.forEach(item => {
      if (item.classList.contains('active')) item.classList.remove('active');
    });
  }

  static init(elem) {
    new MenuToggle(elem);
  }
}

class Submenu {
  constructor(node) {
    this.node = node;
    this.link = this.node.querySelector('.nav-menu__link') || this.node.querySelector('.submenu__link');
    this.submenu = this.node.querySelector('.nav-menu__submenu');
    this.buttonBack = this.node.querySelector('.submenu-controls__back');
    this.header = document.querySelector('.js-header');
    this.currentSubmenu = this.submenu.querySelector('.submenu-controls__current');

    this.events();
  }

  events() {
    if(!isTabletLayout()) {
      return;
    }

    this.calcTopPosition();
    onScroll(this.calcTopPosition.bind(this));
    onResize(this.calcTopPosition.bind(this));

    this.link.addEventListener('click', this.handler.bind(this));
    this.buttonBack.addEventListener('click', this.handlerBack.bind(this));
    this.parentName();
  }

  handler() {
    this.submenu.classList.add('active');
  }

  handlerBack() {
    this.submenu.classList.remove('active');
  }

  parentName() {
    this.currentSubmenu.textContent = this.link.textContent;
  }

  calcTopPosition() {
    if(isTabletLayout() === false) {
      this.submenu.style.top = `calc(100% - 5px)`;
    } else {
      this.submenu.closest('.submenu__item') ?
        this.submenu.style.top = `0px` :
        this.submenu.style.top = `${this.header.getBoundingClientRect().height}px`;
    }
  }

  static init(elem) {
    new Submenu(elem);
  }
}

class MenuToggleUI {
  static init() {
    const element = document.querySelector('.js-menu-toggle');
    if (element) MenuToggle.init(element);
  }
}

class SubmenuUI {
  static init() {
    const element = document.querySelectorAll('.js-submenu');
    element.forEach(item => {
      Submenu.init(item);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  MenuToggleUI.init();
  SubmenuUI.init();
});

class Ymap {
  constructor(node) {
    this.node = node;
    this.closeButton = null;
    this.overlay = null;
    this.container = null;
    this.body = document.querySelector('.page');
    this.map = null;
    this.isInited = false;

    setTimeout(() => {
      this.events();
    }, 1000);
  }

  events() {
    if (!this.isInited) this.initPopup();
  }

  initPopup() {
    this.createOverlay();
    this.createPopupHTML();
    this.node.addEventListener('click', this.handler.bind(this));
    this.overlay.addEventListener('click', this.closePopup.bind(this));
    this.closeButton.addEventListener('click', this.closePopup.bind(this));
    this.isInited = true;
  }

  handler() {
    this.revealPopup();
  }

  revealPopup() {
    hideScrollbar();
    this.showElement(this.map);
    this.showElement(this.overlay);
  }

  createPopupHTML() {
    this.map = document.createElement('div');
    this.map.classList.add('ymap');

    this.closeButton = document.createElement('button');
    this.closeButton.setAttribute('type', 'button');
    this.closeButton.classList.add('ymap__close');

    this.container = document.createElement('div');
    this.container.classList.add('ymap__container');
    this.container.insertAdjacentHTML('beforeend',
      `<div style="position:relative;overflow:hidden;"><a href="https://yandex.by/maps/org/tserkov_v_chest_prepodobnykh_startsev_optinskikh/205184322415/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Церковь в честь преподобных старцев Оптинских</a><a href="https://yandex.by/maps/157/minsk/category/orthodox_church/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Православный храм в Минске</a><a href="https://yandex.by/maps/157/minsk/category/religious_association/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:28px;">Религиозное объединение в Минске</a><iframe src="https://yandex.by/map-widget/v1/-/CCQdjSUxpC" width="560" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>`);

    this.map.appendChild(this.closeButton);
    this.map.appendChild(this.container);
    this.body.appendChild(this.map);
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');
    this.body.appendChild(this.overlay);
  }

  closePopup(e) {
    let target = e.target;
    if (target === this.overlay || target === this.closeButton) {
      this.hideElement(this.overlay);
      this.hideElement(this.map);
    }
    showScrollbar();
  }

  showElement(element) {
    element.classList.add('visible');
  }

  hideElement(element) {
    element.classList.remove('visible');
  }

  static init(item) {
    new Ymap(item);
  }
}

class YmapUI {
  static init() {
    const map = document.querySelector('.js-ymap');
    if (map) Ymap.init(map);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  YmapUI.init();
});

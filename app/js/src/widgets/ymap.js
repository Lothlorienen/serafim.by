class Ymap {
  constructor(node) {
    this.node = node;
    this.closePopup = null;
    this.overlay = null;
    this.container = null;
    this.body = document.querySelector('.page');
    this.map = null;
    this.isInited = false;
    this.events();
  }

  events() {
    this.node.addEventListener('click', () => {
      if (!this.isInited) {
        this.addMap();
      } else {
        if (this.map.classList.contains('visible')) {
          this.map.classList.add('not-visible');
          this.map.classList.remove('visible');
          this.overlay.classList.add('not-visible');
          this.overlay.classList.remove('visible');
        } else if (this.map.classList.contains('not-visible')) {
          this.map.classList.add('visible');
          this.map.classList.remove('not-visible');
          this.overlay.classList.add('visible');
          this.overlay.classList.remove('not-visible');
        }
      }

    });
  }

  addMap() {
    const newPromise = new Promise((resolve, reject) => {
      resolve(this.createOverlay());
      hideScrollbar();
    });
    newPromise
      .then(() => {
        setTimeout(() => {
          this.overlay.classList.add('visible');
          this.map.classList.add('visible');
        }, 300);
      })
      .then(() => {
        this.createPopup();
      })
      .then(() => {
        setTimeout(() => {
          this.container.insertAdjacentHTML('beforeend',
            `<div style="position:relative;overflow:hidden;"><a href="https://yandex.by/maps/org/tserkov_v_chest_prepodobnykh_startsev_optinskikh/205184322415/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Церковь в честь преподобных старцев Оптинских</a><a href="https://yandex.by/maps/157/minsk/category/orthodox_church/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Православный храм в Минске</a><a href="https://yandex.by/maps/157/minsk/category/religious_association/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:28px;">Религиозное объединение в Минске</a><iframe src="https://yandex.by/map-widget/v1/-/CCQdjSUxpC" width="560" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>`);
        }, 300);
      })
      .then(() => {
        this.overlay.addEventListener('click', (e) => {
          let target = e.target;
          if (target === this.overlay) {
            this.removePopup();
            this.removeOverlay();
          }
          showScrollbar();
        });
        this.closePopup.addEventListener('click', (e) => {
          let target = e.target;
          if (target === this.closePopup) {
            this.removeOverlay();
            this.removePopup();
          }
          showScrollbar();
        });
        this.isInited = true;
      });
  }

  createPopup() {
    this.map = document.createElement('div');
    this.map.classList.add('ymap');

    this.closePopup = document.createElement('button');
    this.closePopup.setAttribute('type', 'button');
    this.closePopup.classList.add('ymap__close');

    this.container = document.createElement('div');
    this.container.classList.add('ymap__container');

    this.map.appendChild(this.closePopup);
    this.map.appendChild(this.container);
    this.body.appendChild(this.map);
  }

  removePopup() {
    this.map.classList.add('not-visible');
    this.map.classList.remove('visible');

    // this.map.addEventListener('transitionend', () => {
    //   this.map.remove();
    // });
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');
    this.body.appendChild(this.overlay);
  }

  removeOverlay() {
    this.overlay.classList.add('not-visible');
    this.overlay.classList.remove('visible');

    // this.overlay.addEventListener('transitionend', () => {
    //   this.overlay.remove();
    // });
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

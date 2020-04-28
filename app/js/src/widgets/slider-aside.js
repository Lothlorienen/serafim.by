const configs = {
  'default': {
    slidesPerView: 1,
    spaceBetween: 30,
  },
  'fade': {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  },
  'loop': {
    loop: true,
    loopedSlides: 1,
  },
  'autoHeight': {
    autoHeight: true,
  },
};

function getInners (container) {
  return {
    slider: container.querySelector('[data-slider="slides"]'),
    arrowPrev: container.querySelector('[data-slider="prev"]'),
    arrowNext: container.querySelector('[data-slider="next"]'),
    paging: container.querySelector('[data-slider="paging"]'),
  };
}

function initSliders () {
  const defaultSliderContainer = document.querySelectorAll('.js-slider-default');

  defaultSliderContainer.forEach(item => {
    const { slider, arrowPrev, arrowNext, paging } = getInners(item);
    const config = {
      ...configs.default,
      navigation: {
        prevEl: arrowPrev,
        nextEl: arrowNext,
        disabledClass: 'disabled',
      },
    };
    if (paging) {
      config.pagination = {
        el: paging,
        type: 'bullets',
        clickable: true,
        dynamicBullets: false,
        // dynamicMainBullets: 1,
        bulletActiveClass: 'active',
      };
    }
    new Swiper(slider, config);
  });
}

window.initSliders = initSliders;

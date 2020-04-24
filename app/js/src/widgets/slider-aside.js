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
  const defaultSliderContainer = document.querySelector('.js-slider-default');
  if (defaultSliderContainer) {
    const { slider, arrowPrev, arrowNext, paging } = getInners(defaultSliderContainer);
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
  }

  const sliderAdvantagesContainer = document.querySelector('.js-slider-advantages');
  if (sliderAdvantagesContainer) {
    const { slider, arrowPrev, arrowNext } = getInners(sliderAdvantagesContainer);
    const pagination = sliderAdvantagesContainer.querySelector('[data-slider="pagination"]');
    const paginationItems = pagination.dataset.pagination.split(',');
    const config = {
      ...configs.default,
      ...configs.loop,
      navigation: {
        prevEl: arrowPrev,
        nextEl: arrowNext,
        disabledClass: 'disabled',
      },
      pagination: {
        el: pagination,
        type: 'bullets',
        clickable: true,
        bulletClass: 'slider-advantages__pagination-item',
        bulletActiveClass: 'active',
        renderBullet: (index, className) => {
          return `<span class="${className}">${paginationItems[index]}</span>`;
        },
      },
    };
    new Swiper(slider, config);
  }

  const sliderConversionContainer = document.querySelector('.js-slider-conversion');
  if (sliderConversionContainer) {
    const { slider, arrowPrev, arrowNext } = getInners(sliderConversionContainer);
    const config = {
      ...configs.default,
      ...configs.fade,
      ...configs.autoHeight,
      navigation: {
        prevEl: arrowPrev,
        nextEl: arrowNext,
        disabledClass: 'disabled',
      },
    };
    new Swiper(slider, config);
  }
}

window.initSliders = initSliders;

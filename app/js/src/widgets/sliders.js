class SliderArticle {
  constructor(nodeElement) {
    this.nodeElement = nodeElement;
    this.timeout = +this.nodeElement.dataset.timeout || 5000;

    this.pagination = nodeElement.querySelector('.article-slider__pagination');

    this.slidesCount = nodeElement.querySelectorAll('.swiper-slide').length;

    this.startTime = null;
    this.elapsedTime = null;
    this.timeFraction = null;

    this.activeSlideElement = null;
    this.activeSlideElementProgress = null;

    this.init();
  }

  initSwiper() {
    this.swiper = new Swiper(this.nodeElement, {
      effect: 'fade',
      loop: true,
      speed: 1000,
      autoplay: false,
      on: {
        init: this.onSlideChange.bind(this),
        slideChange: this.onSlideChange.bind(this),
      },
      fadeEffect: { crossFade: true },
    });

    this.updateActiveSlideElement();
  }

  prepareHtmlPaginationForSlide(slideElement, slideIndex) {
    if (slideElement.querySelector('.article-slider__pagination')) {
      return;
    }

    const element = document.createElement('div');
    element.classList.add('article-slider__pagination');

    for (let i = 0; i < this.slidesCount; i++) {
      const pagerItem = document.createElement('div');
      pagerItem.classList.add('article-slider__bullet');

      if (i === slideIndex) {
        const progressElement = document.createElement('div');
        progressElement.classList.add('article-slider__progress');
        pagerItem.appendChild(progressElement);
      }

      element.appendChild(pagerItem);

      (i => {
        pagerItem.addEventListener('click', e => {
          e.preventDefault();
          if (this.swiper.realIndex !== i) {
            if (this.swiper.realIndex === this.slidesCount - 1 && i === 0) {
              this.swiper.slideNext();
            } else if (this.swiper.realIndex === 0 && i === this.slidesCount - 1) {
              this.swiper.slidePrev();
            } else {
              this.swiper.slideTo(i + 1);
            }
          }
        });
      })(i);
    }

    slideElement.querySelector('.article-slider__pagination-wrapper').appendChild(element);
  }

  updateActiveSlideElement() {
    if (!this.swiper) {
      return;
    }

    this.activeSlideElement = this.swiper.slides[this.swiper.activeIndex];
    this.prepareHtmlPaginationForSlide(this.activeSlideElement, this.swiper.realIndex);

    if (this.activeSlideElement) {
      this.activeSlideElementProgress = this.activeSlideElement.querySelector('.article-slider__progress');
    } else {
      this.activeSlideElementProgress = null;
    }
  }

  init() {
    this.initSwiper();
  }

  toNextSlide() {
    this.swiper.slideNext();
  }

  timing(timeFraction) {
    return timeFraction;
  }

  animate(time) {
    let timeFraction = (time - this.startTime + this.elapsedTime) / this.timeout;
    if (timeFraction > 1) timeFraction = 1;

    let progress = this.timing(timeFraction);
    this.drawProgress(progress);

    if (timeFraction < 1) {
      this.animationId = raf(this.animate.bind(this));
    } else {
      this.toNextSlide();
    }
  }

  drawProgress(progress) {
    if (this.activeSlideElementProgress) {
      this.activeSlideElementProgress.style.transform = `scaleX(${progress})`;
    }
  }

  startProgress() {
    this.activeSlideElement = this.swiper ? this.swiper.slides[this.swiper.activeIndex] : null;

    this.startTime = performance.now();
    this.elapsedTime = 0;
    this.animationId = raf(this.animate.bind(this));
  }

  resetProgress() {
    this.startTime = null;
    this.elapsedTime = null;
    this.timeFraction = null;
    this.drawProgress(0);
  }

  onSlideChange() {
    this.updateActiveSlideElement();

    this.resetProgress();
    this.startProgress();
  }
}

class SliderArticleUI {
  static initOnLoad() {
    document.querySelectorAll('.js-slider-article').forEach(item => {
      new SliderArticle(item);
    });
  }
}

SliderArticleUI.initOnLoad();
window.SliderArticleUI = SliderArticleUI;

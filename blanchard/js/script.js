const DEFAULT_DELAY = 2000; // 2 Сек
const DISABLE_ON_INTERACTION = false;
const MOBILE_MAX_WIDTH = 1024;
const GALLERY_LIST = [
  {
    id: 1,
    img: '/img/gallery-1.jpg',
    autor: 'Lorem, ipsum.',
    name: '«Lorem, ipsum2.»',
    date: [1932, 1933],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quibusdam.',
  },
  {
    id: 2,
    img: '/img/gallery-2.jpg',
    autor: 'Казимир Малевич',
    name: '«Женщина с граблями»',
    date: [1931, 1932],
    description: 'Картина из второй серии крестьянского цикла работ Казимира Малевича. Художник принялся за её создание в 1930–1931годах, после того, как первый цикл был утерян после Берлинской и Варшавской выставок в 1927 году.',
  
  },
  {
    id: 3,
    img: '/img/gallery-3.jpg',
    autor: 'Lorem, ipsum3.',
    name: '«Lorem, ipsum3.»',
    date: [1933, 1934],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, nobis placeat.',
  },
  {
    id: 4,
    img: '/img/gallery-4.jpg',
    autor: 'Lorem, ipsum4.',
    name: '«Lorem, ipsum4.»',
    date: [1930, 1931],
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum dolore illo quia.',
  },
  {
    id: 5,
    img: '/img/gallery-5.jpg',
    autor: 'Lorem, ipsum5.',
    name: '«Lorem, ipsum5.»',
    date: [1930, 1932],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis illo sunt quam blanditiis.',
  },
  {
    id: 6,
    img: '/img/gallery-6.jpg',
    autor: 'Lorem, ipsum6.',
    name: '«Lorem, ipsum6.»',
    date: [1933, 1935],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aliquid impedit dignissimos dicta saepe?',
  },
];

$(document).ready(function() {
  let prevActiveElem;
  const body = $('body');
  const header = $('.header');
  const siteContainer = $('.site-container');
  const burger = $('.header__burger');
  const nav = $('.header__nav');
  const modalEl = $('.gallery__modal');
  const modalContentEl = modalEl.children('.gallery__modal-content');
  const searchFieldEl = $('.js-search');
  const searchInputEl = $('.js-search__input');
  const searchBtnEl = $('.js-search__btn');
  const searchBtnCloseEl = $('.js-search__btn-close');
  const swiperHero = new Swiper('.hero__slider', {
    wrapperClass: 'hero__background',
    slideClass: 'hero__slide',
    autoplay: {
      disableOnInteraction: DISABLE_ON_INTERACTION,
      delay: DEFAULT_DELAY,
    },
  });
  const selectCustom = new Choices($('#custom-select')[0], {
    searchEnabled: false,
    itemSelectText: '',
    choices: [
      {
        value: 'paging1',
        label: 'Живопись',
        selected: true,
        disabled: false,
        class: 'kok'
      },
      {
        value: 'paging2',
        label: 'Рисунок',
        selected: false,
        disabled: false,
      },
      {
        value: 'paging2',
        label: 'Скульптура',
        selected: false,
        disabled: false,
      },
    ],
  });
  const swiperGallery = new Swiper('.gallery__swiper', {
    wrapperClass: 'gallery__wrapper',
    slideClass: 'gallery__slide',
    navigation: {
      nextEl: '.gallery__slider-btn--next',
      prevEl: '.gallery__slider-btn--prev',
    },
    pagination: {
      el: ".gallery__pagination",
      type: "fraction",
    },
    mousewheel: {},
    // autoplay: {
    //   disableOnInteraction: DISABLE_ON_INTERACTION,
    //   delay: DEFAULT_DELAY,
    // },
    breakpoints: {
      1660: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      }
    },
  });
  const swiperEvents = new Swiper('.events__swiper', {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 50,
    wrapperClass: 'events__list',
    slideClass: 'events__item',
    navigation: {
      nextEl: '.events__slider-btn--next',
      prevEl: '.events__slider-btn--prev',
    },
    pagination: {
      el: '.events__pagination',
      clickable: true,
    },
    mousewheel: {},
    // autoplay: {
    //   disableOnInteraction: DISABLE_ON_INTERACTION,
    //   delay: DEFAULT_DELAY,
    // },
    breakpoints: {
      1660: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1024: {
        spaceBetween: 27,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    }
  });
  const swiperPartners = new Swiper('.partners__swiper', {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 50,
    wrapperClass: 'partners__list',
    slideClass: 'partners__item',
    navigation: {
      nextEl: '.partners__slider-btn--next',
      prevEl: '.partners__slider-btn--prev',
    },
    mousewheel: {},
    // autoplay: {
    //   disableOnInteraction: DISABLE_ON_INTERACTION,
    //   delay: DEFAULT_DELAY,
    // },
    breakpoints: {
      1660: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      924: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    }
  });
  let dropdownEl;
  let dropdownBtn;

  searchBtnEl.on('click', showSearchField);
  searchBtnCloseEl.on('click', hideSearchField);
  $('.menu__btn').on('click', showDropdownMenu);

  $('.catalog__accordion').accordion({
    animate: 300,
    header: '.accordion__header',
    collapsible: true,
    body: '.accordion__content',
    icons: false,
    heightStyle: 'content',
  });

  $('.catalog__painter-btn').each(function() {
    $(this).on('click', function(e) {
      e.preventDefault();

      const catalogCardList = $('.catalog__card');
      const path = $(this).data('path') || 'painter-unknown';
      let targetCardEl;

      catalogCardList.each(function() {
        $(this).removeClass('catalog__card--active');

        if (!targetCardEl && $(this).data('target') === path) {
          targetCardEl = $(this);
        }
      });

      targetCardEl.addClass('catalog__card--active');

      if ($(window).width() < MOBILE_MAX_WIDTH) {
        targetCardEl[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    });
  });
  body.on('click', function({target}) {
    if ($(target).hasClass('modal-active')) {
      closeMenu();
    }
  });

  $('.gallery__link').each(function() {
    $(this).on('click', function(e) {
      e.preventDefault();
      const imgId = $(e.target).data('pic');
      const picData = GALLERY_LIST.find(el => el.id === imgId);
      const modalCardEl = modalContentEl.children('.card__pic');
      const modalImgEl = modalCardEl.children('.card__img');
      const cardCapEl = modalCardEl.children('.card__caption');
      const cardHeadingEl = cardCapEl.children('.card__heading');
      const cardHeadingSmallEl = cardCapEl.children('.card__heading--small');
      const cardDateEl = cardCapEl.children('.card__text--small').children('.card__date').children('time');
      const cardDescrEl = cardCapEl.children('.card__description');

      console.log(cardDateEl);
      modalEl.addClass('gallery__modal--open');
      modalImgEl.attr('src', picData.img);
      cardHeadingEl.text(picData.autor);
      cardHeadingSmallEl.text(picData.name);
      cardDescrEl.text(picData.description);
      cardDateEl.each(function(index, el) {
        $(this).text(picData.date[index]);
      });
    });
  });

  modalContentEl.children('.card__btn').on('click', function() {
    modalEl.removeClass('gallery__modal--open');
  })

  burger.on('click', function(e) {
    openMenu();
  });

  tippy('.projects__tooltip', {
    content: 'Подсказка',
  });
  swiperEvents.on('slideChange', ({ isEnd, isBeginning, navigation }) => {
    navigation.nextEl.classList[isEnd ? 'add' : 'remove']('dn');
    navigation.prevEl.classList[isBeginning ? 'add' : 'remove']('dn');
  })
  
  ymaps.ready(init);

  function init() {
    const myMap = new ymaps.Map('map', {
      center: [55.758600, 37.610796],
      zoom: 14,
      controls: [],
    });

    const myObject = new ymaps.Placemark([55.758600, 37.610796], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/placemark.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-3, -42],
    });

    myMap.geoObjects.add(myObject);
  }

  function openMenu() {
    // prevActiveElem = document.activeElement;
    // siteContainer.children().each((index, child) => {
    //   if (child !== header) {
    //     child.inert = true;
    //   }
    // });
    // Array.from(body.children).forEach(child => {
      // if (child !== header) {
      //   child.inert = true;
      // }
    // });
    // burger.toggleClass('header__burger--close');
    nav.toggleClass('header__nav--open');
    body.toggleClass('modal-active');
  }

  function closeMenu() {
    // burger.toggleClass('header__burger--close');
    nav.toggleClass('header__nav--open');
    body.toggleClass('modal-active');
  }

  function showDropdownMenu({target}) {
    if (dropdownEl) {
      hideDropdownMenu({target});
    }

    dropdownEl = $(this).next('.menu__dropdown');
    dropdownBtn = $(target);
  
    dropdownEl.addClass('menu__dropdown--open');
    body.on('click', hideDropdownMenu);
  }

  function hideDropdownMenu({target}) {
    if(
      !dropdownEl.is(target) && dropdownEl.has(target).length === 0 &&
      !dropdownBtn.is(target) && dropdownBtn.has(target).length === 0
    ) {
			dropdownEl.removeClass('menu__dropdown--open');
		}
  }

  function showSearchField(e) {
    e.preventDefault();
    searchFieldEl.addClass('header__search--open');
    searchInputEl.focus();
    searchBtnEl.off('click');
    body.on('click', hideSearchField);
  }

  function hideSearchField({target}) {
    if(
      searchBtnCloseEl.has(target).length > 0 ||
      !searchFieldEl.is(target) && searchFieldEl.has(target).length === 0 &&
      !searchBtnEl.is(target) && searchBtnEl.has(target).length === 0
      ) {
			searchFieldEl.removeClass('header__search--open');
			searchBtnEl.on('click', showSearchField);
			body.off('click');
		}
  }
});

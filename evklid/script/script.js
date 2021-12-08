const keys = {
  ESC: 27,
};
const body = document.body;
const burger = document.querySelector('.burger');
const header = document.querySelector('.header');
let prevActiveElem;

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.working__btn').forEach(tabBtn => {
    tabBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('tab-content_active');
      });

      document.querySelector('[data-target="' + path + '"]').classList.add('tab-content_active');

      document.querySelectorAll('.working__btn').forEach(btn => {
        btn.classList.remove('working__btn_active');
      });
      this.classList.add('working__btn_active');
    })
  });
  burger.addEventListener('click', function() {
    openMenu();
  });
  body.addEventListener('click', function(e) {
    if (e.target.classList.contains ('modal-active')) {
      closeMenu();
    }
  });
});

function closeMenu() {
  Array.from(body.children).forEach(child => {
    if (child !== header) {
      child.inert = false;
    }
  });

  burger.classList.toggle('burger_close');
  document.querySelector('.header__nav').classList.toggle('header__nav_open');
  body.classList.toggle('modal-active');
  document.removeEventListener('keydown',function(e) {
    if (e.keyCode === keys.ESC) {
      closeMenu();
    }
  });
  prevActiveElem.focus();
}

function openMenu() {
  prevActiveElem = document.activeElement;


  Array.from(body.children).forEach(child => {
    if (child !== header) {
      child.inert = true;
    }
  });

  document.querySelector('.header__nav').classList.toggle('header__nav_open');
  burger.classList.toggle('burger_close');
  body.classList.toggle('modal-active');
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === keys.ESC) {
      closeMenu();
    }
  });
}

const swiper = new Swiper('.swiper-container', {
  // loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {},
});

$(function() {
  $('.questions__list').accordion({
    active: false,
    animate: 200,
    header: '.question',
    collapsible: true,
    body: '.response',
    icons: false,
    heightStyle: 'content',
  });
});


'use strict';

var BUTTON_ELEMENT = document.querySelector('.page-header__button-consultation');
var MOBILE_WIDTH = 768;
var BUTTON_TEXT = 'Бесплатная консультация';
var ACCORDION_ELEMENTS = document.querySelectorAll('.accordion__toggle');

var BODY_ELEMENT = document.querySelector('body');
var CALLBACK_BUTTON_ELEMENT = document.querySelector('.page-header__button-call');
var POPUP_ELEMENT = document.querySelector('.modal');
var OVERLAY_ELEMENT = document.querySelector('.overlay');
var X_CLOSE_ELEMENT = POPUP_ELEMENT.querySelector('.modal__close');
var USER_NAME_ELEMENT = POPUP_ELEMENT.querySelector('[name=name]');
var USER_PHONE_ELEMENT = POPUP_ELEMENT.querySelector('[name=phone]');
var MESSAGE_ELEMENT = POPUP_ELEMENT.querySelector('[name=callback-text]');

var QUESTION_TEXT_ELEMENT = document.querySelector('[name=question-text]');

var KEY_CODE_ESC = 27;
var KEY_CODE_ENTER = 13;

var isStorageSupport = true;
var storageUserName = '';
var storageUserPhone = '';
var storageText = '';
var storageQuestion = '';

if (BUTTON_ELEMENT && screen.width < MOBILE_WIDTH) {
  BUTTON_ELEMENT.textContent = BUTTON_TEXT;
}

ACCORDION_ELEMENTS.forEach(function (item) {
  item.onclick = function () {
    ACCORDION_ELEMENTS.forEach(function (i) {
      if (i !== item) {
        i.classList.add('accordion__toggle--close');
        i.nextElementSibling.classList.remove('accordion__content--show');
      }
    });
    this.classList.toggle('accordion__toggle--close');
    this.nextElementSibling.classList.toggle('accordion__content--show');
  };
});

try {
  storageUserName = localStorage.getItem('user-name');
  storageUserPhone = localStorage.getItem('user-phone');
  storageText = localStorage.getItem('message');
  storageQuestion = localStorage.getItem('question');
} catch (err) {
  isStorageSupport = false;
}

if (USER_NAME_ELEMENT) {
  USER_NAME_ELEMENT.focus();
  USER_NAME_ELEMENT.value = localStorage.getItem('user-name');
  USER_NAME_ELEMENT.oninput = function () {
    localStorage.setItem('user-name', USER_NAME_ELEMENT.value);
  };
}

if (USER_PHONE_ELEMENT) {
  USER_PHONE_ELEMENT.value = localStorage.getItem('user-phone');
  USER_PHONE_ELEMENT.oninput = function () {
    localStorage.setItem('user-phone', USER_PHONE_ELEMENT.value);
  };
}

if (MESSAGE_ELEMENT) {
  MESSAGE_ELEMENT.value = localStorage.getItem('message');
  MESSAGE_ELEMENT.oninput = function () {
    localStorage.setItem('message', MESSAGE_ELEMENT.value);
  };
}

if (QUESTION_TEXT_ELEMENT) {
  QUESTION_TEXT_ELEMENT.value = localStorage.getItem('question');
  QUESTION_TEXT_ELEMENT.oninput = function () {
    localStorage.setItem('question', QUESTION_TEXT_ELEMENT.value);
  };
}

function openPopup() {
  POPUP_ELEMENT.classList.add('modal--show');
  OVERLAY_ELEMENT.classList.add('overlay--show');
  USER_NAME_ELEMENT.focus();
  BODY_ELEMENT.classList.add('noscroll');
}

function closePopup() {
  if (POPUP_ELEMENT.classList.contains('modal--show')) {
    POPUP_ELEMENT.classList.remove('modal--show');
    OVERLAY_ELEMENT.classList.remove('overlay--show');
    BODY_ELEMENT.classList.remove('noscroll');
  }
}

CALLBACK_BUTTON_ELEMENT.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup();
});

X_CLOSE_ELEMENT.addEventListener('click', function () {
  closePopup();
});

X_CLOSE_ELEMENT.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    closePopup();
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    closePopup();
  }
});

OVERLAY_ELEMENT.addEventListener('click', function () {
  closePopup();
});

$(document).mouseup(function (e) {
  var container = $('.modal__wrapper');
  if (e.target !== container[0] && !container.has(e.target).length) {
    closePopup();
  }
});

$('body').on('click', '[href*="#"]', function (e) {
  var FIXED_OFFSET = 100;
  $('html,body').stop().animate({scrollTop: $(this.hash).offset().top - FIXED_OFFSET}, 1000);
  e.preventDefault();
});

$(function () {
  $('input[type="tel"]').mask('+7(000)000-00-00');
}());

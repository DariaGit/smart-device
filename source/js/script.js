'use strict';

var BUTTON_ELEMENT = document.querySelector('.page-header__button-consultation');
var MOBILE_WIDTH = 768;
var BUTTON_TEXT = 'Бесплатная консультация';
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

// Accordion with Vanilla JS without animation
// var ACCORDION_ELEMENTS = document.querySelectorAll('.accordion__toggle');
// ACCORDION_ELEMENTS.forEach(function (item) {
//   item.addEventListener('click', function () {
//     var thisToggle = this;
//     var thisContent = item.nextElementSibling;
//
//     ACCORDION_ELEMENTS.forEach(function (item) {
//       if (item !== thisToggle) {
//         item.classList.remove('accordion__toggle--close');
//         item.nextElementSibling.classList.remove('accordion__content--show');
//       };
//     });
//
//     thisContent.classList.toggle('accordion__content--show');
//     thisToggle.classList.toggle('accordion__toggle--close');
//   })
// })

$(function () {
  $('.accordion__toggle').on('click', function () {
    var thisContent = $(this).next();

    $('.accordion__toggle').not(this).removeClass('accordion__toggle--close');
    $('.accordion__content').not(thisContent).slideUp(400);
    thisContent.slideToggle(400);
    $(this).toggleClass('accordion__toggle--close');
  })
})

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

// Select all links with hashes
$(function () {
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
}());

$(function () {
  $('input[type="tel"]').mask('+7(000)000-00-00');
}());

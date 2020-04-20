`use strict`;

(function () {
  const BUTTON_ELEMENT = document.querySelector(`.page-header__button-consultation`);
  const MOBILE_WIDTH = 768;
  const BUTTON_TEXT = `Бесплатная консультация`;

  if (BUTTON_ELEMENT && screen.width < MOBILE_WIDTH) {
    BUTTON_ELEMENT.textContent = BUTTON_TEXT;
  }
}());

(function () {
  const ACCORDION_ELEMENTS = document.querySelectorAll(`.accordion`);

  ACCORDION_ELEMENTS.forEach(function(item) {
    item.onclick = function(){
      this.classList.toggle(`accordion--close`);
      this.nextElementSibling.classList.toggle(`accordion__content--show`);
    }
  });
}());

$(function () {
  $(`body`).on(`click`, `[href*="#"]`, function(e){
    const FIXED_OFFSET = 100;
    $(`html,body`).stop().animate({ scrollTop: $(this.hash).offset().top - FIXED_OFFSET }, 1000);
    e.preventDefault();
  });
}());

$(function() {
  $(`input[type="tel"]`).mask(`+7(000)000-00-00`);
}());

(function () {
  const BODY_ELEMENT = document.querySelector(`body`);
  const CALLBACK_BUTTON_ELEMENT = document.querySelector(`.page-header__button-call`);
  const POPUP_ELEMENT = document.querySelector(`.modal`);
  const OVERLAY_ELEMENT = document.querySelector(`.overlay`);
  const X_CLOSE_ELEMENT = POPUP_ELEMENT.querySelector(`.modal__close`);
  const FORM_ELEMENT = POPUP_ELEMENT.querySelector(`.modal-callback__form`);
  const USER_NAME_ELEMENT = POPUP_ELEMENT.querySelector(`[name=name]`);
  const USER_PHONE_ELEMENT = POPUP_ELEMENT.querySelector(`[name=phone]`);
  const MESSAGE_ELEMENT = POPUP_ELEMENT.querySelector(`[name=callback-text]`);

  const QUESTION_TEXT_ELEMENT = document.querySelector(`[name=question-text]`)

  const KEY_CODE_ESC = 27;
  const KEY_CODE_ENTER = 13;

  let isStorageSupport = true;
  let storageUserName = ``;
  let storageUserPhone = ``;
  let storageText = ``;
  let storageQuestion = ``;

  try {
    storageUserName = localStorage.getItem(`user-name`);
    storageUserPhone = localStorage.getItem(`user-phone`);
    storageText = localStorage.getItem(`message`);
    storageQuestion = localStorage.getItem(`question`);
  } catch (err) {
    isStorageSupport = false;
  }

  if (USER_NAME_ELEMENT) {
    USER_NAME_ELEMENT.focus();
    USER_NAME_ELEMENT.value = localStorage.getItem(`user-name`);
    USER_NAME_ELEMENT.oninput = () => {
      localStorage.setItem(`user-name`, USER_NAME_ELEMENT.value);
    }
  }

  if (USER_PHONE_ELEMENT) {
    USER_PHONE_ELEMENT.value = localStorage.getItem(`user-phone`);
    USER_PHONE_ELEMENT.oninput = () => {
      localStorage.setItem(`user-phone`, USER_PHONE_ELEMENT.value);
    }
  }

  if (MESSAGE_ELEMENT) {
    MESSAGE_ELEMENT.value = localStorage.getItem(`message`);
    MESSAGE_ELEMENT.oninput = () => {
      localStorage.setItem(`message`, MESSAGE_ELEMENT.value);
    }
  }

  if (QUESTION_TEXT_ELEMENT) {
    QUESTION_TEXT_ELEMENT.value = localStorage.getItem(`question`);
    QUESTION_TEXT_ELEMENT.oninput = () => {
      localStorage.setItem(`question`, QUESTION_TEXT_ELEMENT.value);
    }
  }

  function openPopup() {
    POPUP_ELEMENT.classList.add(`modal--show`);
    OVERLAY_ELEMENT.classList.add(`overlay--show`);
    USER_NAME_ELEMENT.focus();
    BODY_ELEMENT.classList.add(`noscroll`);
  }

  function closePopup() {
    if (POPUP_ELEMENT.classList.contains(`modal--show`)) {
      POPUP_ELEMENT.classList.remove(`modal--show`);
      OVERLAY_ELEMENT.classList.remove(`overlay--show`);
      BODY_ELEMENT.classList.remove(`noscroll`);
    }
  }

  CALLBACK_BUTTON_ELEMENT.addEventListener(`click`, function(evt) {
    evt.preventDefault();
    openPopup();
  });

  X_CLOSE_ELEMENT.addEventListener(`click`, function(evt) {
    evt.preventDefault();
    closePopup();
  });

  X_CLOSE_ELEMENT.addEventListener(`keydown`, function(evt) {
    if (evt.keyCode === KEY_CODE_ENTER) {
      evt.preventDefault();
      closePopup();
    }
  });

  window.addEventListener(`keydown`, function(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      closePopup();
    }
  });

  OVERLAY_ELEMENT.addEventListener(`click`, function() {
    closePopup();
  });

  FORM_ELEMENT.addEventListener(`submit`, function(evt) {
    closePopup();
  });
}());

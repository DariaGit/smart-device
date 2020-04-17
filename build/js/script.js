(function () {
  'use strict';

  (() => {
    const buttonElement = document.querySelector(`.page-header__button-consultation`);
    const mobileWidth = 768;
    const buttonText = `Бесплатная консультация`;

    if (buttonElement && screen.width < mobileWidth) {
      buttonElement.textContent = buttonText;
    }
  })();
})();

'use strict';

(() => {
  const buttonElement = document.querySelector(`.page-header__button-consultation`);
  const mobileWidth = 768;
  const buttonText = `Бесплатная консультация`;

  if (buttonElement && screen.width < mobileWidth) {
    buttonElement.textContent = buttonText;
  }
})();

(() => {
  const accordionElements = document.querySelectorAll(".accordion");

  accordionElements.forEach(function(item) {
    item.onclick = function(){
      this.classList.toggle("accordion--close");
      this.nextElementSibling.classList.toggle("accordion__content--show");
    }
  });
})();

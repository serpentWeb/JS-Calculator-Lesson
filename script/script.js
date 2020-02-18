"use strict";

const startButton = document.querySelector('.start-button'),
      firstScreen = document.querySelector('first-screen'),
      mainForm = document.querySelector('.main-form'),
      formCalculate = document.querySelector('.form-calculate'),
      endButton = document.querySelector('.end-button'),
      fastRange = document.querySelector('.fast-range'),
      total = document.querySelector('.total');

function showElm(elem){
    elem.style.display = 'block';
}

function hideElm(elem){
    elem.style.display = 'none';
}

function handlerCallBackForm(event) {
    const target = event.target;
    
    if (target.classList.contains('want-faster')) {
        let c = target.checked ? showElm(fastRange) : hideElm(fastRange);
    }
}

startButton.addEventListener('click', function(){
    showElm(mainForm);
    hideElm(firstScreen);
});

endButton.addEventListener('click', function(){
    for (const elem of formCalculate.elements) {
        if (elem.tagName === 'FIELDSET'){
            hideElm(elem);
        }
    }
    showElm(total);
});

formCalculate.addEventListener('change', handlerCallBackForm);
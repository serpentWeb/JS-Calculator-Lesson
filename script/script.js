"use strict";

const DATA ={
    whichSite: ['landing', 'multiPage', 'onlineStore'],
    price: [4000, 8000, 26000],
    desktopTemplates: [50,40,30],
    adapt: 20,
    mobileTemplates: 15,
    editable: 10,
    metrikaYandex: [500, 1000, 2000],
    analyticsGoogle:[850, 1350, 3000] ,
    sendOrder: 500,
    deadlineDay:[[2,7],[3,10],[7,14]],
    deadlinePercent: [20, 17, 15]
};

const startButton = document.querySelector('.start-button'),
      firstScreen = document.querySelector('first-screen'),
      mainForm = document.querySelector('.main-form'),
      formCalculate = document.querySelector('.form-calculate'),
      endButton = document.querySelector('.end-button'),
      fastRange = document.querySelector('.fast-range'),
      totalPriceSum = document.querySelector('.total_price__sum'),
      switchElem = document.querySelector('.switcher'),
      switchElemValue = document.querySelector('.switcher > .checkbox-label'),
      adaptiveCheck = document.querySelector('#adapt'),
      mobileTemplatesCheck = document.querySelector('#mobileTemplates'),
      mobileTemplatesField = document.querySelector('#mobileTemplates-field'),
      total = document.querySelector('.total');

function showElm(elem){
    elem.style.display = 'block';
}

function hideElm(elem){
    elem.style.display = 'none';
}

function priceCalculation(elem){
    let result = 0,
        options = [],
        index = 0;

    if (elem.name === 'whichSite'){
        for (const item of formCalculate.elements){
            if (item.type === 'checkbox'){
                item.checked = false;
            }
        }
        hideElm(fastRange);
    }

    for (const item of formCalculate.elements){
        if (item.name === 'whichSite' && item.checked){
            index = DATA.whichSite.indexOf(item.value);
        } else if (item.classList.contains('calc-handler') && item.checked) {
            options.push(item.value);
        }
    }

    options.forEach(function(key){
        if (typeof(DATA[key]) === 'number'){
            if (key === 'sendOrder'){
                result += DATA[key];
            } else {
                result += DATA.price[index] * DATA[key] / 100;
            }
        } else {
            if (key === 'desktopTemplates'){
                result += DATA.price[index] * DATA[key][index] / 100;
            } else {
                result += DATA[key][index];
            }
        }
    });

    result += DATA.price[index];
    totalPriceSum.textContent = result;
}

function handlerCallBackForm(event) {
    const target = event.target;
    
    if (target.classList.contains('want-faster')) {
        target.checked ? showElm(fastRange) : hideElm(fastRange);
    }

    if(target.classList.contains('calc-handler')){
        priceCalculation(target);
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

mobileTemplatesField.style.opacity = '0.3';
adaptiveCheck.addEventListener('click', function(){
    if (adaptiveCheck.checked === true){
        mobileTemplatesField.style.opacity = '1';
        mobileTemplatesCheck.disabled = false;
    } else {
        mobileTemplatesField.style.opacity = '0.3';
        mobileTemplatesCheck.checked = false;
        mobileTemplatesCheck.disabled = true;
    }
    
});
document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {


    const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
    const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');




    /* Open closed click */

    dropDownBtn.addEventListener('click', function () {
        dropDownList.classList.toggle('dropdown__list--visible');
    });


    /* innerText input*/
    dropDownListItems.forEach(function(listItem) {
        listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            dropDownBtn.innerText = this.innerText;
            dropDownInput.value = this.dataset.value;
            // document.querySelector('.dropdown__list').classList.remove('dropdown__list--visible') - скрывает при нажатии
        })
    })


    /*Клик снаружи Дропдауна*/

    document.addEventListener('click', function (e) {
        if (e.target !== dropDownBtn) {
            dropDownList.classList.remove('dropdown__list--visible');
        }
    })


    /* Tab escape close*/
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            dropDownList.classList.remove('dropdown__list--visible');
        }
    })
    })



/* counter js */

const btnMinus = document.querySelector('[data-action="minus"]');
const btnPlus = document.querySelector('[data-action="plus"]');
const counter = document.querySelector('[data-counter]');


btnMinus.addEventListener('click', function () {
    console.log('Minus Clcik')
    counter.innerText = --counter.innerText;
})

btnPlus.addEventListener('click', function () {
    console.log('Plus Clcik')
    counter.innerText = ++counter.innerText;
})
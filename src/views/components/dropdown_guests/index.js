import Dropdown from './Dropdown'


//index.js

// document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {

//     const dropDownBtn = dropDownWrapper.querySelector('.dropdown__content');
//     const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
//     const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
//     const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

//     /* Open closed click */
//     dropDownBtn.addEventListener('click', function () {
//         dropDownList.classList.toggle('dropdown__list--visible');
//     });

    /* innerText input*/
    // dropDownListItems.forEach(function(listItem) {
    //     listItem.addEventListener('click', function (e) {
    //         e.stopPropagation();
    //         dropDownBtn.innerText = this.innerText;
            
             // dropDownInput.value = this.dataset.value;
             // document.querySelector('.dropdown__list').classList.remove('dropdown__list--visible') - скрывает при нажатии
        //  })
    // })


    /*Клик снаружи Дропдауна*/

    // document.addEventListener('click', function (e) {
    //     if (e.target !== dropDownBtn) {
    //         dropDownList.classList.remove('dropdown__list--visible');
    //         console.log('blyat')
    //     }
    // })})

    


//     /* Tab escape close*/
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Tab' || e.key === 'Escape') {
//             dropDownList.classList.remove('dropdown__list--visible');
//         }
//     })
//     })



//shared dropdown 
new Dropdown()




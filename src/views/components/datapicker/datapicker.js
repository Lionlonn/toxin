import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const DATEPICKER_INPUT_SELECTOR = ".datepicker-input";
const DROP_DATAPICKER_SELECTOR = ".datepicker";
const AIR_DATEPICKER_SELECTOR = '.datepicker-wrapper';
const AIR_DATEPICKER_VISIBLE_SELECTOR = "air-datepicker--opened";
const AIR_DATEPICKER_ARROW_SELECTOR = '.input__datepicker';
const ARROW_ANIMATION = 'animation-arrow';


class Datepicker {
    constructor(index, firstDates, lastDates, wrapperId) {
        this.dateIndex = index.dateIndex;
        this.firstDates = firstDates;
        this.lastDates = lastDates;
        this.wrapperId = wrapperId;
        this.init();
    }
    init() {
        this.dropPropagation();
        this.changeFields();
        this.constols();
        this.clearButton();
        this.datepickerOptions()
    }

    constols() {
        this.dropDatepicker = document.querySelector(DROP_DATAPICKER_SELECTOR);
        this.dateWrapper = document.querySelectorAll(AIR_DATEPICKER_SELECTOR);
        this.arrowInput = document.querySelectorAll(AIR_DATEPICKER_ARROW_SELECTOR);
    }

    dropPropagation() {
        // this.dateWrapper.addEventListener('click', (event) => {
        //     event.stopPropagation();
        // })
        document.addEventListener('click', this.handleDocunentClick.bind(this))
    }

    openDatepicker() {
        this.dateWrapper.forEach(dateOpen => {
            dateOpen.classList.toggle(AIR_DATEPICKER_VISIBLE_SELECTOR);
        })
        this.arrowInput.forEach(arrowAnim => {
            arrowAnim.classList.toggle(this.ARROW_ANIMATION);
        })
    }

    handleDocunentClick(e) {
        const isClickInside = this.dropDatepicker.contains(e.target);
        if(!isClickInside) {
            this.dateWrapper.forEach(calendar => {
                calendar.classList.remove(AIR_DATEPICKER_VISIBLE_SELECTOR);
                console.log('click');
            });
            this.arrowInput.forEach(arrowAnim => {
                arrowAnim.classList.remove(ARROW_ANIMATION)
            })
        }
    }


    changeFields(){
        const fields = document.querySelectorAll(DATEPICKER_INPUT_SELECTOR);
        fields.forEach(field => {
            field.addEventListener('click',  this.openDatepicker.bind(this));
        })
    }

    datepickerOptions() {
        this.dateWrapper.forEach(calendar => {
            const inputs = calendar.querySelectorAll(DATEPICKER_INPUT_SELECTOR);
            const clearButton = calendar.querySelectorAll('.air-datepicker-button');
            const datepick = new AirDatepicker(calendar, {
                minDate: new Date(),
                inline: true,
                range: true,
                multipleDatesSeparator: ' - ',
                buttons: ['clear', {
                    content: "Применить",
                    onClick: this.openDatepicker,
                }],
        
        
                onSelect(date) {
                    const firstDate = document.querySelector(`#${this.firstDates}`);
                    const lastDate = document.querySelector(`#${this.lastDates}`);
                    const { formattedDate } = date;
                    const [start, end] = formattedDate;
                    if (start && end) {
                        firstDate.value = start;
                        lastDate.value = end;
        
        
                    }
                }
        
            });
        });
    }

    clearButton() {
        const clearButton = document.querySelector('.air-datepicker-button');
    //     clearButton.addEventListener('click', () => {
    //     const firstDate = document.querySelector(`#${this.firstDates}`).value = '';
    //     const lastDate = document.querySelector(`#${this.lastDates}`).value = '';
    // });

    }
}


const datepick1 = new Datepicker({dateIndex: 1}, 'firstDate1', 'lastDate1', 'wrapperId1')

// export default Datepicker
// const DATEPICKER_INPUT_SELECTOR = ".datepicker-input";
// const DROP_DATAPICKER_SELECTOR = ".datepicker";
// const AIR_DATEPICKER_SELECTOR = '.datepicker-wrapper';
// const AIR_DATEPICKER_VISIBLE_SELECTOR = "air-datepicker--opened";
// const AIR_DATEPICKER_ARROW_SELECTOR = '.input__datepicker';
// const ARROW_ANIMATION = 'animation-arrow';



// //Открытие календаря

// const dropDatapicker = document.querySelector(DROP_DATAPICKER_SELECTOR);
// const dataHere = document.querySelectorAll(AIR_DATEPICKER_SELECTOR);
// const arrowInput = document.querySelectorAll(AIR_DATEPICKER_ARROW_SELECTOR);

// const openDatepicker = () => {
//     dataHere.forEach(dateOpen => {
//         dateOpen.classList.toggle(AIR_DATEPICKER_VISIBLE_SELECTOR);
//     });
//     arrowInput.forEach((arrowAnim) => {
//         arrowAnim.classList.toggle(ARROW_ANIMATION);

//     });


// };




// dropDatapicker.addEventListener('click', (e) => {
//     e.stopPropagation();
// });


// // Открытие через 2 input
// const fields = document.querySelectorAll(DATEPICKER_INPUT_SELECTOR);
// fields.forEach(field => {
//     field.addEventListener('click', openDatepicker);

// });


// // клик снаружи
// document.addEventListener('click', (e) => {
//     const isClickInside = dropDatapicker.contains(e.target);
//     if (!isClickInside) {
//         dataHere.forEach(calendar => {
//             calendar.classList.remove(AIR_DATEPICKER_VISIBLE_SELECTOR);
//         });
//         arrowInput.forEach((arrowAnim) => {
//             arrowAnim.classList.remove(ARROW_ANIMATION);
//         });
//     }
// });


// dataHere.forEach(calendar => {
//     const firstDateId = document.querySelectorAll('[data-first-id]');
//     const lastDateId = document.querySelectorAll('[data-last-id]');
//     firstDateId.forEach(firstDates => {
//         firstDates.getAttribute('[data-first-id]');
//         console.log(firstDates);
//     });
//     lastDateId.forEach(lastDates => {
//         lastDates.getAttribute('[data-last-id]');
//         console.log(lastDates);
//     });
//     // console.log(firstDateId);
//     // console.log(lastDateId);
//     const inputs = calendar.querySelectorAll(DATEPICKER_INPUT_SELECTOR);
//     const clearButton = calendar.querySelectorAll('.air-datepicker-button');
//     const datepick = new AirDatepicker(calendar, {
//         minDate: new Date(),
//         inline: true,
//         range: true,
//         multipleDatesSeparator: ' - ',
//         buttons: ['clear', {
//             content: "Применить",
//             onClick: openDatepicker,
//         }],


//         onSelect(date) {
//             const firstDate = document.querySelector(`#${firstDateId}`);
//             const lastDate = document.querySelector(`#${lastDateId}`);
//             const { formattedDate } = date;
//             const [start, end] = formattedDate;
//             if (start && end) {
//                 firstDate.value = start;
//                 lastDate.value = end;


//             }
//         }

//     });
// });




// const clearButton = document.querySelector('.air-datepicker-button');
// clearButton.addEventListener('click', () => {
//     const firstDate = document.querySelector('#startDate').value = '';
//     const lastDate = document.querySelector('#endDate').value = '';

// });



// class AirDatepicker {
//     constructor(wrapperSelector, inputSelector) {
//       this.wrapper = document.querySelector(wrapperSelector);
//       this.input = this.wrapper.querySelectorAll(inputSelector);
//       this.firstDateId = this.wrapper.querySelectorAll('[data-first-id]');
//       this.lastDateId = this.wrapper.querySelectorAll('[data-last-id]');
//       this.clearButton = this.wrapper.querySelector('.air-datepicker-button');
//       this.datepicker = new AirDatepicker(this.wrapper, {
//         minDate: new Date(),
//         inline: true,
//         range: true,
//         multipleDatesSeparator: ' - ',
//         buttons: ['clear', {
//           content: "Применить",
//           onClick: this.openDatepicker.bind(this),
//         }],
//         onSelect: this.onSelect.bind(this),
//       });
      
//       this.bindEvents();
//     }
    
//     bindEvents() {
//       this.wrapper.addEventListener('click', (e) => {
//         e.stopPropagation();
//       });
    
//       this.input.forEach(field => {
//         field.addEventListener('click', this.openDatepicker.bind(this));
//       });
    
//       document.addEventListener('click', (e) => {
//         const isClickInside = this.wrapper.contains(e.target);
//         if (!isClickInside) {
//           this.hideDatepicker();
//         }
//       });
    
//       this.clearButton.addEventListener('click', () => {
//         this.clearDates();
//       });
//     }
    
//     openDatepicker() {
//       this.wrapper.classList.toggle('air-datepicker--opened');
//       this.input.forEach((input) => {
//         input.classList.toggle('animation-arrow');
//       });
//     }
    
//     hideDatepicker() {
//       this.wrapper.classList.remove('air-datepicker--opened');
//       this.input.forEach((input) => {
//         input.classList.remove('animation-arrow');
//       });
//     }
    
//     onSelect(date) {
//       const firstDate = document.querySelector(`#${this.firstDateId}`);
//       const lastDate = document.querySelector(`#${this.lastDateId}`);
//       const { formattedDate } = date;
//       const [start, end] = formattedDate;
//       if (start && end) {
//         firstDate.value = start;
//         lastDate.value = end;
//       }
//     }
    
//     clearDates() {
//       const firstDate = document.querySelector(`#${this.firstDateId}`).value = '';
//       const lastDate = document.querySelector(`#${this.lastDateId}`).value = '';
//     }
//   }
  
//   const datePicker1 = new AirDatepicker('.datepicker-wrapper1', '.datepicker-input1');
//   const datePicker2 = new AirDatepicker('.datepicker-wrapper2', '.datepicker-input2');
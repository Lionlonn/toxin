import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';



const DATEPICKER_INPUT_SELECTOR = ".datepicker-input";
const DROP_DATAPICKER_SELECTOR = ".datepicker";
const AIR_DATEPICKER_SELECTOR = '.datepicker-wrapper';
const AIR_DATEPICKER_VISIBLE_SELECTOR = "air-datepicker--opened";
const AIR_DATEPICKER_ARROW_SELECTOR = '.input__datepicker';
const ARROW_ANIMATION = 'animation-arrow';



//Открытие календаря

const dropDatapicker = document.querySelector(DROP_DATAPICKER_SELECTOR);
const dataHere = document.querySelectorAll(AIR_DATEPICKER_SELECTOR);
const arrowInput = document.querySelectorAll(AIR_DATEPICKER_ARROW_SELECTOR);

const openDatepicker = (event) => {
    const calendarWrapper = event.target.closest(AIR_DATEPICKER_SELECTOR);
    console.log("calendarWrapper", calendarWrapper);
    const arrow = calendarWrapper.querySelector(AIR_DATEPICKER_ARROW_SELECTOR);
    console.log("arrow", arrow);
    const isOpen = calendarWrapper.classList.contains(AIR_DATEPICKER_VISIBLE_SELECTOR);

    dataHere.forEach(dateOpen => dateOpen.classList.remove(AIR_DATEPICKER_VISIBLE_SELECTOR));

    arrowInput.forEach((arrowAnim) => { arrowAnim.classList.remove(ARROW_ANIMATION); });

    if (!isOpen) {
        calendarWrapper.classList.add(AIR_DATEPICKER_VISIBLE_SELECTOR);
        arrow.classList.add(ARROW_ANIMATION);
    }
    // dataHere.classList.toggle(AIR_DATEPICKER_VISIBLE_SELECTOR);
    // dataHere.forEach(dateOpen => {
    //     dateOpen.classList.toggle(AIR_DATEPICKER_VISIBLE_SELECTOR);
    // });
    // arrowInput.forEach((arrowAnim) => {
    //     arrowAnim.classList.toggle(ARROW_ANIMATION);

    // });


};




dropDatapicker.addEventListener('click', (e) => {
    e.stopPropagation();
});


// Открытие через 2 input
const fields = document.querySelectorAll(DATEPICKER_INPUT_SELECTOR);
fields.forEach(field => {
    const calendarWrapper = field.closest(AIR_DATEPICKER_SELECTOR);
    console.log("calendarWrapper in fields.forEach", calendarWrapper);
    if (calendarWrapper) {
        field.addEventListener('click', openDatepicker);
    }
});


// клик снаружи
document.addEventListener('click', (e) => {
    const isClickInside = dropDatapicker.contains(e.target);
    if (!isClickInside) {
        dataHere.forEach(calendar => {
            calendar.classList.remove(AIR_DATEPICKER_VISIBLE_SELECTOR);
        });
        arrowInput.forEach((arrowAnim) => {
            arrowAnim.classList.remove(ARROW_ANIMATION);
        });
    }
});


dataHere.forEach(calendar => {
    const inputs = calendar.querySelectorAll(DATEPICKER_INPUT_SELECTOR);
    const clearButton = calendar.querySelectorAll('.air-datepicker-button');
    const datepick = new AirDatepicker(calendar, {
        minDate: new Date(),
        inline: true,
        range: true,
        multipleDatesSeparator: ' - ',
        buttons: ['clear', {
            content: "Применить",
            onClick: openDatepicker,
        }],


        onSelect(date) {
            const firstDate = document.querySelector('#startDate');
            const lastDate = document.querySelector('#endDate');
            const { formattedDate } = date;
            const [start, end] = formattedDate;
            if (start && end) {
                firstDate.value = start;
                lastDate.value = end;


            }
        }

    });
});




const clearButton = document.querySelector('.air-datepicker-button');
clearButton.addEventListener('click', () => {
    const firstDate = document.querySelector('#startDate').value = '';
    const lastDate = document.querySelector('#endDate').value = '';
});




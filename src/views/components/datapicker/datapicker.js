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


        // console.log(this.dateWrapper);
    }
    init() {
        this.dropPropagation();
        this.changeFields();
        this.constols();
        this.clearButton();
        this.datepickerOptions();
    }

    constols() {
        this.dropDatepicker = document.querySelector(`#datepicker-${this.dateIndex}`);
        this.dateWrapper = document.querySelectorAll(`#datepicker-${this.dateIndex} .datepicker-wrapper`);
        this.arrowInput = document.querySelectorAll(`#datepicker-${this.dateIndex} .input__datepicker`);
    }

    dropPropagation() {
        // this.dateWrapper.addEventListener('click', (event) => {
        //     event.stopPropagation();
        // })
        document.addEventListener('click', this.handleDocunentClick.bind(this));
    }

    openDatepicker() {
        this.dateWrapper.forEach(dateOpen => {
            dateOpen.classList.toggle(AIR_DATEPICKER_VISIBLE_SELECTOR);
        });
        this.arrowInput.forEach(arrowAnim => {
            arrowAnim.classList.toggle(this.ARROW_ANIMATION);
        });
    }

    handleDocunentClick(e) {
        const isClickInside = this.dropDatepicker.contains(e.target);
        if (!isClickInside) {
            this.dateWrapper.forEach(calendar => {
                calendar.classList.remove(AIR_DATEPICKER_VISIBLE_SELECTOR);
                console.log('click');
            });
            this.arrowInput.forEach(arrowAnim => {
                arrowAnim.classList.remove(ARROW_ANIMATION);
            });
        }
    }


    changeFields() {
        const fields = document.querySelectorAll(AIR_DATEPICKER_ARROW_SELECTOR);
        fields.forEach(field => {
            field.addEventListener('click', this.openDatepicker.bind(this));
        });
    }

    datepickerOptions() {
        this.dateWrapper.forEach(calendar => {
            const datepick = new AirDatepicker(calendar, {
                minDate: new Date(),
                inline: true,
                range: true,
                multipleDatesSeparator: ' - ',
                buttons: ['clear', {
                    content: "Применить",
                    onClick: this.openDatepicker.bind(this),
                }],


                onSelect: (date) => {
                    const { formattedDate } = date;
                    const [start, end] = formattedDate;
                    if (start && end) {
                        const firstDateInputs = document.querySelectorAll(`#datepicker-${this.dateIndex} [data-first-id]`);
                        const lastDateInputs = document.querySelectorAll(`#datepicker-${this.dateIndex} [data-last-id]`);
                        firstDateInputs.forEach(input => input.value = start);
                        lastDateInputs.forEach(input => input.value = end);
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


const datepick1 = new Datepicker({ dateIndex: 1, firstDates: 'arrivalFerst', lastDates: 'arrivalLast', wrapperId: 'wrapperIdOne' });
const datepick2 = new Datepicker({ dateIndex: 2, firstDates: 'firstDateTwo', lastDates: 'lastDatesTwo', wrapperId: 'wrapperIdTwo' });
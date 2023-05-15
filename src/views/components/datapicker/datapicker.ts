import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const DATEPICKER_INPUT_SELECTOR = ".datepicker-input";
const DROP_DATAPICKER_SELECTOR = ".datepicker";
const AIR_DATEPICKER_SELECTOR = '.datepicker-wrapper';
const AIR_DATEPICKER_VISIBLE_SELECTOR = "air-datepicker--opened";
const AIR_DATEPICKER_ARROW_SELECTOR = '.input__datepicker';
const ARROW_ANIMATION = 'animation-arrow';


interface DatepickerOptions {
    dateIndex: number | null;
    // index?: number | null;
    firstDates?: string | undefined;
    lastDates?: string | undefined
}

class Datepicker {
    private dateIndex: number | null;
    private index: number | null;
    private firstDates: string | undefined | null;
    private lastDates: string | undefined | null;
    private dropDatepicker: HTMLElement | undefined
    private dateWrapper: NodeListOf<HTMLElement> | undefined;
    private arrowInput: NodeListOf<HTMLElement> | undefined;

    constructor(options: DatepickerOptions) {
        this.dateIndex = options.dateIndex ?? null; // options.index.dateIndex
        this.firstDates = options.firstDates;
        this.lastDates = options.lastDates;
        this.init();
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
        this.arrowInput = document.querySelectorAll(`#datepicker-${this.dateIndex} .input__datepicker`);;
    }

    dropPropagation() {
        document.addEventListener('DOMContentLoaded', () => {
            this.dateWrapper.forEach(clickPropagation => {
                clickPropagation.addEventListener('click', (event) => {
                    event.stopPropagation();
                });
            });
        });
        document.addEventListener('click', this.handleDocunentClick.bind(this));
    }

    openDatepicker() {
        this.dateWrapper.forEach(dateOpen => {
            dateOpen.classList.toggle(AIR_DATEPICKER_VISIBLE_SELECTOR);
        });
        this.arrowInput.forEach(arrowAnim => {
            arrowAnim.classList.toggle(ARROW_ANIMATION);
        });
    }

    handleDocunentClick(e) {
        const isClickInside = this.dropDatepicker.contains(e.target);
        if (!isClickInside) {
            this.dateWrapper.forEach(calendar => {
                calendar.classList.remove(AIR_DATEPICKER_VISIBLE_SELECTOR);
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
                    const datesArray = Array.isArray(formattedDate) ? formattedDate : [formattedDate];
                    const [start, end] = datesArray;
                    if (start && end) {
                        const firstDateInputs = document.querySelectorAll<HTMLInputElement>(`#datepicker-${this.dateIndex} [data-first-id]`);
                        const lastDateInputs = document.querySelectorAll<HTMLInputElement>(`#datepicker-${this.dateIndex} [data-last-id]`);
                        firstDateInputs.forEach(input => input.value = start);
                        lastDateInputs.forEach(input => input.value = end);
                    }
                }

            });
        });
    }

    clearButton() {
        document.addEventListener('DOMContentLoaded', () => {
            const clearBtn = document.querySelector(`#wrapper-${this.dateIndex} .air-datepicker-button`);
            clearBtn.addEventListener('click', () => {
                const firstDate = document.querySelector<HTMLInputElement>(`#datepicker-${this.dateIndex} [data-first-id]`).value = '';
                const lastDate = document.querySelector<HTMLInputElement>(`#datepicker-${this.dateIndex} [data-last-id]`).value = '';
            });
        });
    }
}


const datepick1 = new Datepicker({ dateIndex: 1, firstDates: 'arrivalFerst', lastDates: 'arrivalLast'});
const datepick2 = new Datepicker({ dateIndex: 2, firstDates: 'firstDateTwo', lastDates: 'lastDatesTwo' });
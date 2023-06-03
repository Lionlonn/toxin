import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import moment from 'moment';
import 'moment/locale/ru';

// const calendarSelector = document.querySelector('.calendar');

// const calendar = new AirDatepicker(calendarSelector as HTMLElement, {
//     buttons: ['clear', {
//         content: "Применить"
//     }]
// });


class CalendarBlock {
    private calendarSelector: HTMLElement;
    private inputDatepicker: HTMLInputElement;

    constructor() {
        this.init()
    }

    init() {
        this.selectors()
        this.open()
        this.datepickerOptions()
    }

    selectors() {
        this.calendarSelector = document.querySelector('.calendar');
        this.inputDatepicker = document.querySelector('.datepicker-block')
    }

    open() {
        this.inputDatepicker.addEventListener('click', () => {
            this.calendarSelector.classList.toggle('calendar--visible')
        })
    }
    datepickerOptions() {
        const calendar = new AirDatepicker(this.calendarSelector as HTMLElement, {
            range: true,
            multipleDatesSeparator: ' - ',
            buttons: ['clear', {
                content: "Применить"
            }],

            onSelect: (date) => {
                const { formattedDate } = date;
                const datesArray = Array.isArray(formattedDate) ? formattedDate : [formattedDate];
                const formattedDates = datesArray.map(this.formatDate);
                this.inputDatepicker.value = formattedDates.join(' - ');
            }

        });
    }
    formatDate(dateString) {
        const date = moment(dateString, 'DD.MM.YYYY');
        const formattedDate = date.format('D MMMM').slice(0, 6);
        return formattedDate;
    }
}

new CalendarBlock()
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import moment from 'moment';
import 'moment/locale/ru';


class CalendarBlock {
    private calendarSelector: HTMLElement | null;
    private inputDatepicker: HTMLInputElement | null;

    constructor() {
        this.calendarSelector = null;
        this.inputDatepicker = null;
        this.init()
    }

    init() {
        this.selectors()
        console.log(this.calendarSelector);
        if (this.inputDatepicker) {
            this.open()
            this.datepickerOptions()
        }
        if (!this.inputDatepicker) {
            this.datepickerEmpty();
        }
    }

    selectors() {
        this.calendarSelector = document.querySelector('.calendar');
        this.inputDatepicker = document.querySelector('.datepicker-block')
    }

    open() {
        if (this.inputDatepicker && this.calendarSelector) {
            this.inputDatepicker.addEventListener('click', () => {
                this.calendarSelector.classList.toggle('calendar--visible')
            })
        }  
    }
    datepickerOptions() {
        if (this.inputDatepicker) {
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
    }
    datepickerEmpty() {
        const calendar = new AirDatepicker(this.calendarSelector as HTMLElement, {
            buttons: ['clear', {
                content: "Применить"
            }],
        });
    }
    formatDate(dateString) {
        const date = moment(dateString, 'DD.MM.YYYY');
        const formattedDate = date.format('D MMMM').slice(0, 6);
        return formattedDate;
    }
}

new CalendarBlock()
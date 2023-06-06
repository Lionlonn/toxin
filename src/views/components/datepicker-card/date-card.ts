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

        if (this.inputDatepicker) {
            this.open()
            this.datepickerOptions()
        }
        if (!this.inputDatepicker) {
            this.datepickerEmpty();
        }
        this.handleDocumentClick();
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

    handleDocumentClick() {
        document.addEventListener('click', (event) => {
            const isClickInside = this.inputDatepicker.contains(event.target as Node);
            const isClickCalendar = this.calendarSelector.contains(event.target as Node);
            if (!isClickInside && !isClickCalendar) {
                this.calendarSelector.classList.remove('calendar--visible')
            }

        })
    }
    datepickerOptions() {
        if (this.inputDatepicker) {
            const calendar = new AirDatepicker(this.calendarSelector as HTMLElement, {
                range: true,
                multipleDatesSeparator: ' - ',
                buttons: ['clear', {
                    content: "Применить",
                    onClick: () => {
                        this.calendarSelector.classList.remove('calendar--visible')
                    }
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
                content: "Применить",
                onClick: () => {
                    console.log("aply");
                },
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
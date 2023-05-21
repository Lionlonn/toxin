import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const calendarSelector = document.querySelector('.calendar');

const calendar = new AirDatepicker(calendarSelector as HTMLElement, {
    buttons: ['clear', {
        content: "Применить"
    }]
});
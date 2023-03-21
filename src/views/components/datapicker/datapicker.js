import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { Input } from 'postcss';


const DATEPICKER_INPUT_SELECTOR = ".datepicker-input";
const DROP_DATAPICKER_SELECTOR = ".datepicker";
const AIR_DATEPICKER_SELECTOR = '.dateTest';
const AIR_DATEPICKER_VISIBLE_SELECTOR = "air-datepicker--opened";


//Открытие календаря

const dropDatapicker = document.querySelector(DROP_DATAPICKER_SELECTOR);
const dataHere = document.querySelector(AIR_DATEPICKER_SELECTOR);


const openDatepicker = () => {
    dataHere.classList.toggle(AIR_DATEPICKER_VISIBLE_SELECTOR);
}




dropDatapicker.addEventListener('click', (e) => {
    e.stopPropagation();
})


// Открытие через 2 input
const fields = document.querySelectorAll(DATEPICKER_INPUT_SELECTOR);
fields.forEach(field => field.addEventListener('click', openDatepicker));


// клик снаружи
const outClick = document.querySelectorAll(DATEPICKER_INPUT_SELECTOR);
document.addEventListener('click', (e) => {
    if(e.target !== outClick) {
        
        dataHere.classList.remove(AIR_DATEPICKER_VISIBLE_SELECTOR);
    }
})

 const datepick = new AirDatepicker(AIR_DATEPICKER_SELECTOR,  {
    
    minDate: new Date(),
    inline: true,
    range: true,
    multipleDatesSeparator: ' - ',
    buttons: [{
        content: "Очистить",

    }, {
        content: "Применить",
        onClick: openDatepicker,
    }],
    
    
    onSelect(date)  {
        const firstDate = document.querySelector('#startDate');
        const lastDate = document.querySelector('#endDate');
        const {formattedDate} = date;
        const [start, end] = formattedDate;
        if(start && end) {
            firstDate.value = start;
            lastDate.value = end;
            
            
        }
    }
    
})






import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { Input } from 'postcss';




//Открытие календаря

const dropDatapicker = document.querySelector('.datepicker');
const dataHere = document.querySelector('.dateTest');



const openDatepicker = () => {
    
    dataHere.classList.toggle('dateTest--opened');
}



//клик снаружи 




 const datepick = new AirDatepicker('.dateTest',  {
    
    
    inline: true,
    autoClose:true,
    range: true,
    multipleDatesSeparator: ' - ',
    buttons: ['clear', 'apply'],
    onSelect(date)  {
        const firstDate = document.querySelector('#startDate');
        const lastDate = document.querySelector('#endDate');
        const {formattedDate} = date;
        const [start, end] = formattedDate;
        if(start && end) {
            firstDate.value = start;
            lastDate.value = end;
            // dataHere.classList.remove('dateTest--opened');
            
        }
    
        

        
        
        
        
        
    }
    
   
    
        
})

// const outCLick =  document.querySelector('.datepicker-here');
//     document.addEventListener('click', (e) => {
//         if (e.target !== outCLick) {
//             dataHere.classList.remove('dateTest--opened');
//         }
//     })

const fields = document.querySelectorAll('.datepicker-here');
fields.forEach(field => field.addEventListener('click', openDatepicker));



const outClick = document.querySelectorAll('.datepicker-here');
document.addEventListener('click', (e) => {
    if(e.target !== outClick) {
        
        dataHere.classList.remove('dateTest--opened');
    }
})



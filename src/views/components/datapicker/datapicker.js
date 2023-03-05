import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';


// const minData = document.querySelector('#startDate');
// const maxData = document.querySelector('#endDate');


//Открытие календаря

const dropDatapicker = document.querySelector('.datepicker');
const dataHere = document.querySelector('.dateTest');

dropDatapicker.addEventListener('click', () => {
    dataHere.classList.toggle('dateTest--opened');
})

//клик снаружи 

// const outclick = document.addEventListener('click', (event) => {
//     if(event.target !== dropDatapicker) {
//         dataHere.classList.remove('.dateTest--opened');
//     }
// })


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
        firstDate.value = start;
        lastDate.value = end;
        


        
        
        
        
        
        
    }
   
    
        
})

// new AirDatepicker('#endDate', {
//     value:"inputValue.end",
//     autoClose:true,
//     range: true,
//     multipleDatesSeparator: ' - ',
//     buttons: ['clear', 'apply']
        
// })


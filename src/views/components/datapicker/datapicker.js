import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';


new AirDatepicker('#airdatepicker', {
    range: true,
    multipleDatesSeparator: ' - ',
    buttons: ['clear', 'apply']
    
        
})

new AirDatepicker('#airdatepicker2', {
    range: true,
    multipleDatesSeparator: ' - ',
    buttons: ['clear', 'apply']
        
})

let dpMin, dpMax;
dpMin = new AirDatepicker('#airdatepicker', {
    onSelect({date}) {
        dpMax.update({
            minDate: date
        })
    }
})

dpMax = new AirDatepicker('#airdatepicker2', {
    onSelect({date}) {
        dpMin.update({
            maxDate: date
        })
    }
})
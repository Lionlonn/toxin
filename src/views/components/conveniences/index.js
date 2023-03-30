import Dropdown from '../dropdown_guests/Dropdown'

const props = {
    
    fields:{
        bedrooms: {
            separated_values: ['Спальня','Спальни','Спальн'],
        },
        beds: {
            separated_values: ['Кровать','Кровати','Кроватей']
        },
        baths: {
           separated_values: ['Ванная','Ванные','Ванн'],
        }
        
    }
    
}

const field_selector = '#dropT';


new Dropdown(props, field_selector)


console.log('test');
// function TestF() {
//     this.name = 'Aleck'
// }

// const testf = new TestF('Vibka')
// console.log(testf.name);


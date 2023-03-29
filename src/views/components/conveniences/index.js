import Dropdown from '../dropdown_guests/Dropdown'

const props = {
    fields:{
        bedrooms: {
            separated_values: ['Спальня','Спальни','Спальн']
        },
        beds: {
            separated_values: ['Кровать','Кровати','Кроватей']
        },
        baths: {
           separated_values: ['Ванная','Ванные','Ванн'],
        }
    }
}

const field_selector = '.dropdown__content';

const dropdown2 = new Dropdown(props, field_selector)
console.log(dropdown2.field_selector);



// function TestF() {
//     this.name = 'Aleck'
// }

// const testf = new TestF('Vibka')
// console.log(testf.name);


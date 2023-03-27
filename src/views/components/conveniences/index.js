import Dropdown from "../dropdown_guests/Dropdown";

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

new Dropdown(props)
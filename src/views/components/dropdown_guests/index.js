import Dropdown from './Dropdown'






const dropdownOptions1 = {
    dropdownSelector: '#dropdown-guests',
    dropdownListSelector: '#dropdownList1',
    shared_value:['Гость', 'Гостя', 'Гостей'],
    fields:{
        adults: {},
        children: {},
        babies: {
            separated_values: ['Младенец','Младанца','Мледанцев'],
        }
    },
    buttonsClearSelector: '#btnClearGuestsId',
}

const dropdownOptions2 = {
    dropdownSelector: '#dropdown-conveniences',
    dropdownListSelector: '#testlist2',
    fields:{
        bedrooms: {
            separated_values: ['Спальня','Спальни','Спальн'],
        },
        beds: {
            separated_values: ['Кровать','Кровати','Кроватей']
        },
        baths: {
           separated_values: ['Ванная комната','Ванные комнаты','Ванных комнат'],
        }
    },
    buttonsClearSelector: '#btnClearConveniencesId',
}

const test1 = new Dropdown(dropdownOptions1)
const test2 = new Dropdown(dropdownOptions2)
// new Dropdown(props, field_selector)

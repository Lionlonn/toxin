import Dropdown from './Dropdown';


const dropdownOptions1 = {
    dropdownSelector: '#dropdown-guests',
    dropdownListSelector: '#dropdownList1',
    shared_value: ['Гость', 'Гостя', 'Гостей'],
    fields: {
        adults: {
            count: 0,
        },
        children: {
            count: 0,
        },
        babies: {
            count: 0,
            separated_values: ['Младенец', 'Младанца', 'Мледанцев'],
        }
    },
    buttonsClearSelector: '#clear-id',
};
const dropdownOptions3 = {
    dropdownSelector: '#dropdown-booking',
    dropdownListSelector: '#dropdown-list__booking',
    shared_value: ['Гость', 'Гостя', 'Гостей'],
    fields: {
        adults: {
            count: 0,
        },
        children: {
            count: 0,
        },
        babies: {
            count: 0,
            separated_values: ['Младенец', 'Младанца', 'Мледанцев'],
        }
    },
    buttonsClearSelector: '#clear-booking',
};


const myDropdown1 = new Dropdown(dropdownOptions1);
const myDropdown2 = new Dropdown(dropdownOptions3);



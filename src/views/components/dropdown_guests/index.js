import Dropdown from './Dropdown';






const dropdownOptions1 = {
    dropdownSelector: '#dropdown-guests',
    dropdownListSelector: '#dropdownList1',
    shared_value: ['Гость', 'Гостя', 'Гостей'],
    fields: {
        adults: {},
        children: {},
        babies: {
            separated_values: ['Младенец', 'Младанца', 'Мледанцев'],
        }
    },
    buttonsClearSelector: '#btnClearGuestsId',
};



const test1 = new Dropdown(dropdownOptions1)



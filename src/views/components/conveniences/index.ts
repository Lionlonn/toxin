import Dropdown from '../dropdown_guests/Dropdown';

const dropdownOptions2 = {
    dropdownSelector: '#dropdown-conveniences',
    dropdownListSelector: '#conveniences-list',
    fields: {
        bedrooms: {
            separated_values: ['Спальня', 'Спальни', 'Спальн'],
            count: 0
        },
        beds: {
            separated_values: ['Кровать', 'Кровати', 'Кроватей'],
            count: 0
        },
        baths: {
            separated_values: ['Ванная комната', 'Ванные комнаты', 'Ванных комнат'],
            count: 0
        }
    },
    buttonsClearSelector: '#btnClearConveniencesId',
};

const dropdownConveniences = new Dropdown(dropdownOptions2);


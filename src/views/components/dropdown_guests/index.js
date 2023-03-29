import Dropdown from './Dropdown'

const props = {
    shared_value:['Гость', 'Гостя', 'Гостей'],
    fields:{
        adults: {},
        children: {},
        babies: {
           separated_values: ['Младенец','Младанца','Мледанцев'],
        }
    }
}


const dropdownd1 = new Dropdown(props)

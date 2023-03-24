import Dropdown from './Dropdown'

const props = {
    shared_value:['Гость', 'Гостя', 'Гостей'],
    fields:{
        adults: {},
        children: {},
        babies: {
           separated_values: ['Младенец','Младанцев','Мледанцев'],
        }
    }
}

new Dropdown(props)

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

new Dropdown(props)

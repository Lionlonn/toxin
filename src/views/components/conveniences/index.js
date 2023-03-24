import Dropdown from "../dropdown_guests/Dropdown";

const props = {
    fields:{
        bedrooms: {
            separated_values: ['Младенец','Младанцев','Мледанцев']
        },
        beds: {
            separated_values: ['Младенец','Младанцев','Мледанцев']
        },
        baths: {
           separated_values: ['Младенец','Младанцев','Мледанцев'],
        }
    }
}

// new Dropdown(props)
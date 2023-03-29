const plural = require('plural-ru');

const MAX_VALUE = 5
const MIN_VALUE = 0

const DECREMENT_SELECTOR = '[data-action="minus"]';
const INCREMENT_SELECTOR = '[data-action="plus"]';
const COUNTERS_SELECTOR = '[data-type]'; 



// dropdown constants
const DROPDOwN_CONTENT_SELECTOR = '.dropdown__content';
const DROPDOWN_LIST_SELECTOR = '.dropdown__list';
const DROPDOWN_LIST_ITEM_SELECTOR = '.dropdown__list-item';
const DROPDOWN_LIST_VISIBLE_SELECTOR = 'dropdown__list--visible';
const DROPDOWN_CONTENT_ANIMATION_ARROW = 'animation-arrow'


//Buttons constants
const BUTTONS_CLEAR_SELECTOR = '.button-clear';
const BUTTONS_APPLY_SELECTOR = '.button-apply';

function pluralValue(count, values){
  const [value1, value2, value3] = values

  return plural(count, `%d ${value1}`, `%d ${value2}`, `%d ${value3}`)
}



//класс дропдауна
class Dropdown {
  
  constructor(props, field_selector) {  
    this.field_selector = field_selector;
    this.field = document.querySelector(field_selector);
    const test = Object.entries(props.fields).map(test1 => {
      const [key, value] = test1;
      return [key, {...value, count: 0}]
    })

    this.props = {shared_value: props.shared_value, fields:{...Object.fromEntries(test)}}
    
    
    console.log(this.field);
    
    this.dicrements = [];
    this.increments = [];
    this.totalCount = 0;
    

    this.init()

  }

  //инициализация всех элементов
  //и привязка слушателей
  init(){
    this.setControls()
    // this.setField()
    this.attachControlListeners()
    this.setDropdown()
    this.applyButtons()
  }
  
  setDropdown() {
    this.dropdown = document.querySelectorAll('.dropdown').forEach((dropDownWrapper) => {
      const dropDownBtn = dropDownWrapper.querySelector(DROPDOwN_CONTENT_SELECTOR);
      const dropDownList = dropDownWrapper.querySelector(DROPDOWN_LIST_SELECTOR);
      const dropDownListItems = dropDownList.querySelectorAll(DROPDOWN_LIST_ITEM_SELECTOR);


      dropDownList.addEventListener('click', (e) => {
        e.stopPropagation();
      })

      //Открытие дропдауна
      dropDownBtn.addEventListener('click', () => {
        dropDownList.classList.toggle(DROPDOWN_LIST_VISIBLE_SELECTOR);
        this.resetContent()
        
        dropDownBtn.classList.toggle(DROPDOWN_CONTENT_ANIMATION_ARROW)
      }
      )

      // Клик снаружи дропдауна
      const outsideClick = document.addEventListener('click', (event) => {
        if (event.target !== dropDownBtn) {
          dropDownList.classList.remove(DROPDOWN_LIST_VISIBLE_SELECTOR)
          dropDownBtn.classList.remove(DROPDOWN_CONTENT_ANIMATION_ARROW)
        }
      })

    })
    
    
  }
  
  
  //берем все минусы и плюсы
  setControls(){

    this.dicrements = document.querySelectorAll(DECREMENT_SELECTOR)
    this.increments = document.querySelectorAll(INCREMENT_SELECTOR)
    this.counters = document.querySelectorAll(COUNTERS_SELECTOR)
    

  }
  //берем текст поля
  // setField() {
  //   this.field = document.querySelector(DROPDOwN_CONTENT_SELECTOR);
  
  // }
  //меняем текст поля
  changeFieldContent(type) {
    

    const field = this.props.fields[type]
    const {shared_value} = this.props
    const {separated_values} = this.props
    
    const separated_elements = Object.values(this.props.fields).filter((field)=>field.separated_values)

    const separated_text = separated_elements.map((element) => element.count > 0 ?  pluralValue(element.count, element.separated_values) : '').join('')

    const text = `${shared_value ? pluralValue(this.totalCount, shared_value): ''} ${separated_text}`

    this.field.innerText = this.totalCount > 0 ? text : "Сколько гостей"
    
  }
  //обработчик для плюсов и минусов
  //HOC - High Order Component или замыкание
 
  
  handelChangeCounter (delta) { 
    return (event) => {
      
    
    const parent = event.target.parentElement;
    const dicrement = parent.querySelector(DECREMENT_SELECTOR)
    const increment = parent.querySelector(INCREMENT_SELECTOR)
    this.enableElement(dicrement)
    this.enableElement(increment)
    
    
    //текущий каунтер и значение
    const currentCounter = parent.querySelector(COUNTERS_SELECTOR)
    this.currentValue  = Number(currentCounter.innerText)
    const type = currentCounter.dataset.type;
    
    
    
    //решаем прибавлять или убавлять значение
    if (delta > 0 && this.currentValue < MAX_VALUE || delta < 0 && this.currentValue !== MIN_VALUE) {
        currentCounter.innerText = delta + this.currentValue;
        this.currentValue = delta + this.currentValue;
        this.props.fields[type].count += delta;
        this.totalCount += delta;
        
        
        this.changeFieldContent(type);
        this.clearButton()
        
    } 

    if (this.currentValue === MAX_VALUE) {
      this.disableElement(increment)
      
    } 

    if (this.totalCount === MIN_VALUE) {
      this.disableElement(dicrement)
      this.closeRemoveButton()
    }
    
  }}

  disableElement(element){
    element.classList.add('disabled')
  }
  
  enableElement(element){
    element.classList.remove('disabled')
  }


  attachControlListeners(){
    this.increments.forEach((increment) => increment.addEventListener('click', this.handelChangeCounter(1).bind(this)))
    this.dicrements.forEach((dicrement) => dicrement.addEventListener('click', this.handelChangeCounter(-1).bind(this)))

    
    
  }

  //BUTONS

  applyButtons() {
    const closeApply = document.querySelector(BUTTONS_APPLY_SELECTOR);
    const applyRemove = document.querySelector(DROPDOWN_LIST_SELECTOR);
    closeApply.addEventListener('click', () => {
      applyRemove.classList.remove(DROPDOWN_LIST_VISIBLE_SELECTOR);
    })
  }

  resetContent() {
    const zeroText = document.querySelector(DROPDOwN_CONTENT_SELECTOR).innerText = "Сколько гостей";
    const zeroNumber = document.querySelectorAll(COUNTERS_SELECTOR).forEach((zeroText) => {
      this.currentValue = 0;
      this.totalCount = 0;
      zeroText.innerText = 0;
      this.counters = 0;
      
    })

    if (this.currentValue === MIN_VALUE) {
      const resetDisableMinus = document.querySelectorAll(DECREMENT_SELECTOR).forEach((disableMinus) => {
        disableMinus.classList.add('disabled')
      });
    }
    if (this.currentValue < MAX_VALUE) {
      const resetDisablePlus = document.querySelectorAll(INCREMENT_SELECTOR).forEach((enablePlus) => {
        enablePlus.classList.remove('disabled');
      });
    }
    
  }

  

  clearButton() {
    const buttonClear = document.querySelector(BUTTONS_CLEAR_SELECTOR);
    
    buttonClear.classList.add('button-clear--visible');
    buttonClear.addEventListener('click', () => {
      
      this.resetContent()
      this.closeRemoveButton();
    })
  }
  closeRemoveButton() {
    const buttonClearRemove = document.querySelector(BUTTONS_CLEAR_SELECTOR);
    buttonClearRemove.classList.remove('button-clear--visible');

  }


}

  

export default Dropdown


// const entries = Object.entries(fields).map(([key,value])=>
//       [key, {...value, count: 0}]
//     )
//     this.fields = Object.fromEntries(entries)


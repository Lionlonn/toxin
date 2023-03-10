const textDrop = require('plural-ru');

const MAX_VALUE = 5
const MIN_VALUE = 0

const DECREMENT_SELECTOR = '[data-action="minus"]';
const INCREMENT_SELECTOR = '[data-action="plus"]';
const COUNTERS_SELECTOR = '[data-counter]'; 

// dropdown constants
const DROPDOwN_CONTENT_SELECTOR = '.dropdown__content';
const DROPDOWN_LIST_SELECTOR = '.dropdown__list';
const DROPDOWN_LIST_ITEM_SELECTOR = '.dropdown__list-item';
const DROPDOWN_LIST_VISIBLE_SELECTOR = 'dropdown__list--visible';


//Buttons constants
const BUTTONS_CLEAR_SELECTOR = '.button-clear';
const BUTTONS_APPLY_SELECTOR = '.button-apply';

//класс дропдауна
class Dropdown {
  
  constructor() {
    this.dicrements = [];
    this.increments = [];
    this.counters = [];
    this.totalCount = 0;

    this.init()
  }

  //инициализация всех элементов
  //и привязка слушателей
  init(){
    this.setControls()
    this.setField()
    this.attachControlListeners()
    this.setDropdown()
    this.checkCounters()
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
      })

      // Клик снаружи дропдауна
      const outsideClick = document.addEventListener('click', (event) => {
        if (event.target !== dropDownBtn) {
          dropDownList.classList.remove(DROPDOWN_LIST_VISIBLE_SELECTOR)
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
  setField() {
    this.field = document.querySelector(DROPDOwN_CONTENT_SELECTOR);
  }

  //меняем текст поля
  changeFieldContent() {
    this.field.innerText = this.totalCount ? textDrop(this.totalCount, '%d Гость', '%d Гостя', '%d Гостей' ) : "Сколько Гостей"
    
  }

  //disabled counters
  checkCounters(){
    this.counters.forEach((counter) =>{
      if(counter.innerText == MIN_VALUE) {
        const parent = counter.parentElement
        const dicrement = parent.querySelector(DECREMENT_SELECTOR)
        this.disableElement(dicrement)
        
      }
    })
  }


  //обработчик для плюсов и минусов
  //HOC - High Order Component или замыкание
  handelChangeCounter (delta) { 
    return (event) => {
      
    //родительский элемент
    const parent = event.target.parentElement;
    const dicrement = parent.querySelector(DECREMENT_SELECTOR)
    const increment = parent.querySelector(INCREMENT_SELECTOR)
    this.enableElement(dicrement)
    this.enableElement(increment)

    //текущий каунтер и значение
    const currentCounter = parent.querySelector(COUNTERS_SELECTOR)
    this.currentValue  = Number(currentCounter.innerText)

    //решаем прибавлять или убавлять значение
    if (delta > 0 && this.currentValue < MAX_VALUE || delta < 0 && this.currentValue !== MIN_VALUE) {
        currentCounter.innerText = delta + this.currentValue;
        this.currentValue = delta + this.currentValue
        this.totalCount += delta
        this.changeFieldContent()
        this.closeButton()
    } 

    if (this.currentValue === MAX_VALUE) {
      this.disableElement(increment)
      
    }

    if (this.currentValue === MIN_VALUE) {
      this.disableElement(dicrement)
      this.closeRemoveButton(dicrement)
      
      
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
      this.totalCount = 0;
      zeroText.innerText = 0;
    })
    
  }

  closeButton() {
    const buttonClear = document.querySelector(BUTTONS_CLEAR_SELECTOR);
    
    buttonClear.classList.add('button-clear--visible');
    buttonClear.addEventListener('click', () => {
      
      this.resetContent()
      
    })
  }
  closeRemoveButton() {
    const buttonClear = document.querySelector(BUTTONS_CLEAR_SELECTOR);
    buttonClear.classList.remove('button-clear--visible');

  }


}

  

export default Dropdown

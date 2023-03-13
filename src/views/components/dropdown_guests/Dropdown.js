const textDrop = require('plural-ru');

const MAX_VALUE = 5
const MIN_VALUE = 0

const DECREMENT_SELECTOR = '[data-action="minus"]';
const INCREMENT_SELECTOR = '[data-action="plus"]';
const COUNTERS_SELECTOR = '[data-counter]'; 

//Константы dropdown
const DROPDOwN_CONTENT = '.dropdown__content';
const DROPDOWN_LIST = '.dropdown__list';
const DROPDOWN_LIST_ITEM = '.dropdown__list-item';
const DROPDOWN_LIST_VISIBLE = 'dropdown__list--visible';

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
    
  }
  
  setDropdown() {
    this.dropdown = document.querySelectorAll('.dropdown').forEach((dropDownWrapper) => {
      const dropDownBtn = dropDownWrapper.querySelector(DROPDOwN_CONTENT);
      const dropDownList = dropDownWrapper.querySelector(DROPDOWN_LIST);
      const dropDownListItems = dropDownList.querySelectorAll(DROPDOWN_LIST_ITEM);


      dropDownList.addEventListener('click', (e) => {
        e.stopPropagation();
      })

      //Открытие дропдауна
      dropDownBtn.addEventListener('click', () => {
        dropDownList.classList.toggle(DROPDOWN_LIST_VISIBLE);
      })

      // Клик снаружи дропдауна
      const outsideClick = document.addEventListener('click', (event) => {
        if (event.target !== dropDownBtn) {
          dropDownList.classList.remove(DROPDOWN_LIST_VISIBLE)
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
    this.field = document.querySelector(DROPDOwN_CONTENT);
  }

  //меняем текст поля
  changeFieldContent() {
    this.field.innerText = this.totalCount ? textDrop(this.totalCount, '%d Гость', '%d Гостя', '%d Гостей' ) : "Сколько Гостей"
    
  }

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
    } 

    if (this.currentValue === MAX_VALUE) {
      this.disableElement(increment)
    }

    if (this.currentValue === MIN_VALUE) {
      this.disableElement(dicrement)
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


}

  

export default Dropdown

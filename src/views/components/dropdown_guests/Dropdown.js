const textDrop = require('plural-ru');

const MAX_VALUE = 5
const MIN_VALUE = 0

const DECREMENT_SELECTOR = '[data-action="minus"]';

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
      const dropDownBtn = dropDownWrapper.querySelector('.dropdown__content');
      const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
      const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');


      dropDownList.addEventListener('click', (e) => {
        e.stopPropagation();
      })

      //Открытие дропдауна
      dropDownBtn.addEventListener('click', () => {
        dropDownList.classList.toggle('dropdown__list--visible');
      })

      // Клик снаружи дропдауна
      const outsideClick = document.addEventListener('click', (event) => {
        if (event.target !== dropDownBtn) {
          dropDownList.classList.remove('dropdown__list--visible')
        }
      })

    })
    
    
  }
  
  
  //берем все минусы и плюсы
  setControls(){

    this.dicrements = document.querySelectorAll(DECREMENT_SELECTOR)
    this.increments = document.querySelectorAll('[data-action="plus"]')
    this.counters = document.querySelectorAll('[data-counter]')
  }

  //берем текст поля
  setField() {
    this.field = document.querySelector('.dropdown__content')
  }

  //меняем текст поля
  changeFieldContent() {
    this.field.innerText = this.totalCount ? textDrop(this.totalCount, '%d Гость', '%d Гостя', '%d Гостей' ) : "Сколько Гостей"
    
  }

  checkCounters(){
    this.counters.forEach((counter) =>{
      if(counter.innerText == MIN_VALUE) {
        const parent = counter.parentElement
        const decrement = parent.querySelector(DECREMENT_SELECTOR)
        this.disableElement(decrement)
        
      }
    })
  }


  //обработчик для плюсов и минусов
  //HOC - High Order Component или замыкание
  handelChangeCounter (delta) { 
    return (event) => {
      
    //родительский элемент
    const parent = event.target.parentElement;
    const decrement = parent.querySelector(DECREMENT_SELECTOR)
    const increment = parent.querySelector('[data-action="plus"]')
    this.enableElement(decrement)
    this.enableElement(increment)

    //текущий каунтер и значение
    const currentCounter = parent.querySelector('[data-counter]')
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
      this.disableElement(decrement)
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

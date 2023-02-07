// import plural from './plural';

//класс дропдауна
class Dropdown {

  constructor() {
    this.dicrements = []
    this.increments = []
    this.counters = []
    this.totalCount = 0

    this.init()
  }

  //инициализация всех элементов
  //и привязка слушателей
  init(){
    this.setControls()
    this.setField()
    this.attachControlListeners()
    this.setDropdown()
    this.textValue()
    this.dataTextValue()
  }
  
  setDropdown() {
    this.dropdown = document.querySelectorAll('.dropdown').forEach((dropDownWrapper) => {
      const dropDownBtn = dropDownWrapper.querySelector('.dropdown__content');
      const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
      const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');


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

    this.dicrements = document.querySelectorAll('[data-action="minus"]')
    this.increments = document.querySelectorAll('[data-action="plus"]')
    this.counters = document.querySelectorAll('[data-counter]')
  }

  //берем текст поля
  setField() {
    this.field = document.querySelector('.dropdown__content')
  }

  //меняем текст поля
  changeFieldContent(initialContent = 'Сколько гостей') {
    this.field.innerText = this.totalCount > 0 ? this.totalCount : initialContent

    
  }

  //обработчик для плюсов и минусов
  //HOC - High Order Component или замыкание
  handelChangeCounter (delta) { 
    return (event) => {
      event.stopPropagation()
    //родительский элемент
    const parent = event.target.parentElement;

    //текущий каунтер и значение
    const currentCounter = parent.querySelector('[data-counter]')
    const currentValue  = Number(currentCounter.innerText)

    //решаем прибавлять или убавлять значение
    if (delta > 0 && currentValue < 5 || delta < 0 && currentValue !== 0) {
        currentCounter.innerText = delta + currentValue;
        this.totalCount += delta
    }

    this.changeFieldContent()
  }}


  attachControlListeners(){
    this.increments.forEach((increment) => increment.addEventListener('click', this.handelChangeCounter(1).bind(this)))
    this.dicrements.forEach((dicrement) => dicrement.addEventListener('click', this.handelChangeCounter(-1).bind(this)))
    
  }

  textValue(){
    //подстановка текста по клику плюс, минус
    
    const dataText = document.querySelector('[data-action="plus"]');
    const DropdownText = document.querySelector('.dropdown__content');
    const textCounter = document.querySelector('[data-counter]')


    dataText.addEventListener('click', () => {
      DropdownText.innerText = 'd';
      console.log('Ckick')
      
      
      
      
    })
    // dropDownListItems.forEach(function(listItem) {
    //   listItem.addEventListener('click', (event) => {
        
    //   })
    // }) 
  }
  dataTextValue(){
    // this.increments.forEach((increment) => increment.addEventListener('click', this.handelChangeCounter(1).bind(this)))
    // this.dicrements.forEach((dicrement) => dicrement.addEventListener('click', this.handelChangeCounter(-1).bind(this)))
  }

}

  




export default Dropdown

// import Dropdown from "../dropdown_guests/Dropdown";




// class Conveniences extends Dropdown {
//   constructor() {
//     this.countersArray = {
//       bedroom:0,
//       bed:0,
//       bath:0,
//     }
//     this.init1()
//   }
//   init1() {
//     this.testTest()
//   }

//   testTest() {
//     const test1 = document.querySelector('.dropdown__content')
//     test1.addEventListener('click', () => {
//       console.log("click Conveniences");
//     })
//   }

//   changeFieldContent() {
//     const text = `${textDrop(this.totalCount, '%d Спальня', '%d Спальни', '%d Спальней')} ${this.countersArray.bath > 0 ? textDrop(this.countersArray.bath , '%d Кровать', '%d Кровати', '%d Кроватей'): ""} ${this.countersArray.bed > 0 ? textDrop(this.countersArray.baby , '%d Ванная комната', '%d Ванные комнаты', '%d Ванных комнат'): ""}`
//     this.field.innerText = this.totalCount > 0 ? text : "Удобства"
//   }
// }


// const test = new Conveniences()


// console.log(test.testTest);


// export default Conveniences
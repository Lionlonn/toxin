/// <reference path="./swiper.d.ts" />
const swiper = new Swiper(".mySwiper", {
    cssMode: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
});

// const roomData = require('data/number-card-data/number-card-data.json')
// class testRoom {
//     private key: string | null;
//     constructor() {
//         for (this.key in roomData) {
//             console.log(roomData[this.key]);
            
//         }
//     }
// }

// new testRoom
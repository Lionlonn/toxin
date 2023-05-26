const BURGER__SELECTOR = ".header-burger__btn";
const NAV_MENU = ".nav-menu"
const BURGER__OPEN_SELECTOR = "nav-menu__open"


const burgerBtn = document.querySelector<HTMLElement>(BURGER__SELECTOR);
const burgerOpen = document.querySelector<HTMLElement>(BURGER__OPEN_SELECTOR);
const navMenu = document.querySelector<HTMLElement>(NAV_MENU);
console.log(burgerBtn);
burgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle(BURGER__OPEN_SELECTOR);
})
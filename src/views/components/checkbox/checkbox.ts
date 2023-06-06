class CheckboxList {
    private checboxDrop: HTMLElement;
    private checboxList: HTMLElement;
    private arrowChek: HTMLElement;
    constructor() {
        this.init();
    }
    init() {
        this.controls();
        this.open()
    }
    controls() {
        this.checboxDrop = document.querySelector('.checkbox-title')
        this.checboxList = document.querySelector('.checkbox-list')
        this.arrowChek = document.querySelector('.arrow-check')
    }
    open() {
        this.checboxDrop.addEventListener('click', ()=> {
            this.checboxList.classList.toggle('checkbox-list--visible');
            this.arrowChek.classList.toggle('arrow-check--anim');
        })
    }

}

new CheckboxList()
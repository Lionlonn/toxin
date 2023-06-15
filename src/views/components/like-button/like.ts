class LikeBtn {
    private likeButton: HTMLInputElement[];
    private likeButtons: HTMLElement[];
    private like: HTMLElement;
    private count: HTMLElement;
    private countLike: number;

    constructor() {
        this.init()
    }
    init() {
        this.controls()
        this.controlsProvisions()
        this.attachControl()
    }
    controls() {
        this.likeButton = Array.from(document.querySelectorAll('.like-button') ?? []);
        this.likeButtons = Array.from(document.querySelectorAll('.like-btn') ?? [])
    }
    controlsProvisions() {
       
    }
    
    handleChangeCounter(delta:number) {
        return(event) => {
            const parent = event.target.closest('.like-btn')
            this.like = parent.querySelector('.like-button')
            this.count = parent.querySelector('.count')
            this.countLike = parseInt(this.count.innerText)
            if (!this.count.classList.contains('active')) {
                this.countLike += delta
            } else {
                this.countLike -= delta
            }
            this.count.innerText = this.countLike.toString()
            this.elemStyle()
        }
        
    }
    elemStyle() {
        this.like.classList.toggle('active-img')
        this.like.classList.toggle('like-button--active')
        this.count.classList.toggle('active')
    }
    attachControl() {
        this.likeButtons.forEach(like => like.addEventListener('click', this.handleChangeCounter(1).bind(this)))
    }
}

new LikeBtn()


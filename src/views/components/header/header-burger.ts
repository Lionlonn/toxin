class Header {
    private btnId: HTMLElement[];
    private headers: HTMLElement[];

    constructor() {
        this.init();
    }
    init() {
        this.handleDocumentClick();
        this.controls();
        this.open();

    }
    controls() {
        this.btnId = Array.from(document.querySelectorAll<HTMLElement>('[id]') ?? []);
        this.headers = Array.from(document.querySelectorAll<HTMLElement>(".header") ?? []);
    }
    open() {
        this.headers.forEach(header => {
            this.btnId.forEach(btn => {
                const headerBurger = header.querySelector(`#${btn.id}`)
                if (headerBurger !== null) {
                    headerBurger.addEventListener('click', () => {
                        header.classList.toggle('open');
                    })
                }
            })
        })
    }
    handleDocumentClick() {
        document.addEventListener('click', (e: MouseEvent) => {
            this.headers.forEach(header => {
                const isClickInside = header.contains(e.target as Node);
                if (!isClickInside) {
                    header.classList.remove('open')
                }

            })
        })
    }
}


new Header()
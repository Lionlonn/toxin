import { test } from "node:test";



class Header {
    private btnId: HTMLElement[];
    private headers: HTMLElement[];
    private menuDrop: HTMLElement[];
    private linkDrop: HTMLElement[];
    private subMenu: HTMLElement[];

    constructor() {
        this.init();
    }
    init() {
        this.handleDocumentClick();
        this.controls();
        this.open();

    }
    controls() {
        this.btnId = Array.from(document.querySelectorAll('[id]') ?? []);
        this.headers = Array.from(document.querySelectorAll(".header") ?? []);
        this.linkDrop = Array.from(document.querySelectorAll(".link-drop") ?? [])
        this.menuDrop = Array.from(document.querySelectorAll(".menu-list [id]") ?? [])
        this.subMenu = Array.from(document.querySelectorAll('.sub-menu') ?? [])
        
        
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
        this.linkDrop.forEach(link => {
            const linkDrop = link.nextElementSibling;
            if (linkDrop !== null) {
                link.addEventListener('click', () => {
                    linkDrop.classList.toggle('menu-drop-visible');
                    
                });
            }
        });

    }
    handleDocumentClick() {
        document.addEventListener('click', (e: MouseEvent) => {
            this.headers.forEach(header => {
                const isClickInside = header.contains(e.target as Node);
                if (!isClickInside) {
                    header.classList.remove('open')
                }
            })
            const isClickInsideSubMenu = this.subMenu.some(sub => sub.contains(e.target as Node));
            const isClickInsideLinkDrop = this.linkDrop.some(link => link.contains(e.target as Node));
            
            if (!isClickInsideSubMenu && !isClickInsideLinkDrop) {
                this.linkDrop.forEach(link => {
                    const menuDrop = link.nextElementSibling;
                    if (menuDrop !== null) {
                        menuDrop.classList.remove('menu-drop-visible');
                    }
                })
            }
            
        })
    }
}


new Header()
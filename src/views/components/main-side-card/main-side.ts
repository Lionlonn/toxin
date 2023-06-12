import "components/number-card/number-card.ts"
// import { after } from "node:test";

const UlTag = document.querySelector(".pag-ul");
let totalPages = 15;

function createPagination(totalPages, page) {
    let liTag = '';
    let activeLi;
    let beforePages = page - 1;
    let afterPages = page + 1;
    if (page > 1) {
        liTag += `<li class="btn prev"><span class="fas fa-angle-left"></span><div></div></li>`;

    }
    if (page > 2) {
        liTag += `<li class="numb"><span class="numb-span">1</span></li>`
        if (page > 3) {
            liTag += `<li class="dots"><span class="numb-span">...</span></li>`
        }
    }
    if (page == totalPages) {
        beforePages = beforePages - 2;
    } else if (page == totalPages - 1) {
        beforePages = beforePages - 1;
    }
    if (page == 1) {
        afterPages = afterPages + 2;
    } else if (page == 2) {
        afterPages = afterPages + 1;
    }

    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
        if (pageLength > totalPages) {
            continue
        }
        if (pageLength == 0) {
            pageLength = pageLength + 1
        }
        if (page == pageLength) {
            activeLi = "active";
        } else {
            activeLi = "";
        }
        liTag += `<li class="numb ${activeLi}"><span class="numb-span">${pageLength}</span></li>`;
    }
    if (page < totalPages - 1) {
        if (page < totalPages - 2) {
            liTag += `<li class="dots"><span class="numb-span">...</span></li>`
        }
        liTag += `<li class="numb"><span class="numb-span">${totalPages}</span></li>`
    }

    if (page < totalPages) {
        liTag += `<li class="btn next"><span class="fas fa-angle-right"></span><div></div></li>`;
    }

    UlTag.innerHTML = liTag;
    
    const btnPrev = document.querySelector(".prev")
    const btnNext = document.querySelector(".next")
    
    
    if (btnPrev !== null) {
        btnPrev.addEventListener('click', () => {
            createPagination(totalPages, page - 1)
            
        });
    }
    if (btnNext !== null) {
        btnNext.addEventListener('click', () => {
            createPagination(totalPages, page + 1)
    
        });
    }
    


}
function handleItemClick(event) {
    const target = event.target
    if(target.matches('.numb') || target.matches("numb-span")) {
        const pageLength = parseInt(target.innerText)
        createPagination(totalPages, pageLength)
        console.log(pageLength);
        
    }
    
    
}
UlTag.addEventListener('click', handleItemClick)

createPagination(totalPages, 1);


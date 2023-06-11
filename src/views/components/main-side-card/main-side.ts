import "components/number-card/number-card.ts"

const UlTag = document.querySelector(".pag-ul");
let totalPages = 15;

function element(totalPages, page) {
    let liTag = '';
    let activeLi;
    let beforePages = page - 1;
    let afterPages = page + 1;
    if (page > 1) {
        liTag += `<li class="btn prev"><span class="fas fa-angle-left"> Prev</span></li>`;
        
    }
    if (page > 2) {
        liTag += `<li class="numb"><span>1</span></li>`
        if (page > 3) {
            liTag += `<li class="dots"><span>...</span></li>`
        }
    }

    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
        if (page == pageLength) {
            activeLi = "active";
        }else {
            activeLi = "";
        }
        liTag += `<li class="numb ${activeLi}"><span>${pageLength}</span></li>`;
    }

    if (page < totalPages - 1) {
        if (page < totalPages - 2) {
            liTag += `<li class="dots"><span>...</span></li>`
        }
        liTag += `<li class="numb"><span>${totalPages}</span></li>`
    }

    if (page < totalPages) {
        liTag += `<li class="btn next"><span class="fas fa-angle-right"> Next</span></li>`;
    }

    UlTag.innerHTML = liTag;
    const btnPrev = document.querySelector(".prev")
    const btnNext = document.querySelector(".next")

    btnPrev.addEventListener('click', () => {
        element(totalPages, page - 1)
    });
    btnNext.addEventListener('click', () => {
        element(totalPages, page + 1)
    });
    
    
}

// function handleItemClick(event) {
//     const target = event.target;
//     if (target.matches('.numb')) {
//       const pageLength = parseInt(target.innerText);
//       element(totalPages, pageLength);
//     } else if (target.matches('.prev')) {
//       const activeElement = UlTag.querySelector('.active');
//       if (activeElement) {
//         const page = parseInt(activeElement.textContent);
//         element(totalPages, page - 1);
//       }
//     } else if (target.matches('.next')) {
//       const activeElement = UlTag.querySelector('.active');
//       if (activeElement) {
//         const page = parseInt(activeElement.textContent);
//         element(totalPages, page + 1);
//       }
//     }
//   }
  
//   UlTag.addEventListener('click', handleItemClick);

element(totalPages, 5);
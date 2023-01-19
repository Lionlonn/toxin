document.addEventListener('click', ({ target: t }) => {
    if (t.classList.contains('like-btn')) {
      const index = [...document.querySelectorAll('.like-btn')].indexOf(t);
      const count = document.querySelectorAll('.count')[index];
      count.classList.toggle('active');
      count.innerText -= [ 1, -1 ][+count.classList.contains('active')];
    }
  });
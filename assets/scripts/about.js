'use strict'
const backTopBtn = document.querySelector('.back-top');

// back to top btn
document.addEventListener('scroll', function(e){

    const scrollPosition = window.scrollY;
    if(scrollPosition>300){
        backTopBtn.classList.add('back-top--active');
    }else{
        backTopBtn.classList.remove('back-top--active');
    }

},true);

backTopBtn.addEventListener('click', function(e){
    e.preventDefault();
    document.body.scrollIntoView({behavior:'smooth'});
});
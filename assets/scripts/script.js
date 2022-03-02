'use strict'
const backTopBtn = document.querySelector('.back-top');

// back to top btn
document.addEventListener('scroll', function(e){
    const loadMoreDiv = document.querySelector('.js-load-more');
    const elBounding = loadMoreDiv.getBoundingClientRect();

    const scrollPosition = window.scrollY;
    if(scrollPosition>300){
        backTopBtn.classList.add('back-top--active');
    }else{
        backTopBtn.classList.remove('back-top--active');
    }

    // handling load more function
    if(elBounding.top>=0 && elBounding.left >=0 && elBounding.right <=window.innerWidth && elBounding.bottom <=window.innerHeight){
        console.log(`Element is in viewport!`);
    }else{
        console.log(`Element is NOT in viewport!`);

    }
},true);

backTopBtn.addEventListener('click', function(e){
    e.preventDefault();
    document.body.scrollIntoView({behavior:'smooth'});
});

// side menu collapse button
document.querySelector('.js-filters').addEventListener('click',function(e){
    let isOpen;

    const filterBtn = e.target.closest('.js-filter-group');
    if(!filterBtn) return;
    const filterContent = filterBtn.nextElementSibling;
    if(filterContent.classList.contains('dropdown-close'))isOpen = false;
    if(filterContent.classList.contains('dropdown-open'))isOpen = true;

    if(!isOpen){
        filterContent.classList.remove('dropdown-close');
        filterContent.classList.add('dropdown-open');
        filterBtn.children[0].innerHTML = '<i class="fas fa-chevron-circle-down"></i>'
    }if(isOpen){
        filterContent.classList.remove('dropdown-open');
        filterContent.classList.add('dropdown-close');
        filterBtn.children[0].innerHTML = '<i class="fa-solid fa-circle-chevron-up"></i>'
    }
});

// 'see more' collapse button
document.querySelector('.js-filters').addEventListener('click', function(e) {
    const moreBtn = e.target.closest('.js-see-more-btn');
    if(!moreBtn) return;
    const ulElement = moreBtn.previousElementSibling;
    // console.log(ulElement);

    [...ulElement.children].map(li=>li.classList.contains('cousine-more')?li.classList.toggle('hide'):'');

});

// Media queries
// collaps
const mediaQuery = window.matchMedia("(max-width: 766px)");

function handleTabletChange(e) {
    if(e.matches){
        document.querySelectorAll('.collapse-in').forEach(collapsDiv=>{
            const btn = collapsDiv.previousElementSibling.children[0];
            btn.innerHTML = '<i class="fa-solid fa-circle-chevron-up"></i>'
            collapsDiv.classList.remove('dropdown-open');
            collapsDiv.classList.add('dropdown-close');
        });
    }else{
        document.querySelectorAll('.collapse-in').forEach(collapsDiv=>{
        const btn = collapsDiv.previousElementSibling.children[0];
        btn.innerHTML = '<i class="fas fa-chevron-circle-down"></i>'
        collapsDiv.classList.remove('dropdown-close');
        collapsDiv.classList.add('dropdown-open');
        })
}}
mediaQuery.addEventListener('change',handleTabletChange);
handleTabletChange(mediaQuery);
























// const collapsSideBar = function(width){
//     if(width.matches){
//         document.querySelectorAll('.collapse-in').map(collapsDiv=>{
//             collapsDiv.classList.add('dropdown-close');
//         })
//     }
// }
// collapsSideBar(width); //Call listener function at run time
// width.addEventListener("resize",collapsSideBar); //Attach listener on state changes

// if(mediaQuery.matches){
//     console.log(`JS media works`);
//     document.querySelectorAll('.collapse-in').forEach(collapsDiv=>{
//         collapsDiv.classList.add('dropdown-close');
//     });
// };
// const windowSize = window.innerWidth;
// if(windowSize<766){
//     console.log(`window size less than 766`);
// };


























    // [...ulElement.children].map(li=>{
    //     if(li.classList.contains('cousine-more')){
    //         if(!showMoreOpen){
    //             li.classList.remove('dropdown-close');
    //             li.classList.add('dropdown-open');
    //         }
    //         if(showMoreOpen){
    //             li.classList.remove('dropdown-open');
    //             li.classList.add('dropdown-close');
    //         }
    //         }
            
    //     })
        // console.log([...ulElement.children].map(li=>{
 
    //     console.log(li.classList.contains('hide'));
    // }))
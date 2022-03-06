'use strict'

const backTopBtn = document.querySelector('.back-top');
let offset = 0;

// back to top btn
// document.addEventListener('scroll', async function(e){
//     let htmlEl
//     const loadMoreDiv = document.querySelector('.js-load-more');
//     const elBounding = loadMoreDiv.getBoundingClientRect();
//     const parentEl = document.querySelector('.cookbird-thumbs-out')
//     const scrollPosition = window.scrollY;
//     if(scrollPosition > 300){
//         backTopBtn.classList.add('back-top--active');
//     }else{
//         backTopBtn.classList.remove('back-top--active');
//     }

//     // handling load more function
//     if(elBounding.top>=0 && elBounding.left >=0 && elBounding.right <=window.innerWidth && elBounding.bottom <=window.innerHeight){
//         async function  firstFunction() {
//             // extract url search
//             // const locationUrl = window.location.toString().split('?')[1];
//             const location = new URL(window.location);
//             const locationUrl = location.searchParams.get('search');
//             if(locationUrl) {
//                 htmlEl = await searchRecipes(locationUrl,offset);
//                 parentEl.insertAdjacentHTML('beforeend', htmlEl);
//                 offset+=10;
//                 console.log(`offset: ${offset}`);
//             }else{
//                 htmlEl = await searchRecipes();
//                 parentEl.insertAdjacentHTML('beforeend', htmlEl);
//             }     
//         }
//         function secondaryFunction(){
//              firstFunction(function() {
//                 console.log(`I'm done`);
//             });
//         }
//         secondaryFunction();
//     }else{
//         console.log(`Element is NOT in viewport!`);

//     }
// },true);

backTopBtn.addEventListener('click', function(e){
    e.preventDefault();
    document.body.scrollIntoView({behavior:'smooth'});
});

// side menu collapse button
// document.querySelector('.js-filters').addEventListener('click',function(e){
//     const accordionInner = e.target.closest('.accordion-inner');
//     if(!accordionInner) return;
//     console.log(accordionInner);
//     const arrowBtn = e.target.closest('.toggler');
//     console.log(arrowBtn);
    // const filterContent = filterBtn.nextElementSibling;
    // if(accordionInner.classList.contains('show'))isOpen = true
    // else isOpen = false;

    // if(!isOpen){

    //     filterBtn.children[0].innerHTML = '<i class="fas fa-chevron-circle-down"></i>'
    // }if(isOpen){
    //     filterContent.classList.remove('dropdown-open');
    //     filterContent.classList.add('dropdown-close');
    //     filterBtn.children[0].innerHTML = '<i class="fa-solid fa-circle-chevron-up"></i>'
    // }
// });

// 'see more' collapse button
// document.querySelector('.js-filters').addEventListener('click', function(e) {
//     const moreBtn = e.target.closest('.js-see-more-btn');
//     if(!moreBtn) return;
//     const ulElement = moreBtn.previousElementSibling;
//     // console.log(ulElement);

//     [...ulElement.children].map(li=>li.classList.contains('cousine-more')?li.classList.toggle('hide'):'');

// });

// search autocomplete 
document.querySelector('.js-search-value').addEventListener('keyup', function(e){
    e.preventDefault();
    // const data = await searchAutocomplete(this.value);

})
// Media queries
// collaps
const mediaQuery = window.matchMedia("(max-width: 766px)");

function handleTabletChange(e) {
    if(e.matches){
        document.querySelectorAll('.accordion-inner').forEach(collapsDiv=>{
        collapsDiv.classList.remove('show');
        });
    }else{
        document.querySelectorAll('.accordion-inner').forEach(collapsDiv=>{
        collapsDiv.classList.add('show');
        })
}}
mediaQuery.addEventListener('change',handleTabletChange);
handleTabletChange(mediaQuery);

const searchRecipes = async function (query, offset){
    try {
        let results;
        let request;
        if(query){
            console.log(`I look for recipes by query: ${query}`);
            request = await axios({
                method: "GET",
                url: `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=9&offset=${offset}&apiKey=c702c0d3e87142f2a528e780d52092a2`,
            });
            results = request.data.results.map(rec=>{
                return {
                    id : rec.id,
                    image : `https://spoonacular.com/recipeImages/${rec.id}-636x393.jpg`,
                    title : rec.title,
                }
            });
        }
        else{
            console.log(`I look for random recipes`);
            request = await axios({
                method: "GET",
                url: 'https://api.spoonacular.com/recipes/random?number=9&apiKey=c702c0d3e87142f2a528e780d52092a2',
            });
            results = request.data.recipes.map(rec=>{
                return {
                    id : rec.id,
                    image : `https://spoonacular.com/recipeImages/${rec.id}-636x393.jpg`,
                    title : rec.title,
                }
            });
        }
        // status check
        if(request.status == 200) console.log(`status: ${request.status}, data: ${request.data}`);

        const html = results.map(result=>convertToHtml(result)).join('');
        console.log(`offset in function: ${offset}`);
        return html
    } catch (error) {
        console.error(`${error} 💥💥💥💥`);
        throw err;
    }
}

const convertToHtml = function (result){
    return `
        <div class="recipe-thumb col-lg-4 col-md-6 col-xs-12">
            <a class="recipe-anchor" href="/${result.id}">
                <div class="recipe-anchor__link">
                    <figure>
                        <img class="recipe-main-img" src="${result.image}" alt="${result.title}">
                    </figure>
                </div>
                <h3>${result.title}</h3>
            </a>
        </div>
    `
}

const searchAutocomplete = async function(query){
    try {
        const request = await axios({
            method: 'GET',
            url: `https://api.spoonacular.com/recipes/autocomplete?number=2&query=${query}&apiKey=c702c0d3e87142f2a528e780d52092a2`
        });
        const results = request.data.map(rec=>{
            return {
                id:rec.id,
                title:rec.title,
                image:`https://spoonacular.com/recipeImages/${rec.id}-636x393.jpg`
            }
        });
        console.log(results);
    } catch (error) {
        console.error(`${error} 💥💥💥💥`);
        throw err;
    }
}

'use strict'

const backTopBtn = document.querySelector('.back-top');

const state = {
    offset:6,
    search:{
        query:'',
        results:[],
        resultsPerPage:6,
    }
}

// back to top btn
document.addEventListener('scroll', async function(e){

    const scrollPosition = window.scrollY;
    if(scrollPosition > 300){
        backTopBtn.classList.add('back-top--active');
    }else{
        backTopBtn.classList.remove('back-top--active');
    }
}, true);

backTopBtn.addEventListener('click', function(e){
    e.preventDefault();
    document.body.scrollIntoView({behavior:'smooth'});
});

// handling load more function
const scrollListener  = function(){
    let htmlEl
    const loadMoreDiv = document.querySelector('.js-load-more');
    const elBounding = loadMoreDiv.getBoundingClientRect();
    const parentEl = document.querySelector('.cookbird-thumbs-out');

    if(elBounding.top>=0 && elBounding.left >=0 && elBounding.right <=window.innerWidth && elBounding.bottom <=window.innerHeight){
        async function  firstFunction() {
            // extract url search
            // const locationUrl = window.location.toString().split('?')[1];
            const location = new URL(window.location);
            const getQuery = location.searchParams.get('search');
            const getDiet = location.searchParams.get('diet');
            const getIntolerances = location.searchParams.get('intolerances');

            if(getQuery) {
                htmlEl = await searchRecipes(`query=${getQuery}`,state.offset);
                parentEl.insertAdjacentHTML('beforeend', htmlEl);
                state.offset+=10;
                // console.log(`offset: ${state.offset}`);
            }else if (getDiet){
                htmlEl = await searchRecipes(`diet=${getDiet}`,state.offset);
                parentEl.insertAdjacentHTML('beforeend', htmlEl);
                state.offset+=10;
                // console.log(`offset: ${state.offset}`);
            }
            else if (getIntolerances){
                htmlEl = await searchRecipes(`intolerances=${getIntolerances}`,state.offset);
                parentEl.insertAdjacentHTML('beforeend', htmlEl);
                state.offset+=10;
                // console.log(`offset: ${state.offset}`);
            }else{
                htmlEl = await searchRecipes();
                parentEl.insertAdjacentHTML('beforeend', htmlEl);
            }     
        }
        function secondaryFunction(){
            setTimeout(() => {
                firstFunction(function() {
                    console.log(`I'm done`);
                });
            }, 3000);
        }
        secondaryFunction();
    }
    // else{
    //     console.log(`Element is NOT in viewport!`);

    // }
};

const throttledListener = throttle(scrollListener, 300);
window.addEventListener('scroll', throttledListener);

function throttle(func, delay) { // allows [func] to run once every [delay] ms
    let funct = func.bind(func),
        last = Date.now();
    return function() {
        if (Date.now() - last > delay) {
            funct();
            last = Date.now();
        }
    }
}

// search autocomplete
document.querySelector('.js-search-value').addEventListener('keyup', async function(e){
    const parentEl = document.querySelector('.js-autocomplete-parent');
    e.preventDefault();
    const htmlEl = await searchAutocomplete(this.value);
    parentEl.innerHTML = ''
    parentEl.insertAdjacentHTML('beforeend', htmlEl);
});
// close results list
document.querySelector('.search-bar').addEventListener('click', function(e){
    const searchResults = e.target.closest('.container').querySelector('.search-auto-item');
    if(!searchResults) return;
    searchResults.parentElement.innerHTML = ''
});

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
        const randomUrl = `https://api.spoonacular.com/recipes/random?number=${state.search.resultsPerPage}&apiKey=c702c0d3e87142f2a528e780d52092a2`
        const queryUrl = `https://api.spoonacular.com/recipes/complexSearch?${query}&number=${state.search.resultsPerPage}&offset=${offset}&apiKey=c702c0d3e87142f2a528e780d52092a2`

        const request = await axios({
            method: 'GET',
            url: query?queryUrl:randomUrl,
        });
        // status check
        if(request.status == 200) console.log(`status: ${request.status}, data: ${request.data}`);

        state.results = (query?request.data.results:request.data.recipes).map(rec=>{
            return {
                id : rec.id,
                image : `https://spoonacular.com/recipeImages/${rec.id}-636x393.jpg`,
                title : rec.title,
            }
        });
        const html = state.results.map(result=>convertToHtml(result)).join('');
        // console.log(`offset in function: ${offset}`);
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
            url: `https://api.spoonacular.com/recipes/autocomplete?number=5&query=${query}&apiKey=c702c0d3e87142f2a528e780d52092a2`
        });
        const results = request.data.map(rec=>{
            return {
                id:rec.id,
                title:rec.title,
                image:`https://spoonacular.com/recipeImages/${rec.id}-636x393.jpg`
            }
        });
        console.log(results);
        const html = results.map(result => searchHtml(result)).join('');
        return html
    } catch (error) {
        console.error(`${error} 💥💥💥💥`);
        throw err;
    }
}

const searchHtml = function(recipe){
    return `
    <li class="search-auto-item">
        <a class="search-element" href="/${recipe.id}">
            <figure class="image">
                <img src="${recipe.image}" alt="${recipe.title}">
            </figure>
            <p class="label">${recipe.title}</p>
        </a>
    </li>
    `
}
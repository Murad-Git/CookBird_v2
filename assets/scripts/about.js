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


// view full nutrition
document.querySelector('.js-NutritionCalories').addEventListener('click', async function(e){
    e.preventDefault();
    const parentEl = document.querySelector('.nutrition-label');
    const {loaded} = parentEl.dataset;
    // first time callback
    if(loaded === '') {
    console.log(parentEl.dataset.loaded);

        const locationUrlID = window.location.toString().split('/')[3];
        const data = await loadNutrition(locationUrlID);
        parentEl.insertAdjacentHTML('afterbegin', data);
        document.querySelector('.modal').classList.add('modal--active');
        parentEl.dataset.loaded = 'true';
    }
    // loaded
    if(loaded === 'true'){
    console.log(parentEl.dataset.loaded);

        document.querySelector('.modal').classList.add('modal--active');
    }
    // console.log(parentEl.dataset.loaded);
    // parentEl.dataset.loaded = 'true';
    // console.log(parentEl.dataset.loaded);
});

// close pop-up nutrition window
document.querySelector('.js-close-modal').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.modal').classList.remove('modal--active');
})

const loadNutrition =  async function (id){
    try {
        console.log(`ID received in model: ${id}`);
        const request = await axios({
          method: "GET",
          url: `https://api.spoonacular.com/recipes/${id}/nutritionLabel?apiKey=c702c0d3e87142f2a528e780d52092a2`,
      });
  
        // status check
        if(request.status == 200) console.log(`status: ${request.status}, data: loaded`);
        return request.data;
  
    } catch (error) {
      console.error(`${error} 💥💥💥💥`);
      throw err;
    }
  }
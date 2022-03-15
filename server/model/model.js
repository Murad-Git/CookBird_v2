// import async from 'regenerator-runtime';

import axios from 'axios';
import { config } from 'dotenv';
config({path:'config.env'});

const API_key1 = process.env.API_KEY1
const API_key2 = process.env.API_KEY2
const API_key3 = process.env.API_KEY3

// const key = config.API_KEY;
// 1 API keys=8e77d79b100d4bde9448e79d8987c92d
// 2 API keys=8dd25d27a6fb41f28a3a830fe78fae94
// 3 API keys=c702c0d3e87142f2a528e780d52092a2

// state
const state = {
    recipe: [],
    search:{
        query: '',
        results:[],
        page:1,
        resultsPerPage: 9,
        totalResults: 0,
        searchHints:[],
    },
};
// save received data into objects
const createRecipeObject = function (recipe){
    const {data} = recipe;
    return {
      id: data.id,
      title: data.title,
      image: `https://spoonacular.com/recipeImages/${data.id}-636x393.${data.imageType?data.imageType:'jpg'}`,
      cookingTime: data.readyInMinutes,
      servings: data.servings,
      originSourceUrl: data.sourceUrl,
      cuisines: data.cuisines,
      dishTypes: data.dishTypes,
      instruction: data.instructions,
      instructionsAnalize: data.analyzedInstructions[0]?data.analyzedInstructions[0]?.steps:'',
      pricePerServings: data.pricePerServing,
      healthScore: data.healthScore,
      summary: data.summary,
      ingredients: data.extendedIngredients,
      ingredientsImg: data.extendedIngredients.map(ing=>{
        if(ing.image !== null) return `https://spoonacular.com/cdn/ingredients_500x500/${ing.image}`
      }),
      cheap: data.cheap,
      vegan: data.vegan,
      vegetarian: data.vegetarian,
      veryHealthy: data.veryHealthy,
      glutenFree: data.glutenFree,
      winePairing: data.WinePairing?data.WinePairing.productMatches:'',
      // ID with wine pairing 642403
      // only winePairing.pairingText may exists.  winePairing.pairedWines = false, winePairing.pairingText = true;
    }
  };
  
// load and save full 1 recipe
// id 723984

// exports.dataState = state;
export const loadRecipe = async function(id){
    try {
        const request = await axios({
            method: "GET",
            url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_key1}`,
        });
        // console.log(request.data);
        state.recipe = createRecipeObject(request);
        // console.log(JSON.stringify(state.recipe));
        // console.log(state.recipe.instructionsAnalize.map(steps=>{console.log(`step: ${steps.step} and number: ${steps.number}`);}));
        return state.recipe;
    } catch (error) {
        // console.error(error);
        throw error
    }
}
// loadRecipe(723984);

// Spoonacular API

// get random RECIPES
// get request example https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert
export const getRandomRecipes = async function(){
    try {
        const request = await axios({
            method: 'GET',
            url: `https://api.spoonacular.com/recipes/random?number=${state.search.resultsPerPage}&apiKey=${API_key1}`
        });
        if(request.status == 200) console.log(`status: ${request.status}, data: ${request.data}`);

        // console.log(`random recipes: ${request.data.recipes.map(rec=>{console.log(rec);})}`);

        // // save results in state
        state.search.results = request.data.recipes.map(rec=>{
            return {
                id : rec.id,
                image : `https://spoonacular.com/recipeImages/${rec.id}-636x393.jpg`,
                title : rec.title,
            }
        });
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const loadAllSearch = async function(query, offset=0){
    try{
        state.search.query = query
        const request = await axios({
          method: "GET",
          url: `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${state.search.resultsPerPage}&offset=${offset}&apiKey=${API_key1}`,
        });

        // status check
        if(request.status == 200) console.log(`status: ${request.status}, data: ${request.data}`);
        // save total results
        state.search.totalResults = request.data.totalResults
    
        console.log(request.data.results);

        // save results in state
        state.search.results = request.data.results.map(rec=>{
          return {
            id : rec.id,
            image : `https://spoonacular.com/recipeImages/${rec.id}-636x393.jpg`,
            title : rec.title,
          }
        });
        // console.log(state.search.results);
        // console.log(`results saved: ${state.search.results.map(res=>res.title)}`);
      }
    catch (error){
      console.error(`${error} 💥💥💥💥`);
      throw err;
    }
}

export const loadNutrition = async function(id){
  try {
      console.log(`ID received in model: ${id}`);
      const request = await axios({
        method: "GET",
        url: `https://api.spoonacular.com/recipes/${id}/nutritionLabel?apiKey=${API_key1}`,
    });

      // status check
      if(request.status == 200) console.log(`status: ${request.status}, data: ${request.data}`);
      return request;

  } catch (error) {
    console.error(`${error} 💥💥💥💥`);
    throw err;
  }
}



// send 10 results from total results list
export const loadRenderResults = function(page = state.search.page){
    try {
      
      state.search.page = page;
      const start = (page -1)*state.search.resultsPerPage; //0
      const end = page*state.search.resultsPerPage; //10
      // console.log(`results from model: ${state.search.results.map(rec=>{
      //   console.log(rec);
      // })}`);
      return state.search.results.slice(start, end);

    } catch (error) {
      console.error(error);
    }
  }

export const dataState = state;
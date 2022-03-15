import { loadAllSearch, loadRenderResults, getRandomRecipes, loadRecipe, loadNutrition } from '../model/model.js';

// search recipe by query or get random recieps
export const loadSearch = async function(query, offset){
    try {
        if(query){
            console.log(`query and offset recieved in controller: ${query}//${offset}`);
            // search recipes by querystring
            await loadAllSearch(query, offset);

            // render resultsPerPage
            const data = loadRenderResults();
            return data;
        }else{
            // get random recipes
            await getRandomRecipes();
            // await loadAllSearch();

            // render resultsPerPage
            const data = loadRenderResults();
            return data;
        }
    } catch (error) {
        // console.error(error);
        throw error
    }
}

// get recipe full information
export const loadRecipeData = async function(id){
    try {
        if(id){
            // get recipe information from id
            const recipe = await loadRecipe(id);
            return recipe;
        }else{
            return `no recipe was found by ID: ${id}`
        }
    } catch (error) {
        console.error(error);
        throw error
    }
}

// get recipe nutrition information
export const loadNutritionData = async function(id){
    try {
        if(id){
            const data = await loadNutrition(id);
            return data
        }else{
            return `no nutrition found by ID: ${id}`
        }
    } catch (error) {
        console.error(error);
        throw error
    }
}
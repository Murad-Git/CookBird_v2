// import * as model from '../model/model.js';
const res = require('express/lib/response');
const model = require('../model/model.js');

// search recipe by query or get random recieps
exports.loadSearch =  async function (query){
    try {
        if(query){
            console.log(`query recieved in controller: ${query}`);

            // search recipes by querystring
            await model.loadAllSearch(query);

            // render resultsPerPage
            const data = model.loadRenderResults();
            return data;
        }else{
            // get random recipes
            await model.getRandomRecipes();

            // render resultsPerPage
            const data = model.loadRenderResults();
            return data;
        }
    } catch (error) {
        console.error(error);
        throw error
    }
}

// get recipe full information
exports.loadRecipe = async function (id){
    try {
        if(id){
            // get recipe information from id
            const recipe = await model.loadRecipe(id);
            return recipe;
        }else{
            return 'no ID was found'
        }
    } catch (error) {
        console.error(error);
        throw error
    }
}
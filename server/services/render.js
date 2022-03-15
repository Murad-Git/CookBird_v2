import { loadSearch, loadRecipeData, loadNutritionData } from '../controller/controller.js';

// render main page with recipes
export async function homeRoutes(req,res){
    try {
        // get search query from form
        const query = req.query.search;
        // console.log(`Query from homeRoute: ${query}`);
        const data = await loadSearch(query);
        // console.log(`data from render.js: ${data}`);
        res.render('index', {recipes: data, query: query});
    } catch (error) {
        res.render('error',{message: error.message});
        // res.status(500).send({message: error.message});
    }
}

// render recipe full info
export async function getRecipe(req, res){
    try {
        // get recipe id
        const id = req.params.id;
        const data = await loadRecipeData(id);
        // console.log(`data single rec from render.js ${data}`);
        res.render('about', {recipe: data});
    } catch (error) {
        res.render('error',{message: error.message});
        // res.status(500).send({message: error.message});
    }
}


// render nutrition
export async function getNutrition(req,res){
    try {
        // get recipe id
        const id = req.params.id;
        console.log(`id from render.js: ${id}`);
        const dataNutr = await loadNutritionData(id);
        console.log(`data Nutr in render.js: ${dataNutr}`);
        res.render('modal', {nutritionInfo: dataNutr});

    } catch (error) {
        res.render('error',{message: error.message});
        // res.status(500).send({message: error.message});
    }
}




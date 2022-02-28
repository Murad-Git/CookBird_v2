// const controller = require('../controller/controller.js');

// // render main page with recipes
// exports.homeRoutes = async (req,res) =>{
//     try {
//         // get search query from form
//         const query = req.query.search;
//         // console.log(`Query from homeRoute: ${query}`);
//         const data = await controller.loadSearch(query);
//         // console.log(`data from render.js: ${data}`);
//         res.render('index', {recipes: data});
        
//     } catch (error) {
//         res.status(500).send({message: error.message});
//     }
// };

// // render recipe full info
// exports.getRecipe = async (req, res)=>{
//     try {
//         // get recipe id
//         const id = req.params.id;
//         const data = await controller.loadRecipe(id);
//         // console.log(`data single rec from render.js ${data}`);
//         res.render('about', {recipe: data});
//     } catch (error) {
//         res.status(500).send({message: error.message});
//     }
// };

// // render nutritin
// exports.getNutrition = async (req,res)=>{
//     try {
//         // get recipe id
//         const id = req.params.id;
//         const data = await controller.loadNutrition(id);
//         return data

//     } catch (error) {
//         res.status(500).send({message: error.message});
//     }
// }
import { loadSearch, loadRecipeData, loadNutritionData } from '../controller/controller.js';

// render main page with recipes
export async function homeRoutes(req,res){
    try {
        // get search query from form
        const query = req.query.search;
        console.log(`Query from homeRoute: ${query}`);
        const data = await loadSearch(query);
        console.log(`data from render.js: ${data}`);
        res.render('index', {recipes: data});
        
    } catch (error) {
        res.status(500).send({message: error.message});
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
        res.status(500).send({message: error.message});
    }
}


// render nutrition
export async function getNutrition(req,res){
    try {
        // get recipe id
        const id = req.params.id;
        console.log(`id from render.js: ${id}`);
        const dataNutr = await loadNutritionData(id);
        res.render('modal_nutrition', {nutritionInfo: dataNutr});

    } catch (error) {
        res.status(500).send({message: error.message});
    }
}




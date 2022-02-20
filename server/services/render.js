// import controllerJs from '../controller/controller.js';
const controller = require('../controller/controller.js');

// render main page with recipes
exports.homeRoutes = async (req,res) =>{
    try {
        // get search query from form
        const query = req.query.search;
        // console.log(`Query from homeRoute: ${query}`);
        const data = await controller.loadSearch(query);
        // console.log(`data from render.js: ${data}`);
        res.render('index', {recipes: data});
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

// render recipe full info
exports.getRecipe = async (req, res)=>{
    try {
        // get recipe id
        const id = req.params.id;
        const data = await controller.loadRecipe(id);
        // console.log(`data single rec from render.js ${data}`);
        res.render('about', {recipe: data});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}
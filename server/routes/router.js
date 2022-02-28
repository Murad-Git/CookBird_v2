// const express = require('express');
// const route = express.Router();
// const express = require('express');
// const route = express.Router();

// const services = require('../services/render.js');

// route.get('/', services.homeRoutes);

// route.get('/:id', services.getRecipe);


// module.exports = route;
import { Router } from 'express';
import { homeRoutes, getRecipe,getNutrition } from '../services/render.js';
const route = Router();


route.get('/', homeRoutes);

route.get('/:id', getRecipe);
// route.get('/:id/nutrition', getNutrition);


export default route;
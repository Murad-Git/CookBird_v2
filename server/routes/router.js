import { Router } from 'express';
import { homeRoutes, getRecipe,getNutrition } from '../services/render.js';
const route = Router();

route.get('/', homeRoutes);
route.get('/:id', getRecipe);

export default route;
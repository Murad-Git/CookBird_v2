const express = require('express');
const route = express.Router();

const services = require('../services/render.js');

route.get('/', services.homeRoutes);

route.get('/:id', services.getRecipe);


module.exports = route;
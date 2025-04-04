const { Router } = require('express');

const { rotasCategorias }  = require('./rotasCategorias');

const rotas = new Router();

rotas.use(rotasCategorias);

module.exports = rotas;
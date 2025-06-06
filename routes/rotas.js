const { Router } = require('express');

const { rotasCategorias }  = require('./rotasCategorias');
const { rotasProdutos }  = require('./rotasProdutos');
const { rotasAvaliacoes } = require('./rotasAvaliacoes');

const rotas = new Router();

rotas.use(rotasCategorias);
rotas.use(rotasProdutos);
rotas.use(rotasAvaliacoes);

module.exports = rotas;
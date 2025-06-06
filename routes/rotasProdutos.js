const { Router } = require('express');

const { getProdutos, addProduto, updateProduto,
    deleteProduto, getProdutoPorCodigo } = require('../controllers/produtoController');

const rotasProdutos = new Router();

rotasProdutos.route('/produto')
               .get(getProdutos)
               .post(addProduto)
               .put(updateProduto)

rotasProdutos.route('/produto/:codigo')
               .get(getProdutoPorCodigo)
               .delete(deleteProduto)

module.exports = { rotasProdutos }
const { Router } = require('express');
const { getAvaliacoes, addAvaliacao } = require('../controllers/avaliacaoController');

const rotasAvaliacoes = new Router();

rotasAvaliacoes.route('/avaliacao/produto/:codigoproduto')  
   .get(getAvaliacoes)

rotasAvaliacoes.route('/avaliacao')   
   .post(addAvaliacao)

module.exports = { rotasAvaliacoes };
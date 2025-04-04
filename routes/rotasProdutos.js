const { Router } = require('express');
const {
    getProdutos,
    addProduto,
    updateProduto,
    deleteProduto,
    getProdutoPorCodigo
} = require('../controllers/produtoController');

const router = Router();

router.get('/', getProdutos);
router.post('/', addProduto);
router.put('/:codigo', updateProduto);
router.delete('/:codigo', deleteProduto);
router.get('/:codigo', getProdutoPorCodigo);

module.exports = router;
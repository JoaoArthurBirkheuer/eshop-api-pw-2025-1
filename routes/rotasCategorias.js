const { Router } = require('express');
const {
    getCategorias,
    addCategoria,
    updateCategoria,
    deleteCategoria,
    getCategoriaPorCodigo
} = require('../controllers/categoriaController');

const router = Router();

router.get('/', getCategorias);
router.post('/', addCategoria);
router.put('/:codigo', updateCategoria);
router.delete('/:codigo', deleteCategoria);
router.get('/:codigo', getCategoriaPorCodigo);

module.exports = router;
const { Router } = require('express');
const router = Router();

const categoriasRouter = require('./rotasCategorias');
const produtosRouter = require('./rotasProdutos');

router.use('/categorias', categoriasRouter);
router.use('/produtos', produtosRouter);

module.exports = router;
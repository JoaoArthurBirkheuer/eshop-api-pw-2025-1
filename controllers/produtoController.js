const {
    getProdutosDB,
    addProdutoDB,
    updateProdutoDB,
    deleteProdutoDB,
    getProdutoPorCodigoDB
} = require('../usecases/produtoUseCases');

const getProdutos = async (req, res) => {
    try {
        const produtos = await getProdutosDB();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

const addProduto = async (req, res) => {
    try {
        const produto = await addProdutoDB(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Produto criado com sucesso',
            data: produto
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

const updateProduto = async (req, res) => {
    try {
        const produto = await updateProdutoDB({
            ...req.body,
            codigo: req.params.codigo
        });
        res.status(200).json({
            status: 'success',
            message: 'Produto atualizado com sucesso',
            data: produto
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

const deleteProduto = async (req, res) => {
    try {
        const result = await deleteProdutoDB(req.params.codigo);
        res.status(200).json({
            status: 'success',
            message: result.message
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

const getProdutoPorCodigo = async (req, res) => {
    try {
        const produto = await getProdutoPorCodigoDB(req.params.codigo);
        res.status(200).json(produto);
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

module.exports = {
    getProdutos,
    addProduto,
    updateProduto,
    deleteProduto,
    getProdutoPorCodigo
};
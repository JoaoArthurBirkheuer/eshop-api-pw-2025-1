const {getProdutosDB, addProdutoDB, updateProdutoDB, deleteProdutoDB, getProdutoPorCodigoDB} = require('../usecases/produtoUseCases');

const getProdutos = async (request, response) => {
    await getProdutosDB()
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar os produtos: ' + err
          }))
}

const addProduto = async (request, response) => {
    await addProdutoDB(request.body)
          .then(data => response.status(200).json({
                "status" : "success", "message" : "Produto criado",
                "objeto" : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const updateProduto = async (request, response) => {
    await updateProdutoDB(request.body)
          .then(data => response.status(200).json({
                "status" : "success", "message" : "Produto atualizado",
                "objeto" : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const deleteProduto = async (request, response) => {
    await deleteProdutoDB(request.params.codigo)
          .then(data => response.status(200).json({
                "status" : "success", "message" : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const getProdutoPorCodigo = async (request, response) => {
    await getProdutoPorCodigoDB(request.params.codigo)
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

module.exports = {getProdutos, addProduto, updateProduto, deleteProduto, getProdutoPorCodigo}
const { getCategoriasDB, addCategoriaDB, updateCategoriaDB,
    deleteCategoriaDB, getCategoriaPorCodigoDB } = require('../usecases/categoriaUseCases');

const getCategorias = async (request, response) => {
    await getCategoriasDB()
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar as categorias: ' + err
          }))
}

const addCategoria = async (request, response) => {
    await addCategoriaDB(request.body)
          .then(data => response.status(200).json({
                "status" : "success", "message" : "Categoria criada",
                "objeto" : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const updateCategoria = async (request, response) => {
    await updateCategoriaDB(request.body)
          .then(data => response.status(200).json({
                "status" : "success", "message" : "Categoria atualizada",
                "objeto" : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const deleteCategoria = async (request, response) => {
    await deleteCategoriaDB(request.params.codigo)
          .then(data => response.status(200).json({
                "status" : "success", "message" : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const getCategoriaPorCodigo = async (request, response) => {
    await getCategoriaPorCodigoDB(request.params.codigo)
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

module.exports = {
    getCategorias, addCategoria, updateCategoria, 
    deleteCategoria, getCategoriaPorCodigo
}
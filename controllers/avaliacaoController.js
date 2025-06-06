const { getAvaliacaoDB, addAvaliacaoDB } = require('../usecases/avaliacaoUseCases')

const getAvaliacoes = async (request, response) => {
    await getAvaliacaoDB(parseInt(request.params.codigoproduto))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as avaliacoes: ' + err
        }));
}

const addAvaliacao = async (request, response) => {
    await addAvaliacaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Avaliação criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = {
    getAvaliacoes, addAvaliacao
}
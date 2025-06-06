const { pool } = require('../config')
const Produto = require('../entities/produto')

const getProdutosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM produtos ORDER BY nome');
        return rows.map((produto) => new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, produto.ativo, produto.valor, produto.data_cadastro, produto.categoria));
    } catch (err){
        throw "ERRO: " + err;
    }
}

const addProdutoDB = async (body) => {
    try {
        const { nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria } = body;
        const results = await pool.query(`INSERT INTO produtos (nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,[nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria]);
        const produto = results.rows[0];
        return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, produto.ativo, produto.valor, produto.data_cadastro, produto.categoria);
    } catch(err){
        throw "Erro ao inserir o produto: " + err
    }
}

const updateProdutoDB = async (body) => {
    try {
        const { nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria , codigo} = body;
        const results = await pool.query(`UPDATE produtos SET nome = $1, descricao = $2, quantidade_estoque = $3, ativo = $4, valor = $5, data_cadastro = $6, categoria = $7 WHERE codigo = $8 RETURNING *`, [nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria, codigo]);

        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}
            para ser alterado`;
        }

        const produto = results.rows[0];
 
        return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, produto.ativo, produto.valor, produto.data_cadastro, produto.categoria);
    } catch(err){
        throw "Erro ao alterar o produto: " + err
    }
}

const deleteProdutoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM produtos WHERE 
            codigo = $1`,[codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}
            para ser removido`;
        } else {
            return "Produto removido com sucesso"
        }
    } catch(err){
        throw "Erro ao remover o categorio: " + err
    }
}

const getProdutoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM produtos WHERE 
            codigo = $1`,[codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const produto = results.rows[0];
            return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, produto.ativo, produto.valor, produto.data_cadastro, produto.categoria);
        }
    } catch(err){
        throw "Erro ao recuperar a categoria: " + err
    }
}

module.exports = {
    getProdutosDB, addProdutoDB, updateProdutoDB,
     deleteProdutoDB, getProdutoPorCodigoDB
}
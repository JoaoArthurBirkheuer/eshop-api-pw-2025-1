const { pool } = require('../config');
const Produto = require('../entities/produto');

const getProdutosDB = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT p.*, c.nome as categoria_nome 
            FROM produtos p
            JOIN categorias c ON p.categoria = c.codigo
            ORDER BY p.nome`
        );
        return rows.map(row => new Produto(
            row.codigo,
            row.nome,
            row.ativo,
            row.descricao,
            row.valor,
            row.quantidade_estoque,
            row.data_cadastro,
            { codigo: row.categoria, nome: row.categoria_nome }
        ));
    } catch (err) {
        throw new Error("Erro ao consultar produtos: " + err.message);
    }
};

const addProdutoDB = async (body) => {
    try {
        const { nome, ativo, descricao, valor, quantidade_estoque, data_cadastro, categoria } = body;
        const results = await pool.query(
            `INSERT INTO produtos 
             (nome, ativo, descricao, valor, quantidade_estoque, data_cadastro, categoria)
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING *`,
            [nome, ativo, descricao, valor, quantidade_estoque, data_cadastro, categoria]
        );
        const produto = results.rows[0];
        return new Produto(
            produto.codigo,
            produto.nome,
            produto.ativo,
            produto.descricao,
            produto.valor,
            produto.quantidade_estoque,
            produto.data_cadastro,
            produto.categoria
        );
    } catch (err) {
        throw new Error("Erro ao inserir produto: " + err.message);
    }
};

const updateProdutoDB = async (body) => {
    try {
        const { codigo, nome, ativo, descricao, valor, quantidade_estoque, data_cadastro, categoria } = body;
        const results = await pool.query(
            `UPDATE produtos SET 
             nome = $1, ativo = $2, descricao = $3, valor = $4,
             quantidade_estoque = $5, data_cadastro = $6, categoria = $7
             WHERE codigo = $8 RETURNING *`,
            [nome, ativo, descricao, valor, quantidade_estoque, data_cadastro, categoria, codigo]
        );
        
        if (results.rowCount === 0) {
            throw new Error(`Produto com código ${codigo} não encontrado`);
        }
        
        const produto = results.rows[0];
        return new Produto(
            produto.codigo,
            produto.nome,
            produto.ativo,
            produto.descricao,
            produto.valor,
            produto.quantidade_estoque,
            produto.data_cadastro,
            produto.categoria
        );
    } catch (err) {
        throw new Error("Erro ao atualizar produto: " + err.message);
    }
};

const deleteProdutoDB = async (codigo) => {
    try {
        const results = await pool.query(
            `DELETE FROM produtos WHERE codigo = $1 RETURNING codigo`,
            [codigo]
        );
        
        if (results.rowCount === 0) {
            throw new Error(`Produto com código ${codigo} não encontrado`);
        }
        
        return { message: `Produto ${codigo} removido com sucesso` };
    } catch (err) {
        throw new Error("Erro ao remover produto: " + err.message);
    }
};

const getProdutoPorCodigoDB = async (codigo) => {
    try {
        const { rows } = await pool.query(
            `SELECT p.*, c.nome as categoria_nome 
             FROM produtos p
             JOIN categorias c ON p.categoria = c.codigo
             WHERE p.codigo = $1`,
            [codigo]
        );
        
        if (rows.length === 0) {
            throw new Error(`Produto com código ${codigo} não encontrado`);
        }
        
        const produto = rows[0];
        return new Produto(
            produto.codigo,
            produto.nome,
            produto.ativo,
            produto.descricao,
            produto.valor,
            produto.quantidade_estoque,
            produto.data_cadastro,
            { codigo: produto.categoria, nome: produto.categoria_nome }
        );
    } catch (err) {
        throw new Error("Erro ao buscar produto: " + err.message);
    }
};

module.exports = {
    getProdutosDB,
    addProdutoDB,
    updateProdutoDB,
    deleteProdutoDB,
    getProdutoPorCodigoDB
};
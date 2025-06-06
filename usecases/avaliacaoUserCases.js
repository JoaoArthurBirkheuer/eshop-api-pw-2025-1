const { pool } = require('../config');
const Avaliacao = require('../entities/avaliacao')

const getAvaliacaoDB = async (codigoproduto) => {
    try {    
        const { rows } = await pool.query(`select codigo, autor, email, texto, nota, to_char(data,'YYYY-MM-DD') as data, produto
        from avaliacoes
        where produto = $1        
        order by codigo`,[codigoproduto]);
        return rows.map((avaliacao) => new Avaliacao(avaliacao.codigo, avaliacao.autor, avaliacao.email, avaliacao.texto,
            avaliacao.nota, avaliacao.data, avaliacao.produto));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addAvaliacaoDB = async (body) => {
    try {   
        const { autor, email, texto, nota, data, produto } = body; 
        const results = await pool.query(`INSERT INTO avaliacoes (autor, email, texto, nota, data, produto) 
            VALUES ($1, $2, $3, $4, $5, $6)
            returning codigo, autor, email, texto, nota, to_char(data,'YYYY-MM-DD') as data, produto`,
        [autor, email, texto, nota, data, produto]);
        const avaliacao = results.rows[0];
        return new Avaliacao(avaliacao.codigo, avaliacao.autor, avaliacao.email, avaliacao.texto,
            avaliacao.nota, avaliacao.data, avaliacao.produto);
    } catch (err) {
        throw "Erro ao inserir a avaliação: " + err;
    }    
}

module.exports = {
    getAvaliacaoDB, addAvaliacaoDB
}
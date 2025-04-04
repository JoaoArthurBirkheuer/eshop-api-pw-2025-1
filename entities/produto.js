class Produto {
    constructor(codigo, nome, ativo, descricao, valor, quantidade_estoque, data_cadastro, categoria) {
        this.codigo = codigo;
        this.nome = nome;
        this.ativo = ativo;
        this.descricao = descricao;
        this.valor = valor;
        this.quantidade_estoque = quantidade_estoque;
        this.data_cadastro = data_cadastro;
        this.categoria = categoria;
    }
}

module.exports = Produto;
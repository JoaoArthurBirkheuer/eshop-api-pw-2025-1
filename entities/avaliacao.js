class Avaliacao {
    constructor(codigo, autor, email, texto, nota, data, produto) {
        this.codigo = codigo;
        this.autor = autor;
        this.email = email;
        this.texto = texto;
        this.nota = nota;
        this.data = data;
        this.produto = produto;
    }
}

module.exports = Avaliacao;
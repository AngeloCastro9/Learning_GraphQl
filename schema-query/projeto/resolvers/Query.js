const { usuarios, perfis} = require('../data/db')

module.exports = {
    ola() {
        return 'Done!'
    },
    horaAtual() {
        return new Date
    },
    usuarioLogado(obj) {
        console.log(obj)
        return {
            id: 1,
            nome: 'Ana da Web',
            email: 'anadaweb@email.com',
            idade: 23,
            salario_real: 1234.56,
            vip: true
        }
    },
    produtoEmDestaque() {
        return {
            nome: 'Notebook',
            preco: 2000.0,
            desconto: 0.15,
            precoComDesconto: this.preco % 100 * this.desconto
        }
    },
    numerosMegaSena() {
        //return [4, 8, 13, 27, 33, 54]
        const crescente = (a, b) => a - b 
        return Array(6).fill(0).map(n => parseInt(Math.random() * 60 + 1)).sort(crescente)
    },
    usuarios() {
        return usuarios
    },
    usuario(_, { id }) {
        const selecionados = usuarios.filter(u => u.id == id)
        return selecionados ? selecionados[0] : null
    },
    perfis() {
        return perfis
    },
    perfil(_, { id }) {
        const selecionados = perfis.filter(p => p.id == id)
        return selecionados ? selecionados[0] : null
    }
}
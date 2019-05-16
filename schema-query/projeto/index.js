const { ApolloServer, gql } = require('apollo-server')

const usuarios = [{
    id: 1,
    nome: 'Joao Silva',
    email: 'jsilva@zemail.com',
    idade: 29
}, {
    id: 2,
    nome: 'Rafael Junio',
    email: 'rafajun@wemail.com',
    idade: 31
}, {
    id: 3,
    nome: 'Daniela Smith',
    email: 'danismi@umail.com',
    idade: 24
}]

const typeDefs = gql`
    scalar Date
    #pontos de entrada da sua API!
    #o ! quer dizer que ele é obrigatório.
    type Usuario {
        id: Int
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }
    type Query {
        ola: String
        horaAtual: Date
        usuarioLogado: Usuario 
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
        usuario(id: Int): Usuario
    }
    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }
`

const resolvers = {
    Produto: {
        precoComDesconto(produto) {
            if(produto.desconto) {
                return produto.preco * (1 - produto.desconto)
            } else {
                return produto.preco
            }
        }
    },
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        },
    },
    Query: {
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
        }
    },

}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})
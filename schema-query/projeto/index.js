const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date
    #pontos de entrada da sua API!
    #o ! quer dizer que ele é obrigatório.
    type Usuario {
        id: ID
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
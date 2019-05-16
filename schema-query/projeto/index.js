const { ApolloServer, gql } = require('apollo-server')

const usuarios = [{
    id: 1,
    nome: 'Joao Silva',
    email: 'jsilva@zemail.com',
    idade: 29,
    perfil_id: 1
}, {
    id: 2,
    nome: 'Rafael Junio',
    email: 'rafajun@wemail.com',
    idade: 31,
    perfil_id: 2
}, {
    id: 3,
    nome: 'Daniela Smith',
    email: 'danismi@umail.com',
    idade: 24,
    perfil_id: 1
}]

const perfis = [
    { id: 1, nome: 'comum'},
    { id: 2, nome: 'adminstrador'}
]

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
        perfil: Perfil
    }
    type Query {
        ola: String
        horaAtual: Date
        usuarioLogado: Usuario 
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
        usuario(id: Int): Usuario
        perfis: [Perfil]
        perfil(id: Int): Perfil
    }
    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Perfil {
        id: Int
        nome: String
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
        perfil(usuario) {
            const selecionados = perfis.filter(p => p.id === usuario.perfil_id)
            return selecionados ? selecionados[0] : null
        }
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
        },
        perfis() {
            return perfis
        },
        perfil(_, { id }) {
            const selecionados = perfis.filter(p => p.id == id)
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
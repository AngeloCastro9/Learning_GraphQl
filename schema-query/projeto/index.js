const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql `
    #pontos de entrada da sua API!
    type Query {
        ola: String
        horaAtual: String
    }
`

const resolvers = {
    Query: {
        ola() {
            return 'Done!'
        },
        horaAtual() {
            return new Date().toString()
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})
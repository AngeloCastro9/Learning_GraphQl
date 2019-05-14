const { apolloServer, gql } = require('apollo-server')

const typeDefs = gql ``

const resolvers = {

}

const server = new apolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})
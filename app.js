const fs = require('fs')
const path = require('path')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
// const { buildSchema } = require('graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const db = require('./db')
const resolvers = require('./resolvers')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const schema = makeExecutableSchema({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf-8'),
    resolvers,
})

app.use(
    '/graphql',
    graphqlHTTP({
        context: { db },
        schema,
        // schema: buildSchema(
        //     fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf-8')
        // ),
        // rootValue: { ...resolvers.Query, ...resolvers.Mutation },
        graphiql: true,
    })
)

module.exports = app

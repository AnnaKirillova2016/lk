const express = require('express')
// eslint-disable-next-line no-unused-vars
const { graphql, buildSchema } = require('graphql')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')

const schema = buildSchema(`
  type Query {
 language: String
  }
`)

const devNull = {
    language: () => 'GraphQL'
}

const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
    devNull, schema, graphiql: true
}))
app.listen(4000, () => console.log('Listening on 4000'))

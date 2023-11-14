import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import requestLanguage from 'express-request-language'

export function Server({ schema, query }) {
  const app = express()
    app.use(
        requestLanguage({
            languages: ['en', 'fr'], // First locale becomes the default
        }),
    ).use('/graphql',
        graphqlHTTP(async (request, response, graphQLParams) => {
            return {
                schema,
                context: {query: query, request: request},
                graphiql: { headerEditorEnabled : true}
            }
        }))
        return app
}

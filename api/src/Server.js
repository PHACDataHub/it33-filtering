import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'


export function Server({schema}) {
    const yoga = createYoga({ schema })
    const server = createServer(yoga)

    return server
}

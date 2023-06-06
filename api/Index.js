import { schema } from './src/Schema.js'
import { Server } from './src/Server.js'

function index() {
    const server = Server({ schema })
    server.listen(4000, () => {
        console.info('Server is running on http://localhost:4000/graphql')
    })
}

index()
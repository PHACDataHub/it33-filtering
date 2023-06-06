import request from 'supertest'
import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { schema } from '../Schema.js';
import { describe, it, expect } from 'vitest'


// Create a GraphQL Yoga server
const yoga = createYoga({ schema });
const server = createServer(yoga);

const app = server.listen();

describe("server", () => {
    describe("Control Test", () => {
        it("Returns Control", async () => {
            const response = await request(app)
                .post('/graphql')
                .send({ query: ' {control(id: "AC-1"){title definition family id }}' })
            expect(response.body).toEqual({
                "data": {
                    "control": {
                        "title": "Access Control Policy and Procedures",
                        "definition": "(A)The organization develops, documents, and disseminates to [Assignment: organization-defined personnel or roles]:\n(a)An access control policy that addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and\n(b)Procedures to facilitate the implementation of the access control policy and associated access controls.\n(B)The organization reviews and updates the current:\n(a)Access control policy [Assignment: organization-defined frequency]; and\n(b)Access control procedures [Assignment: organization-defined frequency].",
                        "family": "AC",
                        "id": "1"
                    }
                }
            })
        })
    })
})


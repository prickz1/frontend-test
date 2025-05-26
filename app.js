import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()



server.get('/api/company', async (request, reply) => {
    return 'Hello, World!'
})

server.post('/api/company', async (request, reply) => {
  
})


server.get('/api/company/:id', async (request, reply) => {
    
})

server.put('/api/company/:id', async (request, reply) => {
    
})

server.delete('/api/company/:id', async (request, reply) => {
    
})


server.listen({
    port: 3333,
})
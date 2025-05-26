import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()


server.get('/api/company', async (request, reply) => {
    const companies = database.list()

    return companies
})

server.post('/api/company', async (request, reply) => {
    const {nome, descricao, active} = request.body

    database.create({
        nome,
        descricao,
        active,
    })

    return reply.status(201).send()
    })

server.put('/api/company/:id', async (request, reply) => {
    const companyId = request.params.id
    const {nome, descricao, active} = request.body


    database.uptade(companyId, {
        nome,
        descricao,
        active,

    })

    return reply.status(204).send()
    
})

server.delete('/api/company/:id', async (request, reply) => {
    const companyId = request.params.id
    database.delete(companyId)

    return reply.status(204).send()
    
})


server.listen({
    port: 3333,
})
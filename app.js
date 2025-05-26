import {fastify} from 'fastify'
import { db } from './database.js'

const server = fastify()


server.get('/api/company', async (request, reply) => {
  const result = await db.query('SELECT * FROM companies ORDER BY id')
  return result.rows
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
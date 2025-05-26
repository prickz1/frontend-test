import { fastify } from 'fastify'
import { db } from './database.js'
import { importCompaniesIfNeeded } from './import-companies.js'

const server = fastify()


importCompaniesIfNeeded()


server.get('/api/company', async (request, reply) => {
  const result = await db.query('SELECT * FROM companies ORDER BY id')
  return result.rows
})

server.put('/api/company/:id', async (request, reply) => {
  const companyId = request.params.id
  const {
    avatarUrl,
    nomeFantasia,
    razaoSocial,
    qtdeFuncionarios
  } = request.body

  await db.query(
    `UPDATE companies
     SET "avatarUrl" = $1,
         "nomeFantasia" = $2,
         "razaoSocial" = $3,
         "qtdeFuncionarios" = $4
     WHERE id = $5`,
    [avatarUrl, nomeFantasia, razaoSocial, qtdeFuncionarios, companyId]
  )

  return reply.status(204).send()
})

server.post('/api/company', async (request, reply) => {
  const {
    avatarUrl,
    nomeFantasia,
    razaoSocial,
    qtdeFuncionarios
  } = request.body;

  const maxId = await db.query('SELECT MAX(id) FROM companies')
  const nextId = (maxId.rows[0].max || 0) + 1;
  
  await db.query(`ALTER SEQUENCE companies_id_seq RESTART WITH ${nextId}`)
  
  const result = await db.query(
    `INSERT INTO companies ("avatarUrl", "nomeFantasia", "razaoSocial", "qtdeFuncionarios", active)
     VALUES ($1, $2, $3, $4, TRUE)
     RETURNING *`,
    [avatarUrl, nomeFantasia, razaoSocial, qtdeFuncionarios]
  );

  return reply.status(201).send(result.rows[0])
})

server.delete('/api/company/:id', async (request, reply) => {
  const companyId = request.params.id

  await db.query(
    `UPDATE companies SET active = FALSE WHERE id = $1`,
    [companyId]
  )

  return reply.status(204).send()
})

server.listen({
  port: 3333,
})
import { fastify } from 'fastify'
import { db } from './database.js'
import { importCompaniesIfNeeded } from './import-companies.js'

const server = fastify()
importCompaniesIfNeeded()


server.get("/api/company", async (request, reply) => {
  try {
    const result = await db.query(`SELECT * FROM companies ORDER BY id`)
    console.log("Sucesso: empresas carregadas")

    return reply.send(result.rows)
    

  } catch (error) {
    console.error("Erro na consulta de empresas:", error)
    
    return reply.status(500).send({
      message: "Falha ao carregar empresas",
      error: error.message
    })
  }
})



server.put("/api/company/:id", async (request, reply) => {
  try {
    const companyId = request.params.id
    const {
      avatarUrl,
      nomeFantasia,
      razaoSocial,
      qtdeFuncionarios
    } = request.body

    const result = await db.query(
      `UPDATE companies
       SET "avatarUrl" = $1,
           "nomeFantasia" = $2,
           "razaoSocial" = $3,
           "qtdeFuncionarios" = $4
       WHERE id = $5
       RETURNING *`,
      [avatarUrl, nomeFantasia, razaoSocial, qtdeFuncionarios, companyId]
    )

    if (result.rowCount === 0) {
      console.log("Empresa não encontrada")
      return reply.status(404).send({
        message: "Empresa não encontrada"
      })
    }

    console.log(`Sucesso: empresa com o ID ${companyId} atualizada`)
    return reply.status(200).send(result.rows[0])

  } catch (error) {
    console.error("Erro ao atualizar empresa:", error)
    
    return reply.status(500).send({
      message: "Falha ao atualizar empresa",
      error: error.message
    })
  }
})





server.post("/api/company", async (request, reply) => {
  try {
    const {
      avatarUrl,
      nomeFantasia,
      razaoSocial,
      qtdeFuncionarios
    } = request.body

    
    const errors = []
    
    if (!nomeFantasia) errors.push("nomeFantasia é obrigatório")
    if (!razaoSocial) errors.push("razaoSocial é obrigatório")
    if (!qtdeFuncionarios && qtdeFuncionarios !== 0) {
      errors.push("qtdeFuncionarios é obrigatório")
    } else if (isNaN(qtdeFuncionarios)) {
      errors.push('qtdeFuncionarios deve ser um número')
    }


    if (errors.length > 0) {
      console.log("Erros de validação:", errors)
      return reply.status(400).send({
        message: "Dados inválidos",
        errors
      });
    }

    
    const maxId = await db.query('SELECT MAX(id) FROM companies')
    const nextId = (maxId.rows[0].max || 0) + 1
    

    await db.query(`ALTER SEQUENCE companies_id_seq RESTART WITH ${nextId}`)
    
    const result = await db.query(
      `INSERT INTO companies 
       ("avatarUrl", "nomeFantasia", "razaoSocial", "qtdeFuncionarios", active)
       VALUES ($1, $2, $3, $4, TRUE)
       RETURNING *`,
      [avatarUrl, nomeFantasia, razaoSocial, qtdeFuncionarios]
    )

    console.log(`Sucesso: empresa criada com ID ${nextId}`)

    return reply.status(201).send(result.rows[0])

  } catch (error) {
    console.error("Erro ao criar empresa:", error)
    
    return reply.status(500).send({
      message: "Falha ao criar empresa",
      error: error.message
    })
  }
})


server.delete("/api/company/:id", async (request, reply) => {
  try {
    const companyId = request.params.id
    

    if (isNaN(companyId)) {
      console.log("ID inválido:", companyId)
      return reply.status(400).send({
        message: "ID inválido",
        error: "O ID deve ser um número"
      })
    }

    const result = await db.query(
      `UPDATE companies SET active = FALSE WHERE id = $1 RETURNING *`,
      [companyId]
    )

    
    if (result.rowCount === 0) {
      console.log(`Empresa não encontrada: ID ${companyId}`)
      return reply.status(404).send({
        message: "Empresa não encontrada"
      })
    }

    console.log(`Sucesso: empresa ID ${companyId} desativada`)
    return reply.status(200).send( result.rows[0])

  } catch (error) {
    console.error("Erro ao desativar empresa:", error)
    
    return reply.status(500).send({
      message: "Falha ao desativar empresa",
      error: error.message
    })
  }
})

server.listen({ port: 3333 }, (err) => {
  if (err) {
    console.error("Falha crítica:", err)
    process.exit(1);
  }
  console.log("Servidor pronto na porta 3333.")
})
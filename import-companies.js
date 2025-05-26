import axios from 'axios'
import { db } from './database.js'

const response = await axios.get('https://api.helena.run/test/api/company')
const companies = response.data

for (const company of companies) {
  await db.query(
    `INSERT INTO companies (id, "avatarUrl", "nomeFantasia", "razaoSocial", "qtdeFuncionarios", active)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (id) DO NOTHING`,
    [
      company.id,
      company.avatarUrl,
      company.nomeFantasia,
      company.razaoSocial,
      company.qtdeFuncionarios,
      company.active
    ]
  )
}

console.log('Empresas importadas com sucesso!')
process.exit()
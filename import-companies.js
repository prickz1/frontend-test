import axios from 'axios'
import { db } from './database.js'

export async function importCompaniesIfNeeded() {
  try {
    const result = await db.query('SELECT COUNT(*) FROM companies')
    const count = parseInt(result.rows[0].count)
    
    if (count > 0) {
      console.log("Dados já importados anteriormente")
      return
    }

    console.log("Importando dados da API...")
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

    console.log(`empresas importadas com sucesso!`)
  } catch (error) {
    console.error('Erro ao importar empresas:', error.message)
  }
}

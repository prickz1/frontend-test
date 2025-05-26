# Instruções


- Você deve criar uma aplicação front-end utilizando angular(+6), reactJS ou flutter;
- Utilize **boas práticas** de desenvolvimento e **componentização**. Essa é sua oportunidade de demonstrar suas habilidades;
- Não nos importamos se a solução estiver **incompleta**, estamos interessados em ver a construção da sua solução;
- Você pode utilizar qualquer framework ou componente de terceiros que desejar;


# Backend
- Se você tiver maior familiaridade com backend, ao invés de seguir as instruções de frontend abaixo, você deve criar uma cópia da API apresentada, que persista dados em um banco de dados PostgreSQL, Mysql ou SqlServer;
- Preocupe-se com desempenho, segurança e validação de dados;


# GitHub

- Faça um *fork* do projeto no GitHub;
- Adicione @helena-app-dev como um colaborador do seu *fork*. Você pode facilmente fazer isso em https://github.com/`seu-usuario`/frontend-test
/settings/collaboration;
- Quando iniciar o teste, faça um *commit* vazio com a mensagem `iniciando teste` e quando finalizar, faça um *commit* com a mensagem `finalizando teste`;
- Faça vários *commits* com o objetivo de demonstrar a construção da solução;
- Não use *branches*;
- Tente não gastar mais do que 2 horas para finalizar o teste;

-------------------------------------------------------------

# Teste

**API:** https://api.helena.run/test/

**Documentação:** https://api.helena.run/test/swagger

Os dados expostos pela API acima são restaurados de tempos em tempos, não se preocupe com isso. 


**1 - Construa uma interface que liste todas as empresas e seus dados conforme a API acima;**

**Endpoint:** /api/company **(GET)**

Informações:

Os campos a serem mostrados na interface devem ser:
- Avatar (imagem)
- Razão social
- Quantidade de funcionários
- Situação (Ativo/Inativo)

    
    
    
**2 - Agora você deve criar uma nova interface para edição dos dados da empresa;**

**Endpoint:** /api/company/:id **(PUT)**

Informações:

- Não é necessária a edição da imagem. 
- O campo Active não pode ser alterado
    
    
    
**3 - Agora você deve permitir que uma nova empresa seja incluída;**

**Endpoint:** /api/company **(POST)**

Informações:

- O campo Id é gerado automaticamente pela API
    
    
    
**4 - Agora você deve permitir que uma empresa seja excluída;**

**Endpoint:** /api/company/:id **(DELETE)**

Informações:

- Após a exclusão, a empresa será listada mas com o campo Active = False




***DIFERENCIAL***

Será considerado um diferencial se você fizer tratamentos de erros, falhas de rede e indicadores de carregamento para melhorar a usabilidade do usuário.


## ⚠️ Instruções de Paulo Henrique:

### 1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
```

---

### 🗃️ Banco de Dados

O banco de dados foi criado **manualmente** utilizando o **pgAdmin**.  
A tabela `companies` deve ser criada com a seguinte estrutura:

```sql
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    "avatarUrl" TEXT,
    "nomeFantasia" TEXT,
    "razaoSocial" TEXT,
    "qtdeFuncionarios" INTEGER,
    active BOOLEAN DEFAULT TRUE
);
```

---

### 🚀 Execução

Para iniciar o servidor, execute o seguinte comando:

```bash
npm run dev
```

O servidor será iniciado na porta `3333`.
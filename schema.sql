CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    "avatarUrl" TEXT,
    "nomeFantasia" TEXT,
    "razaoSocial" TEXT,
    "qtdeFuncionarios" INTEGER,
    active BOOLEAN DEFAULT TRUE
);
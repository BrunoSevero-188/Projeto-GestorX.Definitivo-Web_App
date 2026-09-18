CREATE TABLE Usuario (
    id_user INTEGER PRIMARY KEY UNIQUE,
    nome  VARCHAR(50),
    email  VARCHAR(100),
    senha VARCHAR(100),
    tipo_usuario VARCHAR(50)
);

CREATE TABLE Venda (
    id_venda INTEGER PRIMARY KEY UNIQUE,
    data_venda DATE,
    valor_total DOUBLE PRECISION, (para criar no postgree),
    forma_pagamento VARCHAR(50),
    quantidade_itens INTEGER,
    id_user INTEGER
);

CREATE TABLE Produto (
    id_produto INTEGER PRIMARY KEY UNIQUE,
    nome  VARCHAR(50),
    categoria VARCHAR(50),
    preco DOUBLE PRECISION, (para criar no postgree)
    quantidade INTEGER,
    id_fornecedor INTEGER
);

CREATE TABLE Fornecedor (
    id_fornecedor INTEGER PRIMARY KEY UNIQUE,
    nome  VARCHAR(50),
    telefone  INTEGER,
    email VARCHAR(50),
    endereco VARCHAR(50)
);

CREATE TABLE Estoque (
    id_estoque INTEGER PRIMARY KEY UNIQUE,
    valor DOUBLE PRECISION, (para criar no postgree),
    data_reposicao DATE,
    id_produto INTEGER
);

CREATE TABLE Movimento_Estoque (
    id_movimentacao INTEGER PRIMARY KEY UNIQUE,
    tipo_movimentacao VARCHAR(20),
    quantidade INTEGER,
    data_movimentacao DATE,
    id_produto INTEGER
);

CREATE TABLE Relatorio_Venda (
    id_relatorio INTEGER PRIMARY KEY UNIQUE,
    data_inicio DATE,
    data_fim DATE,
    total_vendas INTEGER
);

CREATE TABLE realiza (
    fk_Usuario_id_user INTEGER,
    fk_Venda_id_venda INTEGER
);

CREATE TABLE gera_movimento (
    fk_Movimento_Estoque_id_movimentacao INTEGER,
    fk_Venda_id_venda INTEGER
);

CREATE TABLE registra (
    fk_Venda_id_venda INTEGER,
    fk_Relatorio_Venda_id_relatorio INTEGER
);

CREATE TABLE fornece (
    fk_Produto_id_produto INTEGER,
    fk_Fornecedor_id_fornecedor INTEGER
);

CREATE TABLE Existi (
    fk_Estoque_id_estoque INTEGER,
    fk_Produto_id_produto INTEGER
);

CREATE TABLE movimenta (
    fk_Produto_id_produto INTEGER,
    fk_Movimento_Estoque_id_movimentacao INTEGER
);
 
ALTER TABLE Venda ADD CONSTRAINT FK_Venda_2
    FOREIGN KEY (id_user)
    REFERENCES Usuario (id_user);
 
ALTER TABLE Produto ADD CONSTRAINT FK_Produto_2
    FOREIGN KEY (id_fornecedor)
    REFERENCES Fornecedor (id_fornecedor);
 
ALTER TABLE Estoque ADD CONSTRAINT FK_Estoque_2
    FOREIGN KEY (id_produto)
    REFERENCES Produto (id_produto);
 
ALTER TABLE Movimento_Estoque ADD CONSTRAINT FK_Movimento_Estoque_2
    FOREIGN KEY (id_produto)
    REFERENCES Produto (id_produto);

 
ALTER TABLE realiza ADD CONSTRAINT FK_realiza_1
    FOREIGN KEY (fk_Usuario_id_user)
    REFERENCES Usuario (id_user)
    ON DELETE RESTRICT;
 
ALTER TABLE realiza ADD CONSTRAINT FK_realiza_2
    FOREIGN KEY (fk_Venda_id_venda)
    REFERENCES Venda (id_venda)
    ON DELETE RESTRICT;
 
ALTER TABLE gera_movimento ADD CONSTRAINT FK_gera_movimento_1
    FOREIGN KEY (fk_Movimento_Estoque_id_movimentacao)
    REFERENCES Movimento_Estoque (id_movimentacao)
    ON DELETE RESTRICT;
 
ALTER TABLE gera_movimento ADD CONSTRAINT FK_gera_movimento_2
    FOREIGN KEY (fk_Venda_id_venda)
    REFERENCES Venda (id_venda)
    ON DELETE RESTRICT;
 
ALTER TABLE registra ADD CONSTRAINT FK_registra_1
    FOREIGN KEY (fk_Venda_id_venda)
    REFERENCES Venda (id_venda)
    ON DELETE RESTRICT;
 
ALTER TABLE registra ADD CONSTRAINT FK_registra_2
    FOREIGN KEY (fk_Relatorio_Venda_id_relatorio)
    REFERENCES Relatorio_Venda (id_relatorio)
    ON DELETE RESTRICT;
 
ALTER TABLE fornece ADD CONSTRAINT FK_fornece_1
    FOREIGN KEY (fk_Produto_id_produto)
    REFERENCES Produto (id_produto)
    ON DELETE RESTRICT;
 
ALTER TABLE fornece ADD CONSTRAINT FK_fornece_2
    FOREIGN KEY (fk_Fornecedor_id_fornecedor)
    REFERENCES Fornecedor (id_fornecedor)
    ON DELETE RESTRICT;
 
ALTER TABLE Existi ADD CONSTRAINT FK_Existi_1
    FOREIGN KEY (fk_Estoque_id_estoque)
    REFERENCES Estoque (id_estoque)
    ON DELETE RESTRICT;
 
ALTER TABLE Existi ADD CONSTRAINT FK_Existi_2
    FOREIGN KEY (fk_Produto_id_produto)
    REFERENCES Produto (id_produto)
    ON DELETE RESTRICT;
 
ALTER TABLE movimenta ADD CONSTRAINT FK_movimenta_1
    FOREIGN KEY (fk_Produto_id_produto)
    REFERENCES Produto (id_produto)
    ON DELETE RESTRICT;
 
ALTER TABLE movimenta ADD CONSTRAINT FK_movimenta_2
    FOREIGN KEY (fk_Movimento_Estoque_id_movimentacao)
    REFERENCES Movimento_Estoque (id_movimentacao)
    ON DELETE RESTRICT;

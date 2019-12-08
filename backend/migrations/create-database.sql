CREATE DATABASE checkcar_app;

\c checkcar_app

-- -----------------------------------------------------
-- Table "empresa"
-- -----------------------------------------------------
CREATE TABLE  "empresa" (
  "id" SERIAL,
  "nome" VARCHAR(100) NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id")
);


-- -----------------------------------------------------
-- Table "tipo_usuario"
-- -----------------------------------------------------
CREATE TABLE  "tipo_usuario" (
  "id" SERIAL,
  "tipo_usuario" VARCHAR(100) NOT NULL,
  "nivel_permissao" CHAR(1) NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "usuario"
-- -----------------------------------------------------
CREATE TABLE  "usuario" (
  "id" SERIAL,
  "empresa_id" INT NOT NULL,
  "tipo_usuario_id" INT NOT NULL,
  "nome" VARCHAR(200) NOT NULL,
  "senha" TEXT NOT NULL,
  "email" VARCHAR(100) NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_usuario_empresa1"
    FOREIGN KEY ("empresa_id")
    REFERENCES "empresa" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "fk_usuario_tipo_usuario1"
    FOREIGN KEY ("tipo_usuario_id")
    REFERENCES "tipo_usuario" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "tipo_veiculo"
-- -----------------------------------------------------
CREATE TABLE  "tipo_veiculo" (
  "id" SERIAL,
  "tipo_veiculo" VARCHAR(150) NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id")
);


-- -----------------------------------------------------
-- Table "veiculo"
-- -----------------------------------------------------
CREATE TABLE  "veiculo" (
  "id" SERIAL,
  "tipo_veiculo_id" INT NOT NULL,
  "placa" VARCHAR(8) NOT NULL,
  "modelo" VARCHAR(50) NOT NULL,
  "marca" VARCHAR(50) NOT NULL,
  "ano" BIGINT NOT NULL,
  "chassi" TEXT NULL,
  "renavam" TEXT NULL,
  "empresa_id" INT NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_veiculo_tipo_veiculo1"
    FOREIGN KEY ("tipo_veiculo_id")
    REFERENCES "tipo_veiculo" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "fk_veiculo_empresa1"
    FOREIGN KEY ("empresa_id")
    REFERENCES "empresa" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "tipo_item"
-- -----------------------------------------------------
CREATE TABLE  "tipo_item" (
  "id" SERIAL,
  "tipo_item" VARCHAR(100) NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id")
);


-- -----------------------------------------------------
-- Table "item"
-- -----------------------------------------------------
CREATE TABLE  "item" (
  "id" INT NOT NULL,
  "id_tipo_item" INT NOT NULL,
  "nome" VARCHAR(200) NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_item_tipo_item1"
    FOREIGN KEY ("id_tipo_item")
    REFERENCES "tipo_item" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table "veiculo_item"
-- -----------------------------------------------------
CREATE TABLE  "veiculo_item" (
  "id" SERIAL,
  "id_item" INT NOT NULL,
  "id_veiculo" INT NOT NULL,
  "ordem" INT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_veiculo_has_Item_veiculo"
    FOREIGN KEY ("id_veiculo")
    REFERENCES "veiculo" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "fk_veiculo_has_Item_Item1"
    FOREIGN KEY ("id_item")
    REFERENCES "item" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table "vistoria"
-- -----------------------------------------------------
CREATE TABLE  "vistoria" (
  "id" SERIAL,
  "id_usuario" INT NOT NULL,
  "id_veiculo" INT NOT NULL,
  "data" DATE NOT NULL,
  "hora" TIME NOT NULL,
  "km" BIGINT NOT NULL,
  "sincronizado" CHAR(1) NULL,
  "observacao" TEXT NULL,
  "latitude" TEXT NULL,
  "longitude" TEXT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_vistoria_Usuario1"
    FOREIGN KEY ("id_usuario")
    REFERENCES "usuario" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "fk_Vistoria_Veiculo1"
    FOREIGN KEY ("id_veiculo")
    REFERENCES "veiculo" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table "item_vistoria"
-- -----------------------------------------------------
CREATE TABLE  "item_vistoria" (
  "id" SERIAL,
  "id_vistoria" INT NOT NULL,
  "id_veiculo_item" INT NOT NULL,
  "situacao" CHAR(1) NOT NULL,
  "observacao" TEXT NULL,
  "foto" TEXT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_table1_vistoria1"
    FOREIGN KEY ("id_vistoria")
    REFERENCES "vistoria" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "fk_Item_Vistoria_Veiculo_Item1"
    FOREIGN KEY ("id_veiculo_item")
    REFERENCES "veiculo_item" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


ALTER TABLE item_vistoria ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE item_vistoria ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE empresa ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE empresa ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE item ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE item ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE tipo_item ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE tipo_item ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE tipo_usuario ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE tipo_usuario ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE tipo_veiculo ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE tipo_veiculo ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE usuario ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE usuario ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE veiculo ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE veiculo ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE veiculo_item ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE veiculo_item ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE vistoria ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE vistoria ALTER COLUMN updated_at SET DEFAULT NOW();


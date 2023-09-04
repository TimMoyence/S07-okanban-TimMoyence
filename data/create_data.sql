

BEGIN;

--- Par prévention, on commence par supprimer des tables qui porteraient déjà ce nom
--- ps: on rajoute la suppression de la table tag afin de supprimer la table de ce nom qui a pu être créée lors de l'atelier
DROP TABLE IF EXISTS "list", "card", "label", "table", "user", "card_has_label", "tag";

--- on peut maintenant créer les tables
CREATE TABLE "user" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "firstname" text NULL,
  "lastname" text NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

CREATE TABLE "table" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'okanban',
    "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    --- les champs liés au timestamp
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);


CREATE TABLE "list" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "position" SMALLINT NOT NULL DEFAULT 0,
    "table_id" INTEGER NOT NULL REFERENCES "table"("id") ON DELETE CASCADE,
    --- les champs liés au timestamp
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "description" TEXT NOT NULL DEFAULT '',
    "color" VARCHAR,
    "position" SMALLINT NOT NULL DEFAULT 0,
    --- Lorsqu'une liste sera supprimée, toutes les cartes liées à cette entrée seront aussi supprimées
    "list_id" INTEGER NOT NULL REFERENCES "list"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "label" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "color" VARCHAR NOT NULL DEFAULT '#FFF',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card_has_label" (
    "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
    "label_id" INTEGER NOT NULL REFERENCES "label"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--- On va aussi rajouter des données
INSERT INTO "user"("email", "password", "firstname", "lastname") VALUES
    ('jean@gmail.com', 'azerty', 'jean', 'fesse');


INSERT INTO "table"("user_id") VALUES
    (1);


INSERT INTO "list"("name", "table_id") VALUES
    ('à cuisiner',1),
    ('à ranger',1),
    ('plantes à arroser',1);

INSERT INTO "card"("description", "color", "list_id") VALUES
    ('des haricots', '#f0f', 1),
    ('du fenouil', '#fff', 1),
    ('ma chambre', '#000', 2),
    ('des patates', '#fff', 1),
    ('mes papiers', '#aaa', 2),
    ('un ficus', '#0f0', 3),
    ('des lauriers', '#080', 3);


INSERT INTO "label"("name", "color") VALUES
    ('important', '#e82'),
    ('no rush', '#0af');

INSERT INTO "card_has_label"("card_id", "label_id") VALUES
    (1, 2),
    (2, 2),
    (3, 1);


COMMIT;
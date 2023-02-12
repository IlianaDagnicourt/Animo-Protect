-- Deploy migrations:init to pg

BEGIN;

CREATE DOMAIN "email" AS text CHECK (
    value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
);

CREATE DOMAIN "phonenumber" AS text CHECK (
    value ~ '^(?:(?:+|00)33[\s.-]{0,3}(?:(0)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$'     
);

CREATE DOMAIN "siren" AS text CHECK (
    value ~ '^(\d{9}|\d{3}[ ]\d{3}[ ]\d{3})$'
);

CREATE DOMAIN "passwordregex" AS text CHECK (
    value ~ '^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$' -- Password 8 caractere min, une maj un number et un caractere special
);

CREATE DOMAIN "zipcode" AS text CHECK (
    value ~ '^0[1-9]\d{3}$' -- code postaux metropole de 01 a 09
    OR value ~ '^20[1-2]\d{2}$|^20300$' -- code postaux de la Corse
    OR value ~ '^[13-8]\d{4}$' -- code postaux les plus génériques
    OR value ~ '^9[0-6]\d{3}$' -- code postaux metropole commencant par 9
    OR value ~ '^97[1-6]\d{2}$' -- code postaux DOM
    OR value ~ '^98[4678]\d{2}$' -- code postaux TOM
    OR value ~ '^9{5}$' -- code postal de la poste
);

CREATE TABLE "association"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "siren" siren NOT NULL UNIQUE,
        "name" TEXT NOT NULL,
        "email" email NOT NULL,
        "password" passwordregex NOT NULL,
        "adress" TEXT NOT NULL,
        "zip_code" zipcode NOT NULL,
        "city" TEXT NOT NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ

);

CREATE TABLE "benevole"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" email NOT NULL,
    "civility" boolean NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" phonenumber NOT NULL,
    "description" TEXT NOT NULL,
    "password" passwordregex NOT NULL,
    "adress" TEXT NOT NULL,
    "zip_code"  zipcode NOT NULL,
    "city" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "status"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "code_status" INT,
        "title" TEXT NOT NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ

);

CREATE TABLE "annonce"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "code_annonce" INT,
        "title" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "date" TIMESTAMPTZ,
        "quotas" INT,
        "association_id" INT NOT NULL REFERENCES "association" ("id"),
        "status_id" INT NOT NULL REFERENCES "status" ("id"),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ

);

CREATE TABLE "task"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "code_task" INT,
        "description" TEXT NOT NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ

);


CREATE INDEX "loginAssoc" ON association USING hash (email);

CREATE INDEX "loginBenev" ON benevole USING hash (email);



COMMIT;

-- Deploy migrations:v1.3 to pg

BEGIN;

CREATE TABLE annonce_has_task (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "task_id"  INT NOT NULL REFERENCES "task" ("id"),
    "annonce_id" INT NOT NULL REFERENCES "annonce" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ

);

CREATE TABLE annonce_has_benevole (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "benevole_id"  INT NOT NULL REFERENCES "benevole" ("id"),
    "annonce_id" INT NOT NULL REFERENCES "annonce" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ

);

COMMIT;

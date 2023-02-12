-- Deploy migrations:v1.4 to pg

BEGIN;

ALTER TABLE benevole
ADD COLUMN country TEXT;

ALTER TABLE association
ADD COLUMN country TEXT;

COMMIT;

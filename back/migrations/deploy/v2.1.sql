-- Deploy migrations:v2.1 to pg

BEGIN;

ALTER TABLE benevole
ADD COLUMN username TEXT,
ADD COLUMN secret TEXT;

ALTER TABLE association
ADD COLUMN username TEXT,
ADD COLUMN secret TEXT;


COMMIT;

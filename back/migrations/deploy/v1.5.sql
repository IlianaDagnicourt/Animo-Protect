-- Deploy migrations:v1.5 to pg

BEGIN;

ALTER TABLE benevole
DROP COLUMN civility;

COMMIT;

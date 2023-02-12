-- Revert migrations:v1.4 from pg

BEGIN;

ALTER TABLE benevole
DROP COLUMN country;

ALTER TABLE association
DROP COLUMN country;

COMMIT;

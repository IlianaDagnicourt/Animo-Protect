-- Revert migrations:v1.6 from pg

BEGIN;
ALTER TABLE annonce DROP COLUMN city;

COMMIT;

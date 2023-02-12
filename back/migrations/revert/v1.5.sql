-- Revert migrations:v1.5 from pg

BEGIN;

ALTER TABLE benevole
ADD COLUMN civility boolean;

COMMIT;

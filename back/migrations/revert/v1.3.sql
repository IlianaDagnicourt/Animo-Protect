-- Revert migrations:v1.3 from pg


BEGIN;

DROP TABLE  annonce_has_task;

DROP TABLE annonce_has_benevole;

COMMIT;


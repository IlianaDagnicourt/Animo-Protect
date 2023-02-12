-- Deploy migrations:v2.0 to pg

BEGIN;

ALTER TABLE benevole
ALTER COLUMN description drop not null;

COMMIT;

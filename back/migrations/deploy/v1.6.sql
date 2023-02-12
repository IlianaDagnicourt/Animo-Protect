-- Deploy migrations:v1.6 to pg

BEGIN;

ALTER TABLE annonce 
ADD COLUMN city TEXT;

COMMIT;

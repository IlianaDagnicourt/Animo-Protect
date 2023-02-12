-- Deploy migrations:DropPasswordRegex to pg

BEGIN;

ALTER TABLE benevole
ALTER COLUMN password TYPE TEXT;


ALTER TABLE association
ALTER COLUMN password TYPE TEXT;

DROP DOMAIN "passwordregex";

COMMIT;

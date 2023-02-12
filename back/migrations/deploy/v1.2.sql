-- Deploy migrations:ModificationPhoneRegex to pg

BEGIN;

ALTER DOMAIN phonenumber DROP CONSTRAINT phonenumber_check;
ALTER DOMAIN phonenumber ADD CONSTRAINT phonenumber_check CHECK (
    value ~ '^(0|\+33)[1-9]{1}( ?\d{2}){4}$'     
);

COMMIT;

-- Revert migrations:ModificationPhoneRegex from pg



BEGIN;

CREATE DOMAIN "passwordregex" AS text CHECK (
    value ~ '^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$' -- Password 8 caractere min, une maj un number et un caractere special
);

ALTER TABLE benevole
ALTER COLUMN password TYPE text;

ALTER TABLE association
ALTER COLUMN password TYPE text;


COMMIT;
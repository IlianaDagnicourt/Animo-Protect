-- Revert migrations:v1.7 from pg

BEGIN;

ALTER DOMAIN zipcode DROP CONSTRAINT zipcode_check;
ALTER DOMAIN zipcode ADD CONSTRAINT zipcode_check CHECK (
        value ~ '^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$'
    OR value ~ '^97[1-6]\d{2}$' -- code postaux DOM
    OR value ~ '^98[4678]\d{2}$' -- code postaux TOM
  
);

COMMIT;
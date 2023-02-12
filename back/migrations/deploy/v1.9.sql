-- Deploy migrations:v1.9 to pg

BEGIN;

ALTER TABLE association
ADD COLUMN description TEXT,
ADD COLUMN phone phonenumber;


COMMIT;

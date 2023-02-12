-- Deploy migrations:v1.8 to pg

BEGIN;


ALTER TABLE benevole
ADD COLUMN picture TEXT,
ADD COLUMN role TEXT  DEFAULT 'benevole';


ALTER TABLE association
ADD COLUMN picture TEXT,
ADD COLUMN role TEXT DEFAULT 'association';


COMMIT;

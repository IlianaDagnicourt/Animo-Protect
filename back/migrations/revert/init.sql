-- Revert migrations:init from pg

BEGIN;

DROP INDEX "loginAssoc" , "loginBenev";
DROP TABLE "benevole", "annonce", "task", "status", "association", "task";
DROP DOMAIN "email", "phonenumber", "siren", "passwordregex", "zipcode";

COMMIT;

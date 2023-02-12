-- Verify migrations:init on pg

BEGIN;

SELECT
    id,
    siren,
    name,
    email,
    password,
    adress,
    zip_code,
    city
FROM association
WHERE false;

SELECT
    id,
    email,
    civility,
    first_name,
    last_name,
    phone,
    description,
    password,
    adress,
    zip_code,
    city
FROM benevole
WHERE false;

SELECT
    id,
    code_status,
    title
FROM status
WHERE false;

SELECT
    id,
    code_annonce,
    title,
    description,
    quotas,
    association_id,
    status_id
FROM annonce
WHERE false;

SELECT
    id,
    code_task,
    description
FROM task
WHERE false;

ROLLBACK;

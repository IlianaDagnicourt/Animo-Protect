-- Deploy migrations:seedindV1.1 to pg

BEGIN;


INSERT INTO "annonce"(
    "title",
    "description",
    "date",
    "quotas",
    "association_id",
    "status_id",
    "city"
)
VALUES ('Annonce 1','test d''une annonce 1','2022-03-04',3,3,2,'Marseille'),
('Annonce 2','test d''une annonce 2','2022-05-04',7,1,3,'Marseille'),
('Annonce 3','test d''une annonce 3','2022-07-04',8,2,2,'Marseille'),
('Annonce 4','test d''une annonce 4','2022-02-04',2,3,1,'Marseille');


COMMIT;

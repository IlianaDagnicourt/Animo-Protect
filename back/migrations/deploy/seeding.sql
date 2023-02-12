-- Deploy migrations:seeding to pg

BEGIN;

INSERT INTO "status"(
    "title"
)
 VALUES ('Urgent'), ('En cours'), ('Terminé');


INSERT INTO "task"(
    "description"
)
 VALUES ('Nettoyage'), ('Promenade'),('Dons de nourriture');


INSERT INTO "benevole"(
    "first_name",
    "last_name",
    "email",
    "phone",
    "password",
    "description",
    "adress",
    "zip_code",
    "city",
    "country"
)
VALUES ('Iliana','dagnicourt','iliana@gmail.com','0783728940','$2a$10$A2OvPF9ezhbUh0UiO.4iRuAgWZ95qQkZ9zl0mLHzKXzzhC4/Tgo.S','jaime les regex','2 Rue de la republique','20111','Ajaccio','France'),
('Samuel','Oustad','samuelbigslave@gmail.com','0732324141','$2a$10$A2OvPF9ezhbUh0UiO.4iRuAgWZ95qQkZ9zl0mLHzKXzzhC4/Tgo.S','jaime les regex','94 rue de lyonne','77000','Melun','France'),
('Mathieu','Lebrigand','MathieuLeFouFurieux@hotmail.fr','0622374253','$2a$10$A2OvPF9ezhbUh0UiO.4iRuAgWZ95qQkZ9zl0mLHzKXzzhC4/Tgo.S','jaime les regex','10 rue des Regex','75013','Lyonne','France'),
('Florian','BigChapo','Flo_le_bg_du_94@gmail.com','0797823741','$2a$10$A2OvPF9ezhbUh0UiO.4iRuAgWZ95qQkZ9zl0mLHzKXzzhC4/Tgo.S','jaime les regex','2 Rue de la résidence secondaire','92390','Brest','France'),
('Clément','SuperCape','LesBellesFondations@gmail.com','0797723841','$2a$10$A2OvPF9ezhbUh0UiO.4iRuAgWZ95qQkZ9zl0mLHzKXzzhC4/Tgo.S','jaime les regex','12 Rue de la belle fondation','91000','Lens','France');


INSERT INTO "association"(
    "siren",
    "name",
    "email",
    "password",
    "adress",
    "zip_code",
    "city",
    "country"
)
 VALUES ('167458689','La SPA','test1@gmail.com','$2a$10$A2OvPF9ezhbUh0UiO.4iRuAgWZ95qQkZ9zl0mLHzKXzzhC4/Tgo.S','3 rue blabla','49240','Avrille','France'),
 ('987678321','Test Association 2','test2@gmail.com','$2a$10$A2OvPF9ezhbUh0UiO.4iRuAgWZ95qQkZ9zl0mLHzKXzzhC4/Tgo.S','3 rue blabla','49240','Caen','France'),
 ('165896461','test Associaiton 3','test3@gmail.com','$2a$10$A2OvPF9ezhbUh0UiO.4iRuAgWZ95qQkZ9zl0mLHzKXzzhC4/Tgo.S','3 rue blabla','56000','Angers','France'),
 ('128665903','Test Association 4','test4@gmail.com','$2a$10$A2OvPF9ezhbUh0UiO.4iRuAgWZ95qQkZ9zl0mLHzKXzzhC4/Tgo.S','3 rue blabla','34000','Lyon','France');



COMMIT;

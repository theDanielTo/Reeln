INSERT into "users"
      ("firstName", "lastName", "email", "city", "state",
      "username", "hashedPw", "avatar")
VALUES
      ('Daniel', 'To', 'example@example.com', 'Garden Grove', 'CA', 'admin',
      '$argon2i$v=19$m=4096,t=3,p=1$VCpYhsbEd62rWjeNtnCPcg$g9slSnGZG6K3dlqR7QX3VjmR/QWqg6wRWgQ+S5j81/U',
      'presentation-images/user/daniel.jpg');


INSERT into "users"
      ("firstName", "lastName", "email", "city", "state",
      "username", "hashedPw", "avatar")
VALUES
      ('Scott', 'Bowler', 'email', 'City', 'CA', 'scottbowler',
      '$argon2i$v=19$m=4096,t=3,p=1$tEBfrt9mUnEJ5zIVOlfIYg$5J4fmOFXPfSRaMhI3erzlFKPyy3kvhu52aSTK5nZVRY',
      'presentation-images/user/nigel.jpg');


INSERT into "users"
      ("firstName", "lastName", "email", "city", "state",
      "username", "hashedPw", "avatar")
VALUES
      ('Brett', 'Albright', 'email', 'City', 'CA', 'brettalbright',
      '$argon2i$v=19$m=4096,t=3,p=1$RRPaS829ZSMbyYQkRVNaxQ$rphkYvK1HX3Nk6vJ1SSY5GwZ1I73Y2022jjOZmPSKjQ',
      'presentation-images/user/spongebob.gif');


INSERT into "users"
      ("firstName", "lastName", "email", "city", "state",
      "username", "hashedPw", "avatar")
VALUES
      ('Alessandra', 'Gutierrez', 'email', 'City', 'CA', 'alessandragutierrez',
      '$argon2i$v=19$m=4096,t=3,p=1$mXR5mOoWlpHOSbawEC2g3A$/IsY/eiyXchpCMllVT2B4iIm/aoSPNnXe6sAFJv4zIs',
      'presentation-images/user/patrick.png');


INSERT into "users"
      ("firstName", "lastName", "email", "city", "state",
      "username", "hashedPw", "avatar")
VALUES
      ('BrianAlexander', 'Bozigian', 'email', 'City', 'CA', 'brianalexanderbozigian',
      '$argon2i$v=19$m=4096,t=3,p=1$jTv0mSi9oe6MuxOdzrRnjA$BVwK7mWtzg/Si/bd0GqvyUIygbybE8MFKkc92m+aN5Y',
      'presentation-images/user/homer.gif');


INSERT into "users"
      ("firstName", "lastName", "email", "city", "state",
      "username", "hashedPw", "avatar")
VALUES
      ('Chris', 'Kim', 'email', 'City', 'CA', 'chriskim',
      '$argon2i$v=19$m=4096,t=3,p=1$IeEySb9b1hKR/8Gjh6OlCA$5JespvjHsfBRqrFowj/cCft6M27OJSg5LH11C+dk9EU',
      'presentation-images/user/nic-cage-1.jpg');


INSERT into "users"
      ("firstName", "lastName", "email", "city", "state",
      "username", "hashedPw", "avatar")
VALUES
      ('Danny', 'Andreev', 'email', 'City', 'CA', 'dannyadreev',
      '$argon2i$v=19$m=4096,t=3,p=1$6QhKjBrBqiMJRqjplf6vqg$QfAe7JWYXeloRzTZIAHewhCAt7sVLvZKo1Y550yamZE',
      'presentation-images/user/hankhill.png');


INSERT into "users"
      ("firstName", "lastName", "email", "city", "state",
      "username", "hashedPw", "avatar")
VALUES
      ('Michael', 'Aguilar', 'email', 'City', 'CA', 'michaelaguilar',
      '$argon2i$v=19$m=4096,t=3,p=1$7T+GriNzllpRXlwOa0MGCw$eDqK5zKBPwH71kHYVd+v0s+d7sITAcXHgXkNRFwpyx4',
      'presentation-images/user/spongebob-user.jpg');


INSERT into "users"
      ("firstName", "lastName", "email", "city", "state",
      "username", "hashedPw", "avatar")
VALUES
      ('John', 'Hwang', 'email', 'City', 'CA', 'johnhwang',
      '$argon2i$v=19$m=4096,t=3,p=1$qwj4OLBktjo6jkIkKbGO6A$D5yVuS8xUEU8wozcrMIYKXAdKnxzEfupoFaceAKFbgc',
      'presentation-images/user/user-1.gif');


INSERT into "users"
      ("firstName", "lastName", "email", "city", "state",
      "username", "hashedPw", "avatar")
VALUES
      ('Stefan', 'Carrera', 'email', 'City', 'CA', 'stefancarrera',
      '$argon2i$v=19$m=4096,t=3,p=1$K0Bb48ymmZcmcwx8n53oGg$85+mvG7TZN67wP0q7hgidqmiSS3Rwx2/4p3i8RlmlbU',
      'presentation-images/user/nic-cage-5.jpeg');









INSERT into "tournaments"
      ("userId", "tourneyName", "tourneyImg",
      "startDate", "endDate", "closed", "maxParticipants",
      "minWeight", "maxWeight", "heaviestFive",
      "perPound", "pointsPerPound",
      "heaviest", "pointsHeaviest",
      "longest",  "pointsLongest",
      "mostCaught", "pointsMostCaught",
      "additionalRules")
    VALUES (
      1, 'rc-0521 FISHTRAVAGANZA', 'presentation-images/tourney/fish-beer.gif',
      '2021-07-01 00:00:00', '2022-07-01 00:00:00', false, 10,
      0, 0, false,
      true, 10,
      true, 80,
      false, 0,
      true, 50,
      'AND THIS IS WHERE I WOULD PUT MY ADDITIONAL RULES... IF I HAD ANY'
    );

INSERT into "tournaments"("userId", "tourneyName", "tourneyImg","startDate", "endDate", "closed", "maxParticipants", "minWeight", "maxWeight", "heaviestFive", "perPound", "pointsPerPound", "heaviest", "pointsHeaviest", "longest",  "pointsLongest", "mostCaught", "pointsMostCaught", "additionalRules")
VALUES (2, 'Carp(e) diem', 'presentation-images/tourney/tourney-1.jpg',
'2021-04-24 00:00:00', '2021-09-05 00:00:00',
false, 20, 0, 0, true, true, 1, true, 0, true, 0, true, 0, 'additional');

INSERT into "tournaments"("userId", "tourneyName", "tourneyImg","startDate", "endDate", "closed", "maxParticipants", "minWeight", "maxWeight", "heaviestFive", "perPound", "pointsPerPound", "heaviest", "pointsHeaviest", "longest",  "pointsLongest", "mostCaught", "pointsMostCaught", "additionalRules")
VALUES (3, 'Roe-mantic Get-away', 'presentation-images/tourney/tourney-2.jpg',
'2021-06-04 00:00:00', '2021-09-06 00:00:00',
false, 30, 0, 0, true, true, 1, true, 0, true, 0, true, 0, 'additional');

INSERT into "tournaments"("userId", "tourneyName", "tourneyImg","startDate", "endDate", "closed", "maxParticipants", "minWeight", "maxWeight", "heaviestFive", "perPound", "pointsPerPound", "heaviest", "pointsHeaviest", "longest",  "pointsLongest", "mostCaught", "pointsMostCaught", "additionalRules")
VALUES (4, 'Oh-fish-ial tournament', 'presentation-images/tourney/kid-fishing.gif',
'2021-05-04 00:00:00', '2021-09-19 00:00:00',
false, 40, 0, 0, true, true, 1, true, 0, true, 0, true, 0, 'additional');

INSERT into "tournaments"("userId", "tourneyName", "tourneyImg","startDate", "endDate", "closed", "maxParticipants", "minWeight", "maxWeight", "heaviestFive", "perPound", "pointsPerPound", "heaviest", "pointsHeaviest", "longest",  "pointsLongest", "mostCaught", "pointsMostCaught", "additionalRules")
VALUES (5, 'Holy Mackerel!', 'presentation-images/tourney/bigcat.gif',
'2020-03-04 00:00:00', '2020-12-31 00:00:00',
false, 50, 0, 0, true, true, 1, true, 0, true, 0, true, 0, 'additional');

INSERT into "tournaments"("userId", "tourneyName", "tourneyImg","startDate", "endDate", "closed", "maxParticipants", "minWeight", "maxWeight", "heaviestFive", "perPound", "pointsPerPound", "heaviest", "pointsHeaviest", "longest",  "pointsLongest", "mostCaught", "pointsMostCaught", "additionalRules")
VALUES (6, 'Fishing for compliments', 'presentation-images/tourney/tourney-3.jpg',
'2021-07-04 00:00:00', '2022-07-05 00:00:00',
false, 60, 0, 0, true, true, 1, true, 0, true, 0, true, 0, 'additional');

INSERT into "tournaments"("userId", "tourneyName", "tourneyImg","startDate", "endDate", "closed", "maxParticipants", "minWeight", "maxWeight", "heaviestFive", "perPound", "pointsPerPound", "heaviest", "pointsHeaviest", "longest",  "pointsLongest", "mostCaught", "pointsMostCaught", "additionalRules")
VALUES (7, 'Quit being shellfish', 'presentation-images/tourney/flapper.gif',
'2021-07-04 00:00:00', '2021-11-05 00:00:00',
false, 70, 0, 0, true, true, 1, true, 0, true, 0, true, 0, 'additional');

INSERT into "tournaments"("userId", "tourneyName", "tourneyImg","startDate", "endDate", "closed", "maxParticipants", "minWeight", "maxWeight", "heaviestFive", "perPound", "pointsPerPound", "heaviest", "pointsHeaviest", "longest",  "pointsLongest", "mostCaught", "pointsMostCaught", "additionalRules")
VALUES (8, 'Minecwaft', 'presentation-images/tourney/minecraft.gif',
'2021-01-01 00:00:00', '2021-03-21 00:00:00',
false, 80, 0, 0, true, true, 1, true, 0, true, 0, true, 0, 'additional');










INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (1, 1, 0, 1);
INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (1, 2, 100, 1);
INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (1, 5, 100, 1);
INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (1, 8, 100, 1);

INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (2, 1, 199, 1);
INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (2, 2, 199, 1);

INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (3, 1, 188, 1);
INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (3, 3, 188, 1);

INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (4, 1, 177, 1);
INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (4, 4, 177, 1);

INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (5, 1, 166, 1);
INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (5, 5, 166, 1);

INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (6, 1, 155, 1);
INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (6, 6, 155, 1);

INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (7, 1, 144, 1);
INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (7, 7, 144, 1);

INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (8, 1, 133, 1);
INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (8, 8, 133, 1);

INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (9, 1, 122, 1);

INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (10, 1, 111, 1);









INSERT into "catches" ("userId", "tourneyId",
            "dateCaught", "weight", "length", "photo")
  VALUES (2, 1, '2021-07-02 00:00:00', 2.3, 0,
          'presentation-images/fish/bass-2.jpg');

INSERT into "catches" ("userId", "tourneyId",
            "dateCaught", "weight", "length", "photo")
  VALUES (3, 1, '2021-07-03 00:00:00', 3.9, 0,
          'presentation-images/fish/bass-3.jpg');

INSERT into "catches" ("userId", "tourneyId",
            "dateCaught", "weight", "length", "photo")
  VALUES (4, 1, '2021-07-04 00:00:00', 2.2, 0,
          'presentation-images/fish/fish-1.jpg');

INSERT into "catches" ("userId", "tourneyId",
            "dateCaught", "weight", "length", "photo")
  VALUES (5, 1, '2021-07-05 00:00:00', 1, 0,
          'presentation-images/fish/flounder.jpg');

INSERT into "catches" ("userId", "tourneyId",
            "dateCaught", "weight", "length", "photo")
  VALUES (6, 1, '2021-07-06 00:00:00', 1.5, 0,
          'presentation-images/fish/fred.jpg');

INSERT into "catches" ("userId", "tourneyId",
            "dateCaught", "weight", "length", "photo")
  VALUES (7, 1, '2021-07-07 00:00:00', 1.4, 0,
          'presentation-images/fish/futurama.jpg');

INSERT into "catches" ("userId", "tourneyId",
            "dateCaught", "weight", "length", "photo")
  VALUES (8, 1, '2021-07-08 00:00:00', 0.9, 0,
          'presentation-images/fish/trout-1.jpg');

INSERT into "catches" ("userId", "tourneyId",
            "dateCaught", "weight", "length", "photo")
  VALUES (9, 1, '2021-07-09 00:00:00', 1.1, 0,
          'presentation-images/fish/trout-2.jpg');

INSERT into "catches" ("userId", "tourneyId",
            "dateCaught", "weight", "length", "photo")
  VALUES (10, 1, '2021-07-10 00:00:00', 0.8, 0,
          'presentation-images/fish/trout-3.jpg');

INSERT into "catches" ("userId", "tourneyId",
            "dateCaught", "weight", "length", "photo")
  VALUES (2, 1, '2021-07-12 00:00:00', 3.6, 0,
          'presentation-images/fish/uninterested.jpg');

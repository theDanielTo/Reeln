INSERT into "users" ("firstName", "lastName", "email", "city", "state", "username", "hashedPw", "avatar")
VALUES ('Daniel', 'To', 'example@example.com', 'Garden Grove', 'CA', 'admin', '$argon2i$v=19$m=4096,t=3,p=1$VCpYhsbEd62rWjeNtnCPcg$g9slSnGZG6K3dlqR7QX3VjmR/QWqg6wRWgQ+S5j81/U', 'image-1627248763672.jpg');

INSERT into "users" ("firstName", "lastName", "email", "city", "state", "username", "hashedPw", "avatar")
VALUES ('Test', 'Account', 'example2@example.com', 'Garden Grove', 'CA', 'test', '$argon2i$v=19$m=4096,t=3,p=1$Lpw+P5J0IyWRFFbTfDkOiw$Hs5ldXcybxfrfP959azkLQbRVlN3doe6vnQ/wrOo1Zk', 'image-1627248763672.jpg');

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
      1, 'Example Tourney', 'images/hero-banner.jpg',
      '2021-07-01 00:00:00', '2021-07-02 00:00:00', false, 20,
      1, 2, false,
      true, 5,
      true, 80,
      true, 60,
      true, 100,
      'Example Tourney'
    );

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
      2, 'Test Tourney', 'images/hero-banner.jpg',
      '2021-07-04 00:00:00', '2021-07-05 00:00:00', false, 40,
      2, 22, true,
      true, 1,
      true, 20,
      true, 20,
      true, 20,
      'test'
    );

INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (1, 1, 0, 1);

INSERT into "participants" ("userId", "tourneyId", "score", "standing")
    VALUES (2, 2, 0, 1);

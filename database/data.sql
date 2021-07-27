INSERT into "users" ("firstName", "lastName", "email", "city", "state", "username", "hashedPw", "avatar")
VALUES ('test', 'test', 'example@example.com', 'Garden Grove', 'CA', 'admin', '$argon2i$v=19$m=4096,t=3,p=1$FSfMYg30VYl2F4sPNNxJ6A$ngQrC66L9Fgs6cOOJKboBLs6FrMFt/oPMKsf0dyEA0Q', 'image-1627248763672.jpg');

INSERT into "tourneyDetails"
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

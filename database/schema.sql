set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPw" TEXT NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	"avatar" TEXT,
	"location" TEXT,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."tourneyRules" (
	"tourneyId" integer NOT NULL UNIQUE,
	"public" BOOLEAN NOT NULL,
	"heaviestFive" BOOLEAN NOT NULL,
	"perPound" BOOLEAN NOT NULL,
	"pointsPerPound" integer,
	"pointsPerOunce" integer,
	"heaviest" BOOLEAN NOT NULL,
	"longest" BOOLEAN NOT NULL,
	"mostCaught" BOOLEAN NOT NULL,
	"pointsHeaviest" integer,
	"pointsLongest" integer,
	"pointsMostCaught" integer,
	"additionalRules" TEXT,
	CONSTRAINT "tourneyRules_pk" PRIMARY KEY ("tourneyId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."tournaments" (
	"tourneyId" serial NOT NULL,
	"userId" integer NOT NULL,
	"tourneyName" TEXT NOT NULL,
	"startDate" serial NOT NULL UNIQUE,
	"endDate" serial NOT NULL UNIQUE,
	CONSTRAINT "tournaments_pk" PRIMARY KEY ("tourneyId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."catches" (
	"userId" integer NOT NULL,
	"tourneyId" integer UNIQUE,
	"dateCaught" DATE NOT NULL,
	"weight" integer,
	"length" integer,
	"location" TEXT NOT NULL,
	"photo" TEXT NOT NULL,
	"points" integer NOT NULL,
	CONSTRAINT "catches_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."chatLog" (
	"tourneyId" integer NOT NULL,
	"userId" integer NOT NULL,
	"dateSent" TIMESTAMP NOT NULL,
	"message" TEXT NOT NULL,
	CONSTRAINT "chatLog_pk" PRIMARY KEY ("tourneyId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."participants" (
	"userId" integer NOT NULL,
	"tourneyId" integer NOT NULL,
	CONSTRAINT "participants_pk" PRIMARY KEY ("userId","tourneyId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "tourneyRules" ADD CONSTRAINT "tourneyRules_fk0" FOREIGN KEY ("tourneyId") REFERENCES "tournaments"("tourneyId");

ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "catches" ADD CONSTRAINT "catches_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "catches" ADD CONSTRAINT "catches_fk1" FOREIGN KEY ("tourneyId") REFERENCES "tournaments"("tourneyId");

ALTER TABLE "chatLog" ADD CONSTRAINT "chatLog_fk0" FOREIGN KEY ("tourneyId") REFERENCES "tournaments"("tourneyId");
ALTER TABLE "chatLog" ADD CONSTRAINT "chatLog_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "participants" ADD CONSTRAINT "participants_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "participants" ADD CONSTRAINT "participants_fk1" FOREIGN KEY ("tourneyId") REFERENCES "tournaments"("tourneyId");

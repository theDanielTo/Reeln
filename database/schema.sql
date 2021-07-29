set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT,
	"city" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPw" TEXT NOT NULL,
	"avatar" TEXT,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public"."tournaments" (
	"tourneyId" serial NOT NULL UNIQUE,
	"userId" integer NOT NULL,
	"tourneyName" TEXT NOT NULL,
	"tourneyImg" TEXT NOT NULL,
	"startDate" timestamptz NOT NULL,
	"endDate" timestamptz NOT NULL,
	"closed" BOOLEAN NOT NULL,
  "maxParticipants" integer NOT NULL,
	"minWeight" TEXT NOT NULL,
	"maxWeight" TEXT NOT NULL,
	"heaviestFive" BOOLEAN NOT NULL,
	"perPound" BOOLEAN NOT NULL,
	"pointsPerPound" integer,
	"pointsHeaviest" integer,
	"heaviest" BOOLEAN NOT NULL,
	"longest" BOOLEAN NOT NULL,
	"pointsLongest" integer,
	"mostCaught" BOOLEAN NOT NULL,
	"pointsMostCaught" integer,
	"additionalRules" TEXT,
	CONSTRAINT "tournaments_pk" PRIMARY KEY ("tourneyId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public"."catches" (
  "catchId" serial NOT NULL,
	"userId" integer NOT NULL,
	"tourneyId" integer NOT NULL,
	"dateCaught" timestamptz NOT NULL,
	"weight" integer,
	"length" integer,
	"photo" TEXT NOT NULL,
	CONSTRAINT "catches_pk" PRIMARY KEY ("userId","tourneyId","catchId")
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
  "score" integer NOT NULL,
  "standing" integer NOT NULL,
	CONSTRAINT "participants_pk" PRIMARY KEY ("userId","tourneyId")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "catches" ADD CONSTRAINT "catches_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "catches" ADD CONSTRAINT "catches_fk1" FOREIGN KEY ("tourneyId") REFERENCES "tournaments"("tourneyId");

ALTER TABLE "chatLog" ADD CONSTRAINT "chatLog_fk0" FOREIGN KEY ("tourneyId") REFERENCES "tournaments"("tourneyId");
ALTER TABLE "chatLog" ADD CONSTRAINT "chatLog_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "participants" ADD CONSTRAINT "participants_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "participants" ADD CONSTRAINT "participants_fk1" FOREIGN KEY ("tourneyId") REFERENCES "tournaments"("tourneyId");

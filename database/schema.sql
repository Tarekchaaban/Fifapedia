set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."teams" (
	"teamId" integer NOT NULL,
	"teamName" TEXT NOT NULL,
	"crestUrl" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "teams_pk" PRIMARY KEY ("teamId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "teams" ADD CONSTRAINT "teams_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

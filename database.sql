
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE DATABASE "tagtender_project";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- FROM DBDESIGNER

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"hometown" varchar(255) NOT NULL,
	"climbing_start_date" DATE,
	"preferred_gym" integer,
	"preferred_style" integer,
	"registered_on" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "climbs" (
	"id" serial NOT NULL,
	"grade_id" integer NOT NULL,
	"color" varchar(255),
	"gym_id" integer NOT NULL,
	"climb_style_id" integer NOT NULL,
	"movement_style" varchar(255),
	"date_added" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"photo" varchar(500),
	"user_id" integer NOT NULL,
	CONSTRAINT "climbs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "gym" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"address" varchar(512),
	"latitude" FLOAT NOT NULL,
	"longitude" FLOAT NOT NULL,
	CONSTRAINT "gym_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "climb_style" (
	"id" serial NOT NULL,
	"style" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "climb_style_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "logbook" (
	"user_id" integer NOT NULL,
	"route_tag_id" integer NOT NULL,
	"send_date" DATE NOT NULL DEFAULT 'CURRENT_DATE',
	"id" serial NOT NULL,
	CONSTRAINT "logbook_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "grade" (
	"id" serial NOT NULL,
	"boulder" BOOLEAN,
	"difficulty" varchar(80) NOT NULL,
	CONSTRAINT "grade_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "rating" (
	"rating" integer NOT NULL UNIQUE,
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"climb_id" integer NOT NULL,
	CONSTRAINT "rating_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comment" (
	"comment" varchar(1000),
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"route_tag_id" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"flagged" BOOLEAN NOT NULL,
	CONSTRAINT "comment_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("preferred_gym") REFERENCES "gym"("id");
ALTER TABLE "user" ADD CONSTRAINT "user_fk1" FOREIGN KEY ("preferred_style") REFERENCES "climb_style"("id");

ALTER TABLE "climbs" ADD CONSTRAINT "climbs_fk0" FOREIGN KEY ("grade_id") REFERENCES "grade"("id");
ALTER TABLE "climbs" ADD CONSTRAINT "climbs_fk1" FOREIGN KEY ("gym_id") REFERENCES "gym"("id");
ALTER TABLE "climbs" ADD CONSTRAINT "climbs_fk2" FOREIGN KEY ("climb_style_id") REFERENCES "climb_style"("id");
ALTER TABLE "climbs" ADD CONSTRAINT "climbs_fk3" FOREIGN KEY ("user_id") REFERENCES "user"("id");



ALTER TABLE "logbook" ADD CONSTRAINT "logbook_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "logbook" ADD CONSTRAINT "logbook_fk1" FOREIGN KEY ("route_tag_id") REFERENCES "climbs"("id");


ALTER TABLE "rating" ADD CONSTRAINT "rating_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "rating" ADD CONSTRAINT "rating_fk1" FOREIGN KEY ("climb_id") REFERENCES "climbs"("id");

ALTER TABLE "comment" ADD CONSTRAINT "comment_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "comment" ADD CONSTRAINT "comment_fk1" FOREIGN KEY ("route_tag_id") REFERENCES "climbs"("id");









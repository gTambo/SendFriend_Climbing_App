
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE DATABASE "tagtender_project";




CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"hometown" varchar(255) NOT NULL,
	"climbing_start_date" DATE NOT NULL DEFAULT CURRENT_DATE,
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
	"thumb_url" VARCHAR(500),
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
	"latitude" FLOAT,
	"longitude" FLOAT,
	CONSTRAINT "gym_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "climb_style" (
	"id" serial NOT NULL,
	"style" varchar(255) NOT NULL UNIQUE,
	"roped" BOOLEAN NOT NULL DEFAULT 'TRUE',
	CONSTRAINT "climb_style_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "logbook" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"climb_id" integer NOT NULL,
	"send_date" DATE NOT NULL DEFAULT CURRENT_DATE,
	"attempts" VARCHAR(124),
	"grade_id_perceived" INTEGER REFERENCES "grade",
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
	"id" serial NOT NULL,
	"rating" integer DEFAULT '0',
	"user_id" integer NOT NULL,
	"climb_id" integer NOT NULL,
	CONSTRAINT "rating_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comment" (
	"id" serial NOT NULL,
	"comment" varchar(1000),
	"user_id" integer NOT NULL,
	"climb_id" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"flagged" BOOLEAN NOT NULL DEFAULT 'FALSE',
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
ALTER TABLE "logbook" ADD CONSTRAINT "logbook_fk1" FOREIGN KEY ("climb_id") REFERENCES "climbs"("id");


ALTER TABLE "rating" ADD CONSTRAINT "rating_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "rating" ADD CONSTRAINT "rating_fk1" FOREIGN KEY ("climb_id") REFERENCES "climbs"("id");

ALTER TABLE "comment" ADD CONSTRAINT "comment_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "comment" ADD CONSTRAINT "comment_fk1" FOREIGN KEY ("climb_id") REFERENCES "climbs"("id");


--Populate grades table

INSERT INTO "grade" ("boulder", "difficulty")
VALUES 
	('TRUE', 'VB'),
	('TRUE', 'V0'),
	('TRUE', 'V1'),
	('TRUE', 'V2'),
	('TRUE', 'V3'),
	('TRUE', 'V4'),
	('TRUE', 'V5'),
	('TRUE', 'V6'),
	('TRUE', 'V7'),
	('TRUE', 'V8'),
	('TRUE', 'V9'),
	('TRUE', 'V10'),
	('TRUE', 'V11'),
	('TRUE', 'V12'),
	('TRUE', 'V13'),
	('TRUE', 'V14'),
	('TRUE', 'V15'),
	('TRUE', 'V16'),
	('TRUE', 'unknown'),
	('FALSE', '5.3'),
	('FALSE', '5.4'),
	('FALSE', '5.5'),
	('FALSE', '5.6'),
	('FALSE', '5.7'),
	('FALSE', '5.8'),
	('FALSE', '5.9'),
	('FALSE', '5.10a'),
	('FALSE', '5.10b'),
	('FALSE', '5.10-'),
	('FALSE', '5.10c'),
	('FALSE', '5.10d'),
	('FALSE', '5.10+'),
	('FALSE', '5.11a'),
	('FALSE', '5.11b'),
	('FALSE', '5.11-'),
	('FALSE', '5.11c'),
	('FALSE', '5.11d'),
	('FALSE', '5.11+'),
	('FALSE', '5.12a'),
	('FALSE', '5.12b'),
	('FALSE', '5.12-'),
	('FALSE', '5.12c'),
	('FALSE', '5.12d'),
	('FALSE', '5.12+'),
	('FALSE', '5.13a'),
	('FALSE', '5.13b'),
	('FALSE', '5.13-'),
	('FALSE', '5.13c'),
	('FALSE', '5.13d'),
	('FALSE', '5.13+'),
	('FALSE', '5.14-'),
	('FALSE', '5.14+'),
	('FALSE', '5.14a'),
	('FALSE', '5.14b'),
	('FALSE', '5.14c'),
	('FALSE', '5.14d'),
	('FALSE', '5.15a'),
	('FALSE', 'unknown');
	

--Optional in-between grades
	
INSERT INTO "grade" ("boulder", "difficulty")
VALUES 
	('TRUE', 'VB/0'),
	('TRUE', 'V0/1'),
	('TRUE', 'V1/2'),
	('TRUE', 'V2/3'),
	('TRUE', 'V3/4'),
	('TRUE', 'V4/5'),
	('TRUE', 'V5/6'),
	('TRUE', 'V6/7'),
	('TRUE', 'V7/8'),
	('TRUE', 'V8/9'),
	('TRUE', 'V9/10'),
	('TRUE', 'V10/11'),
	('TRUE', 'V11/12'),
	('TRUE', 'V12/13'),
	('TRUE', 'V13/14');



-- Optionally, seed gym table data
INSERT INTO "gym" ("name", "city", "address", "latitude", "longitude") VALUES ('VE - Twin Cities Bouldering', 'Saint Paul', '2550 Wabash Ave', '44.960845915367464', '-93.2061154539711');
INSERT INTO "gym" ("name", "city", "address", "latitude", "longitude") VALUES ('VE - Minneapolis', 'Minneapolis', '2540 Nicollet Ave', '44.95641572229102', '-93.27872893044365');
--INSERT INTO "gym" ("name", "city", "address") VALUES ('Baoulder Gym', 'AwesomeTown', '1111 Sendit Way');



--Optionally, seed climbs table data 
INSERT INTO "climbs" 
	("grade_id", "color", "gym_id", "climb_style_id", "photo", "user_id")
VALUES
	('7', 'Yellow', '3', '1', 'images/IMG_3544.JPG', '1');

INSERT INTO "climbs" 
	("grade_id", "color", "gym_id", "climb_style_id", "photo", "user_id")
VALUES
	('34', 'Yellow', '4', '2', 'public/images/IMG_3201.JPG', '1'),
	('26', 'Blue', '4', '2', 'public/images/IMG_3201.JPG', '1');
	

--Optiopnally, seed comment table data
INSERT INTO "comment" ("comment", "climb_id", "user_id") 
VALUES ('Good flow.', '1', '1');

--Optionally, seed rating table data
INSERT INTO "rating" ("rating", "user_id", "climb_id")
VALUES ('3', '2', '1');


SELECT * FROM "climbs" WHERE "gym_id" = 3 AND "climb_style_id" = 1
ORDER BY "grade_id" ASC;

--Optionally, seed climb_style table data
INSERT INTO "climb_style" ("style", "roped") VALUES ('Boulder', 'FALSE'), ('Sport-lead', 'TRUE'), ('Top-rope', 'TRUE'), ('Auto-belay', 'TRUE');



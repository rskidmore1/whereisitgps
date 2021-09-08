set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "trips" (
    "tripId" serial ,
    "startLat" double precision ,
    "startLng" double precision ,
    "stopLat" double precision ,
    "stopLng" double precision ,
    "topSpeed" integer ,
    "vehicleId" serial ,
    "startAddress" TEXT ,
    "stopAddress" TEXT ,
    "createdAt" timestamp with time zone,
    CONSTRAINT "trips_pk" PRIMARY KEY ("tripId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "vehicles" (
    "vehicleId" serial ,
    "createdAt" timestamp with time zone ,
    "name" TEXT ,
    "make" TEXT ,
    "model" TEXT ,
    "color" TEXT,
    "Plate" integer,
    "year" integer ,
    "speedAlert" integer ,
    "brakeAlert" BOOLEAN ,
    "accelerationAlert" BOOLEAN ,
    "updatedAt" timestamp with time zone ,
    "photo" TEXT ,
    CONSTRAINT "vehicles_pk" PRIMARY KEY ("vehicleId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "drivers" (
    "driverId" serial ,
    "name" TEXT ,
    "phone" TEXT ,
    "email" TEXT ,
    "createdAt" timestamp with time zone ,
    "updatedAt" timestamp with time zone ,
    "vehicleId" serial ,
    CONSTRAINT "drivers_pk" PRIMARY KEY ("driverId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "users" (
    "userId" serial ,
    "username" serial  UNIQUE,
    "hashedPassword" TEXT ,
    "createdAt" timestamp with time zone ,
    "updatedAt" timestamp with time zone ,
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "stops" (
    "stopId" serial ,
    "stopLat" double precision ,
    "stopLng" double precision ,
    "stopAddress" TEXT ,
    "createdAt" timestamp with time zone ,
    "vehicleId" serial ,
    "beginTime" TIMESTAMP ,
    "endTime" TIMESTAMP,
    CONSTRAINT "stops_pk" PRIMARY KEY ("stopId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "trips" ADD CONSTRAINT "trips_fk0" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("vehicleId");
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_fk0" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("vehicleId");
ALTER TABLE "stops" ADD CONSTRAINT "stops_fk0" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("vehicleId");

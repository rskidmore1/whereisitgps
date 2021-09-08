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
    "tripId" serial NOT NULL,
    "startLat" double precision NOT NULL,
    "startLng" double precision NOT NULL,
    "stopLat" double precision NOT NULL,
    "stopLng" double precision NOT NULL,
    "topSpeed" integer NOT NULL,
    "vehicleId" serial NOT NULL,
    "startAddress" TEXT NOT NULL,
    "stopAddress" TEXT NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    CONSTRAINT "trips_pk" PRIMARY KEY ("tripId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "vehicles" (
    "vehicleId" serial NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "name" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" integer NOT NULL,
    "speedAlert" integer NOT NULL,
    "brakeAlert" BOOLEAN NOT NULL,
    "accelerationAlert" BOOLEAN NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "photo" TEXT NOT NULL,
    CONSTRAINT "vehicles_pk" PRIMARY KEY ("vehicleId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "drivers" (
    "driverId" serial NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "vehicleId" serial NOT NULL,
    CONSTRAINT "drivers_pk" PRIMARY KEY ("driverId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "users" (
    "userId" serial NOT NULL,
    "username" serial NOT NULL UNIQUE,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "stops" (
    "stopId" serial NOT NULL,
    "stopLat" double precision NOT NULL,
    "stopLng" double precision NOT NULL,
    "stopAddress" TEXT NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "vehicleId" serial NOT NULL,
    "beginTime" TIMESTAMP NOT NULL,
    "endTime" TIMESTAMP NOT NULL,
    CONSTRAINT "stops_pk" PRIMARY KEY ("stopId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "trips" ADD CONSTRAINT "trips_fk0" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("vehicleId");
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_fk0" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("vehicleId");
ALTER TABLE "stops" ADD CONSTRAINT "stops_fk0" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("vehicleId");

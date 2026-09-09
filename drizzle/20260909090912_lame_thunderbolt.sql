CREATE TYPE "public"."routine_frequency_enum" AS ENUM('DAILY', 'OTHER', 'WEEKLY', 'MONTHLY', 'YEARLY', 'SPECIAL');--> statement-breakpoint
CREATE TABLE "routine" (
	"id" text PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"is_pinned" boolean DEFAULT false NOT NULL,
	"is_one_time" boolean DEFAULT false NOT NULL,
	"frequence" "routine_frequency_enum" DEFAULT 'DAILY' NOT NULL,
	"display_order" integer DEFAULT -1 NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

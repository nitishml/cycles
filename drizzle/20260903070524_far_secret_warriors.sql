CREATE TYPE "public"."gender_enum" AS ENUM('M', 'F', 'O');--> statement-breakpoint
CREATE TYPE "public"."payment_mode_enum" AS ENUM('CASH', 'CHEQUE', 'UPI', 'ONLINE', 'DD', 'CRYPTO');--> statement-breakpoint
CREATE TABLE "calendar" (
	"day" date PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event" (
	"id" text PRIMARY KEY NOT NULL,
	"day" date,
	"is_active" boolean DEFAULT false NOT NULL,
	"is_pinned" boolean DEFAULT false NOT NULL,
	"is_one_time" boolean DEFAULT false NOT NULL,
	"is_handled" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT -1 NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"remarks" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"mobile" text NOT NULL,
	"email" text NOT NULL,
	"hashed_password" text,
	"login_attempts" integer DEFAULT 0 NOT NULL,
	"is_activated" boolean DEFAULT false NOT NULL,
	"mobile_verified" boolean DEFAULT false NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"blacklisted" boolean DEFAULT false,
	"deleted" boolean DEFAULT false,
	"activated_at" timestamp with time zone,
	"mobile_verified_at" timestamp with time zone,
	"email_verified_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"blacklisted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_mobile_unique" UNIQUE("mobile"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"device_hash" text,
	"device_id" text,
	"is_web" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "task" (
	"id" text PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"is_pinned" boolean DEFAULT false NOT NULL,
	"is_one_time" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT -1 NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "task_ledger" (
	"id" text PRIMARY KEY NOT NULL,
	"task_id" text NOT NULL,
	"day" date,
	"count" numeric(10, 2),
	"remarks" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_day_calendar_day_fk" FOREIGN KEY ("day") REFERENCES "public"."calendar"("day") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_ledger" ADD CONSTRAINT "task_ledger_task_id_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_ledger" ADD CONSTRAINT "task_ledger_day_calendar_day_fk" FOREIGN KEY ("day") REFERENCES "public"."calendar"("day") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_mobile" ON "user" USING btree ("mobile");--> statement-breakpoint
CREATE INDEX "idx_session_user" ON "session" USING btree ("user_id");
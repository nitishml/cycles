CREATE TABLE "routine_ledger" (
	"id" text PRIMARY KEY NOT NULL,
	"routine_id" text NOT NULL,
	"day" date,
	"completed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"remarks" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "routine_ledger" ADD CONSTRAINT "routine_ledger_routine_id_routine_id_fk" FOREIGN KEY ("routine_id") REFERENCES "public"."routine"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routine_ledger" ADD CONSTRAINT "routine_ledger_day_calendar_day_fk" FOREIGN KEY ("day") REFERENCES "public"."calendar"("day") ON DELETE no action ON UPDATE no action;
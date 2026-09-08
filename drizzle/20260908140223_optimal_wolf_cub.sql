CREATE TYPE "public"."task_frequency_enum" AS ENUM('DAILY', 'OTHER', 'WEEKLY', 'MONTHLY', 'YEARLY', 'SPECIAL');--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "frequence" "task_frequency_enum" DEFAULT 'DAILY' NOT NULL;--> statement-breakpoint
ALTER TABLE "task_ledger" DROP COLUMN "count";
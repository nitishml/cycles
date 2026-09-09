CREATE TYPE "public"."task_status_enum" AS ENUM('DRAFT', 'OPEN', 'COMPLETE', 'PARTIAL');--> statement-breakpoint
CREATE TYPE "public"."task_tags_enum" AS ENUM('EXPENSE', 'INCOME', 'WORK', 'CARE', 'SOCIAL');--> statement-breakpoint
ALTER TABLE "task_ledger" ALTER COLUMN "completed_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "task_ledger" ALTER COLUMN "completed_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "task_ledger" ADD COLUMN "status" "task_status_enum" DEFAULT 'OPEN' NOT NULL;
ALTER TABLE "tasks" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "due_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;
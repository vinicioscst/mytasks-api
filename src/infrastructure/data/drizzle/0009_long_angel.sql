CREATE TABLE "emails_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sent_at" timestamp DEFAULT now(),
	"subject" varchar(120) NOT NULL,
	"from" varchar(120) NOT NULL,
	"to" varchar(120) NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "errors_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"request_context" varchar(100) DEFAULT 'unknown' NOT NULL,
	"error_message" varchar(1000) NOT NULL,
	"error_stack" text NOT NULL,
	"http_status" integer NOT NULL,
	"request_url" varchar(500) NOT NULL,
	"request_method" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "emails_log" ADD CONSTRAINT "emails_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "errors_log" ADD CONSTRAINT "errors_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
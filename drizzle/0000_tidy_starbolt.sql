CREATE TYPE "public"."user_role" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TABLE "login_attempts" (
	"id" serial PRIMARY KEY NOT NULL,
	"rut" varchar(12) NOT NULL,
	"success" boolean NOT NULL,
	"ip" varchar(64),
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "password_reset_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token_hash" text NOT NULL,
	"purpose" varchar(40) DEFAULT 'reset' NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"consumed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "polizas" (
	"id" serial PRIMARY KEY NOT NULL,
	"rut_titular" varchar(12) NOT NULL,
	"numero_poliza" varchar(60) NOT NULL,
	"aseguradora" varchar(120) NOT NULL,
	"producto" varchar(120) NOT NULL,
	"estado" varchar(40) DEFAULT 'vigente' NOT NULL,
	"vigencia_desde" timestamp with time zone,
	"vigencia_hasta" timestamp with time zone,
	"prima_clp" integer,
	"extra_data" text,
	"synced_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"rut" varchar(12) NOT NULL,
	"email" varchar(255) NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"password_hash" text,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by_user_id" integer
);
--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "login_attempts_rut_idx" ON "login_attempts" USING btree ("rut");--> statement-breakpoint
CREATE INDEX "login_attempts_created_at_idx" ON "login_attempts" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "password_reset_tokens_hash_idx" ON "password_reset_tokens" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "password_reset_tokens_user_idx" ON "password_reset_tokens" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "polizas_rut_idx" ON "polizas" USING btree ("rut_titular");--> statement-breakpoint
CREATE UNIQUE INDEX "polizas_numero_idx" ON "polizas" USING btree ("numero_poliza");--> statement-breakpoint
CREATE INDEX "polizas_estado_idx" ON "polizas" USING btree ("estado");--> statement-breakpoint
CREATE UNIQUE INDEX "users_rut_idx" ON "users" USING btree ("rut");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role");
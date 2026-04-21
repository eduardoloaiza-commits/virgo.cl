import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  uniqueIndex,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["admin", "user"]);

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    rut: varchar("rut", { length: 12 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    nombre: varchar("nombre", { length: 200 }).notNull(),
    passwordHash: text("password_hash"),
    role: userRoleEnum("role").notNull().default("user"),
    isActive: boolean("is_active").notNull().default(true),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    createdByUserId: integer("created_by_user_id"),
  },
  (t) => ({
    rutIdx: uniqueIndex("users_rut_idx").on(t.rut),
    emailIdx: uniqueIndex("users_email_idx").on(t.email),
    roleIdx: index("users_role_idx").on(t.role),
  }),
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull(),
    purpose: varchar("purpose", { length: 40 }).notNull().default("reset"),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    consumedAt: timestamp("consumed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    tokenHashIdx: uniqueIndex("password_reset_tokens_hash_idx").on(t.tokenHash),
    userIdIdx: index("password_reset_tokens_user_idx").on(t.userId),
  }),
);

export const loginAttempts = pgTable(
  "login_attempts",
  {
    id: serial("id").primaryKey(),
    rut: varchar("rut", { length: 12 }).notNull(),
    success: boolean("success").notNull(),
    ip: varchar("ip", { length: 64 }),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    rutIdx: index("login_attempts_rut_idx").on(t.rut),
    createdAtIdx: index("login_attempts_created_at_idx").on(t.createdAt),
  }),
);

export const polizas = pgTable(
  "polizas",
  {
    id: serial("id").primaryKey(),
    rutTitular: varchar("rut_titular", { length: 12 }).notNull(),
    numeroPoliza: varchar("numero_poliza", { length: 60 }).notNull(),
    aseguradora: varchar("aseguradora", { length: 120 }).notNull(),
    producto: varchar("producto", { length: 120 }).notNull(),
    estado: varchar("estado", { length: 40 }).notNull().default("vigente"),
    vigenciaDesde: timestamp("vigencia_desde", { withTimezone: true, mode: "date" }),
    vigenciaHasta: timestamp("vigencia_hasta", { withTimezone: true, mode: "date" }),
    primaClp: integer("prima_clp"),
    extraData: text("extra_data"),
    syncedAt: timestamp("synced_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => ({
    rutIdx: index("polizas_rut_idx").on(t.rutTitular),
    numeroIdx: uniqueIndex("polizas_numero_idx").on(t.numeroPoliza),
    estadoIdx: index("polizas_estado_idx").on(t.estado),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Poliza = typeof polizas.$inferSelect;

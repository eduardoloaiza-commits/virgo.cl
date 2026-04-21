import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, users, loginAttempts } from "@/lib/db";
import { normalizeRut } from "@/lib/rut";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      rut: string;
      role: "admin" | "user";
      nombre: string;
    } & DefaultSession["user"];
  }
  interface User {
    rut: string;
    role: "admin" | "user";
    nombre: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    rut: string;
    role: "admin" | "user";
    nombre: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  pages: {
    signIn: "/portal/login",
    error: "/portal/login",
  },
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        rut: {},
        password: {},
      },
      async authorize(credentials) {
        const rawRut = typeof credentials?.rut === "string" ? credentials.rut : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";
        const rut = normalizeRut(rawRut);
        if (!rut || !password) return null;

        try {
          const found = await db.select().from(users).where(eq(users.rut, rut)).limit(1);
          const user = found[0];

          const logAttempt = async (success: boolean) => {
            try {
              await db.insert(loginAttempts).values({ rut, success });
            } catch (err) {
              console.error("[auth] no se pudo registrar intento", err);
            }
          };

          if (!user || !user.isActive || !user.passwordHash) {
            await logAttempt(false);
            return null;
          }

          const ok = await compare(password, user.passwordHash);
          if (!ok) {
            await logAttempt(false);
            return null;
          }

          await db
            .update(users)
            .set({ lastLoginAt: new Date(), updatedAt: new Date() })
            .where(eq(users.id, user.id));
          await logAttempt(true);

          return {
            id: String(user.id),
            rut: user.rut,
            email: user.email,
            name: user.nombre,
            nombre: user.nombre,
            role: user.role,
          };
        } catch (err) {
          console.error("[auth] authorize error", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.rut = user.rut;
        token.role = user.role;
        token.nombre = user.nombre;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.rut = token.rut;
      session.user.role = token.role;
      session.user.nombre = token.nombre;
      return session;
    },
  },
});

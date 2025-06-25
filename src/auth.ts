import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";

// Simulação de banco de dados
const users = [
  {
    id: "1",
    email: "admin@expatriamente.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewgHDOGiHGzOLlly", // password123
    name: "Administrador",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "user@expatriamente.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewgHDOGiHGzOLlly", // password123
    name: "Usuário Teste",
    role: "user" as const,
  },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        const user = users.find((u) => u.email === email);
        if (!user || !user.password) {
          throw new Error("Usuário não encontrado ou senha não configurada.");
        }

        const isPasswordValid = await compare(
          password as string,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Senha inválida.");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});

// Tipos para NextAuth v5
declare module "next-auth" {
  interface User {
    role?: "admin" | "user";
  }
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: "admin" | "user";
    };
  }
}

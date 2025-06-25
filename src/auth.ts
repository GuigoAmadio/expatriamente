import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import type { User } from "next-auth";

// Simulação de banco de dados
const users: User[] = [
  {
    id: "1",
    email: "admin@expatriamente.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewgHDOGiHGzOLlly", // password123
    name: "Administrador",
    role: "admin",
  },
  {
    id: "2",
    email: "user@expatriamente.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewgHDOGiHGzOLlly", // password123
    name: "Usuário Teste",
    role: "user",
  },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // Você pode adicionar um formulário personalizado aqui, ou deixar em branco para usar o padrão
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const user = users.find((u) => u.email === email);
        if (!user || !user.password) {
          throw new Error("Usuário não encontrado ou senha não configurada.");
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Senha inválida.");
        }

        return user;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub ?? "no-id";
        session.user.role = (token as any).role;
      }
      return session;
    },
  },
});

declare module "next-auth" {
  interface User {
    role?: "admin" | "user";
    password?: string;
  }
  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "user";
  }
}

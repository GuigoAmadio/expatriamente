import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Simulação de banco de dados - substitua pela sua implementação real
const users = [
  {
    id: "1",
    email: "admin@expatriamente.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewgHDOGiHGzOLlly", // password123
    name: "Administrador",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    email: "user@expatriamente.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewgHDOGiHGzOLlly", // password123
    name: "Usuário Teste",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    // Provedor de credenciais (email/senha)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        // Buscar usuário no banco de dados
        const user = users.find((u) => u.email === credentials.email);

        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        // Verificar senha
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Senha inválida");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      },
    }),

    // Provedor Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  // Configuração de sessão
  session: {
    strategy: "jwt",
  },

  // Páginas personalizadas
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  // Callbacks
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      // Persistir dados do usuário no token
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      // Enviar propriedades para o cliente
      if (token && session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  // Debug em desenvolvimento
  debug: process.env.NODE_ENV === "development",
};

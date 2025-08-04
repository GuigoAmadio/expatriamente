"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { registerAction } from "@/actions/auth";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      // Validações básicas
      if (!name || !email || !password || !confirmPassword) {
        setError("Todos os campos são obrigatórios");
        return;
      }

      if (password !== confirmPassword) {
        setError("As senhas não coincidem");
        return;
      }

      if (password.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres");
        return;
      }

      const result = await registerAction({
        name,
        email,
        password,
      });

      if (result.success) {
        setSuccess("Conta criada com sucesso! Redirecionando para login...");
        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      } else {
        setError(result.message || "Erro ao criar conta");
      }
    } catch (error) {
      setError("Erro interno do servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
        {/* Link para voltar */}
        <div className="mb-4">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-500 text-sm flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar ao início
          </a>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Criar Conta
        </h1>

        <form action={handleSubmit} className="space-y-4">
          <Input
            name="name"
            type="text"
            placeholder="Nome completo"
            required
            disabled={isLoading}
          />
          <Input
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            disabled={isLoading}
          />
          <Input
            name="password"
            type="password"
            placeholder="Senha (mínimo 6 caracteres)"
            required
            disabled={isLoading}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirmar senha"
            required
            disabled={isLoading}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Já tem uma conta?{" "}
            <a
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-500"
            >
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

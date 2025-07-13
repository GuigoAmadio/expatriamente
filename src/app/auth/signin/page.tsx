"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { loginAction } from "@/actions/auth";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const result = await loginAction({ email, password });

      if (!result.success) {
        setError(result.message || "Erro ao fazer login");
      } else {
        router.push("/dashboard");
        router.refresh();
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
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Login
        </h1>

        {/* Login com Credenciais */}
        <form action={handleSubmit} className="space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="admin@expatriamente.com"
            required
            disabled={isLoading}
          />
          <Input
            name="password"
            type="password"
            placeholder="password123"
            required
            disabled={isLoading}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar com Email e Senha"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Não tem uma conta?{" "}
            <a
              href="/auth/signup"
              className="text-blue-600 hover:text-blue-500"
            >
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

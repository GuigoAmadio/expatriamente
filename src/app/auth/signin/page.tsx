"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import {
  extractErrorMessage,
  getErrorType,
  testErrorExtraction,
} from "@/lib/error-utils";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import React from "react"; // Added missing import for React

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  // Teste temporário
  React.useEffect(() => {
    testErrorExtraction();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setFormError("");

    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      // Validações básicas
      if (!email || !password) {
        setFormError("Por favor, preencha todos os campos");
        return;
      }

      if (!email.includes("@")) {
        setFormError("Por favor, insira um email válido");
        return;
      }

      const result = await login(email, password);

      if (!result.success) {
        console.log("🔍 [signin] Login failed, result:", result);
        const errorMessage = extractErrorMessage(result.error);
        console.log("🔍 [signin] Extracted error message:", errorMessage);
        const errorType = getErrorType(result.error);

        setFormError(errorMessage);
        showToast({
          type: errorType,
          title: "Erro no Login",
          message: errorMessage,
        });
      } else {
        showToast({
          type: "success",
          title: "Login Realizado",
          message: "Redirecionando para o dashboard...",
        });
      }
    } catch (error) {
      console.log("🔍 [signin] Exception caught:", error);
      const errorMessage = extractErrorMessage(error);
      console.log(
        "🔍 [signin] Extracted error message from exception:",
        errorMessage
      );
      setFormError(errorMessage);
      showToast({
        type: "error",
        title: "Erro Inesperado",
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card Principal */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-pink-500 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Link>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-2xl">🧠</span>
              </motion.div>

              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
                Bem-vindo de volta
              </h1>
              <p className="text-gray-600 mt-2">
                Entre com suas credenciais para continuar
              </p>
            </div>
          </div>

          {/* Formulário */}
          <motion.form
            action={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Campo Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  name="email"
                  type="email"
                  placeholder="admin@expatriamente.com"
                  required
                  disabled={isLoading}
                  className="!pl-10 !h-12 !bg-white/70 !border-gray-200 focus:!border-pink-400 focus:!ring-pink-400/20 !text-gray-900 !placeholder-gray-500"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="!pl-10 !pr-10 !h-12 !bg-white/70 !border-gray-200 focus:!border-pink-400 focus:!ring-pink-400/20 !text-gray-900 !placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Mensagem de Erro */}
            {formError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-sm text-red-600">{formError}</p>
              </motion.div>
            )}

            {/* Botão de Login */}
            <Button
              type="submit"
              className="!w-full !h-12 !bg-gradient-to-r !from-pink-400 !to-rose-500 hover:!from-pink-500 hover:!to-rose-600 !text-white !font-semibold !rounded-xl !shadow-lg hover:!shadow-xl !transition-all !duration-300"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </motion.form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link
                href="/auth/signup"
                className="text-pink-500 hover:text-pink-600 font-medium transition-colors"
              >
                Cadastre-se
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

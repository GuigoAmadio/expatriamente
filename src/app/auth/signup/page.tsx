"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { registerAction } from "@/actions/auth";
import { useToast } from "@/components/ui/Toast";
import { extractErrorMessage, getErrorType } from "@/lib/error-utils";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setFormError("");
    setSuccess("");

    try {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      // Validações básicas
      if (!name || !email || !password || !confirmPassword) {
        setFormError("Todos os campos são obrigatórios");
        return;
      }

      if (name.length < 2) {
        setFormError("O nome deve ter pelo menos 2 caracteres");
        return;
      }

      if (!email.includes("@")) {
        setFormError("Por favor, insira um email válido");
        return;
      }

      if (password.length < 6) {
        setFormError("A senha deve ter pelo menos 6 caracteres");
        return;
      }

      if (password !== confirmPassword) {
        setFormError("As senhas não coincidem");
        return;
      }

      const result = await registerAction({
        name,
        email,
        password,
      });

      if (result.success) {
        setSuccess("Conta criada com sucesso! Redirecionando para login...");
        showToast({
          type: "success",
          title: "Conta Criada",
          message: "Sua conta foi criada com sucesso!",
        });
        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      } else {
        const errorMessage = extractErrorMessage(result.message);
        const errorType = getErrorType(result);

        setFormError(errorMessage);
        showToast({
          type: errorType,
          title: "Erro no Cadastro",
          message: errorMessage,
        });
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-[#7bb3f0]/20 flex items-center justify-center p-4">
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
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#7bb3f0] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Link>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-r from-[#7bb3f0] to-[#5a9bd4] rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-2xl">✨</span>
              </motion.div>

              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7bb3f0] to-[#5a9bd4] bg-clip-text text-transparent">
                Criar Conta
              </h1>
              <p className="text-gray-600 mt-2">Junte-se à nossa comunidade</p>
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
            {/* Campo Nome */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  name="name"
                  type="text"
                  placeholder="Seu nome completo"
                  required
                  disabled={isLoading}
                  className="!pl-10 !h-12 !bg-white/70 !border-gray-200 focus:!border-[#7bb3f0] focus:!ring-[#7bb3f0]/20 !text-gray-900 !placeholder-gray-500"
                />
              </div>
            </div>

            {/* Campo Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  disabled={isLoading}
                  className="!pl-10 !h-12 !bg-white/70 !border-gray-200 focus:!border-[#7bb3f0] focus:!ring-[#7bb3f0]/20 !text-gray-900 !placeholder-gray-500"
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
                  placeholder="Mínimo 6 caracteres"
                  required
                  disabled={isLoading}
                  className="!pl-10 !pr-10 !h-12 !bg-white/70 !border-gray-200 focus:!border-[#7bb3f0] focus:!ring-[#7bb3f0]/20 !text-gray-900 !placeholder-gray-500"
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

            {/* Campo Confirmar Senha */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  required
                  disabled={isLoading}
                  className="!pl-10 !pr-10 !h-12 !bg-white/70 !border-gray-200 focus:!border-[#7bb3f0] focus:!ring-[#7bb3f0]/20 !text-gray-900 !placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
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

            {/* Mensagem de Sucesso */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm text-green-600">{success}</p>
              </motion.div>
            )}

            {/* Botão de Cadastro */}
            <Button
              type="submit"
              className="!w-full !h-12 !bg-gradient-to-r !from-[#7bb3f0] !to-[#5a9bd4] hover:!from-[#5a9bd4] hover:!to-[#4a88c7] !text-white !font-semibold !rounded-xl !shadow-lg hover:!shadow-xl !transition-all !duration-300"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar Conta"}
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
              Já tem uma conta?{" "}
              <Link
                href="/auth/signin"
                className="text-[#7bb3f0] hover:text-[#5a9bd4] font-medium transition-colors"
              >
                Faça login
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

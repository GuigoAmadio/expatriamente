"use client";

import { useEffect, useState } from "react";
import { checkFirstTimeAccess } from "@/actions/auth";
import ForceCredentialsModal from "./ForceCredentialsModal";
import { BackendUser } from "@/types/backend";

interface FirstTimeCheckProps {
  user: BackendUser;
  children: React.ReactNode;
}

export default function FirstTimeCheck({
  user,
  children,
}: FirstTimeCheckProps) {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const result = await checkFirstTimeAccess();
        setIsFirstTime(result.isFirstTime);
      } catch (error) {
        console.error("Erro ao verificar primeira vez:", error);
        setIsFirstTime(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkFirstTime();
  }, []);

  const handleCredentialsUpdated = () => {
    setIsFirstTime(false);
    // Aguardar um pouco para garantir que o cache seja atualizado
    setTimeout(() => {
      // Recarregar a página para atualizar o contexto
      window.location.reload();
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Verificando configurações...</p>
        </div>
      </div>
    );
  }

  if (isFirstTime) {
    return (
      <ForceCredentialsModal user={user} onSuccess={handleCredentialsUpdated} />
    );
  }

  return <>{children}</>;
}

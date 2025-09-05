"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SettingsCard } from "@/components/profile/SettingsCard";
import { User } from "@/types";
import { getAuthUser } from "@/actions/auth";

export default function EmployeeSettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getAuthUser();
        if (currentUser && currentUser.role === "EMPLOYEE") {
          setUser(currentUser);
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleSaveSettings = (settings: any) => {
    // Implementar lógica de salvamento das configurações
    console.log("Configurações salvas:", settings);
    // Aqui você pode fazer uma chamada para a API para salvar as configurações
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-stone-200 rounded w-1/4 mb-6"></div>
          <div className="h-96 bg-stone-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-4">
            Configurações não encontradas
          </h1>
          <p className="text-stone-600">
            Não foi possível carregar as configurações.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#453706] mb-2">
            Configurações
          </h1>
          <p className="text-stone-600">
            Personalize sua experiência e gerencie suas preferências
          </p>
        </div>

        <SettingsCard
          title="Configurações Gerais"
          onSave={handleSaveSettings}
        />

        {/* Configurações específicas do Employee */}
        <div className="card-elevated p-6 mt-6">
          <h2 className="text-xl font-semibold text-[#453706] mb-6">
            Configurações Profissionais
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#453706] mb-4">
                Disponibilidade
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-stone-700">
                      Notificações de Agendamentos
                    </label>
                    <p className="text-xs text-stone-500">
                      Receber notificações quando novos agendamentos forem
                      criados
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-stone-700">
                      Lembretes de Sessões
                    </label>
                    <p className="text-xs text-stone-500">
                      Receber lembretes antes das sessões agendadas
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#453706] mb-4">
                Preferências de Trabalho
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Fuso Horário
                  </label>
                  <select className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm">
                    <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                    <option value="America/New_York">Nova York (GMT-5)</option>
                    <option value="Europe/London">Londres (GMT+0)</option>
                    <option value="Europe/Paris">Paris (GMT+1)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Duração Padrão das Sessões (minutos)
                  </label>
                  <select className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm">
                    <option value="30">30 minutos</option>
                    <option value="45">45 minutos</option>
                    <option value="50">50 minutos</option>
                    <option value="60">60 minutos</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

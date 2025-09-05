"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SettingsCard } from "@/components/profile/SettingsCard";
import { User } from "@/types";
import { getAuthUser } from "@/actions/auth";

export default function AdminSettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getAuthUser();
        if (
          currentUser &&
          (currentUser.role === "ADMIN" || currentUser.role === "SUPER_ADMIN")
        ) {
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
            administrativas
          </p>
        </div>

        <SettingsCard
          title="Configurações Gerais"
          onSave={handleSaveSettings}
        />

        {/* Configurações específicas do Admin */}
        <div className="card-elevated p-6 mt-6">
          <h2 className="text-xl font-semibold text-[#453706] mb-6">
            Configurações Administrativas
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#453706] mb-4">
                Notificações Administrativas
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-stone-700">
                      Notificações de Novos Usuários
                    </label>
                    <p className="text-xs text-stone-500">
                      Receber notificações quando novos usuários se cadastrarem
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-stone-700">
                      Notificações de Problemas
                    </label>
                    <p className="text-xs text-stone-500">
                      Receber notificações sobre problemas no sistema
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-stone-700">
                      Relatórios Semanais
                    </label>
                    <p className="text-xs text-stone-500">
                      Receber relatórios semanais de atividade
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
                Configurações de Segurança
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-stone-700">
                      Log de Atividades
                    </label>
                    <p className="text-xs text-stone-500">
                      Manter log detalhado de todas as atividades
                      administrativas
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-stone-700">
                      Aprovação de Ações Críticas
                    </label>
                    <p className="text-xs text-stone-500">
                      Exigir confirmação para ações administrativas críticas
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Configurações específicas para Super Admin */}
            {user.role === "SUPER_ADMIN" && (
              <div>
                <h3 className="text-lg font-semibold text-[#453706] mb-4">
                  Configurações do Sistema
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-stone-700">
                        Manutenção do Sistema
                      </label>
                      <p className="text-xs text-stone-500">
                        Permitir acesso ao modo de manutenção
                      </p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-stone-200 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-stone-700">
                        Backup Automático
                      </label>
                      <p className="text-xs text-stone-500">
                        Executar backups automáticos do sistema
                      </p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Intervalo de Backup (horas)
                    </label>
                    <select className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm">
                      <option value="6">6 horas</option>
                      <option value="12">12 horas</option>
                      <option value="24">24 horas</option>
                      <option value="48">48 horas</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

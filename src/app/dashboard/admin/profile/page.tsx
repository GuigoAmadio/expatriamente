"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { User } from "@/types";
import { getAuthUser } from "@/actions/auth";

export default function AdminProfilePage() {
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
        console.error("Erro ao carregar perfil:", error);
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleEdit = () => {
    router.push("/dashboard/admin/profile/edit");
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-stone-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-stone-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-4">
            Perfil não encontrado
          </h1>
          <p className="text-stone-600">
            Não foi possível carregar as informações do perfil.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#453706] mb-2">Meu Perfil</h1>
          <p className="text-stone-600">
            Visualize e gerencie suas informações pessoais
          </p>
        </div>

        <ProfileCard
          title="Informações Pessoais"
          user={user}
          onEdit={handleEdit}
          showSystemInfo={true}
        />

        {/* Informações específicas do Admin */}
        <div className="card-elevated p-6 mt-6">
          <h2 className="text-xl font-semibold text-[#453706] mb-4">
            Informações Administrativas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Nível de Acesso
              </label>
              <div className="text-stone-900 font-medium">
                {user.role === "SUPER_ADMIN"
                  ? "Super Administrador"
                  : "Administrador"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Permissões
              </label>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Gerenciar Usuários
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Gerenciar Agendamentos
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Relatórios
                </span>
                {user.role === "SUPER_ADMIN" && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    Configurações do Sistema
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas Administrativas */}
        <div className="card-elevated p-6 mt-6">
          <h2 className="text-xl font-semibold text-[#453706] mb-4">
            Estatísticas Administrativas
          </h2>
          <div className="text-stone-500 text-center py-8">
            <div className="text-lg font-medium mb-2">Em desenvolvimento</div>
            <div className="text-sm">
              Dashboard com estatísticas administrativas será implementado em
              breve...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

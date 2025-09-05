"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { getAuthUser } from "@/actions/auth";
import { User } from "@/types";

export default function EmployeeProfilePage() {
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
        console.error("Erro ao carregar perfil:", error);
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleEdit = () => {
    router.push("/dashboard/employee/profile/edit");
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
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { getAuthUser } from "@/actions/auth";
import { EmployeeScheduleManager } from "@/components/dashboard/EmployeeScheduleManager";
import { ScheduleProvider } from "@/context/ScheduleContext";
import { Calendar } from "lucide-react";

export default function EmployeeSchedulePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getAuthUser();
        console.log(" [SchedulePage] Usuário completo:", currentUser);
        console.log("🔧 [SchedulePage] Role:", currentUser?.role);
        console.log("🔧 [SchedulePage] EmployeeId:", currentUser?.employeeId);
        console.log(
          "🔧 [SchedulePage] EmployeeId type:",
          typeof currentUser?.employeeId
        );

        if (currentUser && currentUser.role === "EMPLOYEE") {
          setUser(currentUser);
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Erro ao carregar horários:", error);
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

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

  if (!user || user === undefined) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-4">
            Horários não encontrados
          </h1>
          <p className="text-stone-600">
            Não foi possível carregar as informações dos horários.
          </p>
        </div>
      </div>
    );
  }

  console.log("🔧 [EmployeeSchedulePage] User:", user);
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-[#a8b093] bg-opacity-10 rounded-xl flex items-center justify-center mr-4">
            <Calendar className="h-6 w-6 text-[#a8b093]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#ba9e3e]">
              Horários Semanais
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Configure sua disponibilidade para cada dia da semana
            </p>
          </div>
        </div>

        <ScheduleProvider>
          <EmployeeScheduleManager employeeId={user?.employeeId || ""} />
        </ScheduleProvider>
      </div>
    </div>
  );
}

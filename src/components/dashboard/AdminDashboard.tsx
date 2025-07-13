"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/actions/dashboard";
import { DashboardStats, DashboardStatsResponse } from "@/types/backend";

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await getDashboardStats();
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Receita Mensal
              </p>
              <p className="text-2xl font-bold text-gray-900">
                R$ {stats?.mainMetrics.monthlyRevenue?.toLocaleString() || "0"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100">
              <span className="text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Agendamentos Hoje
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.today.count || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-yellow-100">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Produtos
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.overview.totalProducts || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-red-100">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Produtos com Baixo Estoque
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.overview.lowStockProducts || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Agendamentos de Hoje
          </h3>
          <div className="space-y-3">
            {stats?.todayAppointments?.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {appointment.user?.name || "Cliente"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {appointment.service?.name || "Serviço"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(appointment.startTime).toLocaleTimeString(
                      "pt-BR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{appointment.status}</p>
                </div>
              </div>
            )) || (
              <p className="text-gray-500 text-center py-4">
                Nenhum agendamento para hoje
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Produtos Mais Vendidos
          </h3>
          <div className="space-y-3">
            {stats?.topSellingProducts?.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 mr-2">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">
                      {product.name || "Produto"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {product.quantity || 0} vendidos
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  R$ {product.revenue?.toLocaleString() || "0"}
                </p>
              </div>
            )) || (
              <p className="text-gray-500 text-center py-4">
                Nenhum produto vendido ainda
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

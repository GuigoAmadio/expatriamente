"use client";

import React from "react";
import { ServiceStats as ServiceStatsType } from "@/actions/services";
import {
  FiActivity,
  FiDollarSign,
  FiTrendingUp,
  FiSettings,
  FiCalendar,
} from "react-icons/fi";

interface ServiceStatsProps {
  stats: ServiceStatsType;
  loading?: boolean;
}

export function ServiceStats({ stats, loading }: ServiceStatsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const statCards = [
    {
      title: "Total de Serviços",
      value: stats.totalServices,
      icon: FiSettings,
      color: "blue",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Serviços Ativos",
      value: stats.activeServices,
      icon: FiActivity,
      color: "green",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Receita Total",
      value: formatCurrency(stats.totalRevenue),
      icon: FiDollarSign,
      color: "purple",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      title: "Agendamentos",
      value: stats.totalAppointments,
      icon: FiCalendar,
      color: "orange",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Card adicional para informações extras */}
      <div className="md:col-span-2 lg:col-span-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Resumo de Performance
            </h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Preço Médio:</span>
                <span className="ml-2">
                  {formatCurrency(stats.averagePrice)}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Mais Popular:</span>
                <span className="ml-2">{stats.mostBookedService}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Taxa de Ativação:</span>
                <span className="ml-2">
                  {stats.totalServices > 0
                    ? Math.round(
                        (stats.activeServices / stats.totalServices) * 100
                      )
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <FiTrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Performance Geral</p>
          </div>
        </div>
      </div>
    </div>
  );
}

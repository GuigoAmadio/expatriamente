"use client";

import React from "react";
import { Service } from "@/types/backend";
import { motion } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiClock,
  FiDollarSign,
  FiToggleLeft,
  FiToggleRight,
  FiCalendar,
} from "react-icons/fi";
import Button from "@/components/ui/Button";

interface ServiceCardProps {
  service: Service;
  role: "ADMIN" | "EMPLOYEE" | "CLIENT";
  onEdit?: (service: Service) => void;
  onDelete?: (service: Service) => void;
  onView?: (service: Service) => void;
  onToggleStatus?: (service: Service) => void;
  onBook?: (service: Service) => void;
}

export function ServiceCard({
  service,
  role,
  onEdit,
  onDelete,
  onView,
  onToggleStatus,
  onBook,
}: ServiceCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0
      ? `${hours}h ${mins > 0 ? `${mins}min` : ""}`
      : `${mins}min`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 ${
        !service.isActive ? "opacity-75 bg-gray-50" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {service.name}
          </h3>
          {service.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {service.description}
            </p>
          )}
        </div>

        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            service.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {service.isActive ? "Ativo" : "Inativo"}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <FiClock className="w-4 h-4 mr-1" />
          <span className="text-sm">{formatDuration(service.duration)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiDollarSign className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">
            {formatPrice(Number(service.price))}
          </span>
        </div>
        {role !== "CLIENT" && (
          <div className="flex items-center text-gray-600">
            <FiCalendar className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {(service as any)._count?.appointments || 0} agendamentos
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {role === "ADMIN" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit?.(service)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <FiEdit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleStatus?.(service)}
                className={
                  service.isActive
                    ? "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                    : "text-green-600 hover:text-green-700 hover:bg-green-50"
                }
              >
                {service.isActive ? (
                  <FiToggleRight className="w-4 h-4" />
                ) : (
                  <FiToggleLeft className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete?.(service)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <FiTrash2 className="w-4 h-4" />
              </Button>
            </>
          )}
          {role === "EMPLOYEE" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView?.(service)}
              className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            >
              <FiEye className="w-4 h-4" />
            </Button>
          )}
        </div>

        {role === "CLIENT" && service.isActive && (
          <Button variant="primary" size="sm" onClick={() => onBook?.(service)}>
            Agendar
          </Button>
        )}

        {role === "CLIENT" && !service.isActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView?.(service)}
            className="text-gray-600"
          >
            Ver Detalhes
          </Button>
        )}
      </div>
    </motion.div>
  );
}

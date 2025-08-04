"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToasts } from "@/components/ui/Toast";
import { createClient } from "@/actions/clients";
import {
  FiSave,
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiCheckCircle,
} from "react-icons/fi";

interface CreateClientData {
  name: string;
  email: string;
  phone?: string;
  status: "ACTIVE" | "INACTIVE";
}

export default function NewClientPage() {
  const [formData, setFormData] = useState<CreateClientData>({
    name: "",
    email: "",
    phone: "",
    status: "ACTIVE",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToasts();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      addToast({
        type: "error",
        message: "Nome e email são obrigatórios",
      });
      return;
    }

    try {
      setLoading(true);

      const newClient = await createClient(formData);

      if (newClient) {
        addToast({
          type: "success",
          message: "Cliente criado com sucesso!",
        });
        router.push("/dashboard/admin/clients");
      }
    } catch (error: any) {
      console.error("Erro ao criar cliente:", error);
      addToast({
        type: "error",
        message: error.message || "Erro ao criar cliente",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
          >
            <FiArrowLeft />
            Voltar
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Novo Cliente</h1>
        </div>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiUser className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Informações Básicas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors"
                  placeholder="Nome completo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors"
                  placeholder="email@exemplo.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors"
                >
                  <option value="ACTIVE">Ativo</option>
                  <option value="INACTIVE">Inativo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Criando...
                </>
              ) : (
                <>
                  <FiSave />
                  Criar Cliente
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

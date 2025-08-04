"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToasts, Toast } from "@/components/ui/Toast";
import { Client } from "@/types/backend";
import { getClientById, updateClient } from "@/actions/clients";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const { toasts, addToast } = useToasts();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [client, setClient] = useState<Client | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const clientId = params.id as string;
        const clientData = await getClientById(clientId);
        console.log("clientData", clientData);
        if (clientData) {
          setClient(clientData);
          setFormData({
            name: clientData.name || "",
            email: clientData.email || "",
            phone: clientData.phone || "",
            status: clientData.status || "ACTIVE",
          });
        } else {
          addToast({
            message: "Cliente não encontrado.",
            type: "error",
          });
          router.push("/dashboard/admin/clients");
        }
      } catch (error) {
        console.error("Erro ao carregar cliente:", error);
        addToast({
          message: "Erro ao carregar dados do cliente.",
          type: "error",
        });
        router.push("/dashboard/admin/clients");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchClient();
    }
  }, [params.id, addToast, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const clientId = params.id as string;
      const updateData = {
        ...formData,
      };

      console.log("📦 Dados sendo enviados:", updateData);

      await updateClient(clientId, updateData);

      addToast({
        type: "success",
        message: "Cliente atualizado com sucesso.",
      });
      router.push("/dashboard/admin/clients");
    } catch (error: any) {
      console.error("Erro ao atualizar cliente:", error);
      addToast({
        type: "error",
        message: error.message || "Erro ao atualizar cliente.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Editar Cliente</h1>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 cursor-pointer transition-colors"
          >
            ← Voltar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiUser className="w-5 h-5" />
              Informações Básicas
            </h2>
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

          {/* Informações do Sistema */}
          {client && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiUser className="w-5 h-5" />
                Informações do Sistema
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID do Cliente
                  </label>
                  <input
                    type="text"
                    value={client.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Criação
                  </label>
                  <input
                    type="text"
                    value={new Date(client.createdAt).toLocaleDateString(
                      "pt-BR"
                    )}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Última Atualização
                  </label>
                  <input
                    type="text"
                    value={new Date(client.updatedAt).toLocaleDateString(
                      "pt-BR"
                    )}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status Atual
                  </label>
                  <div className="flex items-center gap-2">
                    {client.status === "ACTIVE" ? (
                      <FiCheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <FiXCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        client.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {client.status === "ACTIVE" ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer transition-colors"
            >
              {saving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>

      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}

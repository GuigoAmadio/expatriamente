"use client";

import { useState, useEffect } from "react";
import { useToasts } from "@/components/ui/Toast";
import { Client } from "@/types/backend";
import AdminClientsListNew from "./AdminClientsListNew";
import { deleteClient } from "@/actions/clients";

interface AdminClientsListClientProps {
  clients: Client[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  loading: boolean;
  error: string | null;
}

export default function AdminClientsListClient({
  clients,
  meta,
  loading,
  error,
}: AdminClientsListClientProps) {
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentStatusFilter, setCurrentStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { addToast } = useToasts();

  const handleSearchChange = (term: string) => {
    setCurrentSearchTerm(term);
    setCurrentPage(1); // Reset para primeira página ao buscar
  };

  const handleStatusFilterChange = (status: string) => {
    setCurrentStatusFilter(status);
    setCurrentPage(1); // Reset para primeira página ao filtrar
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectClient = (client: Client) => {
    // Aqui você pode adicionar lógica adicional quando um cliente é selecionado
    console.log("Cliente selecionado:", client);
  };

  const handleEditClient = (client: Client): Promise<boolean> => {
    // Recarregar a página para atualizar a lista após editar
    window.location.reload();
    return Promise.resolve(true);
  };

  const handleDeleteClient = async (id: string): Promise<boolean> => {
    // Recarregar a página para atualizar a lista após deletar
    try {
      const result = await deleteClient(id);
      if (result) {
        window.location.reload();
      } else {
        alert("Erro ao cancelar agendamento");
      }
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
      alert("Erro ao cancelar agendamento");
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  };

  return (
    <AdminClientsListNew
      clients={clients}
      meta={meta}
      loading={loading}
      error={error}
      searchTerm={currentSearchTerm}
      statusFilter={currentStatusFilter}
      onSearchChange={handleSearchChange}
      onStatusFilterChange={handleStatusFilterChange}
      onPageChange={handlePageChange}
      onSelectClient={handleSelectClient}
      onEditClient={handleEditClient}
      onClientDeleted={handleDeleteClient}
    />
  );
}

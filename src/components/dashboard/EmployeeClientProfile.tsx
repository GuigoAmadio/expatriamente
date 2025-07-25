"use client";
import { BackendUser } from "@/types/backend";

interface EmployeeClientProfileProps {
  client: BackendUser;
}

export function EmployeeClientProfile({ client }: EmployeeClientProfileProps) {
  if (!client) {
    return <div className="p-6">Cliente não encontrado.</div>;
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Perfil do Cliente</h1>
      <div className="bg-white rounded shadow p-4 mb-6">
        <span className="font-semibold">{client.name}</span>
        <span className="block text-sm text-gray-500">{client.email}</span>
        {/* Outras infos relevantes */}
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Notas das Sessões</h2>
        {/* Placeholder para notas */}
        <div className="text-gray-500">Sistema de notas em breve...</div>
      </div>
    </div>
  );
}

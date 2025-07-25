"use client";
import { BackendUser } from "@/types/backend";
import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import { FixedSizeList as List } from "react-window";

interface EmployeeClientsListProps {
  clients: BackendUser[];
}

export function EmployeeClientsList({ clients }: EmployeeClientsListProps) {
  const router = useRouter();

  const onSelectClient = useCallback(
    (client: BackendUser) => {
      router.push(`/dashboard/employee/clients/${client.id}`);
    },
    [router]
  );

  const onEditClient = useCallback(
    (client: BackendUser) => {
      router.push(`/dashboard/employee/clients/${client.id}/edit`);
    },
    [router]
  );

  const onDeleteClient = useCallback((id: string) => {
    // Implementar lógica de exclusão
    console.log(`Excluir cliente com ID: ${id}`);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meus Clientes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            Nenhum cliente encontrado.
          </div>
        ) : (
          <List
            height={400}
            itemCount={clients.length}
            itemSize={56}
            width="100%"
            style={{ minWidth: "100%" }}
          >
            {({ index, style }) => {
              const client = clients[index];
              return (
                <tr
                  key={client.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onSelectClient(client)}
                  style={style}
                >
                  {/* Renderize as células da linha conforme já está no seu código */}
                  <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {client.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditClient(client);
                      }}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClient(client.id);
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            }}
          </List>
        )}
      </div>
    </div>
  );
}

import { getClientsByEmployee } from "@/actions/clients";
import { EmployeeClientsList } from "@/components/dashboard/EmployeeClientsList";
import { getAuthUser } from "@/actions/auth";
import { RefreshButton } from "@/components/ui/RefreshButton";

export default async function EmployeeClientsPage() {
  const user = await getAuthUser();
  const result = user ? await getClientsByEmployee(user.id) : { data: [] };
  const clients = result.data || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Meus Clientes</h1>
        <RefreshButton clearAllCache={true} className="ml-auto">
          🔄 Atualizar Clientes
        </RefreshButton>
      </div>
      <EmployeeClientsList clients={clients} />
    </div>
  );
}

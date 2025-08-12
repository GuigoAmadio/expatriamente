import { getClientsByEmployee } from "@/actions/clients";
import { EmployeeClientsList } from "@/components/dashboard/EmployeeClientsList";
import { getAuthUser } from "@/actions/auth";
import { RefreshButton } from "@/components/ui/RefreshButton";

export default async function EmployeeClientsPage() {
  const user = await getAuthUser();
  const result = user
    ? await getClientsByEmployee(user?.employeeId || "")
    : { data: [] };
  const clients = result.data || [];

  return (
    <div className="">
      <EmployeeClientsList clients={clients} />
    </div>
  );
}

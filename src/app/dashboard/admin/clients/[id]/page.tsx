import { getClientById } from "@/actions/clients";
import { EmployeeClientProfile } from "@/components/dashboard/EmployeeClientProfile";

export default async function ClientDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  // Busca server-side dos detalhes do cliente
  const client = await getClientById(id);
  if (!client) return <div>Cliente não encontrado</div>;
  return <EmployeeClientProfile client={client} showEdit />;
}

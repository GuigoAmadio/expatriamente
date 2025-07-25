import { getUsers } from "@/actions/users";
import { EmployeeClientProfile } from "@/components/dashboard/EmployeeClientProfile";

export default async function ClientDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  // Busca server-side dos detalhes do cliente
  const { data: clients } = await getUsers({ id });
  const client =
    Array.isArray(clients) && clients.length > 0 ? clients[0] : null;
  if (!client) return <div>Cliente não encontrado</div>;
  return <EmployeeClientProfile client={client} />;
}

import { getClientById } from "@/actions/clients";
import { EmployeeClientProfile } from "@/components/dashboard/EmployeeClientProfile";
import { notFound } from "next/navigation";

export default async function EmployeeClientProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const client = await getClientById(id);
  if (!client) return notFound();

  return <EmployeeClientProfile client={client} />;
}

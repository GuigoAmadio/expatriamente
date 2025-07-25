import { getClientById } from "@/actions/clients";
import { EmployeeClientProfile } from "@/components/dashboard/EmployeeClientProfile";
import { notFound } from "next/navigation";

export default async function EmployeeClientProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const result = await getClientById(id);
  if (!result.success || !result.data) return notFound();
  // Se result.data não for BackendUser, ajuste aqui ou converta para o tipo esperado
  return <EmployeeClientProfile client={result.data as any} />;
}

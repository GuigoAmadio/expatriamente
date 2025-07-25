import { getEmployee } from "@/actions/employees";
import EmployeeProfile from "@/components/dashboard/EmployeeProfile";
import type { Employee } from "@/types/backend";

function isEmployee(obj: any): obj is Employee {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "name" in obj &&
    "email" in obj
  );
}

export default async function EmployeeDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  // Busca server-side dos detalhes do funcionário
  const result = await getEmployee(id);
  if (
    !result ||
    (typeof result === "object" &&
      "success" in result &&
      (!result.success || !("data" in result) || !result.data))
  ) {
    return <div>Funcionário não encontrado</div>;
  }
  // Se for Employee direto
  if (result && !("success" in result) && isEmployee(result)) {
    return <EmployeeProfile employee={result} />;
  }
  // Se for objeto com .data
  if (
    result &&
    typeof result === "object" &&
    "data" in result &&
    isEmployee(result.data)
  ) {
    return <EmployeeProfile employee={result.data} />;
  }
  return <div>Funcionário não encontrado</div>;
}

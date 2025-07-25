import { Employee } from "@/types/backend";
export default function EmployeeProfile({ employee }: { employee: Employee }) {
  return (
    <div>
      <h1>Perfil do Funcionário</h1>
      <pre>{JSON.stringify(employee, null, 2)}</pre>
    </div>
  );
}

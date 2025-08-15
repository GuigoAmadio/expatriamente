import { getEmployeesWithMeta } from "@/actions/employees";
import AdminEmployeesListClient from "@/components/dashboard/AdminEmployeesListClient";

export default async function AdminEmployeesPage(props: {
  searchParams: Promise<Record<string, any>>;
}) {
  const searchParams = await props.searchParams;

  try {
    const { data: employees, meta } = await getEmployeesWithMeta();

    // Garantir que employees seja sempre um array
    const employeesArray = Array.isArray(employees) ? employees : [];

    const loading = false;
    const error = null;
    const searchTerm = searchParams?.search || "";
    const statusFilter = searchParams?.status || "";

    return (
      <AdminEmployeesListClient
        employees={employeesArray}
        meta={meta}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      />
    );
  } catch (error) {
    console.error("Erro ao carregar funcionários:", error);

    return (
      <AdminEmployeesListClient
        employees={[]}
        meta={{
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
        }}
        loading={false}
        error="Erro ao carregar funcionários"
        searchTerm=""
        statusFilter=""
      />
    );
  }
}

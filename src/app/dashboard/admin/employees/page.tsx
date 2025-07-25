import { getEmployees } from "@/actions/employees";
import AdminEmployeesListClient from "@/components/dashboard/AdminEmployeesListClient";

export default async function AdminEmployeesPage(props: {
  searchParams: Promise<Record<string, any>>;
}) {
  const searchParams = await props.searchParams;
  const resp = await getEmployees(searchParams);
  const employees =
    resp && resp.success && "data" in resp && Array.isArray(resp.data)
      ? resp.data
      : [];
  const meta =
    resp && resp.success && "resumo" in resp && resp.resumo
      ? resp.resumo
      : {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
        };
  const loading = false;
  const error = null;
  const searchTerm = searchParams?.search || "";
  const statusFilter = searchParams?.status || "";
  return (
    <AdminEmployeesListClient
      employees={employees}
      meta={meta}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
    />
  );
}

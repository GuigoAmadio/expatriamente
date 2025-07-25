import { getAppointments } from "@/actions/appointments";
import AdminAppointmentsListClient from "@/components/dashboard/AdminAppointmentsListClient";

export default async function AdminAppointmentsPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  // searchParams já é passado pelo App Router
  const params: Record<string, any> = {};
  for (const key in searchParams) {
    const value = searchParams[key];
    params[key] = Array.isArray(value) ? value[0] : value;
  }
  const { data: appointments, meta: rawMeta } = await getAppointments(params);
  const metaDefaults = {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  };
  const meta = { ...metaDefaults, ...rawMeta };
  const loading = false;
  const error = null;
  const searchTerm = params?.search || "";
  const statusFilter = params?.status || "";
  return (
    <AdminAppointmentsListClient
      appointments={appointments}
      meta={meta}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
    />
  );
}

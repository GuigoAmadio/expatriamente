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
  // Garante que buscamos a semana atual por padrão, para alimentar o calendário
  // sem depender de filtragem client-side sobre uma lista paginada pequena
  const baseDate = params.date ? new Date(params.date as string) : new Date();
  const weekStart = new Date(baseDate);
  weekStart.setDate(baseDate.getDate() - baseDate.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 20);

  const toLocalYMD = (d: Date) =>
    `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d
      .getDate()
      .toString()
      .padStart(2, "0")}`;

  const queryParams = {
    ...params,
    startDate: params.startDate || toLocalYMD(weekStart),
    endDate: params.endDate || toLocalYMD(weekEnd),
    // Aumenta o limite para garantir que todos os itens da semana venham
    limit: params.limit ? Number(params.limit) : 1000,
    page: params.page ? Number(params.page) : 1,
    orderBy: params.orderBy || "startTime",
    orderDirection: params.orderDirection || "asc",
  };

  const { data: appointments, meta: rawMeta } = await getAppointments(
    queryParams
  );
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

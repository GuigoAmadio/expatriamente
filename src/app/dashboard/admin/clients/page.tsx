import { getUsers } from "@/actions/users";
import AdminClientsListClient from "@/components/dashboard/AdminClientsListClient";

export default async function AdminClientsPage(props: {
  searchParams: Promise<Record<string, any>>;
}) {
  const searchParams = await props.searchParams;
  const { data: clients, meta: rawMeta } = await getUsers(searchParams);
  const metaDefaults = {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  };
  const meta = { ...metaDefaults, ...rawMeta };
  return (
    <AdminClientsListClient
      clients={clients}
      meta={meta}
      loading={false}
      error={null}
      searchTerm={searchParams?.search || ""}
      statusFilter={searchParams?.status || "all"}
      roleFilter={searchParams?.role || "all"}
    />
  );
}

import { getClients } from "@/actions/clients";
import AdminClientsListClient from "@/components/dashboard/AdminClientsListClient";

export default async function AdminClientsPage(props: {
  searchParams: Promise<Record<string, any>>;
}) {
  const searchParams = await props.searchParams;

  try {
    const response = await getClients({
      page: parseInt(searchParams?.page || "1"),
      limit: parseInt(searchParams?.limit || "10"),
      search: searchParams?.search || "",
      status: searchParams?.status || "all",
    });

    if (!response) {
      return (
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="text-red-800">
                <p className="font-medium">Erro ao carregar clientes</p>
                <p className="text-sm">Nenhuma resposta do servidor</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const { data: clients, meta } = response;

    // Validar se clients é um array
    const clientsArray = Array.isArray(clients) ? clients : [];

    console.log("📦 Clientes carregados:", clientsArray.length);
    console.log("📦 Meta:", meta);

    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        </div>

        <AdminClientsListClient
          clients={clientsArray}
          meta={meta}
          loading={false}
          error={null}
        />
      </div>
    );
  } catch (error) {
    console.error("❌ Erro ao carregar clientes:", error);

    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        </div>

        <AdminClientsListClient
          clients={[]}
          meta={{
            page: 1,
            limit: 10,
            totalItems: 0,
            totalPages: 1,
            hasNext: false,
            hasPrevious: false,
          }}
          loading={false}
          error={error instanceof Error ? error.message : "Erro desconhecido"}
        />
      </div>
    );
  }
}

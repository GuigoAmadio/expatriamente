import { getAuthUser } from "@/actions/auth";
import { getPsicanalistaById, getAgendamentosByPsicanalista } from "@/actions/psicanalistas";
import { getServicesByEmployee } from "@/actions/users";
import CreateAppointmentClient from "@/components/dashboard/CreateAppointmentClient";
import { RoleGuard } from "@/components/guards/RoleGuard";
import { redirect } from "next/navigation";

interface CreateAppointmentPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CreateAppointmentPage({
  searchParams,
}: CreateAppointmentPageProps) {
  const resolvedSearchParams = await searchParams;
  const psychologistId = resolvedSearchParams.psychologistId as string;

  if (!psychologistId) {
    redirect("/dashboard/client/psychologists");
  }

  const user = await getAuthUser();
  if (!user) {
    redirect("/auth/signin");
  }

  // Buscar dados do psicanalista
  const psychologist = await getPsicanalistaById(psychologistId);
  if (!psychologist) {
    redirect("/dashboard/client/psychologists");
  }

  // Buscar agendamentos disponíveis
  const availableSlots = await getAgendamentosByPsicanalista(psychologistId);

  // Buscar serviços do psicanalista
  const servicesResp = await getServicesByEmployee(psychologistId);
  const services = servicesResp.success ? servicesResp.data || [] : [];

  return (
    <RoleGuard allowedRoles={["CLIENT"]}>
      <div className="min-h-screen bg-white p-4 sm:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <a
              href="/dashboard/client/psychologists"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Voltar aos Psicanalistas
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header com informações do psicanalista */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-6">
              <div className="flex items-center gap-4">
                {psychologist.image ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img
                      src={psychologist.image}
                      alt={psychologist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                    {psychologist.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Agendar Consulta
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Com {psychologist.name}
                  </p>
                  {psychologist.specialty && (
                    <p className="text-sm text-blue-600 font-medium mt-1">
                      {psychologist.specialty}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Componente de criação de agendamento */}
            <div className="p-6">
              <CreateAppointmentClient
                psychologist={psychologist}
                availableSlots={availableSlots}
                services={services}
                currentUser={user}
              />
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}

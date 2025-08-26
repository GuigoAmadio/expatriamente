import { getAgendamentosByPsicanalista } from "@/actions/psicanalistas";
import { getPsicanalistaById } from "@/actions/psicanalistas";
import PsicAppointmentClient from "@/components/landing/PsicAppointmentClient";
import PsicanalistaPageWrapper from "@/components/landing/PsicanalistaPageWrapper";
// import psicanalistasMockup from "@/psicanalistas.json";
import { Header } from "@/components/ui";

// Tipo esperado pelo componente PsicAppointmentClient
interface AppointmentClientFormat {
  data: string;
  horarios: string[];
}

export default async function PsicanalistaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Buscar dados do psicanalista
  const psicanalista = await getPsicanalistaById(id);
  if (!psicanalista) {
    return <div>Psicanalista não encontrado</div>;
  }

  // Buscar agendamentos disponíveis
  const agendamentos = await getAgendamentosByPsicanalista(id);

  // Converter para o formato esperado pelo componente
  const appointmentsFormatted: AppointmentClientFormat[] = agendamentos.map(
    (appointment) => ({
      data: appointment.data,
      horarios: appointment.horarios,
    })
  );

  return (
    <PsicanalistaPageWrapper
      psychologistId={id}
      psychologistName={psicanalista.name}
    >
      <div className="min-h-screen bg-[#A6C0B3] w-full">
        <Header backgroundColor="#A6C0B3" textColor="#495443" />
        <div className="w-full">
          {/* Container único: perfil + tópicos + calendário */}
          <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-[1500px] mx-auto mt-8">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col gap-2 border-b border-gray-200 mb-6">
                {/* Foto circular à esquerda */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-br from-[#A6C0B3] to-[#9ca995] overflow-hidden">
                      <img
                        src={psicanalista.image}
                        alt={psicanalista.name}
                        className="w-full h-full rounded-full object-cover"
                        style={{ aspectRatio: "1 / 1" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Tópicos simples à direita */}
                <div className="flex-1 text-center">
                  <h1 className="font-akzidens text-2xl font-bold text-[#5b7470] mb-2">
                    {psicanalista.name}
                  </h1>
                  <p className="text-[#987b6b] font-medium mb-1">
                    {psicanalista.specialty}
                  </p>
                </div>
              </div>
            </div>
            <PsicAppointmentClient
              appointments={appointmentsFormatted}
              employeeId={id}
              serviceId="d542a142-6884-4b1f-be00-7c47887ad544"
              psychologist={{
                id: psicanalista.id,
                name: psicanalista.name,
                specialty: psicanalista.specialty,
                image: psicanalista.image,
              }}
            />
          </div>
        </div>
      </div>
    </PsicanalistaPageWrapper>
  );
}

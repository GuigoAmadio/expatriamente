import { getAgendamentosByPsicanalista } from "@/actions/psicanalistas";
import { getPsicanalistaById } from "@/actions/psicanalistas";
import PsicAppointmentClient from "@/components/landing/PsicAppointmentClient";
import PsicanalistaPageWrapper from "@/components/landing/PsicanalistaPageWrapper";
import psicanalistasMockup from "@/psicanalistas.json";
import { Header } from "@/components/ui";

// Tipo esperado pelo componente PsicAppointmentClient
interface AppointmentClientFormat {
  data: string;
  horarios: string[];
}

export default async function PsicanalistaPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

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
      <div className="min-h-screen bg-gradient-to-br from-[#A6C0B3] to-[#85A899]">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-center mb-8">
                <img
                  src={psicanalista.image}
                  alt={psicanalista.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-8"
                />
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {psicanalista.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-2">
                    {psicanalista.specialty}
                  </p>
                  <p className="text-gray-500">{psicanalista.bio}</p>
                </div>
              </div>

              <PsicAppointmentClient
                appointments={appointmentsFormatted}
                employeeId={id}
                serviceId="1" // ID do serviço de psicanálise
              />
            </div>
          </div>
        </div>
      </div>
    </PsicanalistaPageWrapper>
  );
}

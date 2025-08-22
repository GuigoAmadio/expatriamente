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
        <Header backgroundColor="#A6C0B3" textColor="#4F200D" />
        <div className="w-full">
          {/* Container único: perfil + tópicos + calendário */}
          <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-[1500px] mx-auto mt-8">
            <div className="flex flex-col md:flex-row items-center justify-around">
              <div className="flex flex-col lg:flex-row gap-8 border-b border-gray-200 pb-6 mb-6">
                {/* Foto circular à esquerda */}
                <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
                  <div className="relative mb-4">
                    <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-br from-[#A6C0B3] to-[#9ca995] overflow-hidden">
                      <img
                        src={psicanalista.image}
                        alt={psicanalista.name}
                        className="w-full h-full rounded-full object-cover"
                        style={{ aspectRatio: "1 / 1" }}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#9dc9e2] rounded-full flex items-center justify-center shadow-md">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Tópicos simples à direita */}
                <div className="flex-1 lg:pl-4">
                  <h1 className="font-akzidens text-2xl font-bold text-[#5b7470] mb-2">
                    {psicanalista.name}
                  </h1>
                  <p className="text-[#987b6b] font-medium mb-1">
                    {psicanalista.specialty}
                  </p>
                  <p className="text-[#6B3F1D]/80 text-sm mb-4">
                    10 anos na área
                  </p>
                </div>
              </div>
              <div>
                {" "}
                <ul className="list-disc pl-6 space-y-2 text-[#6B3F1D]">
                  {psicanalista.education
                    ?.split("\n")
                    .slice(0, 3)
                    .map((formacao, i) => (
                      <li key={`form-${i}`}>
                        Formação {i + 1}: {formacao}
                      </li>
                    ))}
                  <li>Modalidade: Sessões online via videochamada</li>
                  <li>Investimento: {psicanalista.price}</li>
                  <li>Disponibilidade: Segunda a Sexta, 9h às 18h</li>
                </ul>
              </div>
            </div>
            <PsicAppointmentClient
              appointments={appointmentsFormatted}
              employeeId={id}
              serviceId="98796135-93a4-4063-9e09-0821f71e69e1"
            />
          </div>
        </div>
      </div>
    </PsicanalistaPageWrapper>
  );
}

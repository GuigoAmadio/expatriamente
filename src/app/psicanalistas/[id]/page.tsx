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
      <div className="min-h-screen bg-[#A6C0B3] w-full">
        <Header />
        <div className="w-full px-4 py-8">
          <div className="w-full flex flex-col items-center">
            {/* Card Principal - Design mais suave e harmonioso */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-8 mb-8 w-full max-w-4xl">
              {/* Layout mais equilibrado */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Foto circular à esquerda */}
                <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
                  <div className="relative mb-4">
                    <div className="w-36 h-36 rounded-full p-1 bg-gradient-to-br from-[#A6C0B3] to-[#9ca995]">
                      <img
                        src={psicanalista.image}
                        alt={psicanalista.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#9dc9e2] rounded-full flex items-center justify-center shadow-md">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Informações à direita - Layout mais limpo */}
                <div className="flex-1">
                  {/* Cabeçalho com nome e experiência */}
                  <div className="mb-6 pb-4 border-b border-[#A6C0B3]/30">
                    <h1 className="font-akzidens text-2xl font-bold text-[#5b7470] mb-2">
                      {psicanalista.name}
                    </h1>
                    <p className="text-[#987b6b] font-medium mb-1">
                      {psicanalista.specialty}
                    </p>
                    <p className="text-[#6B3F1D]/80 text-sm">10 anos na área</p>
                  </div>

                  {/* Informações organizadas em duas colunas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Coluna 1 - Formação Acadêmica */}
                    <div className="space-y-4">
                      {psicanalista.education ? (
                        psicanalista.education.split('\n').slice(0, 3).map((formacao, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-[#f8f6f2]/50 rounded-xl">
                            <div className="w-6 h-6 bg-[#9dc9e2]/80 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                            </div>
                            <div>
                              <h3 className="font-akzidens font-semibold text-[#5b7470] text-sm mb-1">
                                Formação {idx + 1}
                              </h3>
                              <p className="text-[#6B3F1D]/70 text-sm leading-relaxed">
                                {formacao}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-start gap-3 p-3 bg-[#f8f6f2]/50 rounded-xl">
                          <div className="w-6 h-6 bg-[#9dc9e2]/80 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          </div>
                          <div>
                            <h3 className="font-akzidens font-semibold text-[#5b7470] text-sm mb-1">
                              Formação
                            </h3>
                            <p className="text-[#6B3F1D]/70 text-sm leading-relaxed">
                              Psicanalista Clínico
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Coluna 2 */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-[#f8f6f2]/50 rounded-xl">
                        <div className="w-6 h-6 bg-[#e4ded2]/80 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2.5 h-2.5 bg-[#987b6b] rounded-full"></div>
                        </div>
                        <div>
                          <h3 className="font-akzidens font-semibold text-[#5b7470] text-sm mb-1">
                            Modalidade
                          </h3>
                          <p className="text-[#6B3F1D]/70 text-sm leading-relaxed">
                            Sessões online via videochamada
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-[#f8f6f2]/50 rounded-xl">
                        <div className="w-6 h-6 bg-[#A6C0B3]/80 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <h3 className="font-akzidens font-semibold text-[#5b7470] text-sm mb-1">
                            Investimento
                          </h3>
                          <p className="text-[#6B3F1D]/70 text-sm leading-relaxed">
                            {psicanalista.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-[#f8f6f2]/50 rounded-xl">
                        <div className="w-6 h-6 bg-[#9dc9e2]/60 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <h3 className="font-akzidens font-semibold text-[#5b7470] text-sm mb-1">
                            Disponibilidade
                          </h3>
                          <p className="text-[#6B3F1D]/70 text-sm leading-relaxed">
                            Segunda a Sexta, 9h às 18h
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção de Agendamento - Mais larga */}
            <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-[1500px]">
              <div className="text-center mb-8">
                <h2 className="font-akzidens text-2xl font-bold text-[#5b7470] mb-3">
                  Selecione seu horário
                </h2>
                <p className="text-[#6B3F1D] text-sm">
                  Clique em um horário disponível para agendar sua sessão
                </p>
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

import { getAgendamentosByPsicanalista } from "@/actions/psicanalistas";
import { getPsicanalistaById } from "@/actions/psicanalistas";
import PsicAppointmentClient from "@/components/landing/PsicAppointmentClient";
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

  // Buscar dados do psicanalista (tenta servidor primeiro, depois mockup)
  let employee = await getPsicanalistaById(id);

  // Se não encontrou no servidor, buscar no mockup
  if (!employee) {
    const mockupData = psicanalistasMockup.find(
      (p) => p.nome.replace(/\s+/g, "-").toLowerCase() === id
    );

    if (mockupData) {
      employee = {
        id: mockupData.nome.replace(/\s+/g, "-").toLowerCase(),
        name: mockupData.nome,
        specialty: "Psicanalista Clínico",
        categories: [],
        experience: mockupData.observacoes || "",
        rating: 5,
        price: "",
        location: "Online",
        languages: ["Português"],
        bio: mockupData.observacoes || "",
        education: "",
        approach: "",
        availability: mockupData.horarios
          ? mockupData.horarios.join(", ")
          : "Horários não disponíveis",
        image: mockupData.foto || "/user-placeholder.svg",
      };
    }
  }

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Psicanalista não encontrado</p>
      </div>
    );
  }

  // Buscar appointments do psicanalista (com fallback para mockup)
  const appointmentsRaw = await getAgendamentosByPsicanalista(id);
  const appointmentsArray: AppointmentClientFormat[] = Array.isArray(
    appointmentsRaw
  )
    ? appointmentsRaw
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Faixa horizontal com informações do psicanalista */}
      <div className="w-full bg-white shadow-sm border-b border-gray-200 mt-24">
        <div className="w-full px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 px-10">
            {/* Foto do psicanalista */}
            <div className="flex-shrink-0">
              <img
                src={employee.image}
                alt={employee.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
              />
            </div>

            {/* Informações pessoais */}
            <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-12">
              {/* Coluna 1: Informações básicas */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {employee.name}
                </h1>
                <p className="text-xl text-blue-600 font-semibold mb-3">
                  {employee.specialty}
                </p>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Idiomas:</span>{" "}
                    {employee.languages.join(", ")}
                  </p>
                  <p>
                    <span className="font-medium">Localização:</span>{" "}
                    {employee.location || "Online"}
                  </p>
                  <p>
                    <span className="font-medium">Avaliação:</span> ⭐⭐⭐⭐⭐ (
                    {employee.rating}/5)
                  </p>
                </div>
              </div>

              {/* Coluna 2: Experiência e formação */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Experiência e Formação
                </h3>
                <div className="text-gray-600 space-y-2">
                  <p className="text-sm leading-relaxed">{employee.bio}</p>
                  {employee.education && (
                    <p className="text-sm">
                      <span className="font-medium">Formação:</span>{" "}
                      {employee.education}
                    </p>
                  )}
                  {employee.approach && (
                    <p className="text-sm">
                      <span className="font-medium">Abordagem:</span>{" "}
                      {employee.approach}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de agendamento */}
      <div className="px-4 py-8">
        <div className="w-5/6 mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Agende sua sessão
          </h2>

          {/* Calendário */}
          <div className="mb-8">
            <PsicAppointmentClient
              appointments={appointmentsArray}
              employeeId={id}
              serviceId="f5bcee0e-7efb-438e-99c8-9cc495778a93"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

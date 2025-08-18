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
        <div className="w-full px-4 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-10">
            {/* Foto do psicanalista */}
            <div className="flex-shrink-0">
              <img
                src={employee.image}
                alt={employee.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
              />
            </div>

            {/* Informações pessoais */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-12">
              {/* Coluna 1: Informações básicas */}
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {employee.name}
                </h1>
                <p className="text-lg sm:text-xl text-blue-600 font-semibold mb-3">
                  {employee.specialty}
                </p>
                <div className="space-y-1 sm:space-y-2 text-gray-600 text-sm sm:text-base">
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
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                  Experiência e Formação
                </h3>
                <div className="text-gray-600 space-y-1 sm:space-y-2">
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {employee.bio}
                  </p>
                  {employee.education && (
                    <p className="text-xs sm:text-sm">
                      <span className="font-medium">Formação:</span>{" "}
                      {employee.education}
                    </p>
                  )}
                  {employee.approach && (
                    <p className="text-xs sm:text-sm">
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
      <div className="px-4 py-6 sm:py-8">
        <div className="w-full sm:w-5/6 lg:w-[97%] xl:w-5/6 mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            Agende sua sessão
          </h2>

          {/* Calendário */}
          <div className="mb-6 sm:mb-8">
            <PsicAppointmentClient
              appointments={appointmentsArray}
              employeeId={id}
              serviceId="f3571a6a0-a48b-4e26-87c4-6828b91f4d75"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

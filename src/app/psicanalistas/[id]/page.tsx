import { getAgendamentosByPsicanalista } from "@/actions/users";
import { getServicesByEmployee } from "@/actions/users";
import { getEmployeeById } from "@/actions/users";
import PsicAppointmentClient from "@/components/landing/PsicAppointmentClient";
import type {
  Service,
  Employee,
  Appointment as BackendAppointment,
} from "@/types/backend";

function isService(obj: any): obj is Service {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "name" in obj &&
    "price" in obj
  );
}
function isEmployee(obj: any): obj is Employee {
  return (
    obj &&
    typeof obj === "object" &&
    "id" in obj &&
    "name" in obj &&
    "email" in obj
  );
}
function isAppointments(arr: any): arr is BackendAppointment[] {
  return (
    Array.isArray(arr) &&
    (arr.length === 0 || (arr[0] && "id" in arr[0] && "startTime" in arr[0]))
  );
}

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
  const employee = await getEmployeeById(id);
  if (!isEmployee(employee)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Psicanalista não encontrado</p>
      </div>
    );
  }

  // Buscar serviços do psicanalista
  const services = await getServicesByEmployee(id);
  const servicesArray = Array.isArray(services)
    ? services.filter(isService)
    : [];
  if (!servicesArray.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">
          Nenhum serviço disponível para este psicanalista
        </p>
      </div>
    );
  }

  // Usar o primeiro serviço como padrão
  const defaultService = servicesArray[0];
  if (!isService(defaultService)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">
          Serviço inválido para este psicanalista
        </p>
      </div>
    );
  }

  // Buscar appointments do psicanalista
  const appointmentsRaw = await getAgendamentosByPsicanalista(id);
  const appointmentsArray: AppointmentClientFormat[] = isAppointments(
    appointmentsRaw
  )
    ? appointmentsRaw.map((apt) => ({
        data: apt.startTime
          ? new Date(apt.startTime).toISOString().split("T")[0]
          : "",
        horarios: [
          apt.startTime
            ? new Date(apt.startTime).toISOString().split("T")[1]?.slice(0, 5)
            : "",
        ],
      }))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Agende sua sessão
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            com {employee.name}
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {defaultService.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {defaultService.description}
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              R$ {defaultService.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <PsicAppointmentClient
            appointments={appointmentsArray}
            employeeId={id}
            serviceId={defaultService.id}
          />
        </div>
      </div>
    </div>
  );
}

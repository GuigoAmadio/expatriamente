import { get } from "@/lib/api-client";
import type { Appointment, EmployeesResponse } from "@/types/backend";

interface AgendamentoPsicanalista {
  data: string;
  horarios: string[];
}

export async function getPsicanalistaById(id: string) {
  // Busca real no backend
  try {
    const response = await get<any>(`/employees/${id}`);
    if (!response.success || !response.data) return null;
    const emp = response.data?.data;
    // Adaptar para o formato esperado pela página
    const result = {
      id: emp.id,
      name: emp.name,
      specialty: emp.position,
      categories: [],
      experience: emp.description || "",
      rating: 5,
      price: emp.description?.match(/R\$\s*([\d,.]+)/)?.[0] || "",
      location: emp.client?.name || "",
      languages: ["Português"],
      bio: emp.description || "",
      education: "",
      approach: "",
      availability: emp.workingHours ? JSON.stringify(emp.workingHours) : "",
      image: emp.avatar || "",
    };
    return result;
  } catch (e) {
    return null;
  }
}

export async function getAgendamentosByPsicanalista(employeeId: string) {
  // Busca real dos agendamentos do backend
  try {
    const response = await get<{ data: Appointment[] }>(
      `/appointments?employeeId=${employeeId}`
    );
    if (
      !response.success ||
      !response.data ||
      !Array.isArray(response.data.data)
    )
      return [];
    // Agrupar agendamentos por data
    const agendamentosPorData: Record<string, string[]> = {};
    response.data.data.forEach((apt) => {
      const dateObj = new Date(apt.startTime);
      const data = dateObj.toISOString().split("T")[0];
      const hora =
        dateObj.getUTCHours().toString().padStart(2, "0") +
        ":" +
        dateObj.getUTCMinutes().toString().padStart(2, "0");
      if (!agendamentosPorData[data]) agendamentosPorData[data] = [];
      agendamentosPorData[data].push(hora);
    });
    const resultado = Object.entries(agendamentosPorData).map(
      ([data, horarios]) => ({ data, horarios })
    );
    return resultado;
  } catch (e) {
    return [];
  }
}

export async function getPsicanalistas() {
  try {
    const response = await get<EmployeesResponse>(`/employees`);
    const employees =
      response.data && Array.isArray((response.data as any).data?.data)
        ? (response.data as any).data.data
        : [];
    if (!response.success || !employees.length) return [];
    const mapped = employees.map((emp: any) => ({
      id: emp.id,
      name: emp.name,
      specialty: emp.position,
      categories: [],
      experience: emp.description || "",
      rating: 5,
      price: "",
      location: "",
      languages: ["Português"],
      bio: emp.description || "",
      education: "",
      approach: "",
      availability: emp.workingHours ? JSON.stringify(emp.workingHours) : "",
      image: emp.avatar || "",
    }));
    return mapped;
  } catch (e) {
    console.error("[getPsicanalistas] Erro ao buscar psicanalistas:", e);
    return [];
  }
}

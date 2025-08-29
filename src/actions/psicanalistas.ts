import { get } from "@/lib/api-client";
import type { Appointment, EmployeesResponse } from "@/types/backend";
import psicanalistasMockup from "@/psicanalistas.json";
import formacaoData from "@/data/psicanalistas-formacao.json";

interface AgendamentoPsicanalista {
  data: string;
  horarios: string[];
}

// Função para mapear dados mockup para o formato esperado
function mapMockupToPsychologist(mockupData: any) {
  // Buscar informações de formação correspondentes
  const formacaoInfo = formacaoData.find((f) => f.nome === mockupData.nome);

  // Criar as 3 linhas de formação para o card
  const formacaoForCard = formacaoInfo
    ? formacaoInfo.formacao
        .slice(0, 3)
        .map((item) => {
          // Separar faculdade e curso com " - "
          return item;
        })
        .join("\n")
    : "Formação não especificada";

  return {
    id: mockupData.nome.replace(/\s+/g, "-").toLowerCase(), // Criar ID baseado no nome
    name: mockupData.nome,
    specialty: "Psicanalista Clínico",
    categories: [],
    experience: mockupData.observacoes || "",
    rating: 5,
    price: "",
    location: "",
    languages: ["Português"],
    bio: formacaoForCard, // Usar informações de formação em vez das observações
    education: formacaoInfo?.formacao.join("\n") || "",
    approach: "",
    availability: mockupData.horarios
      ? mockupData.horarios.join(", ")
      : "Horários não disponíveis",
    image: mockupData.foto || "/user-placeholder.svg",
    observacoes: mockupData.observacoes || "", // Manter observações originais
    notas: formacaoInfo?.notas || "", // Adicionar notas de formação
  };
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
    // Fallback para dados mockup
    console.warn(
      "[getPsicanalistaById] Servidor não disponível, usando dados mockup"
    );
    const mockupData = psicanalistasMockup.find(
      (p) => p.nome.replace(/\s+/g, "-").toLowerCase() === id
    );
    return mockupData ? mapMockupToPsychologist(mockupData) : null;
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
    // Fallback para horários mockup
    console.warn(
      "[getAgendamentosByPsicanalista] Servidor não disponível, usando horários mockup"
    );

    // Encontrar o psicanalista pelo ID (nome convertido)
    const mockupData = psicanalistasMockup.find(
      (p) => p.nome.replace(/\s+/g, "-").toLowerCase() === employeeId
    );

    if (mockupData && mockupData.horarios && mockupData.horarios.length > 0) {
      // Converter horários mockup para o formato esperado
      const horariosFormatados = mockupData.horarios
        .map((horario) => {
          // Extrair apenas o horário do formato "2a - 8:00, 10:00, 16:00 e 19:30"
          const horarios = horario
            .replace(/^[^0-9]*/, "")
            .split(/[, e]+/)
            .map((h) => h.trim());
          return horarios.filter((h) => h.match(/^\d{1,2}:\d{2}/));
        })
        .flat();

      // Criar datas para os próximos 30 dias com os horários disponíveis
      const agendamentos = [];
      const hoje = new Date();

      for (let i = 0; i < 30; i++) {
        const data = new Date(hoje);
        data.setDate(hoje.getDate() + i);

        // Verificar se é um dia da semana que o psicanalista atende
        const diaSemana = data.getDay(); // 0 = domingo, 1 = segunda, etc.
        const diasAtendimento = mockupData.horarios.some((horario) => {
          if (horario.includes("2a") && diaSemana === 1) return true;
          if (horario.includes("3a") && diaSemana === 2) return true;
          if (horario.includes("4a") && diaSemana === 3) return true;
          if (horario.includes("5a") && diaSemana === 4) return true;
          if (horario.includes("6a") && diaSemana === 5) return true;
          if (horario.includes("Sábado") && diaSemana === 6) return true;
          return false;
        });

        if (diasAtendimento) {
          const dataStr = data.toISOString().split("T")[0];
          agendamentos.push({
            data: dataStr,
            horarios: horariosFormatados,
          });
        }
      }

      return agendamentos;
    }

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
    if (!response.success || !employees.length) {
      throw new Error("Nenhum funcionário encontrado no servidor");
    }
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
    // Fallback para dados mockup quando servidor não está disponível
    console.warn(
      "[getPsicanalistas] Servidor não disponível, usando dados mockup:",
      e
    );

    // Filtrar apenas psicanalistas que aceitaram o convite
    const psicanalistasAtivos = psicanalistasMockup.filter(
      (p) => p.convite === "Sim"
    );

    // Mapear dados mockup para o formato esperado
    const mapped = psicanalistasAtivos.map(mapMockupToPsychologist);

    console.log(
      "[getPsicanalistas] Usando",
      mapped.length,
      "psicanalistas mockup"
    );
    return mapped;
  }
}

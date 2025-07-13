export async function getPsicanalistaById(id: string) {
  // Simula busca em banco/API
  const mock = {
    id: 4,
    name: "Dr. João Oliveira",
    specialty: "Adolescentes",
    categories: ["Desenvolvimento", "Ansiedade e Depressão"],
    experience: "10 anos",
    rating: 4.7,
    price: "R$ 110",
    location: "Belo Horizonte, MG",
    languages: ["Português"],
    bio: "Psicólogo especializado no atendimento de adolescentes e jovens adultos. Experiência em questões de identidade e desenvolvimento.",
    education: "Mestrado em Psicologia do Desenvolvimento - UFMG",
    approach: "Terapia Humanística",
    availability: "Seg-Sex: 14h às 22h",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
  };
  return mock;
}

export async function getAgendamentosByPsicanalista(id: string) {
  // Simula busca de agendamentos
  return [
    { data: "2024-07-01", horarios: ["14:00", "15:00", "18:00"] },
    { data: "2024-07-02", horarios: ["16:00", "17:00"] },
    { data: "2024-07-03", horarios: ["14:00", "15:00"] },
  ];
}

"use client";

import { useState, useMemo } from "react";
import { Pagination } from "@/components/ui/Pagination";

interface Psychologist {
  id: string;
  name: string;
  specialty?: string;
  image?: string;
  description?: string;
  availability?: {
    days?: string[];
    hours?: string[];
  };
}

interface PsychologistListProps {
  psychologists: Psychologist[];
}

export default function PsychologistList({
  psychologists,
}: PsychologistListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 12;

  // Dias da semana para filtro
  const daysOfWeek = [
    { value: "segunda", label: "Segunda-feira" },
    { value: "terca", label: "Terça-feira" },
    { value: "quarta", label: "Quarta-feira" },
    { value: "quinta", label: "Quinta-feira" },
    { value: "sexta", label: "Sexta-feira" },
    { value: "sabado", label: "Sábado" },
    { value: "domingo", label: "Domingo" },
  ];

  // Horários para filtro
  const timeSlots = [
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "12:00", label: "12:00" },
    { value: "13:00", label: "13:00" },
    { value: "14:00", label: "14:00" },
    { value: "15:00", label: "15:00" },
    { value: "16:00", label: "16:00" },
    { value: "17:00", label: "17:00" },
    { value: "18:00", label: "18:00" },
  ];

  // Filtrar psicólogos
  const filteredPsychologists = useMemo(() => {
    return psychologists.filter((psych) => {
      // Filtro por nome
      const matchesSearch =
        searchTerm === "" ||
        psych.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (psych.specialty &&
          psych.specialty.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filtro por dia
      const matchesDay =
        selectedDay === "" ||
        (psych.availability?.days &&
          psych.availability.days.includes(selectedDay));

      // Filtro por horário
      const matchesHour =
        selectedHour === "" ||
        (psych.availability?.hours &&
          psych.availability.hours.includes(selectedHour));

      return matchesSearch && matchesDay && matchesHour;
    });
  }, [psychologists, searchTerm, selectedDay, selectedHour]);

  // Calcular paginação
  const totalPages = Math.ceil(filteredPsychologists.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPsychologists = filteredPsychologists.slice(
    startIndex,
    endIndex
  );

  // Resetar página quando filtros mudam
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  if (!psychologists.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
        <div className="text-gray-500 mb-4">
          <svg
            className="w-16 h-16 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Nenhum psicanalista encontrado
        </h3>
        <p className="text-gray-500">
          Não há psicanalistas disponíveis no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
          Filtros
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Busca */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Nome ou especialidade..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleFilterChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filtro por dia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dia da semana
            </label>
            <select
              value={selectedDay}
              onChange={(e) => {
                setSelectedDay(e.target.value);
                handleFilterChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os dias</option>
              {daysOfWeek.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por horário */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horário
            </label>
            <select
              value={selectedHour}
              onChange={(e) => {
                setSelectedHour(e.target.value);
                handleFilterChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os horários</option>
              {timeSlots.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
          </div>

          {/* Limpar filtros */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedDay("");
                setSelectedHour("");
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 text-gray-600 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Psicanalistas ({filteredPsychologists.length})
          </h3>
          {filteredPsychologists.length !== psychologists.length && (
            <span className="text-sm text-gray-500">
              {filteredPsychologists.length} de {psychologists.length}{" "}
              resultados
            </span>
          )}
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {currentPsychologists.map((psych) => (
            <div
              key={psych.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col h-full"
            >
              {/* Imagem - Tamanho fixo */}
              <div className="flex justify-center mb-4">
                {psych.image ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-100 flex-shrink-0">
                    <img
                      src={psych.image}
                      alt={psych.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {psych.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Informações - Flex grow para ocupar espaço */}
              <div className="flex flex-col flex-grow">
                {/* Nome - Altura fixa */}
                <div className="text-center mb-2 min-h-[2.5rem] flex items-center justify-center">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
                    {psych.name}
                  </h4>
                </div>

                {/* Especialidade - Altura fixa */}
                <div className="text-center mb-3 min-h-[1.5rem] flex items-center justify-center">
                  {psych.specialty && (
                    <p className="text-xs sm:text-sm text-blue-600 font-medium">
                      {psych.specialty}
                    </p>
                  )}
                </div>

                {/* Descrição - Altura fixa */}
                <div className="text-center mb-4 min-h-[3rem] flex items-center justify-center">
                  {psych.description && (
                    <p
                      className="text-xs sm:text-sm text-gray-600 overflow-hidden text-ellipsis"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {psych.description}
                    </p>
                  )}
                </div>

                {/* Disponibilidade - Altura fixa */}
                <div className="text-center mb-4 min-h-[2rem] flex items-center justify-center">
                  {psych.availability && (
                    <div className="text-xs text-gray-500">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {psych.availability.days?.slice(0, 3).map((day) => (
                          <span
                            key={day}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                          >
                            {daysOfWeek.find((d) => d.value === day)?.label ||
                              day}
                          </span>
                        ))}
                        {psych.availability.days &&
                          psych.availability.days.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                              +{psych.availability.days.length - 3}
                            </span>
                          )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Botão - Altura fixa e alinhado na parte inferior */}
                <div className="mt-auto pt-4">
                  <a
                    href={`/dashboard/client/appointments/create?psychologistId=${psych.id}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    📅 Agendar Consulta
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              totalItems={filteredPsychologists.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

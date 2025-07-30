import { useMemo, useState } from "react";

interface Appointment {
  data: string; // yyyy-mm-dd
  horarios: string[];
}

const DIAS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];
const HORAS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

function getDiaSemana(dateStr: string) {
  return new Date(dateStr).getDay();
}

export default function Calendar({
  appointments,
  onSelect,
}: {
  appointments: Appointment[];
  onSelect?: (dia: number, hora: string) => void;
}) {
  const agendados = useMemo(() => {
    const map: Record<number, Record<string, boolean>> = {};
    appointments.forEach((a) => {
      const dia = getDiaSemana(a.data);
      if (!map[dia]) map[dia] = {};
      a.horarios.forEach((h) => {
        map[dia][h] = true;
      });
    });
    return map;
  }, [appointments]);

  const [selecionado, setSelecionado] = useState<{
    dia: number;
    hora: string;
  } | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
      <table className="w-full border-separate border-spacing-y-2 border-spacing-x-0">
        <thead>
          <tr>
            <th className="bg-transparent text-gray-800 font-medium text-sm font-akzidens">
              Hora
            </th>
            {DIAS.map((dia, i) => (
              <th
                key={dia}
                className="bg-transparent text-gray-800 font-medium text-sm font-akzidens"
              >
                {dia}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HORAS.map((hora) => (
            <tr key={hora}>
              <td className="bg-transparent text-gray-800 font-semibold px-2 py-2 text-left text-base font-akzidens">
                {hora}
              </td>
              {DIAS.map((_, diaIdx) => {
                const isMarcado = agendados[diaIdx]?.[hora];
                const isSelecionado =
                  selecionado &&
                  selecionado.dia === diaIdx &&
                  selecionado.hora === hora;
                return (
                  <td
                    key={diaIdx}
                    className={`px-0 py-0 text-center transition-all duration-200 cursor-pointer align-middle`}
                  >
                    <div
                      className={`rounded-lg flex items-center justify-center h-8 w-32 text-xs md:text-sm font-akzidens select-none border
                        ${
                          isMarcado
                            ? "bg-gray-200 text-gray-500 font-semibold opacity-70 border-gray-200"
                            : isSelecionado
                            ? "bg-blue-500 text-white font-bold border-blue-500"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }
                      `}
                      onClick={() => {
                        if (!isMarcado) {
                          setSelecionado({ dia: diaIdx, hora });
                          onSelect?.(diaIdx, hora);
                        }
                      }}
                    >
                      {isMarcado
                        ? "Ocupado"
                        : isSelecionado
                        ? "Selecionado"
                        : "Disponível"}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

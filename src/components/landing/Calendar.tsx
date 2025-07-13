import { useMemo, useState } from "react";

interface Agendamento {
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
  agendamentos,
  onSelect,
}: {
  agendamentos: Agendamento[];
  onSelect?: (dia: number, hora: string) => void;
}) {
  const agendados = useMemo(() => {
    const map: Record<number, Record<string, boolean>> = {};
    agendamentos.forEach((a) => {
      const dia = getDiaSemana(a.data);
      if (!map[dia]) map[dia] = {};
      a.horarios.forEach((h) => {
        map[dia][h] = true;
      });
    });
    return map;
  }, [agendamentos]);

  const [selecionado, setSelecionado] = useState<{
    dia: number;
    hora: string;
  } | null>(null);

  return (
    <div className="overflow-x-auto w-full bg-white rounded-2xl shadow-2xl p-4 md:p-8">
      <table className="w-full border-separate border-spacing-y-2 border-spacing-x-0">
        <thead>
          <tr>
            <th className="bg-transparent text-[#01386F] font-medium text-sm font-akzidens">
              Hora
            </th>
            {DIAS.map((dia, i) => (
              <th
                key={dia}
                className="bg-transparent text-[#01386F] font-medium  text-sm font-akzidens"
              >
                {dia}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HORAS.map((hora) => (
            <tr key={hora}>
              <td className="bg-transparent text-[#01386F] font-semibold px-2 py-2 text-left text-base font-akzidens">
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
                      className={`rounded-xl flex items-center justify-center h-10 w-40 text-xs md:text-sm font-akzidens select-none
                        ${
                          isMarcado
                            ? "bg-[#b7c8b1] text-[#01386F] font-semibold opacity-70"
                            : isSelecionado
                            ? "bg-[#13b955]/90 text-white font-bold"
                            : "bg-[#f6f8f7] text-[#01386F] group hover:bg-[#e6f4fa] hover:opacity-90"
                        }
                        group relative`}
                      onClick={() => {
                        if (!isMarcado) {
                          setSelecionado({ dia: diaIdx, hora });
                          onSelect?.(diaIdx, hora);
                        }
                      }}
                    >
                      {isMarcado ? (
                        <span className="opacity-60">Indisponível</span>
                      ) : isSelecionado ? (
                        <span className="opacity-100 font-bold">Marcado</span>
                      ) : (
                        <span className="opacity-40 hidden group-hover:inline">
                          Marcar
                        </span>
                      )}
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

import {
  getPsicanalistaById,
  getAgendamentosByPsicanalista,
} from "@/actions/psicanalistas";
import { notFound } from "next/navigation";
import PsicAgendamentoClient from "@/components/landing/PsicAgendamentoClient";
import Header from "@/components/ui/Header";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const psicanalista = await getPsicanalistaById(id);
  if (!psicanalista) return notFound();

  const agendamentos = await getAgendamentosByPsicanalista(id);

  return (
    <>
      <Header backgroundColor="white" />
      <div className="min-h-screen bg-white flex flex-col items-center py-0 px-0">
        <div className="w-full flex flex-col md:flex-row items-center justify-between px-20 py-8 mt-20">
          {/* Esquerda: foto e dados pessoais */}
          <div className="flex flex-row items-center gap-6">
            <img
              src={psicanalista.image}
              alt={psicanalista.name}
              className="w-32 h-32 rounded-full object-cover border-2 border-[#01386F]"
            />
            <div>
              <h1 className="font-akzidens text-3xl text-[#01386F] font-bold mb-1">
                {psicanalista.name}
              </h1>
              <div className="text-base text-[#6B3F1D] mb-2">
                {psicanalista.availability}
              </div>
              <div className="flex flex-row flex-wrap gap-2">
                {psicanalista.languages.map((lang: string) => (
                  <span
                    key={lang}
                    className="bg-[#b7c8b1] text-[#01386F] rounded px-2 py-1 text-xs font-semibold"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Direita: informações profissionais */}
          <div className="flex items-end gap-1 max-w-2xl">
            <div className="text-base text-[#01386F] mb-1">
              {psicanalista.bio}
            </div>
            <ul className="text-sm text-[#5a5427] mb-1 list-disc list-inside">
              <li>{psicanalista.education}</li>
              <li>{psicanalista.approach}</li>
            </ul>
          </div>
        </div>
        <div className="w-full max-w-5xl border-b border-[#b7c8b1] my-0 mx-auto" />
        <div className="w-full max-w-7xl flex flex-col items-center px-2 mt-8">
          <h2 className="font-akzidens text-2xl text-[#01386F] font-bold mb-4">
            Agenda do Profissional
          </h2>
          <PsicAgendamentoClient agendamentos={agendamentos} />
        </div>
      </div>
    </>
  );
}

import { getPsicanalistas } from "@/actions/psicanalistas";
import PsychologistList from "@/components/dashboard/PsychologistList";
import { RefreshButton } from "@/components/ui/RefreshButton";

export default async function ClientPsychologistsPage() {
  const result = await getPsicanalistas();
  const psychologists = result || [];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Psicanalistas
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              Encontre o profissional ideal para sua consulta
            </p>
          </div>
          <RefreshButton clearAllCache={true} className="ml-auto">
            🔄 Atualizar Psicanalistas
          </RefreshButton>
        </div>
        <PsychologistList psychologists={psychologists} />
      </div>
    </div>
  );
}

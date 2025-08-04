import { getPsicanalistas } from "@/actions/psicanalistas";
import PsychologistList from "@/components/dashboard/PsychologistList";
import { RefreshButton } from "@/components/ui/RefreshButton";

export default async function ClientPsychologistsPage() {
  const result = await getPsicanalistas();
  const psychologists = result || [];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Psicanalistas</h1>
            <p className="text-gray-600 mt-2">
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

import { getPsicanalistas } from "@/actions/psicanalistas";
import PsychologistList from "@/components/dashboard/PsychologistList";
import { RefreshButton } from "@/components/ui/RefreshButton";

export default async function ClientPsychologistsPage() {
  const result = await getPsicanalistas();
  const psychologists = result || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Psicanalistas
        </h1>
        <RefreshButton clearAllCache={true} className="ml-auto">
          🔄 Atualizar Psicanalistas
        </RefreshButton>
      </div>
      <PsychologistList psychologists={psychologists} />
    </div>
  );
}

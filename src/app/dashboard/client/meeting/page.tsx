import { getAuthUser } from "@/actions/auth";
import { ClientMeeting } from "@/components/dashboard/ClientMeeting";
import { RefreshButton } from "@/components/ui/RefreshButton";

export default async function ClientMeetingPage() {
  const user = await getAuthUser();
  // TODO: Função getNextAppointment não existe. Implemente ou ajuste a lógica aqui.
  const result = { data: null };
  const meetingLink = "link para Teste";

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Minha Reunião</h1>
        <RefreshButton clearAllCache={true} className="ml-auto">
          🔄 Atualizar Reunião
        </RefreshButton>
      </div>
      <ClientMeeting meetingLink={meetingLink} />
    </div>
  );
}

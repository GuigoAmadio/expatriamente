"use client";

interface ClientMeetingProps {
  meetingLink: string | null;
}

export function ClientMeeting({ meetingLink }: ClientMeetingProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Próxima Reunião</h1>
      {meetingLink ? (
        <a
          href={meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Acessar link da reunião
        </a>
      ) : (
        <div className="text-gray-500">Nenhuma reunião agendada.</div>
      )}
    </div>
  );
}

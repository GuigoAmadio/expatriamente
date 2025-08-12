"use client";
import { useState } from "react";

export interface NoteItem {
  id: string;
  createdAt: string; // ISO
  content: string;
}

interface EmployeeClientNotesProps {
  userId: string;
  initialNotes: NoteItem[];
  guidance?: string;
  onCreate?: (formData: FormData) => Promise<void>;
}

export function EmployeeClientNotes({
  userId,
  initialNotes,
  guidance,
  onCreate,
}: EmployeeClientNotesProps) {
  const [noteText, setNoteText] = useState("");

  return (
    <div className="space-y-6">
      {/* Faixa superior com orientações */}
      {guidance && (
        <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-4">
          <div className="text-sm text-blue-900">{guidance}</div>
        </div>
      )}

      {/* Campo de input para novas notas (server action) */}
      {onCreate && (
        <form action={onCreate} className="bg-white rounded-lg shadow p-4">
          <input type="hidden" name="userId" value={userId} />
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nova nota da sessão
          </label>
          <textarea
            name="content"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Escreva observações para lembrar nas próximas sessões..."
            className="w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-28"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Adicionar nota
            </button>
          </div>
        </form>
      )}

      {/* Lista de notas anteriores */}
      <div className="space-y-3">
        {initialNotes.map((n) => (
          <div
            key={n.id}
            className="rounded-lg border border-gray-200 bg-gray-50 shadow-sm p-4"
          >
            <div className="text-[11px] text-gray-500 mb-2">
              {new Date(n.createdAt).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-sm text-gray-800 whitespace-pre-wrap">
              {n.content}
            </div>
          </div>
        ))}
        {initialNotes.length === 0 && (
          <div className="text-sm text-gray-500 text-center py-6">
            Nenhuma nota registrada ainda.
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeClientNotes;

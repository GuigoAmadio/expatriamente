"use client";

import { FixedSizeList as List } from "react-window";

interface Psychologist {
  id: string;
  name: string;
  specialty?: string;
  image?: string;
  description?: string;
}

interface AdminPsychologistsListProps {
  psychologists: Psychologist[];
}

export function AdminPsychologistsList({
  psychologists,
}: AdminPsychologistsListProps) {
  if (!psychologists.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhum psicanalista encontrado.
      </div>
    );
  }

  return (
    <List
      height={600}
      itemCount={psychologists.length}
      itemSize={220}
      width={"100%"}
      style={{ minWidth: "100%" }}
    >
      {({ index, style }) => {
        const psych = psychologists[index];
        return (
          <div
            key={psych.id}
            style={style}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center m-2"
          >
            {psych.image && (
              <img
                src={psych.image}
                alt={psych.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
            )}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {psych.name}
            </h2>
            {psych.specialty && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {psych.specialty}
              </p>
            )}
            {psych.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 text-center">
                {psych.description}
              </p>
            )}
            <a
              href={`/psicanalistas/${psych.id}`}
              className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Ver perfil
            </a>
          </div>
        );
      }}
    </List>
  );
}

"use client";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";

const topics = [
  {
    label: "Depressão",
    bg: "#aac3b3",
    textColor: "#11486b",
    playColor: "#11486b",
    video: "/videos/demo.mp4",
  },
  {
    label: "Solidão",
    bg: "#b7b095",
    textColor: "#11486b",
    playColor: "#11486b",
    video: "/videos/demo.mp4",
  },
  {
    label: "Ansiedade",
    bg: "#335b5c",
    textColor: "#fff",
    playColor: "#fff",
    video: "/videos/demo.mp4",
  },
  {
    label: "Saudades",
    bg: "#d6cfae",
    textColor: "#11486b",
    playColor: "#11486b",
    video: "/videos/demo.mp4",
  },
  {
    label: "Renuncia",
    bg: "#18496b",
    textColor: "#fff",
    playColor: "#fff",
    video: "/videos/demo.mp4",
  },
  {
    label: "Choque Cultural",
    bg: "#aac3b3",
    textColor: "#11486b",
    playColor: "#11486b",
    video: "/videos/demo.mp4",
  },
  {
    label: "Frustrações",
    bg: "#8a4320",
    textColor: "#fff",
    playColor: "#fff",
    video: "/videos/demo.mp4",
  },
];

export default function TopicsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="w-full py-24 px-2 flex flex-col items-center justify-center bg-white">
      <h2 className="text-4xl font-akzidens font-bold text-[#11486b] mb-2 text-center">
        Vamos falar sobre…
      </h2>
      <p className="text-xl italic text-[#11486b] mb-10 text-center">
        Como a escuta atenta e o diálogo promovem autoconhecimento e
        transformação pessoal.
      </p>
      <div className="w-full flex flex-row overflow-x-hidden justify-center gap-10 max-w-6xl">
        {topics.map((topic, idx) => (
          <div
            key={topic.label}
            className={`flex flex-col items-center justify-between rounded-2xl transition-all duration-300 cursor-pointer shadow-md relative overflow-hidden ${
              hovered === idx ? "z-20" : "z-10"
            }`}
            style={{
              background: topic.bg,
              width: hovered === idx ? 600 : 90,
              minHeight: hovered === idx ? 300 : 300,
              height: hovered === idx ? 500 : 500,
              boxShadow:
                hovered === idx
                  ? "0 8px 32px 0 rgba(0,0,0,0.10)"
                  : "0 2px 12px 0 rgba(0,0,0,0.04)",
            }}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex-1 flex items-center justify-center w-full h-full">
              {hovered === idx ? (
                <video
                  src={topic.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ minHeight: 120, borderRadius: 16 }}
                />
              ) : (
                <FaPlay size={26} color={topic.playColor} />
              )}
            </div>
            <span
              className="mt-6 text-base md:text-lg font-akzidens font-normal text-center"
              style={{ color: topic.textColor }}
            >
              {topic.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

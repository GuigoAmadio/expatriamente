"use client";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";

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
    <section
      className="w-full py-24 px-2 flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(to bottom, #fff 0%, #deefff 100%)",
      }}
    >
      <motion.h2
        className="text-4xl font-akzidens font-bold text-[#DBD1A4] mb-2 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Vamos falar sobre…
      </motion.h2>
      <motion.p
        className="text-2xl italic text-orange-400 mt-10 mb-20 text-center max-w-[800px]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        Como a escuta atenta e o diálogo promovem autoconhecimento e
        transformação pessoal.
      </motion.p>
      <motion.div
        className="w-full flex flex-row overflow-x-hidden justify-center gap-10 max-w-6xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true }}
      >
        {topics.map((topic, idx) => (
          <motion.div
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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

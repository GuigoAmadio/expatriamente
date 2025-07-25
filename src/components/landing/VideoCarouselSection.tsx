"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const videos = [
  {
    src: "/videos/video1Expatriamente.mp4",
    thumb: "/videos/video1Expatriamente.jpg",
  },
  {
    src: "/videos/video2Expatriamente.mp4",
    thumb: "/videos/video2Expatriamente.jpg",
  },
  {
    src: "/videos/video3Expatriamente.mp4",
    thumb: "/videos/video3Expatriamente.jpg",
  },
];

export default function VideoCarouselSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 esquerda, 1 direita
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const total = videos.length;

  function goTo(idx: number, dir: number) {
    // Pausar todos os vídeos ANTES de trocar
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setDirection(dir);
    setCurrent((idx + total) % total);
  }

  // Para carrossel infinito
  const getIndex = (offset: number) => (current + offset + total) % total;

  // Pausar todos os vídeos exceto o atual (garantia extra)
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== getIndex(0)) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [current]);

  return (
    <section className="w-full py-20 flex flex-col items-center bg-white">
      <h2 className="font-akzidens text-3xl md:text-4xl font-bold text-[#01386F] text-center mb-2">
        Vamos falar sobre...
      </h2>
      <p className="text-xl w-1/2 my-8 text-[#01386F] text-center mb-10">
        Como a escuta atenta e o diálogo promovem autoconhecimento e
        transformação pessoal.
      </p>
      <div className="relative w-full flex justify-center items-center">
        {/* Setas */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow hover:bg-[#01386F]/10 transition-colors"
          onClick={() => goTo(current - 1, -1)}
          aria-label="Anterior"
        >
          <FaChevronLeft size={28} className="text-[#01386F]" />
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow hover:bg-[#01386F]/10 transition-colors"
          onClick={() => goTo(current + 1, 1)}
          aria-label="Próximo"
        >
          <FaChevronRight size={28} className="text-[#01386F]" />
        </button>
        {/* Carrossel */}
        <div className="flex w-full max-w-4xl items-center justify-center gap-4 md:gap-8">
          {/* Mobile: só o central */}
          <div className="w-full flex md:hidden justify-center">
            <motion.video
              key={current}
              ref={(el) => {
                videoRefs.current[getIndex(0)] = el;
              }}
              src={videos[getIndex(0)].src}
              poster={videos[getIndex(0)].thumb}
              controls
              className="rounded-2xl shadow-xl w-full max-w-xs h-96 object-contain border-4 border-[#01386F]"
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {/* Desktop: 3 vídeos */}
          <div className="hidden md:flex w-full items-center justify-center gap-8">
            {/* Esquerda */}
            <motion.video
              key={getIndex(-1)}
              ref={(el) => {
                videoRefs.current[getIndex(-1)] = el;
              }}
              src={videos[getIndex(-1)].src}
              poster={videos[getIndex(-1)].thumb}
              controls
              className="rounded-2xl shadow-lg  w-[280px] object-contain opacity-60 scale-90 blur-[1px] border-2 border-[#01386F]/20"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 0.6, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            />
            {/* Central */}
            <motion.video
              key={getIndex(0)}
              ref={(el) => {
                videoRefs.current[getIndex(0)] = el;
              }}
              src={videos[getIndex(0)].src}
              poster={videos[getIndex(0)].thumb}
              controls
              autoPlay
              className="rounded-2xl shadow-2xl w-[340px] object-contain border-4 border-[#01386F] z-10"
              initial={{
                opacity: 0,
                scale: 0.95,
                x: direction > 0 ? 100 : -100,
              }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5 }}
            />
            {/* Direita */}
            <motion.video
              key={getIndex(1)}
              ref={(el) => {
                videoRefs.current[getIndex(1)] = el;
              }}
              src={videos[getIndex(1)].src}
              poster={videos[getIndex(1)].thumb}
              controls
              className="rounded-2xl shadow-lg w-[280px] object-contain opacity-60 scale-90 blur-[1px] border-2 border-[#01386F]/20"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 0.6, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
      {/* Bolinhas de navegação */}
      <div className="flex gap-2 justify-center mt-8">
        {videos.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 border-[#01386F] transition-all ${
              current === idx ? "bg-[#01386F]" : "bg-white"
            }`}
            onClick={() => goTo(idx, idx > current ? 1 : -1)}
            aria-label={`Ir para vídeo ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

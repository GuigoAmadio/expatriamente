"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const videos = [
  {
    src: "/videos/video1Expatriamente.mp4",
    title: "Bem-vindo ao Expatriamente",
    description:
      "Conheça nossa plataforma dedicada ao bem-estar emocional de brasileiros no exterior.",
  },
  {
    src: "/videos/video2Expatriamente.mp4",
    title: "Atendimento Humanizado",
    description:
      "Nossa equipe de psicólogos especializados oferece suporte personalizado e acolhedor.",
  },
  {
    src: "/videos/video3Expatriamente.mp4",
    title: "Comunidade de Apoio",
    description:
      "Conecte-se com outros brasileiros que compartilham experiências similares.",
  },
  {
    src: "/videos/video4Expatriamente.mp4",
    title: "Adaptação Cultural",
    description:
      "Aprenda a navegar pelas diferenças culturais e construir sua nova identidade no exterior.",
  },
  {
    src: "/videos/video5Expatriamente.mp4",
    title: "Gestão do Estresse",
    description:
      "Técnicas práticas para gerenciar o estresse e a ansiedade da vida no exterior.",
  },
  {
    src: "/videos/video6Expatriamente.mp4",
    title: "Saudade e Conexão",
    description:
      "Como lidar com a saudade de casa mantendo conexões significativas com suas raízes.",
  },
  {
    src: "/videos/video7Expatriamente.mp4",
    title: "Crescimento Pessoal",
    description:
      "Transforme os desafios do exterior em oportunidades de desenvolvimento pessoal.",
  },
  {
    src: "/videos/video8Expatriamente.mp4",
    title: "Networking e Carreira",
    description:
      "Estratégias para construir uma rede profissional e avançar na carreira no exterior.",
  },
  {
    src: "/videos/video9Expatriamente.mp4",
    title: "Bem-estar Integral",
    description:
      "Abordagem holística para manter o equilíbrio físico, mental e emocional no exterior.",
  },
];

export default function VideoCarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Configurar vídeos ao carregar
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.preload = "metadata";
      }
    });
  }, []);

  const handleVideoClick = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        // Pausar todos os outros vídeos primeiro
        videoRefs.current.forEach((otherVideo, i) => {
          if (otherVideo && i !== index) {
            otherVideo.pause();
            otherVideo.currentTime = 0;
          }
        });

        // Configurar o vídeo para reprodução
        video.muted = true; // Necessário para autoplay em desktop
        video.currentTime = 0; // Voltar ao início

        // Iniciar o vídeo atual
        video
          .play()
          .then(() => {
            setIsPlaying(true);
            setPlayingIndex(index);
          })
          .catch((e) => {
            console.log("Erro ao reproduzir vídeo:", e);
            setIsPlaying(false);
            setPlayingIndex(null);
          });
      } else {
        video.pause();
        setIsPlaying(false);
        setPlayingIndex(null);
      }
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
    setPlayingIndex(null);
    videoRefs.current.forEach((v) => v && v.pause());
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
    setPlayingIndex(null);
    videoRefs.current.forEach((v) => v && v.pause());
  };

  // Função para obter os 3 vídeos visíveis
  const getVisibleVideos = () => {
    const prev = (currentSlide - 1 + videos.length) % videos.length;
    const next = (currentSlide + 1) % videos.length;
    return [
      { index: prev, position: "left" },
      { index: currentSlide, position: "center" },
      { index: next, position: "right" },
    ];
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Título e Descrição */}
        <motion.div
          className="text-center mb-12 sm:mb-16 w-full max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#01386F] mb-4">
            Vamos falar sobre...
          </h2>
          <p className="text-lg sm:text-xl text-[#01386F] text-center leading-relaxed">
            Como a escuta atenta e o diálogo promovem autoconhecimento e
            transformação pessoal
          </p>
        </motion.div>

        {/* DESKTOP - Transições simples */}
        <div className="relative hidden lg:flex justify-center items-end max-w-6xl mx-auto h-[500px]">
          {/* Setas */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 group"
          >
            <FaChevronLeft className="text-[#01386F] text-xl group-hover:scale-110 transition-transform" />
          </button>

          {/* Container dos 3 vídeos visíveis */}
          <div className="relative w-full h-full flex justify-center items-end gap-6">
            {getVisibleVideos().map(({ index, position }) => {
              const video = videos[index];
              const isCenter = position === "center";

              return (
                <motion.div
                  key={`${index}-${currentSlide}`}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 ${
                    isCenter ? "shadow-2xl" : "shadow-lg"
                  }`}
                  style={{
                    width: isCenter ? "300px" : "220px",
                    height: isCenter ? "420px" : "340px",
                  }}
                  animate={{
                    scale: isCenter ? 1.05 : 0.95,
                    opacity: isCenter ? 1 : 0.8,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  onClick={() => handleVideoClick(index)}
                >
                  {/* Vídeo */}
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    muted={true}
                    controls={false}
                  >
                    <source src={video.src} type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>

                  {/* Overlay com Título */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-white text-lg font-bold mb-2">
                        {video.title}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  {/* Botão de Play/Pause */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/30 transition-all duration-300">
                      {isPlaying && playingIndex === index ? (
                        <FaPause className="text-white text-xl" />
                      ) : (
                        <FaPlay className="text-white text-xl ml-1" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 group"
          >
            <FaChevronRight className="text-[#01386F] text-xl group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Indicadores de progresso */}
        <div className="hidden lg:flex justify-center items-center mt-8 space-x-3">
          {videos.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
                setIsPlaying(false);
                setPlayingIndex(null);
                videoRefs.current.forEach((v) => v && v.pause());
              }}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? "bg-[#01386F] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* TABLET - Versão simplificada */}
        <div className="relative hidden md:flex lg:hidden justify-center items-end gap-4 max-w-2xl mx-auto h-[400px]">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 group"
          >
            <FaChevronLeft className="text-[#01386F] text-lg group-hover:scale-110 transition-transform" />
          </button>

          <div className="relative w-full h-full flex justify-center items-end gap-4">
            {getVisibleVideos().map(({ index, position }) => {
              const video = videos[index];
              const isCenter = position === "center";

              return (
                <motion.div
                  key={`${index}-${currentSlide}`}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 ${
                    isCenter ? "shadow-2xl" : "shadow-lg"
                  }`}
                  style={{
                    width: isCenter ? "220px" : "160px",
                    height: isCenter ? "340px" : "260px",
                  }}
                  animate={{
                    scale: isCenter ? 1.05 : 0.9,
                    opacity: isCenter ? 1 : 0.7,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  onClick={() => handleVideoClick(index)}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    muted={true}
                    controls={false}
                  >
                    <source src={video.src} type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <div className="p-3 w-full">
                      <h3 className="text-white text-base font-bold mb-2">
                        {video.title}
                      </h3>
                      <p className="text-white/90 text-xs">
                        {video.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-white/30 transition-all duration-300">
                      {isPlaying && playingIndex === index ? (
                        <FaPause className="text-white text-lg" />
                      ) : (
                        <FaPlay className="text-white text-lg ml-1" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 group"
          >
            <FaChevronRight className="text-[#01386F] text-lg group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="hidden md:flex lg:hidden justify-center items-center mt-6 space-x-2">
          {videos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? "bg-[#01386F] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* MOBILE - Carrossel simples com overlay condicional */}
        <div className="md:hidden">
          <div className="relative flex flex-col items-center">
            <motion.div
              key={currentSlide}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl h-[280px] sm:h-[320px] w-[160px] sm:w-[180px] mx-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleVideoClick(currentSlide)}
            >
              <video
                ref={(el) => {
                  videoRefs.current[currentSlide] = el;
                }}
                className="w-full h-full object-cover"
                preload="metadata"
                muted={true}
                controls={false}
              >
                <source src={videos[currentSlide].src} type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>

              {/* Overlay condicional - só aparece quando não está rodando */}
              {(!isPlaying || playingIndex !== currentSlide) && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-3 w-full">
                    <h3 className="text-white text-base font-bold mb-2">
                      {videos[currentSlide].title}
                    </h3>
                    <p className="text-white/90 text-xs">
                      {videos[currentSlide].description}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Botão condicional - só aparece quando não está rodando */}
              {(!isPlaying || playingIndex !== currentSlide) && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-white/30 transition-all duration-300">
                    <FaPlay className="text-white text-lg ml-1" />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Navegação Mobile */}
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={prevSlide}
                className="bg-[#01386F] hover:bg-[#012a5a] text-white rounded-full p-2 transition-colors"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <div className="flex space-x-2">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "bg-[#01386F] scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="bg-[#01386F] hover:bg-[#012a5a] text-white rounded-full p-2 transition-colors"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

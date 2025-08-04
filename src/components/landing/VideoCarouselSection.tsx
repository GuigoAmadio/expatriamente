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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Configurar vídeos ao carregar
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        // Configurações iniciais
        video.muted = false; // Permitir áudio
        video.preload = "metadata";
        video.playsInline = true;

        // Prevenir mudança de tamanho durante carregamento
        video.addEventListener("loadedmetadata", (e) => {
          const player = e.target as HTMLVideoElement;
          player.width = player.clientWidth;
          player.height = player.clientHeight;
        });

        // Event listeners para play/pause
        video.addEventListener("play", () => {
          setIsPlaying(true);
          setPlayingIndex(index);
        });

        video.addEventListener("pause", () => {
          if (playingIndex === index) {
            setIsPlaying(false);
            setPlayingIndex(null);
          }
        });

        video.addEventListener("ended", () => {
          if (playingIndex === index) {
            setIsPlaying(false);
            setPlayingIndex(null);
          }
        });
      }
    });
  }, [playingIndex]);

  const handleVideoClick = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    // Se clicou em um vídeo lateral, centralizar primeiro
    if (index !== currentSlide) {
      goToSlide(index);
      return; // A função goToSlide vai chamar handleVideoClick novamente
    }

    if (video.paused) {
      // Pausar apenas o vídeo que está atualmente tocando
      if (playingIndex !== null && playingIndex !== index) {
        const currentVideo = videoRefs.current[playingIndex];
        if (currentVideo) {
          currentVideo.pause();
        }
      }

      // Iniciar o vídeo atual
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.log("Erro ao reproduzir vídeo:", e);
          setIsPlaying(false);
          setPlayingIndex(null);
        });
      }
    } else {
      // Pausar o vídeo atual
      video.pause();
    }
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide(index);

    // Se foi chamado por um clique em vídeo lateral, iniciar o vídeo após centralizar
    setTimeout(() => {
      setIsAnimating(false);
      // Pequeno delay para garantir que a animação terminou
      setTimeout(() => {
        const video = videoRefs.current[index];
        if (video && video.paused) {
          handleVideoClick(index);
        }
      }, 100);
    }, 500);
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % videos.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + videos.length) % videos.length;
    goToSlide(prev);
  };

  // Função para obter os 3 vídeos visíveis
  const getVisibleVideos = () => {
    const prev = (currentSlide - 1 + videos.length) % videos.length;
    const next = (currentSlide + 1) % videos.length;
    return [
      { index: prev, position: "left" as const },
      { index: currentSlide, position: "center" as const },
      { index: next, position: "right" as const },
    ];
  };

  const VideoSlide = ({
    video,
    index,
    position,
  }: {
    video: any;
    index: number;
    position: "left" | "center" | "right";
  }) => {
    const isCenter = position === "center";
    const isPlayingAnyVideo = isPlaying && playingIndex !== null;
    const showOverlay = !isPlayingAnyVideo;

    return (
      <div className={`video-slide ${isCenter ? "center" : "side"}`}>
        <motion.div
          className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl mx-auto"
          style={{
            width: isCenter ? "350px" : "280px",
            height: isCenter ? "480px" : "380px",
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          onClick={() => handleVideoClick(index)}
        >
          {/* Vídeo */}
          <video
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            className="w-full h-full object-cover"
            preload="metadata"
            muted={false}
            controls={false}
            playsInline
            webkit-playsinline="true"
          >
            <source src={video.src} type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>

          {/* Overlay condicional - só aparece quando nenhum vídeo está tocando */}
          {showOverlay && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 w-full">
                <h3 className="text-white text-lg font-bold mb-2">
                  {video.title}
                </h3>
                <p className="text-white/90 text-sm">{video.description}</p>
              </div>
            </motion.div>
          )}

          {/* Botão condicional - só aparece quando nenhum vídeo está tocando */}
          {showOverlay && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/30 transition-all duration-300">
                <FaPlay className="text-white text-xl ml-1" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
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

        {/* Carousel CSS Nativo */}
        <div className="relative max-w-6xl mx-auto">
          {/* Setas de navegação */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 group disabled:opacity-50"
          >
            <FaChevronLeft className="text-[#01386F] text-xl group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 group disabled:opacity-50"
          >
            <FaChevronRight className="text-[#01386F] text-xl group-hover:scale-110 transition-transform" />
          </button>

          {/* Container do Carousel */}
          <div
            ref={carouselRef}
            className="carousel-container relative overflow-hidden"
          >
            <div className="carousel-track flex justify-center items-center gap-6">
              {getVisibleVideos().map(({ index, position }) => (
                <VideoSlide
                  key={`${index}-${currentSlide}`}
                  video={videos[index]}
                  index={index}
                  position={position}
                />
              ))}
            </div>
          </div>

          {/* Indicadores de paginação estilizados */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`pagination-dot transition-all duration-300 ${
                  currentSlide === index ? "active" : "inactive"
                } disabled:opacity-50`}
              />
            ))}
          </div>
        </div>

        {/* Estilos CSS Nativo */}
        <style jsx>{`
          .carousel-container {
            height: 480px;
            perspective: 1000px;
          }

          .carousel-track {
            transform-style: preserve-3d;
            height: 100%;
          }

          .video-slide {
            transition: all 0.5s ease-in-out;
            position: relative;
          }

          .video-slide.center {
            opacity: 1;
            transform: scale(1);
            z-index: 10;
          }

          .video-slide.side {
            opacity: 0.7;
            transform: scale(0.9);
            z-index: 5;
          }

          /* Bolinhas de paginação estilizadas */
          .pagination-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid transparent;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .pagination-dot.inactive {
            background: linear-gradient(135deg, #e5e7eb, #d1d5db);
            border-color: #9ca3af;
            transform: scale(0.8);
          }

          .pagination-dot.inactive:hover {
            background: linear-gradient(135deg, #d1d5db, #9ca3af);
            transform: scale(1);
            border-color: #6b7280;
          }

          .pagination-dot.active {
            background: linear-gradient(135deg, #01386f, #0a4c8a);
            border-color: #01386f;
            transform: scale(1.2);
            box-shadow: 0 4px 12px rgba(1, 56, 111, 0.3);
          }

          .pagination-dot.active::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.8;
          }

          /* Responsividade */
          @media (max-width: 1024px) {
            .carousel-container {
              height: 420px;
            }
          }

          @media (max-width: 768px) {
            .carousel-container {
              height: 360px;
            }

            .video-slide.center {
              transform: scale(0.95);
            }

            .video-slide.side {
              transform: scale(0.8);
            }
          }

          @media (max-width: 640px) {
            .carousel-container {
              height: 320px;
            }

            .pagination-dot {
              width: 10px;
              height: 10px;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

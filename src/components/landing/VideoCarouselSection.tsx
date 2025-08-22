"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion } from "framer-motion";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    title: "Suporte Especializado",
    description:
      "Oferecemos atendimento psicológico especializado para expatriados brasileiros.",
  },
  {
    src: "/videos/video4Expatriamente.mp4",
    title: "Adaptação Cultural",
    description:
      "Te ajudamos a navegar pelas questões emocionais da vida no exterior.",
  },
  {
    src: "/videos/video5Expatriamente.mp4",
    title: "Bem-estar Emocional",
    description:
      "Priorizamos seu bem-estar emocional durante sua jornada no exterior.",
  },
];

// Componente VideoCard completamente isolado para evitar re-renders
const VideoCard = React.memo<{
  video: (typeof videos)[0];
  index: number;
  position: "left" | "center" | "right";
  onVideoClick: (index: number) => void;
  currentIndex: number;
  playingIndex: number | null;
  videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>;
}>(
  ({
    video,
    index,
    position,
    onVideoClick,
    currentIndex,
    playingIndex,
    videoRefs,
  }) => {
    const isActive = position === "center";
    const isPlaying = playingIndex === index && isActive;
    const overlayRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Controle de overlay otimizado - só atualiza quando necessário
    useEffect(() => {
      if (!overlayRef.current) return;

      const shouldHide = isPlaying;
      overlayRef.current.style.opacity = shouldHide ? "0" : "1";
      overlayRef.current.style.pointerEvents = shouldHide ? "none" : "auto";
    }, [isPlaying]);

    // Controle direto do vídeo via ref
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      if (isPlaying) {
        video.muted = false;
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.log("Erro ao reproduzir vídeo via useEffect:", e);
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      } else if (!video.paused) {
        video.pause();
      }
    }, [isPlaying]);

    // Otimização: carregar frame de preview apenas uma vez
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleLoadedMetadata = () => {
        if (!isPlaying && playingIndex !== index) {
          video.currentTime = Math.min(2, video.duration * 0.1);
          video.muted = true;
        }
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () =>
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }, [index, isPlaying, playingIndex]);

    const handleClick = useCallback(() => {
      onVideoClick(index);
    }, [onVideoClick, index]);

    return (
      <motion.div
        className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-2xl bg-gray-900 transition-all duration-500 ease-out will-change-transform ${
          isActive
            ? "w-[320px] h-[500px] md:w-[420px] md:h-[600px] scale-100"
            : "w-[280px] h-[420px] md:w-[350px] md:h-[480px] scale-90 opacity-75"
        }`}
        initial={{
          opacity: 0,
          scale: 0.8,
          x: position === "left" ? -100 : position === "right" ? 100 : 0,
        }}
        animate={{
          opacity: isActive ? 1 : 0.75,
          scale: isActive ? 1 : 0.9,
          x: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        whileHover={{
          scale: isActive ? 1.02 : 0.92,
          transition: { duration: 0.2 },
        }}
        onClick={handleClick}
        style={{ willChange: "transform" }}
      >
        {/* Vídeo com otimizações */}
        <video
          ref={(el) => {
            videoRef.current = el;
            videoRefs.current[index] = el;
          }}
          className="w-full h-full object-cover object-center"
          loop
          preload="metadata"
          playsInline
          muted
          style={{ willChange: "auto" }}
        >
          <source src={video.src} type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>

        {/* Overlay estático - sem AnimatePresence para evitar re-renders */}
        <div
          ref={overlayRef}
          className="absolute inset-0 transition-opacity duration-300"
          style={{ willChange: "opacity" }}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Content Container */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
            {/* Play Button */}
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white/25 backdrop-blur-md rounded-full p-3 md:p-4 border border-white/40 shadow-lg hover:bg-white/35 hover:scale-110 transition-all duration-200">
                <FaPlay className="text-white text-lg md:text-xl ml-1" />
              </div>
            </div>

            {/* Video Info */}
            <div className="text-white space-y-1 md:space-y-2">
              <h3 className="text-sm md:text-lg font-bold font-akzidens leading-tight">
                {video.title}
              </h3>
              {isActive && (
                <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
                  {video.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Active Indicator */}
        {isActive && (
          <motion.div
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-4 h-4 bg-gradient-to-r from-[#01386F] to-[#0e5a94] rounded-full shadow-lg" />
          </motion.div>
        )}
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    // Comparação otimizada - só re-render se mudanças essenciais
    return (
      prevProps.index === nextProps.index &&
      prevProps.position === nextProps.position &&
      prevProps.currentIndex === nextProps.currentIndex &&
      prevProps.playingIndex === nextProps.playingIndex &&
      prevProps.video.src === nextProps.video.src &&
      prevProps.videoRefs === nextProps.videoRefs
    );
  }
);

VideoCard.displayName = "VideoCard";

const VideoCarouselSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Declarar goToSlide primeiro
  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;

      setIsTransitioning(true);

      // Pausar todos os vídeos
      videoRefs.current.forEach((video) => {
        if (video && !video.paused) {
          video.pause();
          video.muted = true;
        }
      });
      setPlayingIndex(null);

      setCurrentIndex(index);

      // Reset transition state after animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    },
    [isTransitioning, currentIndex]
  );

  // Agora podemos usar goToSlide no handleVideoClick
  const handleVideoClick = useCallback(
    (index: number) => {
      // Se clicou em um card lateral, navegar para ele
      if (index !== currentIndex) {
        goToSlide(index);
        return;
      }

      // Se já está no centro, controlar reprodução
      if (playingIndex === index) {
        // Pausar vídeo atual
        setPlayingIndex(null);
      } else {
        // Pausar todos os outros vídeos
        videoRefs.current.forEach((v, i) => {
          if (v && i !== index && !v.paused) {
            v.pause();
            v.muted = true;
          }
        });

        // Iniciar reprodução do vídeo atual
        setPlayingIndex(index);
      }
    },
    [currentIndex, playingIndex, goToSlide]
  );

  const goToNext = useCallback(() => {
    const nextIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;
    goToSlide(nextIndex);
  }, [currentIndex, goToSlide]);

  const goToPrevious = useCallback(() => {
    const prevIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  }, [currentIndex, goToSlide]);

  // Detecção de mobile otimizada
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkIsMobile, 150);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Memoização dos vídeos visíveis para evitar recálculos
  const visibleVideos = useMemo(() => {
    const result = [];

    if (isMobile) {
      result.push({
        video: videos[currentIndex],
        index: currentIndex,
        position: "center" as const,
      });
    } else {
      const prevIndex =
        currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
      const nextIndex =
        currentIndex === videos.length - 1 ? 0 : currentIndex + 1;

      result.push(
        {
          video: videos[prevIndex],
          index: prevIndex,
          position: "left" as const,
        },
        {
          video: videos[currentIndex],
          index: currentIndex,
          position: "center" as const,
        },
        {
          video: videos[nextIndex],
          index: nextIndex,
          position: "right" as const,
        }
      );
    }

    return result;
  }, [currentIndex, isMobile]);

  return (
    <section className="relative pb-12 pt-8 bg-[#e4ded2] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl lg:text-4xl font-bold font-akzidens text-[#987b6b]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            Vamos falar sobre...
          </motion.h2>
          <motion.p
            className="text-base italic text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            Como a escuta atenta e o diálogo promovem autoconhecimento e
            transformação pessoal.
          </motion.p>
        </motion.div>

        {/* Video Carousel */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Container do Carousel */}
          <div
            ref={containerRef}
            className="relative h-[550px] md:h-[650px] flex items-center justify-center gap-6 md:gap-8 px-4"
            style={{ willChange: "auto" }}
          >
            {visibleVideos.map(({ video, index, position }) => (
              <VideoCard
                key={index}
                video={video}
                index={index}
                position={position}
                onVideoClick={handleVideoClick}
                currentIndex={currentIndex}
                playingIndex={playingIndex}
                videoRefs={videoRefs}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <motion.button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm text-[#01386F] p-3 md:p-4 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all duration-300"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToPrevious}
            disabled={isTransitioning}
          >
            <FaChevronLeft className="text-lg md:text-xl" />
          </motion.button>
          <motion.button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm text-[#01386F] p-3 md:p-4 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all duration-300"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToNext}
            disabled={isTransitioning}
          >
            <FaChevronRight className="text-lg md:text-xl" />
          </motion.button>
        </motion.div>

        {/* Enhanced Pagination */}
        <motion.div
          className="flex justify-center items-center space-x-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          viewport={{ once: true }}
        >
          {videos.map((_, index) => (
            <motion.button
              key={index}
              className={`relative transition-all duration-300 ${
                index === currentIndex ? "w-12 h-3" : "w-3 h-3 hover:scale-125"
              }`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: index === currentIndex ? 1 : 1.25 }}
              whileTap={{ scale: 0.9 }}
              disabled={isTransitioning}
            >
              <div
                className={`w-full h-full rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-[#01386F] to-[#0e5a94] shadow-lg"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#01386F] to-[#0e5a94] opacity-50"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoCarouselSection;

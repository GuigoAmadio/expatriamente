"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Flickity from "react-flickity-component";
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
];

const VideoCarouselSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const flickityRef = useRef<any>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const flickityOptions = {
    cellAlign: "center",
    contain: true,
    wrapAround: true,
    autoPlay: false,
    adaptiveHeight: false,
    pageDots: true,
    prevNextButtons: false,
    draggable: true,
    friction: 0.28,
    selectedAttraction: 0.025,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          cellAlign: "left",
          adaptiveHeight: false,
        },
      },
    ],
  };

  useEffect(() => {
    if (flickityRef.current) {
      flickityRef.current.on("settle", (index: number) => {
        setCurrentSlide(index);
        // Pausar todos os vídeos quando mudar de slide
        videoRefs.current.forEach((video, i) => {
          if (video && i !== index) {
            video.pause();
            video.currentTime = 0;
          }
        });
        setIsPlaying(false);
      });
    }
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

        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const goToSlide = (index: number) => {
    if (flickityRef.current) {
      flickityRef.current.select(index);
    }
  };

  const nextSlide = () => {
    if (flickityRef.current) {
      flickityRef.current.next();
    }
  };

  const prevSlide = () => {
    if (flickityRef.current) {
      flickityRef.current.previous();
    }
  };

  return (
    <>
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          {/* Título e Descrição */}
          <motion.div
            className="text-center mb-8 sm:mb-12 w-full max-w-4xl mx-auto px-4"
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

          {/* Carrossel de Vídeos */}
          <div className="relative mx-auto">
            <Flickity
              className="video-carousel"
              elementType="div"
              options={flickityOptions}
              flickityRef={(c) => (flickityRef.current = c)}
              disableImagesLoaded={false}
              reloadOnUpdate={false}
              static={false}
            >
              {videos.map((video, index) => (
                <div key={index} className="px-4">
                  <motion.div
                    className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl h-[600px]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => handleVideoClick(index)}
                  >
                    {/* Vídeo */}
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      className="w-full h-full object-cover"
                      preload="metadata"
                      playsInline
                    >
                      <source src={video.src} type="video/mp4" />
                      Seu navegador não suporta vídeos.
                    </video>

                    {/* Overlay com Título */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                      <div className="p-6 w-full">
                        <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
                          {video.title}
                        </h3>
                        <p className="text-white/90 text-sm sm:text-base">
                          {video.description}
                        </p>
                      </div>
                    </div>

                    {/* Botão de Play/Pause */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-all duration-300">
                        {isPlaying && currentSlide === index ? (
                          <FaPause className="text-white text-2xl sm:text-3xl" />
                        ) : (
                          <FaPlay className="text-white text-2xl sm:text-3xl ml-1" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Flickity>

            {/* Navegação Desktop */}
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 right-4 justify-between pointer-events-none">
              <button
                onClick={prevSlide}
                className="bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-300 pointer-events-auto group"
              >
                <FaChevronLeft className="text-[#01386F] text-xl group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={nextSlide}
                className="bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-300 pointer-events-auto group"
              >
                <FaChevronRight className="text-[#01386F] text-xl group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Navegação Mobile */}
            <div className="md:hidden flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={prevSlide}
                className="bg-[#01386F] hover:bg-[#012a5a] text-white rounded-full p-2 transition-colors"
              >
                <FaChevronLeft className="text-sm" />
              </button>

              {/* Indicadores */}
              <div className="flex space-x-2">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
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
      </section>

      {/* Espaçamento com Gradiente */}
      <div className="h-12 bg-gradient-to-b from-blue-50 to-white"></div>

      <style jsx global>{`
        .video-carousel {
          margin: 0 auto;
        }

        .video-carousel .flickity-viewport {
          overflow: visible;
        }

        .video-carousel .carousel-cell {
          width: 100%;
          margin-right: 0;
          height: auto;
        }

        .video-carousel .flickity-page-dots {
          bottom: -40px;
        }

        .video-carousel .flickity-page-dots .dot {
          width: 12px;
          height: 12px;
          margin: 0 6px;
          background: #cbd5e1;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .video-carousel .flickity-page-dots .dot.is-selected {
          background: #01386f;
          transform: scale(1.2);
        }

        .video-carousel .flickity-button {
          display: none;
        }

        .video-carousel .flickity-slider {
          display: flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .video-carousel .flickity-page-dots {
            bottom: -30px;
          }
        }
      `}</style>
    </>
  );
};

export default VideoCarouselSection;

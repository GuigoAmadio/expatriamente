"use client";

import { motion } from "framer-motion";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { useState } from "react";
import ConsultationModal from "@/components/landing/ConsultationModal";

export default function HeroRightSection() {
  const { trackViewContent, trackSchedule } = useFacebookPixel();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConhecerPsicanalistas = () => {
    console.log(`🔵 [Hero] Botão "Conhecer Psicanalistas" clicado`);
    trackViewContent({
      content_name: "Conhecer Psicanalistas",
      content_category: "Hero Section",
      content_type: "button_click",
    });

    // Scroll suave para a seção de psicanalistas
    const psicanalistasSection = document.getElementById("psicanalistas");
    if (psicanalistasSection) {
      psicanalistasSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleAgendarConsulta = () => {
    console.log(`🔵 [Hero] Botão "Agendar Consulta" clicado`);

    trackSchedule({
      content_name: "Agendar Consulta",
      content_category: "Hero Section",
      content_type: "button_click",
    });

    // Abrir modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        className="mr-0 xl:mr-10 pt-10 md:pt-12 xl:pt-16 pb-10 flex flex-col justify-center items-center lg:items-start z-20 px-4 w-full md:max-w-[60%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="font-akzidens text-[5vw] sm:text-[4vw] md:text-[3vw] leading-tight mb-[1vw] font-medium tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center md:items-start">
            <div className="flex justify-center md:justify-start gap-2 md:gap-4 text-nowrap">
              <span className="text-white font-extrabold">CUIDADO</span>
              <span className="text-[#ffffff]">EMOCIONAL</span>
            </div>
            <div className="flex justify-center md:justify-start gap-2 md:gap-4 text-nowrap">
              <span className="text-white">PARA </span>
              <span className="text-[#5b7470]">BRASILEIROS</span>
            </div>
            <div className="flex justify-center md:justify-start gap-2 md:gap-4 text-nowrap">
              <span className="text-white">NO </span>
              <span className="text-white font-extrabold">EXTERIOR</span>
            </div>
          </div>
        </motion.h1>
        <motion.p
          className="py-[2vw] text-white text-[2.8vw] sm:text-[1.3vw]  font-normal mb-[2vw] leading-relaxed text-center lg:text-left max-w-[80vw] sm:max-w-[50vw]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Encontre acolhimento e compreensão em sua jornada como expatriado.
          Sessões de psicanálise online com profissionais que entendem sua
          realidade.
        </motion.p>
        <div className="block md:hidden h-[320px]" aria-hidden="true" />
        <motion.div
          className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-center lg:justify-start w-full items-center lg:items-stretch"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.button
            onClick={handleConhecerPsicanalistas}
            className="px-[3vw] py-[2.5vw] lg:px-[2vw] lg:py-[1vw] rounded-lg bg-white text-[#587861] font-akzidens font-bold border-2 border-white shadow-lg hover:scale-105 hover:bg-[#587861] hover:text-white focus:ring-4 focus:ring-white/20 transition-all duration-400 outline-none text-center text-[3.5vw] sm:text-[2vw] md:text-[1.8vw] lg:text-[1.2vw]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Conhecer Psicanalistas
          </motion.button>
          <motion.button
            onClick={handleAgendarConsulta}
            className="px-[3vw] py-[2.5vw] lg:px-[2vw] lg:py-[1vw] rounded-lg bg-[#587861] text-[#ffffff] font-akzidens font-bold shadow-lg hover:scale-105 hover:text-[#587861] hover:bg-gray-50 focus:ring-4 focus:ring-white/30 transition-all duration-400 outline-none border-none text-center text-[3.5vw] sm:text-[2vw] md:text-[1.8vw] lg:text-[1.2vw]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Agendar Consulta
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Modal de Consulta */}
      <ConsultationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

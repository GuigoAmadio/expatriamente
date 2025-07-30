"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import {
  ArrowRightIcon,
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function CTASection() {
  const [mounted, setMounted] = useState(false);

  const { t } = useLanguage();
  const { darkMode } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="py-20 bg-white animate-pulse" />;
  }

  return (
    <section className="w-full py-20 px-4 md:px-8 lg:px-20 relative overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-20 blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full opacity-20 blur-xl" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full opacity-15 blur-lg" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-block px-[1.5vw] py-[0.8vw] bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 font-semibold rounded-full text-[1vw] mb-[1vw]">
              ✨ Pronto para começar sua jornada?
            </span>
          </motion.div>

          <motion.h2
            className="font-akzidens text-[4vw] font-bold text-gray-900 mb-[2vw] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            Transforme sua experiência no exterior
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              com apoio psicanalítico especializado
            </span>
          </motion.h2>

          <motion.p
            className="text-[1.8vw] text-gray-600 max-w-[80vw] mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            Junte-se a milhares de brasileiros que encontraram equilíbrio
            emocional e crescimento pessoal através da psicanálise online.
            Nossos profissionais entendem os desafios únicos da vida no
            exterior.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <motion.a
              href="#"
              className="group px-[3vw] py-[1.5vw] bg-gradient-to-r from-blue-600 to-green-600 text-white font-akzidens font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-[1vw] min-w-[15vw] justify-center text-[1.2vw]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Agendar Primeira Sessão</span>
              <ArrowRightIcon className="w-[1.5vw] h-[1.5vw] group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>

            <motion.a
              href="#"
              className="px-[3vw] py-[1.5vw] bg-white text-gray-800 font-akzidens font-bold border-2 border-gray-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-300 flex items-center gap-[1vw] min-w-[15vw] justify-center text-[1.2vw]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Falar com Especialista</span>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Primeira sessão gratuita</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Cancelamento gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Profissionais certificados</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

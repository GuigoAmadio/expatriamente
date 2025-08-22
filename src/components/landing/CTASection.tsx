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
    return <div className="py-20 bg-[#e4ded2] animate-pulse" />;
  }

  return (
    <section className="w-full py-12 px-4 md:px-6 lg:px-12 relative overflow-hidden bg-[#e4ded2]">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e4ded2] via-[#f0eee8] to-[#e4ded2]" />

      {/* Floating Elements */}
      <div className="absolute top-6 left-6 w-16 h-16 bg-gradient-to-br from-[#9dc9e2] to-[#77b2de] rounded-full opacity-30 blur-xl" />
      <div className="absolute bottom-6 right-6 w-24 h-24 bg-gradient-to-br from-[#9ca995] to-[#587861] rounded-full opacity-25 blur-xl" />
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-br from-[#987b6b] to-[#c5b2a1] rounded-full opacity-20 blur-lg" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#9dc9e2] to-[#9ca995] text-white font-akzidens font-bold rounded-full text-sm mb-3 shadow-lg">
              ✨ Pronto para começar sua jornada?
            </span>
          </motion.div>

          <motion.h2
            className="font-akzidens text-2xl md:text-3xl lg:text-4xl font-bold text-[#5b7470] mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            Transforme sua experiência no exterior
            <span className="block text-[#987b6b] mt-1">
              com apoio psicanalítico especializado
            </span>
          </motion.h2>

          <motion.p
            className="text-base md:text-lg text-[#6B3F1D] max-w-3xl mx-auto leading-relaxed font-medium"
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
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <motion.a
              href="#"
              className="group px-6 py-3 bg-gradient-to-r from-[#9dc9e2] to-[#9ca995] text-white font-akzidens font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Agendar Primeira Sessão</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>

            <motion.a
              href="#"
              className="px-6 py-3 bg-white text-[#987b6b] font-akzidens font-bold border-2 border-[#987b6b] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#f0eee8] flex items-center gap-2 text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Falar com Especialista</span>
              <ArrowRightIcon className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-[#c5b2a1]/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#587861] rounded-full"></div>
                <span className="font-akzidens font-bold text-[#987b6b] text-sm">
                  Primeira sessão gratuita
                </span>
              </div>
              <p className="text-[#6B3F1D] text-xs">
                Experimente sem compromisso e descubra como podemos ajudar você.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-[#c5b2a1]/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#9dc9e2] rounded-full"></div>
                <span className="font-akzidens font-bold text-[#987b6b] text-sm">
                  Cancelamento gratuito
                </span>
              </div>
              <p className="text-[#6B3F1D] text-xs">
                Flexibilidade total para cancelar ou reagendar suas sessões.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-[#c5b2a1]/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#9ca995] rounded-full"></div>
                <span className="font-akzidens font-bold text-[#987b6b] text-sm">
                  Profissionais certificados
                </span>
              </div>
              <p className="text-[#6B3F1D] text-xs">
                Equipe especializada em psicanálise para brasileiros no
                exterior.
              </p>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#6B3F1D] opacity-80"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-3 h-3 text-[#587861]" />
              <span>100% confidencial</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-3 h-3 text-[#9dc9e2]" />
              <span>Horários flexíveis</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartIcon className="w-3 h-3 text-[#987b6b]" />
              <span>Suporte em português</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

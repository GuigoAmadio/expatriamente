"use client";

import { motion } from "framer-motion";
import {
  FaBrain,
  FaWifi,
  FaHandHoldingHeart,
  FaLightbulb,
} from "react-icons/fa";

export default function FeatureCards() {
  const features = [
    {
      icon: FaBrain,
      title: "+20",
      description:
        "Corpo clínico com mais de 20 psicanalistas experientes e especializados em dinâmica intercultural",
      bgColor: "bg-[#0A4C8A]",
      titleColor: "text-[#EC4899]",
    },
    {
      icon: FaWifi,
      title: "ONLINE",
      description:
        "Atendimento online e personalizado, ajustado a diferentes fusos e horários",
      bgColor: "bg-[#0A4C8A]",
      titleColor: "text-[#EC4899]",
    },
    {
      icon: FaHandHoldingHeart,
      title: "ACOLHIMENTO",
      description:
        "Abordagem que integra história de vida, traços culturais e o contexto do país de acolhimento",
      bgColor: "bg-[#2196F3]",
      titleColor: "text-[#F97316]",
    },
    {
      icon: FaLightbulb,
      title: "CFPC",
      subtitle: "Centro de Formação em Psicanálise Clínica",
      description:
        "Supervisão e respaldo técnico do CFPC - Centro de Formação em Psicanálise Clínica",
      bgColor: "bg-white",
      titleColor: "text-[#8B5CF6]",
      textColor: "text-[#374151]",
    },
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-[#c2e4f5] to-[#88aab5]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="grid grid-cols-1 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`${feature.bgColor} rounded-xl p-6 shadow-lg`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <feature.icon className="w-12 h-12 text-black flex-shrink-0" />

                <div className="flex-1">
                  <h3
                    className={`text-3xl font-bold mb-2 ${feature.titleColor}`}
                  >
                    {feature.title}
                  </h3>

                  {feature.subtitle && (
                    <p className={`text-xs mb-2 ${feature.titleColor}`}>
                      {feature.subtitle}
                    </p>
                  )}

                  <p
                    className={`text-sm leading-relaxed ${
                      feature.textColor || "text-white"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

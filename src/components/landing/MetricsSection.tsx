"use client";

import { motion } from "framer-motion";

export default function MetricsSection() {
  const metrics = [
    {
      number: "2.000+",
      label: "Clientes Atendidos",
    },
    {
      number: "4.9/5",
      label: "Avaliação Média",
    },
    {
      number: "24h",
      label: "Economizados por Semana",
    },
    {
      number: "30min",
      label: "Tempo de Resposta",
    },
  ];

  return (
    <section className="py-16 transition-colors duration-300 bg-[#e4ded2] text-[#495443]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da seção */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-heading">
            Nossos Números
          </h2>
        </motion.div>

        {/* Grid de métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              {/* Número */}
              <div className="text-4xl md:text-5xl font-bold mb-2 text-strong">
                {metric.number}
              </div>

              {/* Label */}
              <div className="text-sm font-medium">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Seção de serviços residenciais */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-40 flex flex-col items-center"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            dangerouslySetInnerHTML={{ __html: "Serviços Residenciais" }}
          />
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-[#987b6b]/10">
            <svg
              className="w-10 h-10 text-[#987b6b]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <p className="text-lg w-1/2">
            Cuidado personalizado no conforto da sua casa
          </p>

          {/* Ícone de cuidado/coração */}
        </motion.div>
      </div>
    </section>
  );
}

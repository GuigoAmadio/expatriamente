"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaRegHandPointer, FaHandPointer } from "react-icons/fa";
import { FiMousePointer } from "react-icons/fi";

// Hook para detectar se é mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};

// Componente para bolas com blur
const BlurBalls = ({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) => {
  const positions = {
    "top-left": "top-10 left-10",
    "top-right": "top-10 right-10",
    "bottom-left": "bottom-10 left-10",
    "bottom-right": "bottom-10 right-10",
  };

  return (
    <div className={`absolute ${positions[position]} pointer-events-none`}>
      <div className="w-32 h-32 bg-primary-400/30 rounded-full blur-3xl" />
      <div className="w-24 h-24 bg-secondary-400/20 rounded-full blur-2xl -mt-8 ml-4" />
    </div>
  );
};

// Componente para cada passo
const StepRow = ({
  step,
  title,
  children,
  isEven = false,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
  isEven?: boolean;
}) => {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });

  // Gradiente mais forte para o título
  const gradientClass =
    "bg-gradient-to-r from-yellow-400 via-orange-500 to-primary-700 bg-clip-text text-transparent";

  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: step * 0.2 }}
        viewport={{ once: true }}
        className="w-full mb-16 "
      >
        <div className="mb-6 text-left">
          <span className="text-3xl font-extrabold text-primary-900 mr-2">
            {step} -
          </span>
          <span
            className={`text-2xl lg:text-3xl font-extrabold ${gradientClass}`}
          >
            {title}
          </span>
        </div>
        <div className="relative w-full flex justify-center">{children}</div>
      </motion.div>
    );
  }

  // Desktop: alterna o lado do título/imagem
  return (
    <div
      className={`w-full
        flex flex-col
        ${isEven ? "items-end mr-40" : "items-start ml-40"}
        justify-center text-center gap-6
      `}
    >
      <div className={`text-center flex w-1/2 justify-center`}>
        <span className={`text-xl md:text-3xl font-extrabold text-accent w-96`}>
          {step} - {title}
        </span>
      </div>
      <div className="relative w-1/2 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

// Passo 1: CategorySelector
const CategorySelector = () => {
  const professionals = [
    {
      name: "Dr. Silva",
      specialty: "Psicanalista",
      city: "São Paulo, SP",
      photo: "https://randomuser.me/api/portraits/men/31.jpg",
    },
    {
      name: "Dra. Maria Souza",
      specialty: "Psicóloga",
      city: "Rio de Janeiro, RJ",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Dr. João Lima",
      specialty: "Terapeuta",
      city: "Belo Horizonte, MG",
      photo: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ];
  return (
    <div className="relative">
      {/* Fade lateral para categorias */}
      {/* Categorias */}
      <div className="mb-8 relative z-20">
        <div className="flex justify-center gap-4 mb-4 relative">
          {["Ansiedade", "Depressão", "Relacionamentos"].map((cat, idx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`px-4 py-2 rounded-full text-primary-700 font-medium text-sm border bg-white shadow-sm ${
                cat === "Ansiedade"
                  ? "border-4 border-accent"
                  : "border border-accent"
              }`}
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)" }}
            >
              {cat}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center gap-4 relative">
          {["Autoestima", "Transtornos"].map((cat, idx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: (idx + 3) * 0.1 }}
              className="px-4 py-2 bg-white rounded-full text-primary-700 font-medium text-sm border border-accent shadow-sm"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)" }}
            >
              {cat}
            </motion.div>
          ))}
        </div>
      </div>
      {/* Fade lateral para mini-cards */}
      {/* Mini cards detalhados */}
      <div className="flex justify-center gap-6 relative z-20">
        {professionals.map((prof, idx) => (
          <div
            key={prof.name}
            className={
              idx === 1
                ? "relative p-1 rounded-xl bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600"
                : ""
            }
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className={`w-32 h-44 rounded-xl flex flex-col items-center justify-center bg-white shadow-sm ${
                idx === 1
                  ? "border-4 border-transparent"
                  : "border-2 border-accent"
              }`}
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)" }}
            >
              <img
                src={prof.photo}
                alt={prof.name}
                className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-accent shadow"
              />
              <div className="text-sm font-semibold text-primary-800 mb-1">
                {prof.name}
              </div>
              <div className="text-xs text-primary-600 mb-1">
                {prof.specialty}
              </div>
              {/* Botão de ação */}
              <div className="relative w-full flex justify-center mt-2">
                <button className="px-3 py-1 bg-accent text-white rounded-lg font-medium text-xs shadow">
                  Agendar
                </button>
                {/* Ícone de cursor preto, pulando, apenas no card do meio */}
                {idx === 1 && (
                  <span className=" absolute left-1/2 top-10 -translate-x-1/2 -translate-y-2/3 animate-bounce z-10 pointer-events-none">
                    <FaHandPointer size={28} color="#765604" />
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-2xl" />
    </div>
  );
};

// Passo 2: ProfessionalCard
const ProfessionalCard = () => {
  // URLs externas para foto de perfil
  const photoUrl = "https://randomuser.me/api/portraits/men/32.jpg";
  return (
    <div className="relative w-full flex justify-center">
      {/* Card principal */}
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-md bg-white min-h-[190px] w-[180px]">
        <img
          src={photoUrl}
          alt="Dr. Fernando Alves"
          className="w-20 h-20 rounded-full object-cover mb-3 shadow"
        />
        <div className="text-center mb-2">
          <h4 className="font-bold text-sm text-primary mb-1">
            Dr. Fernando Alves
          </h4>
          <div className="text-base font-semibold text-accent mb-2">
            Ansiedade
          </div>
        </div>
      </div>
      {/* Painel enxuto ao lado */}
      <div className="top-6 right-10 absolute flex flex-col justify-center rounded-2xl shadow-lg bg-white p-5 w-1/3 border border-accent z-20">
        <h5 className="font-bold text-primary-900 text-sm mb-3 flex items-center gap-2">
          <span>👤</span> Dr Fernando Alves
        </h5>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">💰</span>
          <span className="text-primary-800">A partir de R$ 125</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">🗣️</span>
          <span className="text-primary-800">Português, Libras</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">⏰</span>
          <span className="text-primary-800">Seg-Sex: 13h às 21h</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">📍</span>
          <span className="text-primary-800">Recife, PE</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-yellow-500">⭐</span>
          <span className="text-primary-800">4.9 (127 avaliações)</span>
        </div>
        <div className="mt-2 mb-2">
          <div className="font-semibold text-primary-900 text-sm mb-1">
            Especialidades:
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
              Neurodivergência
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
              Desenvolvimento
            </span>
          </div>
        </div>
        <div className="relative w-full flex justify-center mt-4">
          <button className="px-4 py-2 bg-accent text-white rounded-lg font-medium text-sm shadow-lg flex items-center gap-2 relative">
            Agendar
            <span className="absolute top-5 right-3 animate-bounce">
              <FaRegHandPointer size={40} color="#765604" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Passo 3: CalendarStep
const CalendarStep = () => {
  const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] as const;
  const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  const available: Record<(typeof weekDays)[number], string[]> = {
    Seg: ["09:00", "10:00", "14:00"],
    Ter: ["09:00", "11:00", "15:00"],
    Qua: ["10:00", "14:00", "16:00"],
    Qui: ["09:00", "11:00", "15:00"],
    Sex: ["09:00", "10:00", "16:00"],
    Sáb: ["14:00", "15:00"],
    Dom: [],
  };
  const selected = { day: "Qua", time: "14:00" };
  return (
    <div className="relative rounded-2xl bg-white p-10 flex flex-col items-center shadow-lg">
      <div className="w-full">
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="text-xs text-primary-700 font-bold text-center">
                {" "}
              </th>
              {weekDays.map((d) => (
                <th
                  key={d}
                  className="text-xs text-primary-700 font-bold text-center"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Linha fantasma para continuidade */}
            <tr className="opacity-30 select-none pointer-events-none">
              <td className="text-xs font-bold text-right pr-2 align-middle">
                {/* vazio */}
              </td>
              {weekDays.map((d) => {
                const isAvailable = available[d].includes("14:00");
                return (
                  <td key={d}>
                    <div
                      className={`h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all w-full min-w-[90px]
                        ${
                          isAvailable
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-gray-100 text-gray-400 border border-gray-200 select-none"
                        }
                      `}
                    >
                      {isAvailable ? "" : "Indisponível"}
                    </div>
                  </td>
                );
              })}
            </tr>
            {times.map((time) => (
              <tr key={time}>
                <td className="text-xs text-primary-700 font-bold text-right pr-2">
                  {time}
                </td>
                {weekDays.map((d) => {
                  const isAvailable = available[d].includes(time);
                  const isSelected =
                    selected.day === d && selected.time === time;
                  return (
                    <td key={d}>
                      <div
                        className={`h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all w-full min-w-[90px]
                          ${
                            isSelected
                              ? "bg-white text-accent border-2 border-accent shadow-lg font-bold"
                              : isAvailable
                              ? "bg-green-50 text-green-800 border border-green-200"
                              : "bg-gray-100 text-gray-400 border border-gray-200 opacity-60 select-none"
                          }
                        `}
                      >
                        {isSelected
                          ? `${d} ${time}`
                          : isAvailable
                          ? ""
                          : "Indisponível"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Passo 4: LoginForm
const LoginForm = () => {
  const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] as const;
  const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  const available: Record<(typeof weekDays)[number], string[]> = {
    Seg: ["09:00", "10:00", "14:00"],
    Ter: ["09:00", "11:00", "15:00"],
    Qua: ["10:00", "14:00", "16:00"],
    Qui: ["09:00", "11:00", "15:00"],
    Sex: ["09:00", "10:00", "16:00"],
    Sáb: ["14:00", "15:00"],
    Dom: [],
  };
  const selected = { day: "Qua", time: "14:00" };

  return (
    <div className="relative w-[700px] mx-auto flex flex-col items-center bg-white rounded-2xl shadow-md px-8 pb-4">
      {/* Simulação do overflow do calendário */}
      <div
        className="w-full relative mb-8 "
        style={{ maxHeight: 112, marginTop: "-20px" }}
      >
        <table className="w-full border-separate border-spacing-2">
          <tbody>
            {["14:00", "15:00", "16:00"].map((time, idx) => (
              <tr key={time} className={idx === 0 ? "z-0 relative" : ""}>
                <td className="text-xs text-primary-700 font-bold text-right pr-2">
                  {time}
                </td>
                {weekDays.map((d) => {
                  const isAvailable = available[d].includes(time);
                  const isSelected =
                    selected.day === d && selected.time === time;
                  return (
                    <td key={d}>
                      <div
                        className={`h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all w-full min-w-[90px]
                          ${
                            isSelected
                              ? "bg-white text-accent border-2 border-accent shadow-lg font-bold"
                              : isAvailable
                              ? "bg-green-50 text-green-800 border border-green-200"
                              : "bg-gray-100 text-gray-400 border border-gray-200 opacity-60 select-none"
                          }
                        `}
                        style={idx === 0 ? { marginTop: "-8px" } : {}}
                      >
                        {isSelected
                          ? `${d} ${time}`
                          : isAvailable
                          ? ""
                          : "Indisponível"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Gradiente para simular overflow no topo */}
        <div className="absolute left-0 right-0 top-0 h-8 bg-gradient-to-b from-white/90 to-transparent pointer-events-none z-10" />
      </div>
      {/* Formulário principal */}
      <div className="flex flex-row gap-4 w-full mb-8">
        <div
          className="flex-1 px-2 py-1 border border-accent rounded-lg text-xs text-gray-400 bg-white flex items-center justify-start h-7 select-none cursor-default"
          style={{ fontStyle: "italic" }}
        >
          Nome completo
        </div>
        <div
          className="flex-1 px-2 py-1 border border-accent rounded-lg text-xs text-gray-400 bg-white flex items-center justify-start h-7 select-none cursor-default"
          style={{ fontStyle: "italic" }}
        >
          Email
        </div>
        <div
          className="flex-1 px-2 py-1 border border-accent rounded-lg text-xs text-gray-400 bg-white flex items-center justify-start h-7 select-none cursor-default"
          style={{ fontStyle: "italic" }}
        >
          Senha
        </div>
      </div>
      {/* Botão confirmar */}
      <div className="relative w-full flex justify-center mt-2">
        <button className="px-6 py-2 w-40 text-center bg-accent text-white rounded-lg font-bold text-base shadow-lg flex items-center justify-center gap-2 relative">
          Confirmar
          <span className="absolute top-8 left-1/2 -translate-x-1/2 animate-bounce text-2xl select-none pointer-events-none">
            👆
          </span>
        </button>
      </div>
    </div>
  );
};

const HowToUseSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);

  const steps = [
    {
      title: "Filtre os profissionais pela especialidade",
      component: <CategorySelector />,
    },
    {
      title: "Veja a agenda deste profissional",
      component: <ProfessionalCard />,
    },
    {
      title: "Escolha um dia",
      component: <CalendarStep />,
    },
    {
      title: "Termine seu login e PRONTO!",
      component: <LoginForm />,
    },
  ];

  return (
    <section className="w-full py-24 bg-surface-subtle">
      <div className="mx-auto px-4 flex flex-col items-center">
        {/* Bolas com blur */}
        <BlurBalls position="top-left" />
        <BlurBalls position="bottom-right" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-6">
            Como Usar a <span className="gradient-text">Plataforma</span>
          </h2>
          <p className="font-medium text-lg text-primary-700 max-w-3xl mx-auto leading-relaxed">
            Em apenas 4 passos simples, você estará pronto para começar sua
            jornada de autoconhecimento.
          </p>
        </motion.div>

        <div className="w-full mx-auto flex flex-col gap-32 xl:gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                w-full
                flex
                ${index % 2 === 0 ? "justify-start" : "justify-end"}
              
              `}
            >
              <StepRow
                step={index + 1}
                title={step.title}
                isEven={index % 2 === 1}
              >
                {step.component}
              </StepRow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;

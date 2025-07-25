"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

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

const ProcessStepsSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { margin: "-100px" });
  const [delayInicialPassou, setDelayInicialPassou] = useState(false);
  const isMobile = useIsMobile();

  // Array com a sequência de animação: bola1, linha1, bola2, linha2, etc.
  const animationSequence = [
    "bola1",
    "linha1",
    "bola2",
    "linha2",
    "bola3",
    "linha3",
    "bola4",
    "linha4",
    "bola5",
  ];

  useEffect(() => {
    if (!inView || delayInicialPassou) return;
    const timer = setTimeout(() => setDelayInicialPassou(true), 1200);
    return () => clearTimeout(timer);
  }, [inView, delayInicialPassou]);

  useEffect(() => {
    if (!inView || !delayInicialPassou) return;
    if (currentStep < animationSequence.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 220);
      return () => clearTimeout(timeout);
    } else if (inView) {
      // Loop infinito: reinicia a animação se ainda estiver visível
      const timeout = setTimeout(() => {
        setCurrentStep(0);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentStep, inView, delayInicialPassou, animationSequence.length]);

  // Se sair da tela, reseta o delay inicial e a animação
  useEffect(() => {
    if (!inView) {
      setDelayInicialPassou(false);
      setCurrentStep(0);
    }
  }, [inView]);

  const getElementColor = (elementId: string) => {
    const elementIndex = animationSequence.indexOf(elementId);
    if (elementIndex === -1) return "#ACACAC"; // Cor padrão

    if (elementIndex <= currentStep) {
      // Cor dourada para elementos ativos
      return "#D4AF37";
    }

    return "#ACACAC"; // Cor cinza para elementos inativos
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
            Nosso <span className="gradient-text">Processo</span>
          </h2>
          <p className="text-lg text-primary-700 max-w-3xl mx-auto leading-relaxed">
            Cada etapa do nosso processo é cuidadosamente executada para
            garantir que você tenha a melhor experiência possível.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full flex justify-center"
        >
          <div className="w-full max-w-6xl flex justify-center">
            {isMobile ? (
              // SVG Mobile
              <svg
                width="299"
                height="140"
                viewBox="0 0 299 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto max-w-md"
              >
                <g id="bolasMobileFinal">
                  <g id="etapas">
                    <motion.text
                      id="Etapa 1"
                      fill={getElementColor("bola1")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={6}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#606060" }}
                      animate={{ fill: getElementColor("bola1") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="20.0322" y="5.68182">
                        Etapa 1
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="Etapa 2"
                      fill={getElementColor("bola2")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={6}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#606060" }}
                      animate={{ fill: getElementColor("bola2") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="61.1104" y="68.6818">
                        Etapa 2
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="Etapa 3"
                      fill={getElementColor("bola3")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={6}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#606060" }}
                      animate={{ fill: getElementColor("bola3") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="141.02" y="95.6818">
                        Etapa 3
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="Etapa 4"
                      fill={getElementColor("bola4")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={6}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#606060" }}
                      animate={{ fill: getElementColor("bola4") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="221.476" y="68.6818">
                        Etapa 4
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="Etapa 5"
                      fill={getElementColor("bola5")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={6}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#606060" }}
                      animate={{ fill: getElementColor("bola5") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="262.075" y="5.68182">
                        Etapa 5
                      </tspan>
                    </motion.text>
                  </g>
                  <g id="bolas">
                    <motion.path
                      id="linha2"
                      d="M82.5 89C102 97.5 123.5 97 139.5 111.5"
                      stroke={getElementColor("linha2")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("linha2") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.path
                      id="linha3"
                      d="M221 90.5C191.5 110.789 177.5 97.5001 163 110.789"
                      stroke={getElementColor("linha3")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("linha3") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.path
                      id="linha1"
                      d="M41.4998 22.5C86.5 36.5 37 61.5 60.5 79.5"
                      stroke={getElementColor("linha1")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("linha1") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.path
                      id="linha4"
                      d="M262 25C224 39.5 257 60 241 76.5"
                      stroke={getElementColor("linha4")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("linha4") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.circle
                      id="bola1"
                      cx="29.5"
                      cy="21.5"
                      r="12"
                      stroke={getElementColor("bola1")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("bola1") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.circle
                      id="bola2"
                      cx="71.5"
                      cy="84.5"
                      r="12"
                      stroke={getElementColor("bola2")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("bola2") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.circle
                      id="bola3"
                      cx="151.5"
                      cy="111.5"
                      r="12"
                      stroke={getElementColor("bola3")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("bola3") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.circle
                      id="bola4"
                      cx="231.5"
                      cy="84.5"
                      r="12"
                      stroke={getElementColor("bola4")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("bola4") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.circle
                      id="bola5"
                      cx="273.5"
                      cy="21.5"
                      r="12"
                      stroke={getElementColor("bola5")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("bola5") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </g>
                  <g id="textos">
                    <motion.text
                      id="texto5"
                      fill={getElementColor("bola5")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={6}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#343434" }}
                      animate={{ fill: getElementColor("bola5") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="258.498" y="42.6818">
                        Comece a{" "}
                      </tspan>
                      <tspan x="247.204" y="49.6818">
                        melhorar sua vida
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="texto3"
                      fill={getElementColor("bola3")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={6}
                      fontWeight="bold"
                      letterSpacing="0em"
                      initial={{ fill: "#343434" }}
                      animate={{ fill: getElementColor("bola3") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="122.048" y="130.682">
                        Crie uma conta para{" "}
                      </tspan>
                      <tspan x="115.986" y="137.682">
                        concluir o appointment
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="texto2"
                      fill={getElementColor("bola2")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={6}
                      fontWeight="bold"
                      letterSpacing="0em"
                      initial={{ fill: "#343434" }}
                      animate={{ fill: getElementColor("bola2") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="53.5312" y="102.682">
                        Agende pelo{" "}
                      </tspan>
                      <tspan x="48.3984" y="109.682">
                        site uma sessão
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="texto1"
                      fill={getElementColor("bola1")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={6}
                      fontWeight="bold"
                      letterSpacing="0em"
                      initial={{ fill: "#343434" }}
                      animate={{ fill: getElementColor("bola1") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="16.6094" y="39.6818">
                        Ache um{" "}
                      </tspan>
                      <tspan x="1.22852" y="46.6818">
                        psicanalista no site
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="texto4"
                      fill={getElementColor("bola4")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={6}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#343434" }}
                      animate={{ fill: getElementColor("bola4") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="212.483" y="104.682">
                        Volte na data{" "}
                      </tspan>
                      <tspan x="201.541" y="111.682">
                        marcada e faça login
                      </tspan>
                    </motion.text>
                  </g>
                </g>
              </svg>
            ) : (
              // SVG Desktop
              <svg
                width="1231"
                height="253"
                viewBox="0 0 1231 253"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
              >
                <g id="bolasFinal">
                  <g id="bolas">
                    <motion.path
                      id="linha4"
                      d="M951.5 128C1052 111 1065.5 190.5 1135.5 202.5"
                      stroke={getElementColor("linha4")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("linha4") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.path
                      id="linha3"
                      d="M641.5 82.5C737 149 819.5 56 900.5 108.5"
                      stroke={getElementColor("linha3")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("linha3") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.path
                      id="linha2"
                      d="M335 126.5C372.855 145.98 418.5 119.5 463 101C507.5 82.5003 554.145 41.5198 592 61"
                      stroke={getElementColor("linha2")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("linha2") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.circle
                      id="bola1"
                      cx="74"
                      cy="210"
                      r="27.5"
                      stroke={getElementColor("bola1")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("bola1") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.circle
                      id="bola2"
                      cx="309"
                      cy="116"
                      r="27.5"
                      stroke={getElementColor("bola2")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("bola2") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.circle
                      id="bola3"
                      cx="927"
                      cy="116"
                      r="27.5"
                      stroke={getElementColor("bola3")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("bola3") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.circle
                      id="bola4"
                      cx="1162"
                      cy="210"
                      r="27.5"
                      stroke={getElementColor("bola4")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("bola4") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.circle
                      id="bola5"
                      cx="618"
                      cy="69"
                      r="27.5"
                      stroke={getElementColor("bola5")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("bola5") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.path
                      id="linha1"
                      d="M101.5 210.5C205.5 178 185.5 127.5 283 107"
                      stroke={getElementColor("linha1")}
                      initial={{ stroke: "#ACACAC" }}
                      animate={{ stroke: getElementColor("linha1") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </g>
                  <g id="textos">
                    <motion.text
                      id="texto3"
                      fill={getElementColor("bola3")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={15}
                      fontWeight="bold"
                      letterSpacing="0em"
                      initial={{ fill: "#343434" }}
                      animate={{ fill: getElementColor("bola3") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="544.37" y="14.4545">
                        Crie uma conta para{" "}
                      </tspan>
                      <tspan x="529.216" y="32.4545">
                        concluir o appointment
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="texto5"
                      fill={getElementColor("bola5")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={15}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#343434" }}
                      animate={{ fill: getElementColor("bola5") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="1125.75" y="152.455">
                        Comece a{" "}
                      </tspan>
                      <tspan x="1097.51" y="170.455">
                        melhorar sua vida
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="texto2"
                      fill={getElementColor("bola2")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={15}
                      fontWeight="bold"
                      letterSpacing="0em"
                      initial={{ fill: "#343434" }}
                      animate={{ fill: getElementColor("bola2") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="262.828" y="62.4545">
                        Agende pelo{" "}
                      </tspan>
                      <tspan x="249.996" y="80.4545">
                        site uma sessão
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="texto1"
                      fill={getElementColor("bola1")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={15}
                      fontWeight="bold"
                      letterSpacing="0em"
                      initial={{ fill: "#343434" }}
                      animate={{ fill: getElementColor("bola1") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="41.7734" y="154.455">
                        Ache um{" "}
                      </tspan>
                      <tspan x="3.32129" y="172.455">
                        psicanalista no site
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="texto4"
                      fill={getElementColor("bola4")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={15}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#343434" }}
                      animate={{ fill: getElementColor("bola4") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="878.958" y="61.4545">
                        Volte na data{" "}
                      </tspan>
                      <tspan x="851.603" y="79.4545">
                        marcada e faça login
                      </tspan>
                    </motion.text>
                  </g>
                  <g id="etapas">
                    <motion.text
                      id="Etapa 1"
                      fill={getElementColor("bola1")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={12}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#424242" }}
                      animate={{ fill: getElementColor("bola1") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="53" y="249.864">
                        Etapa 1
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="Etapa 3"
                      fill={getElementColor("bola3")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={12}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#424242" }}
                      animate={{ fill: getElementColor("bola3") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="597" y="108.864">
                        Etapa 3
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="Etapa 4"
                      fill={getElementColor("bola4")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={12}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#424242" }}
                      animate={{ fill: getElementColor("bola4") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="905" y="155.864">
                        Etapa 4
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="Etapa 5"
                      fill={getElementColor("bola5")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={12}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#424242" }}
                      animate={{ fill: getElementColor("bola5") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="1140" y="249.864">
                        Etapa 5
                      </tspan>
                    </motion.text>
                    <motion.text
                      id="Etapa 2"
                      fill={getElementColor("bola2")}
                      xmlSpace="preserve"
                      style={{ whiteSpace: "pre" }}
                      fontFamily="Inter"
                      fontSize={12}
                      fontWeight={600}
                      letterSpacing="0em"
                      initial={{ fill: "#424242" }}
                      animate={{ fill: getElementColor("bola2") }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tspan x="288" y="155.864">
                        Etapa 2
                      </tspan>
                    </motion.text>
                  </g>
                </g>
              </svg>
            )}
          </div>
        </motion.div>

        {/* Indicador de progresso */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-primary-200">
            <div className="text-sm font-medium text-primary-700">
              Etapa {Math.floor(currentStep / 2) + 1} de 5
            </div>
            <div className="w-32 bg-primary-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    ((currentStep + 1) / animationSequence.length) * 100
                  }%`,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessStepsSection;

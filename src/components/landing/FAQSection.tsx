"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  ShieldCheckIcon,
  ClockIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function FAQSection() {
  const { t } = useLanguage();
  const { darkMode } = useTheme();

  // Perguntas e respostas da imagem de referência
  const faqs = [
    {
      question: "Como funcionam as sessões online?",
      answer:
        "Nossas sessões são realizadas por videochamada em plataforma segura e confidencial. Você pode se conectar de qualquer lugar do mundo, precisando apenas de internet estável. Garantimos total privacidade e sigilo profissional.",
    },
    {
      question: "Os psicanalistas entendem a realidade de viver no exterior?",
      answer:
        "Sim! Todos nossos profissionais são especializados no atendimento a brasileiros expatriados. Muitos atendem pacientes que vivem no exterior, viveram ou ainda vivem no exterior, compreendendo profundamente os desafios únicos dessa experiência. Nossos valores são acessíveis e pensados para brasileiros no exterior. Oferecemos primeira consulta gratuita e planos mensais flexíveis.",
    },
    {
      question: "Qual o valor das consultas?",
      answer:
        "Entre em contato para conhecer nossas opções de pagamento internacional.",
    },
    {
      question: "Posso escolher meu psicanalista?",
      answer:
        "Absolutamente! Contanto que o psicanalista atenda sua demanda de dia e horário, pode conhecer o perfil de todos nossos profissionais e escolher aquele com quem se identifica mais. Também oferecemos um primeiro encontro sem custos.",
    },
    {
      question: "Que tipo de questões vocês atendem?",
      answer:
        "Atendemos desde adaptação cultural, saudade de casa, questões de identidade, até ansiedade, depressão, relacionamentos e crescimento pessoal. Cada brasileiro no exterior tem sua jornada única.",
    },
    {
      question: "Como mantenho a privacidade morando com outras pessoas?",
      answer:
        "Oferecemos orientações sobre como criar um espaço privado para suas sessões. Muitos clientes usam fones de ouvido e escolhem horários específicos. Também temos flexibilidade de horários para diferentes fusos.",
    },
  ];

  return (
    <section className="bg-[#c5e2ff] w-full py-20 px-4 md:px-16 lg:px-32 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">
        <motion.h2
          className="font-akzidens text-3xl md:text-4xl font-bold mb-8 text-cyan-500 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Dúvidas Frequentes
        </motion.h2>
        <motion.p
          className="text-lg text-white font-medium mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          Esclarecemos suas principais dúvidas sobre nossos serviços de
          psicanálise online
        </motion.p>
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <Disclosure>
                {({ open }) => (
                  <div
                    className={`rounded-xl shadow group transition-all duration-300 bg-white border-2 ${
                      open ? "border-[#01386F]" : "border-transparent"
                    }`}
                  >
                    <Disclosure.Button className="flex w-full justify-between items-center px-6 py-5 text-left font-akzidens text-lg text-[#01386F] font-bold focus:outline-none">
                      <span>{faq.question}</span>
                      <ChevronDownIcon
                        className={`h-5 w-5 ml-4 transition-transform duration-300 ${
                          open ? "rotate-180" : ""
                        } text-[#01386F]`}
                      />
                    </Disclosure.Button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="panel"
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.4, 0.0, 0.2, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-[#5a5427] text-base border-t border-[#d6cfae]">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

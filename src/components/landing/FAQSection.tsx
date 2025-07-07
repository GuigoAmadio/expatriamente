"use client";

import { motion } from "framer-motion";
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

  // Recupera as FAQs das traduções de forma correta

  // Busca diretamente no contexto
  const getFaqTranslation = (index: number, field: string) => {
    return t(`items.${index}.${field}`, "faq");
  };

  const faqs = [
    {
      question: getFaqTranslation(0, "question"),
      answer: getFaqTranslation(0, "answer"),
    },
    {
      question: getFaqTranslation(1, "question"),
      answer: getFaqTranslation(1, "answer"),
    },
    {
      question: getFaqTranslation(2, "question"),
      answer: getFaqTranslation(2, "answer"),
    },
    {
      question: getFaqTranslation(3, "question"),
      answer: getFaqTranslation(3, "answer"),
    },
    {
      question: getFaqTranslation(4, "question"),
      answer: getFaqTranslation(4, "answer"),
    },
    {
      question: getFaqTranslation(5, "question"),
      answer: getFaqTranslation(5, "answer"),
    },
  ];

  return (
    <section className="bg-background text-primary w-full py-16 px-4 md:px-16 lg:px-32 flex flex-col items-center justify-center">
      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className={`font-semibold text-sm uppercase tracking-wide`}>
              {t("tag", "faq")}
            </span>
          </motion.div>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-heading"
          >
            {t("title", "faq")}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg"
          >
            {t("subtitle", "faq")}
          </motion.p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Disclosure>
                {({ open }) => (
                  <motion.div
                    className={`relative rounded-xl shadow-sm group hover:shadow-md transition-all duration-300 bg-claro overflow-hidden border-2 ${
                      open ? "border-orange-400" : "border-transparent"
                    }`}
                    style={{ background: "white" }}
                  >
                    {/* Borda gradiente animada */}
                    {open && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 pointer-events-none z-0 rounded-xl border-2 border-transparent bg-white"
                        style={{ WebkitMaskImage: "linear-gradient(#fff 0 0)" }}
                      />
                    )}
                    <div className="relative z-10">
                      <Disclosure.Button
                        className={`flex w-full justify-between items-center px-6 py-5 text-left transition-all duration-300 group
                          ${
                            open
                              ? darkMode === "dark"
                                ? "text-accent"
                                : "text-primary"
                              : darkMode === "dark"
                              ? "text-surface hover:bg-secondary"
                              : "text-primary hover:bg-surface"
                          }`}
                      >
                        <span
                          className={`font-medium text-sm md:text-lg transition-colors duration-300
                            ${
                              open
                                ? darkMode === "dark"
                                  ? "text-accent"
                                  : "text-primary"
                                : darkMode === "dark"
                                ? "text-surface group-hover:text-accent"
                                : "text-primary group-hover:text-accent"
                            }`}
                        >
                          {faq.question}
                        </span>
                        <ChevronDownIcon
                          className={`h-3 w-3 md:h-5 md:w-5 transition-all duration-500 ease-in-out ml-4 flex-shrink-0
                            ${
                              open
                                ? darkMode === "dark"
                                  ? "text-accent"
                                  : "text-primary"
                                : darkMode === "dark"
                                ? "text-surface group-hover:text-accent"
                                : "text-primary group-hover:text-accent"
                            }
                            ${open ? "rotate-180 transform" : ""}`}
                        />
                      </Disclosure.Button>
                      <motion.div
                        initial={false}
                        animate={{
                          height: open ? "auto" : 0,
                          opacity: open ? 1 : 0,
                        }}
                        transition={{
                          height: {
                            duration: 0.6,
                            ease: [0.04, 0.62, 0.23, 0.98],
                          },
                          opacity: {
                            duration: 0.4,
                            delay: open ? 0.1 : 0,
                          },
                        }}
                      >
                        <Disclosure.Panel
                          static
                          className={`px-6 pb-5 leading-relaxed ${
                            darkMode === "dark"
                              ? "text-surface"
                              : "text-primary"
                          }`}
                        >
                          <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className={`border-t pt-4 ${
                              darkMode === "dark"
                                ? "border-primary"
                                : "border-primary/10"
                            }`}
                          >
                            {faq.answer}
                          </motion.div>
                        </Disclosure.Panel>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </div>

        {/* CTA adicional */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20 flex flex-col items-center justify-center bg-white/70 rounded-xl px-12 py-7 shadow-sm text-claro"
        >
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4 mt-10">
            Ainda tem dúvidas?
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-00 to-orange-600 bg-clip-text text-transparent">
              Nossa equipe está aqui para ajudar
            </span>
            .
          </h3>

          {/* Linha de 3 textos pequenos com ícones */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-6 text-lg text-primary my-8">
            <span className="flex items-center gap-2">
              <StarIcon className="h-5 w-5 text-primary" />
              Privacidade garantida
            </span>
            <span className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-primary" />
              Resposta rápida
            </span>
            <span className="flex items-center gap-2">
              <GlobeAltIcon className="h-5 w-5 text-primary" />
              Atendimento internacional
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-10 w-full max-w-2xl">
            <button className="flex-1 min-w-[220px] px-4 py-4 rounded-2xl font-bold text-base shadow-xl bg-background-oposite text-white flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              Conversar no WhatsApp
            </button>
            <button className="flex-1 min-w-[220px] px-4 py-4 rounded-2xl font-bold text-base shadow-xl bg-orange-400 text-white flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300">
              <CalendarDaysIcon className="h-5 w-5" />
              Agendar Consulta Gratuita
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

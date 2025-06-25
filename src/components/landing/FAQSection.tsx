"use client";

import { motion } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function FAQSection() {
  const { t } = useLanguage();
  const { darkMode } = useTheme();

  // Recupera as FAQs das traduções de forma correta
  const { language } = useLanguage();

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
    <>
      {/* FAQ Section */}
      <section
        className={`py-24 transition-colors duration-300 ${
          darkMode === "dark" ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span
                className={`font-semibold text-sm uppercase tracking-wide ${
                  darkMode === "dark" ? "text-teal-400" : "text-orange-500"
                }`}
              >
                {t("tag", "faq")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                darkMode === "dark" ? "text-teal-400" : "text-orange-500"
              }`}
            >
              {t("title", "faq")}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-lg ${
                darkMode === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
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
                    <div
                      className={`relative rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 ${
                        darkMode === "dark" ? "bg-gray-700" : "bg-white"
                      } ${
                        open
                          ? darkMode === "dark"
                            ? "border-2 border-teal-400"
                            : "border-2 border-orange-500"
                          : "border border-transparent"
                      }`}
                    >
                      {/* Borda gradiente no hover */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                          open
                            ? darkMode === "dark"
                              ? "border-2 border-teal-400"
                              : "border-2 border-orange-500"
                            : "border border-transparent"
                        }`}
                        style={{ padding: "2px" }}
                      >
                        <div
                          className={`w-full h-full rounded-xl ${
                            darkMode === "dark" ? "bg-gray-700" : "bg-white"
                          }`}
                        ></div>
                      </div>

                      <div className="relative z-10">
                        <Disclosure.Button
                          className={`flex w-full justify-between items-center px-6 py-5 text-left transition-all duration-300 group
                            ${
                              open
                                ? darkMode === "dark"
                                  ? "text-teal-400"
                                  : "text-orange-500"
                                : darkMode === "dark"
                                ? "text-white hover:bg-gray-600"
                                : "text-gray-900 hover:bg-gray-50"
                            }`}
                        >
                          <span
                            className={`font-medium text-lg transition-colors duration-300
                              ${
                                open
                                  ? darkMode === "dark"
                                    ? "text-teal-400"
                                    : "text-orange-500"
                                  : darkMode === "dark"
                                  ? "text-white group-hover:text-teal-400"
                                  : "text-gray-900 group-hover:text-orange-600"
                              }`}
                          >
                            {faq.question}
                          </span>
                          <ChevronDownIcon
                            className={`h-5 w-5 transition-all duration-500 ease-in-out ml-4 flex-shrink-0
                              ${
                                open
                                  ? darkMode === "dark"
                                    ? "text-teal-400"
                                    : "text-orange-500"
                                  : darkMode === "dark"
                                  ? "text-gray-400 group-hover:text-teal-400"
                                  : "text-gray-500 group-hover:text-orange-500"
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
                          style={{ overflow: "hidden" }}
                        >
                          <Disclosure.Panel
                            static
                            className={`px-6 pb-5 leading-relaxed ${
                              darkMode === "dark"
                                ? "text-gray-300"
                                : "text-gray-600"
                            }`}
                          >
                            <motion.div
                              initial={{ y: -10 }}
                              animate={{ y: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                              className={`border-t pt-4 ${
                                darkMode === "dark"
                                  ? "border-gray-600"
                                  : "border-gray-100"
                              }`}
                            >
                              {faq.answer}
                            </motion.div>
                          </Disclosure.Panel>
                        </motion.div>
                      </div>
                    </div>
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
            className="text-center mt-12"
          >
            <p
              className="text-gray-600 dark:text-gray-300 mb-6"
              style={{ color: darkMode === "dark" ? "#d1d5db" : "#000000" }}
            >
              {t("cta.text", "faq")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                className={`px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg text-white ${
                  darkMode === "dark"
                    ? "bg-teal-500 hover:bg-teal-600"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {t("cta.whatsapp", "faq")}
              </button>
              <button
                className={`px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 border ${
                  darkMode === "dark"
                    ? "bg-gray-700 text-white border-teal-500 hover:bg-teal-600"
                    : "bg-white text-gray-900 border-orange-500 hover:bg-orange-50"
                }`}
              >
                {t("cta.schedule", "faq")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-16 transition-colors duration-300 ${
          darkMode === "dark"
            ? "bg-gray-900 text-white hover:text-teal-500"
            : "bg-neutral-200 text-gray-900 hover:text-orange-500"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* CTA Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className={`text-2xl md:text-3xl font-bold mb-4 ${
                  darkMode === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {t("cta", "footer")}
              </h3>
              <p
                className={`text-gray-300 mb-8 max-w-2xl mx-auto text-lg ${
                  darkMode === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t("ctaDesc", "footer")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  className={`rounded-xl px-8 py-3 font-semibold transition-all hover:scale-105 shadow-lg text-white ${
                    darkMode === "dark"
                      ? "bg-teal-500 hover:bg-teal-600"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  {t("getStarted", "footer")}
                </button>
                <button
                  className={`rounded-xl px-8 py-3 font-semibold transition-all hover:scale-105 border ${
                    darkMode === "dark"
                      ? "bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border-teal-500/20"
                      : "bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 border-orange-500/20"
                  }`}
                >
                  {t("freeConsultation", "footer")}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                <span
                  className={
                    darkMode === "dark"
                      ? "bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
                  }
                >
                  {t("company", "footer")}
                </span>
              </h4>
              <p
                className={`text-gray-300 text-sm mb-6 max-w-md ${
                  darkMode === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t("companyDesc", "footer")}
              </p>
              <div
                className={`text-gray-300 text-sm space-y-2 ${
                  darkMode === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  contato@expatriamente.com
                </div>
                <div className="flex items-center gap-2">
                  <FaWhatsapp className="w-4 h-4" />
                  +55 (11) 9 8765-4321
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Atendimento global • Fuso flexível
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className={`text-lg font-semibold mb-4 ${
                  darkMode === "dark" ? "text-teal-400" : "text-orange-500"
                }`}
              >
                {t("quickLinks", "footer")}
              </h4>
              <ul
                className={`space-y-3 text-sm ${
                  darkMode === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <li>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "hover:text-teal-400"
                        : "hover:text-orange-500"
                    }`}
                  >
                    {t("links.aboutUs", "footer")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "hover:text-teal-400"
                        : "hover:text-orange-500"
                    }`}
                  >
                    {t("links.psychologists", "footer")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "hover:text-teal-400"
                        : "hover:text-orange-500"
                    }`}
                  >
                    {t("links.stories", "footer")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "hover:text-teal-400"
                        : "hover:text-orange-500"
                    }`}
                  >
                    {t("links.blog", "footer")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "hover:text-teal-400"
                        : "hover:text-orange-500"
                    }`}
                  >
                    {t("links.faq", "footer")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4
                className={`text-lg font-semibold mb-4 ${
                  darkMode === "dark" ? "text-teal-400" : "text-orange-500"
                }`}
              >
                {t("support", "footer")}
              </h4>
              <ul
                className={`space-y-3 text-sm ${
                  darkMode === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <li>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "hover:text-teal-400"
                        : "hover:text-orange-500"
                    }`}
                  >
                    {t("links.contact", "footer")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "hover:text-teal-400"
                        : "hover:text-orange-500"
                    }`}
                  >
                    {t("links.help", "footer")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "hover:text-teal-400"
                        : "hover:text-orange-500"
                    }`}
                  >
                    {t("links.pricing", "footer")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "hover:text-teal-400"
                        : "hover:text-orange-500"
                    }`}
                  >
                    {t("links.privacy", "footer")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "hover:text-teal-400"
                        : "hover:text-orange-500"
                    }`}
                  >
                    {t("links.terms", "footer")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media & Copyright */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p
                  className={`text-sm ${
                    darkMode === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  © 2024 {t("company", "footer")}. {t("allRights", "footer")}
                </p>
              </div>

              <div className="flex items-center space-x-6">
                <span
                  className={`text-sm ${
                    darkMode === "dark"
                      ? "text-neutral-100"
                      : "text-neutral-800"
                  }`}
                >
                  {t("followUs", "footer")}:
                </span>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "text-neutral-100 hover:text-teal-300"
                        : "text-neutral-800 hover:text-orange-600"
                    }`}
                    aria-label="Facebook"
                  >
                    <FaFacebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "text-neutral-100 hover:text-teal-300"
                        : "text-neutral-800 hover:text-orange-600"
                    }`}
                    aria-label="Instagram"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "text-neutral-100 hover:text-teal-300"
                        : "text-neutral-800 hover:text-orange-600"
                    }`}
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "text-neutral-100 hover:text-teal-300"
                        : "text-neutral-800 hover:text-orange-600"
                    }`}
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className={`transition-colors duration-300 ${
                      darkMode === "dark"
                        ? "text-neutral-100 hover:text-teal-300"
                        : "text-neutral-800 hover:text-orange-600"
                    }`}
                    aria-label="YouTube"
                  >
                    <FaYoutube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

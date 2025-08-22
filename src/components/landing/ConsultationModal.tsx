"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📞 Número enviado:", phoneNumber);
    // Aqui você pode adicionar lógica para enviar o número
  };

  const handleWhatsAppClick = () => {
    const message =
      "Olá! Gostaria de agendar uma consulta com um psicanalista.";
    const whatsappUrl = `https://wa.me/0017543087970?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gradient-to-br from-[#f8f6f2] to-white border border-[#e4ded2] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background decorativo com cores da paleta */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Gradientes harmonizados com a paleta */}
              <div className="absolute -top-8 -left-8 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-[#9ca995]/30 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 sm:w-56 sm:h-56 bg-gradient-to-tl from-[#987b6b]/20 to-transparent rounded-full blur-3xl"></div>
              
              {/* Gradientes adicionais */}
              <div className="absolute top-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-bl from-[#587861]/25 to-transparent rounded-full blur-xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tr from-[#e4ded2]/50 to-transparent rounded-full blur-2xl"></div>

              {/* Bolinhas decorativas - cores da paleta */}
              <div className="absolute top-8 right-12 w-4 h-4 sm:w-6 sm:h-6 bg-[#9ca995]/40 rounded-full"></div>
              <div className="absolute top-16 right-20 w-3 h-3 sm:w-4 sm:h-4 bg-[#987b6b]/30 rounded-full"></div>
              <div className="absolute top-24 right-8 w-2 h-2 sm:w-3 sm:h-3 bg-[#587861]/35 rounded-full"></div>

              <div className="absolute bottom-16 left-8 w-5 h-5 sm:w-8 sm:h-8 bg-[#e4ded2]/60 rounded-full"></div>
              <div className="absolute bottom-12 left-16 w-3 h-3 sm:w-5 sm:h-5 bg-[#587861]/30 rounded-full"></div>
              <div className="absolute bottom-28 left-12 w-2 h-2 sm:w-3 sm:h-3 bg-[#9ca995]/40 rounded-full"></div>

              {/* Bolinhas extras */}
              <div className="absolute top-2/3 left-1/3 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-[#e4ded2]/50 rounded-full"></div>
              <div className="absolute top-1/4 left-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#987b6b]/30 rounded-full"></div>
              <div className="absolute bottom-1/2 right-1/3 w-3 h-3 sm:w-4 sm:h-4 bg-[#9ca995]/35 rounded-full"></div>
            </div>

            {/* Botão de fechar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 hover:bg-[#e4ded2] rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#587861]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Conteúdo do modal */}
            <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10">
              {/* Título */}
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="font-akzidens text-lg sm:text-xl md:text-2xl font-medium text-[#587861] max-w-sm sm:max-w-md md:max-w-lg text-center leading-relaxed"
              >
                Deixe que nós encontremos o melhor psicanalista para você.
              </motion.h2>

              {/* Formulário */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                onSubmit={handleSubmit}
                className="w-full space-y-6 sm:space-y-8 flex flex-col items-center"
              >
                {/* Campo de telefone */}
                <div className="w-full max-w-sm sm:max-w-md">
                  <label
                    htmlFor="phone"
                    className="block text-[#587861] font-akzidens font-medium text-sm sm:text-base mb-2 sm:mb-3"
                  >
                    Seu número de telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 sm:py-4 bg-white border-2 border-[#e4ded2] rounded-lg focus:ring-2 focus:ring-[#587861]/30 focus:border-[#587861] outline-none transition-all duration-200 text-[#587861] placeholder-[#9ca995] font-akzidens text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row w-full max-w-sm sm:max-w-md gap-3 sm:gap-4">
                  {/* Botão Enviar */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-[#987b6b] hover:bg-[#8a6a55] text-white font-akzidens font-bold py-3 sm:py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Enviar
                  </motion.button>

                  {/* Botão WhatsApp */}
                  <motion.button
                    type="button"
                    onClick={handleWhatsAppClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-[#587861] hover:bg-[#4a6a5a] text-white font-akzidens font-bold py-3 sm:py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.90-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    <span className="hidden sm:inline">Ir para o WhatsApp</span>
                    <span className="sm:hidden">WhatsApp</span>
                  </motion.button>
                </div>
              </motion.form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

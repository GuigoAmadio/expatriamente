"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CtaConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CtaConsultationModal({
  isOpen,
  onClose,
}: CtaConsultationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md bg-gradient-to-br from-[#f8f6f2] to-white border border-[#e4ded2] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="relative p-6 pb-4 bg-gradient-to-r from-[#9dc9e2] to-[#9ca995]">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
              >
                <span className="text-white text-lg">×</span>
              </button>

              <div className="text-center">
                <h3 className="font-akzidens text-xl font-bold text-white mb-2">
                  Agende sua Primeira Sessão
                </h3>
                <p className="text-white/90 text-sm">
                  Gratuita e sem compromisso
                </p>
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-[#6B3F1D] text-sm mb-4">
                    Escolha a forma mais conveniente para entrar em contato:
                  </p>
                </div>

                {/* Botão WhatsApp */}
                <button
                  onClick={() => {
                    const message =
                      "Olá! Gostaria de agendar uma consulta com um psicanalista.";
                    const whatsappUrl = `https://wa.me/0017543087970?text=${encodeURIComponent(
                      message
                    )}`;
                    window.open(whatsappUrl, "_blank");
                    onClose();
                  }}
                  className="w-full px-6 py-3 bg-[#25D366] text-white font-akzidens font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>📱</span>
                  <span>Falar via WhatsApp</span>
                </button>

                {/* Formulário de contato */}
                <div className="border-t border-[#e4ded2] pt-4">
                  <p className="text-[#6B3F1D] text-xs text-center mb-3">
                    Ou deixe seu número que entraremos em contato:
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log("📞 Formulário enviado");
                      onClose();
                    }}
                    className="space-y-3"
                  >
                    <input
                      type="tel"
                      placeholder="Seu WhatsApp com código do país"
                      className="w-full px-4 py-3 border border-[#e4ded2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9ca995] text-sm"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-to-r from-[#9ca995] to-[#587861] text-white font-akzidens font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Enviar Contato
                    </button>
                  </form>
                </div>

                {/* Informações adicionais */}
                <div className="text-center pt-2 border-t border-[#e4ded2]">
                  <p className="text-[#6B3F1D] text-xs opacity-80">
                    🔒 Seus dados estão seguros conosco
                    <br />
                    📞 Retornamos em até 24 horas
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

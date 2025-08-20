"use client";

import { useState } from "react";

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

  // Modal simples sem animações para teste
  if (!isOpen) return null;

  return (
    <div
      className="fixed z-[99999] flex items-center justify-center p-4"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decoração de fundo */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradiente blur de fundo - Mais intenso */}
          <div className="absolute -top-8 -left-8 w-48 h-48 bg-gradient-to-br from-lime-200/60 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-gradient-to-tl from-amber-500/30 to-transparent rounded-full blur-3xl"></div>

          {/* Gradientes adicionais para mais profundidade */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-bl from-amber-600/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-tr from-lime-200/40 to-transparent rounded-full blur-2xl"></div>

          {/* Bolinhas decorativas - Maiores e mais expressivas */}
          <div className="absolute top-12 right-16 w-6 h-6 bg-lime-200/35 rounded-full"></div>
          <div className="absolute top-20 right-24 w-4 h-4 bg-amber-500/45 rounded-full"></div>
          <div className="absolute top-32 right-12 w-3 h-3 bg-lime-500/30 rounded-full"></div>

          <div className="absolute bottom-24 left-12 w-8 h-8 bg-lime-200/40 rounded-full"></div>
          <div className="absolute bottom-16 left-20 w-5 h-5 bg-amber-500/35 rounded-full"></div>
          <div className="absolute bottom-36 left-16 w-3 h-3 bg-lime-200/45 rounded-full"></div>

          {/* Bolinhas extras para mais dinâmica */}
          <div className="absolute top-2/3 left-1/3 w-3.5 h-3.5 bg-lime-200/25 rounded-full"></div>
          <div className="absolute top-1/4 left-12 w-2 h-2 bg-amber-500/50 rounded-full"></div>
          <div className="absolute bottom-1/2 right-1/3 w-4 h-4 bg-lime-200/35 rounded-full"></div>
        </div>
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 bg-[#f8f6f2] hover:bg-[#e4ded2] rounded-full flex items-center justify-center transition-colors duration-200 z-10"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "24px",
            height: "24px",
            backgroundColor: "#f8f6f2",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg
            className="w-4 h-4 text-[#6B3F1D]"
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
        <div className="p-20 flex flex-col items-center justify-around gap-10">
          {/* Título */}
          <h2 className="font-inter text-xl font-thin text-[#6B3F1D] max-w-lg text-center italic mb-5">
            Deixe que nós encontremos o melhor psicanalista para você.
          </h2>

          {/* Formulário */}
          <form
            onSubmit={handleSubmit}
            className="space-y-8 flex flex-col items-center justify-center gap-10 w-full z-40"
          >
            {/* Campo de telefone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-[#5b7470] font-thin font-inter"
              >
                Seu número de telefone
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full max-w-sm px-4 py-3 border border-[#e4ded2] rounded-lg focus:ring-2 focus:ring-[#9dc9e2] focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>

            <div className="flex w-full justify-between items-center gap-4">
              {/* Botão Enviar */}
              <button
                type="submit"
                className="shadow-amber-800 shadow-md hover:shadow- w-full bg-[#6B3F1D] hover:bg-[#9a7b66] text-[#ffffff] font-akzidens font-bold py-3 px-6 rounded-lg transition-colors duration-200 hover:cursor-pointer"
              >
                Enviar
              </button>

              {/* Botão WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="shadow-green-900 shadow-md hover:shadow- w-full bg-[#587861] hover:bg-[#74b68a] hover:cursor-pointer text-white font-akzidens font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.90-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Ir para o WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

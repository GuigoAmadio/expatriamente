"use client";

import { useState } from "react";
import { submitContactForm } from "@/actions";
import { Button, Input } from "@/components/ui";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "Mensagem enviada com sucesso!",
        });
        // Limpar formulário
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form?.reset();
      } else {
        setMessage({
          type: "error",
          text: result.error || "Erro ao enviar mensagem",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro interno. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-background text-primary w-full pt-40 py-16 px-4 md:px-16 lg:px-32 flex flex-col items-center justify-center">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Lado Esquerdo - Informações */}
          <div className="space-y-8 flex flex-col gap-3 justify-center">
            <div>
              <h2 className="text-xl lg:text-3xl font-bold mb-6">
                Fale conosco!
              </h2>
              <p className="text-base leading-relaxed">
                Estamos aqui para ajudar você em sua jornada de expatriação.
                Nossa equipe especializada está pronta para responder suas
                dúvidas e oferecer o suporte necessário para essa importante
                transição em sua vida.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-strong"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="">contato@expatriamente.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-strong"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Horário de Atendimento</h3>
                  <p className="">Segunda a Sexta: 9h às 18h (GMT)</p>
                  <p className="">Resposta em até 24 horas</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-strong"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold ">Especialidades</h3>
                  <p className="">Europa, América do Norte, Oceania</p>
                  <p className="">Processos de imigração e adaptação</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito - Retângulo verde + Formulário */}
          <div className="flex flex-col gap-6">
            {/* Retângulo verde em cima */}
            <div className="bg-background-oposite text-claro p-6 rounded-lg shadow-lg mb-2">
              <h3 className="font-semibold mb-3 text-strong">
                Primeira Consulta Gratuita
              </h3>
              <p className="text-sm">
                Agende uma conversa inicial sem compromisso para entendermos
                melhor seus objetivos e como podemos ajudar em sua jornada de
                expatriação.
              </p>
            </div>
            {/* Formulário */}
            <div className="text-primary bg-background-secondary p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Envie sua Mensagem</h3>
              {message && (
                <div
                  className={`mb-4 p-3 rounded-lg ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {message.text}
                </div>
              )}
              <form
                id="contact-form"
                action={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Nome Completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    placeholder="Conte-nos mais sobre seus planos de expatriação, dúvidas ou como podemos ajudar..."
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg placeholder-claro focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>
                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/2 bg-botao-primary py-2 px-4 rounded-lg hover:scale-105 transition duration-300 hover:cursor-pointer text-secondary"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg
                          className="animate-spin w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Enviando...</span>
                      </div>
                    ) : (
                      "Enviar Mensagem"
                    )}
                  </button>
                </div>
              </form>
              <p className="text-xs mt-2">
                * Campos obrigatórios. Seus dados são tratados com segurança e
                privacidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

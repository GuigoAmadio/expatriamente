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
    <section className="w-full py-16 px-4 md:px-16 lg:px-32 flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Lado Esquerdo - Informações */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-textPrimary mb-6">
                Entre em Contato
              </h2>
              <p className="text-lg text-textSecondary leading-relaxed">
                Estamos aqui para ajudar você em sua jornada de expatriação.
                Nossa equipe especializada está pronta para responder suas
                dúvidas e oferecer o suporte necessário para essa importante
                transição em sua vida.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-textOnPrimary"
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
                  <h3 className="font-semibold text-textPrimary">Email</h3>
                  <p className="text-textSecondary">
                    contato@expatriamente.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-textOnPrimary"
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
                  <h3 className="font-semibold text-textPrimary">
                    Horário de Atendimento
                  </h3>
                  <p className="text-textSecondary">
                    Segunda a Sexta: 9h às 18h (GMT)
                  </p>
                  <p className="text-textSecondary">Resposta em até 24 horas</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-textOnPrimary"
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
                  <h3 className="font-semibold text-textPrimary">
                    Especialidades
                  </h3>
                  <p className="text-textSecondary">
                    Europa, América do Norte, Oceania
                  </p>
                  <p className="text-textSecondary">
                    Processos de imigração e adaptação
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surfaceElevated p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-textPrimary mb-3">
                Consulta Gratuita de 30 minutos
              </h3>
              <p className="text-textSecondary text-sm">
                Agende uma conversa inicial sem compromisso para entendermos
                melhor seus objetivos e como podemos ajudar em sua jornada de
                expatriação.
              </p>
            </div>
          </div>

          {/* Lado Direito - Formulário */}
          <div className="bg-surface p-8 rounded-2xl shadow-lg border border-border">
            <h3 className="text-2xl font-bold text-textPrimary mb-6">
              Envie sua Mensagem
            </h3>

            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <form id="contact-form" action={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-textPrimary mb-2"
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
                  className="block text-sm font-medium text-textPrimary mb-2"
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
                  htmlFor="subject"
                  className="block text-sm font-medium text-textPrimary mb-2"
                >
                  Assunto *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Como podemos ajudar?"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-textPrimary mb-2"
                >
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Conte-nos mais sobre seus planos de expatriação, dúvidas ou como podemos ajudar..."
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-textPrimary placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
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
              </Button>
            </form>

            <p className="text-xs text-textMuted mt-4">
              * Campos obrigatórios. Seus dados são tratados com segurança e
              privacidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function FacebookTestEvents() {
  const { testServerEvent } = useFacebookPixel();
  const [eventName, setEventName] = useState("PageView");
  const [customData, setCustomData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastResult, setLastResult] = useState<string>("");

  const predefinedEvents = [
    "PageView",
    "ViewContent",
    "Lead",
    "Schedule",
    "CompleteRegistration",
    "Purchase",
    "AddToCart",
    "InitiateCheckout",
    "Contact",
    "Subscribe",
  ];

  const handleTestEvent = async () => {
    if (!eventName.trim()) {
      setLastResult("❌ Nome do evento é obrigatório");
      return;
    }

    setIsLoading(true);
    setLastResult("🔄 Enviando evento de teste...");

    try {
      let parameters = {};
      
      // Tentar fazer parse do JSON customizado se fornecido
      if (customData.trim()) {
        try {
          parameters = JSON.parse(customData);
        } catch (e) {
          setLastResult("❌ JSON customizado inválido");
          setIsLoading(false);
          return;
        }
      }

      // Adicionar dados padrão para teste
      const testParameters = {
        ...parameters,
        test_source: "Facebook Test Events Component",
        test_timestamp: new Date().toISOString(),
        test_user_agent: navigator.userAgent,
        test_url: window.location.href,
      };

      await testServerEvent(eventName, testParameters);
      
      setLastResult(
        `✅ Evento de teste "${eventName}" enviado com sucesso!\n` +
        `🧪 Use o código TEST24945 no Facebook Events Manager para verificar`
      );
    } catch (error) {
      setLastResult(`❌ Erro ao enviar evento: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickTest = async (event: string) => {
    setEventName(event);
    setCustomData("");
    await handleTestEvent();
  };

  const handleClearResult = () => {
    setLastResult("");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🧪 Teste de Eventos do Facebook Pixel
        </h2>
        <p className="text-gray-600 text-sm">
          Use este componente para testar eventos do Facebook Pixel com o código de teste{" "}
          <code className="bg-yellow-100 px-2 py-1 rounded text-sm font-mono">
            TEST24945
          </code>
        </p>
      </div>

      {/* Seleção de Evento */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nome do Evento:
        </label>
        <Input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Digite o nome do evento"
          className="w-full"
        />
      </div>

      {/* Dados Customizados */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dados Customizados (JSON opcional):
        </label>
        <textarea
          value={customData}
          onChange={(e) => setCustomData(e.target.value)}
          placeholder='{"content_name": "Teste", "content_category": "Debug"}'
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      {/* Botão de Teste */}
      <div className="mb-6">
        <Button
          onClick={handleTestEvent}
          disabled={isLoading || !eventName.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? "🔄 Enviando..." : "🧪 Enviar Evento de Teste"}
        </Button>
      </div>

      {/* Eventos Rápidos */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Testes Rápidos:
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {predefinedEvents.map((event) => (
            <Button
              key={event}
              onClick={() => handleQuickTest(event)}
              disabled={isLoading}
              className="text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              {event}
            </Button>
          ))}
        </div>
      </div>

      {/* Resultado */}
      {lastResult && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Resultado:</h3>
            <Button
              onClick={handleClearResult}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              Limpar
            </Button>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <pre className="whitespace-pre-wrap text-sm text-gray-700">
              {lastResult}
            </pre>
          </div>
        </div>
      )}

      {/* Instruções */}
      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-semibold text-blue-800 mb-2">📋 Como Verificar:</h4>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>Envie um evento de teste usando o botão acima</li>
          <li>Acesse o Facebook Events Manager</li>
          <li>Procure por eventos com o código <code className="bg-blue-100 px-1 rounded">TEST24945</code></li>
          <li>Verifique se o evento foi recebido corretamente</li>
        </ol>
      </div>
    </div>
  );
}

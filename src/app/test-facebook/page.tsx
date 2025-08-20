import FacebookTestEvents from "@/components/debug/FacebookTestEvents";
import { Header } from "@/components/ui";

export default function TestFacebookPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🧪 Teste de Eventos do Facebook Pixel
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Use esta página para testar eventos do Facebook Pixel com o código de teste{" "}
            <code className="bg-yellow-100 px-3 py-1 rounded-lg text-lg font-mono font-bold">
              TEST24945
            </code>
            . Todos os eventos enviados aqui incluirão este código para facilitar a verificação no Facebook Events Manager.
          </p>
        </div>

        <FacebookTestEvents />

        <div className="mt-12 bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📋 Instruções de Uso
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                🎯 Como Testar:
              </h3>
              <ol className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    1
                  </span>
                  <span>Selecione um tipo de evento na lista acima</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </span>
                  <span>Clique em "🧪 Enviar Evento de Teste"</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </span>
                  <span>Verifique o resultado na tela</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    4
                  </span>
                  <span>Use o código TEST24945 no Facebook Events Manager</span>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                🔍 Como Verificar no Facebook:
              </h3>
              <ol className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    1
                  </span>
                  <span>Acesse o Facebook Events Manager</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </span>
                  <span>Vá para "Test Events" ou "Eventos de Teste"</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </span>
                  <span>Procure por eventos com código TEST24945</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    4
                  </span>
                  <span>Verifique se os dados estão corretos</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">
              ⚠️ Importante:
            </h4>
            <ul className="text-yellow-700 space-y-1 text-sm">
              <li>• Eventos de teste não afetam suas campanhas reais</li>
              <li>• Use apenas para verificar a implementação</li>
              <li>• O código TEST24945 é específico para testes</li>
              <li>• Verifique sempre no Facebook Events Manager</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

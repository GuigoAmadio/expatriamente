# 🧪 Teste de Eventos do Facebook Pixel

Este documento explica como usar o sistema de teste de eventos do Facebook Pixel implementado no projeto Expatriamente.

## 🎯 O que foi implementado

### 1. **Hook `useFacebookPixel` Atualizado**
- ✅ Nova função `testServerEvent()` que inclui automaticamente o código `TEST24945`
- ✅ Envio direto para Facebook Conversions API
- ✅ Logs detalhados para debug
- ✅ Tratamento de erros robusto

### 2. **Componente `FacebookTestEvents`**
- ✅ Interface amigável para testar eventos
- ✅ Eventos pré-definidos (PageView, ViewContent, Lead, etc.)
- ✅ Dados customizados via JSON
- ✅ Feedback visual em tempo real

### 3. **Página Dedicada `/test-facebook`**
- ✅ Acesso direto via URL
- ✅ Instruções completas de uso
- ✅ Interface otimizada para testes

### 4. **Integração com Debug Cache**
- ✅ Nova aba "Facebook" no componente de debug
- ✅ Acesso rápido durante desenvolvimento

## 🚀 Como Usar

### **Opção 1: Página Dedicada**
```
http://localhost:3000/test-facebook
```

### **Opção 2: Debug Cache**
1. Clique no botão 🔧 no canto inferior direito
2. Selecione a aba "📘 Facebook"
3. Use a interface integrada

### **Opção 3: Programaticamente**
```typescript
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

const { testServerEvent } = useFacebookPixel();

// Testar um evento específico
await testServerEvent("PageView", {
  content_name: "Página de Teste",
  content_category: "Debug"
});
```

## 📋 Eventos Disponíveis para Teste

### **Eventos Padrão**
- `PageView` - Visualização de página
- `ViewContent` - Visualização de conteúdo
- `Lead` - Geração de lead
- `Schedule` - Agendamento
- `CompleteRegistration` - Registro completo
- `Purchase` - Compra
- `AddToCart` - Adicionar ao carrinho
- `InitiateCheckout` - Iniciar checkout
- `Contact` - Contato
- `Subscribe` - Inscrição

### **Eventos Customizados**
Você pode criar qualquer evento personalizado digitando o nome na interface.

## 🔍 Como Verificar no Facebook

### **1. Acesse o Facebook Events Manager**
- Vá para [Facebook Events Manager](https://business.facebook.com/events_manager2)
- Selecione sua conta de anúncios

### **2. Navegue para Test Events**
- Menu lateral → "Test Events" ou "Eventos de Teste"
- Ou use o filtro de busca

### **3. Procure pelo Código TEST24945**
- Todos os eventos de teste incluem este código
- Facilita a identificação durante testes

### **4. Verifique os Dados**
- Confirme se o evento foi recebido
- Verifique se os parâmetros estão corretos
- Analise o timestamp e URL de origem

## ⚙️ Configuração

### **Variáveis de Ambiente Necessárias**
```bash
# .env.local
NEXT_PUBLIC_FACEBOOK_CONVERSIONS_API_TOKEN=seu_token_aqui
```

### **Token do Facebook**
1. Acesse [Facebook Developers](https://developers.facebook.com/)
2. Crie um app ou use um existente
3. Gere um token de acesso para Conversions API
4. Adicione ao arquivo `.env.local`

## 🧪 Exemplos de Uso

### **Teste Simples**
```typescript
// Testar PageView básico
await testServerEvent("PageView");
```

### **Teste com Dados Customizados**
```typescript
// Testar evento de agendamento
await testServerEvent("Schedule", {
  content_name: "Agendamento Psicólogo",
  content_category: "Psicologia",
  value: 150.00,
  currency: "BRL",
  psychologist_id: "juliano-casarin"
});
```

### **Teste de Lead**
```typescript
// Testar geração de lead
await testServerEvent("Lead", {
  content_name: "Formulário de Contato",
  content_category: "Landing Page",
  lead_type: "contact_form"
});
```

## 📊 Monitoramento e Debug

### **Console do Navegador**
Todos os eventos são logados com prefixos claros:
- 🧪 `[Facebook Test Event]` - Eventos de teste
- 🔵 `[Facebook Pixel]` - Eventos normais
- ✅ `[Facebook Conversions API]` - Respostas da API

### **Logs de Sucesso**
```
✅ [Facebook Test Event] Evento de teste PageView enviado com sucesso!
🧪 [Facebook Test Event] Use o código TEST24945 para verificar o evento no Facebook Events Manager
```

### **Logs de Erro**
```
❌ [Facebook Test Event] Erro ao enviar evento de teste PageView: [detalhes do erro]
```

## 🔧 Solução de Problemas

### **Token Não Encontrado**
```
⚠️ [Facebook Test Event] Token não encontrado
```
**Solução:** Verifique se `NEXT_PUBLIC_FACEBOOK_CONVERSIONS_API_TOKEN` está definido no `.env.local`

### **Erro de Rede**
```
❌ [Facebook Test Event] Erro na requisição: [erro]
```
**Solução:** 
- Verifique a conectividade com a internet
- Confirme se o token é válido
- Verifique se o Facebook não está bloqueado

### **Evento Não Aparece no Facebook**
**Soluções:**
1. Aguarde alguns minutos (pode haver delay)
2. Verifique se o código TEST24945 está sendo usado
3. Confirme se o token tem permissões corretas
4. Verifique os logs do console para erros

## 📝 Boas Práticas

### **Durante Desenvolvimento**
- ✅ Use sempre o código TEST24945 para testes
- ✅ Teste diferentes tipos de eventos
- ✅ Verifique os dados no Facebook Events Manager
- ✅ Monitore os logs do console

### **Antes da Produção**
- ✅ Remova ou desabilite o componente de teste
- ✅ Confirme que os eventos reais não incluem TEST24945
- ✅ Teste com eventos reais (sem código de teste)
- ✅ Valide a implementação final

## 🎉 Benefícios da Implementação

1. **Teste Fácil**: Interface amigável para testar eventos
2. **Debug Simples**: Logs claros e organizados
3. **Validação Rápida**: Verificação imediata no Facebook
4. **Desenvolvimento Eficiente**: Teste sem afetar campanhas reais
5. **Documentação Clara**: Instruções passo a passo

## 🔗 Links Úteis

- [Facebook Events Manager](https://business.facebook.com/events_manager2)
- [Facebook Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Facebook Pixel](https://developers.facebook.com/docs/facebook-pixel)
- [Test Events Documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/guides/test-events)

---

**Nota:** Este sistema é destinado apenas para desenvolvimento e testes. Em produção, use os eventos normais sem o código TEST24945.

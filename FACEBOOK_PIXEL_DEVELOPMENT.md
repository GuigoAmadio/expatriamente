# 🚫 Facebook Pixel - Desativação em Desenvolvimento

## 📋 Resumo das Modificações

O Facebook Pixel foi completamente desativado para o modo de desenvolvimento (`NODE_ENV === "development"`) para evitar rastreamento desnecessário durante o desenvolvimento.

## 🔧 Arquivos Modificados

### 1. `src/hooks/useFacebookPixel.ts`
- ✅ Adicionada verificação `isDevelopment = process.env.NODE_ENV === "development"`
- ✅ Todas as funções de tracking agora retornam imediatamente em desenvolvimento
- ✅ Logs informativos quando eventos são desabilitados
- ✅ Verificação de carregamento do fbq desabilitada em desenvolvimento

### 2. `src/app/layout.tsx`
- ✅ Script do Facebook Pixel condicionalmente carregado apenas em produção
- ✅ Mock function `fbq` criada para desenvolvimento (evita erros)
- ✅ Noscript tag desabilitada em desenvolvimento

## 🎯 Comportamento por Ambiente

### 🔴 Desenvolvimento (`NODE_ENV=development`)
- ❌ Script do Facebook Pixel não carrega
- ❌ Nenhum evento é enviado para o Facebook
- ❌ Conversions API não é chamada
- ✅ Logs informativos no console
- ✅ Mock function evita erros de JavaScript

### 🟢 Produção (`NODE_ENV=production`)
- ✅ Script do Facebook Pixel carrega normalmente
- ✅ Todos os eventos são enviados
- ✅ Conversions API funciona normalmente
- ✅ Rastreamento completo ativo

## 📊 Eventos Desabilitados em Desenvolvimento

- `PageView` - Visualização de página
- `Schedule` - Agendamento de consulta
- `CompleteRegistration` - Registro completo
- `ViewContent` - Visualização de conteúdo
- `Lead` - Geração de lead
- `Purchase` - Compra
- `AddToCart` - Adicionar ao carrinho
- `InitiateCheckout` - Iniciar checkout

## 🔍 Como Verificar

### Em Desenvolvimento:
```javascript
// Console mostrará:
🚫 [Facebook Pixel] Modo desenvolvimento - PageView desabilitado
🚫 [Facebook Pixel] Modo desenvolvimento - Evento desabilitado: Schedule
```

### Em Produção:
```javascript
// Console mostrará:
🔵 [Facebook Pixel] Tentando rastrear PageView
✅ [Facebook Pixel] fbq disponível, enviando evento: PageView
```

## 🛠️ Configuração de Ambiente

### Variáveis de Ambiente Necessárias (apenas produção):
```env
# .env.production
FACEBOOK_CONVERSIONS_API_TOKEN=seu_token_aqui
```

### Desenvolvimento:
```env
# .env.local (desenvolvimento)
# Nenhuma variável do Facebook necessária
```

## 🎉 Benefícios

1. **Privacidade**: Nenhum dado é enviado ao Facebook durante desenvolvimento
2. **Performance**: Scripts desnecessários não carregam em desenvolvimento
3. **Debugging**: Logs claros indicam quando eventos são desabilitados
4. **Segurança**: Tokens de produção não são expostos em desenvolvimento
5. **Conformidade**: Evita rastreamento acidental durante testes

## 🔄 Reversão

Para reativar o Facebook Pixel em desenvolvimento (não recomendado):

1. Remover a verificação `isDevelopment` do hook
2. Remover a condição do layout.tsx
3. Adicionar `FACEBOOK_CONVERSIONS_API_TOKEN` ao `.env.local`

## 📝 Notas Importantes

- O Facebook Pixel continua funcionando normalmente em produção
- Todos os eventos são preservados e funcionarão quando em produção
- A desativação é baseada em `NODE_ENV`, não em URL
- Logs informativos ajudam a identificar quando eventos são desabilitados

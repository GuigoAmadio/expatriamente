# Configuração de Variáveis de Ambiente

Para que a aplicação funcione corretamente, você precisa criar um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

## Variáveis Obrigatórias

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu-secret-super-seguro-aqui-mude-em-producao
```

## Variáveis Opcionais (para OAuth com Google)

```env
# Google OAuth (opcional)
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
```

## Como Criar o Arquivo

1. Crie um arquivo chamado `.env.local` na raiz do projeto
2. Copie e cole as variáveis acima
3. Substitua os valores pelos seus próprios
4. Salve o arquivo

## Exemplo Completo do .env.local

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=expatriamente-dev-secret-change-in-production

# Opcional - apenas se quiser testar login com Google
# GOOGLE_CLIENT_ID=your-google-client-id.googleusercontent.com
# GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Obter Credenciais do Google (Opcional)

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a Google+ API
4. Vá para "Credenciais" → "Criar credenciais" → "ID do cliente OAuth"
5. Configure os URIs de redirecionamento:
   - `http://localhost:3000/api/auth/callback/google`
6. Copie o Client ID e Client Secret para o arquivo .env.local

## Nota Importante

Nunca commite o arquivo `.env.local` no git. Ele já está no `.gitignore` por segurança.

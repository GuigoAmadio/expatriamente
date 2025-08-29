# 🚀 Configuração do Expatriamente na Porta 3001

## ✅ Configurações Realizadas

### 1. Package.json Atualizado

- ✅ Script `dev` configurado para porta 3001
- ✅ Script `start` configurado para porta 3001

## 📋 Próximos Passos

### 1. Criar arquivo `.env.local`

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
# Configuração da API Backend
NEXT_PUBLIC_API_URL=https://api.expatriamente.com/api/v1
API_URL=https://api.expatriamente.com/api/v1

# Client ID padrão para o projeto Expatriamente
NEXT_PUBLIC_DEFAULT_CLIENT_ID=expatriamente-default-client-id

# Configurações de Autenticação NextAuth
NEXTAUTH_SECRET=expatriamente-secret-key-2024
NEXTAUTH_URL=https://api.expatriamente.com

# Configurações de Autenticação
NEXT_PUBLIC_ENABLE_AUTH=false

# Configurações do Google OAuth (opcional)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret

# Configurações do Banco de Dados (se necessário)
# DATABASE_URL=postgresql://username:password@localhost:5432/expatriamente

# Configurações de Email (se necessário)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
```

### 2. Instalar Dependências

```bash
cd expatriamente
npm install
```

### 3. Iniciar o Projeto

```bash
npm run dev
```

O projeto será iniciado em: **https://api.expatriamente.com**

## 🔧 Configurações Importantes

### Backend

- **URL**: https://api.expatriamente.com/api/v1
- **Porta**: 3000 (backend NestJS)

### Frontend

- **URL**: https://api.expatriamente.com
- **Porta**: 3001 (Next.js)

### Autenticação

- **NextAuth URL**: https://api.expatriamente.com
- **Client ID**: expatriamente-default-client-id
- **Modo Dev**: Autenticação desabilitada para desenvolvimento

## 🎯 URLs Importantes

- **Homepage**: https://api.expatriamente.com
- **Login**: https://api.expatriamente.com/auth/signin
- **Dashboard**: https://api.expatriamente.com/dashboard
- **API Backend**: https://api.expatriamente.com/api/v1

## ✅ Checklist de Verificação

- [ ] Arquivo `.env.local` criado
- [ ] Dependências instaladas (`npm install`)
- [ ] Backend rodando na porta 3000
- [ ] Frontend iniciado (`npm run dev`)
- [ ] Acessível em https://api.expatriamente.com

## 🚨 Troubleshooting

### Se o projeto não iniciar:

1. Verifique se a porta 3001 está livre
2. Execute: `npx next dev -p 3001`
3. Verifique se o arquivo `.env.local` existe

### Se houver erro de autenticação:

1. Verifique se o backend está rodando na porta 3000
2. Confirme se `NEXT_PUBLIC_API_URL` está correto
3. Verifique se `NEXTAUTH_URL` está configurado para porta 3001

### Se houver erro de client_id:

1. Verifique se `NEXT_PUBLIC_DEFAULT_CLIENT_ID` está configurado
2. Confirme se o backend está configurado para aceitar o client_id

## 🎉 Pronto!

Seu projeto Expatriamente está configurado para rodar na porta 3001! 🚀

# 🔧 Configuração do .env.local

## 📋 Crie o arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
# Configuração da API Backend
NEXT_PUBLIC_API_URL=https://api.expatriamente.com/api/v1
API_URL=https://api.expatriamente.com/api/v1

# Client ID padrão para o projeto Expatriamente
NEXT_PUBLIC_DEFAULT_CLIENT_ID=bac29d84-612d-4c2d-a576-fdc0e50f8e2d

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

## 🚀 Como criar o arquivo:

### Windows (PowerShell):

```powershell
New-Item -Path ".env.local" -ItemType File
notepad .env.local
```

### Windows (CMD):

```cmd
echo. > .env.local
notepad .env.local
```

### Linux/Mac:

```bash
touch .env.local
nano .env.local
```

## ✅ Verificação:

Após criar o arquivo, execute:

```bash
npm run dev
```

O projeto deve iniciar em: **https://api.expatriamente.com**

## 🔍 Troubleshooting:

Se ainda houver erro de autenticação:

1. **Verifique se o backend está rodando:**

   ```bash
   curl https://api.expatriamente.com/api/v1/health
   ```

2. **Teste a rota de login:**

   ```bash
   curl -X POST https://api.expatriamente.com/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -H "x-client-id: bac29d84-612d-4c2d-a576-fdc0e50f8e2d" \
     -d '{"email":"admin@expatriamente.com","password":"password123"}'
   ```

3. **Verifique se o client_id está correto:**
   - Backend deve aceitar: `bac29d84-612d-4c2d-a576-fdc0e50f8e2d`
   - Frontend está configurado para usar este ID

## 🎯 URLs Importantes:

- **Frontend**: https://api.expatriamente.com
- **Backend**: https://api.expatriamente.com
- **API**: https://api.expatriamente.com/api/v1
- **Login**: https://api.expatriamente.com/auth/signin
- **Dashboard**: https://api.expatriamente.com/dashboard

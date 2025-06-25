# Server Actions - Expatriamente

Esta pasta contém todas as **Server Actions** do projeto, organizadas por funcionalidade. As Server Actions são uma funcionalidade do Next.js 13+ que permite executar código no servidor diretamente a partir de componentes React.

## 🚀 Vantagens das Server Actions

- **Performance**: Execução no servidor, reduzindo o bundle JavaScript no cliente
- **Segurança**: Operações sensíveis ficam no servidor
- **Simplicidade**: Não é necessário criar endpoints de API separados
- **SSR**: Melhor integração com Server-Side Rendering
- **Validação**: Validação de dados com Zod no servidor
- **Revalidação**: Cache automático com `revalidatePath`

## 📁 Estrutura dos Arquivos

```
src/actions/
├── index.ts        # Exportações centralizadas
├── auth.ts         # Autenticação e usuários
├── dashboard.ts    # Dashboard e estatísticas
├── app.ts          # Funcionalidades gerais
└── README.md       # Esta documentação
```

## 🔐 Autenticação (auth.ts)

### Funções Disponíveis:

- `authenticateUser(formData)` - Autentica usuário
- `registerUser(formData)` - Registra novo usuário
- `updateUserProfile(userId, formData)` - Atualiza perfil
- `changeUserPassword(userId, formData)` - Altera senha
- `getUserByEmail(email)` - Busca usuário por email
- `getUserById(id)` - Busca usuário por ID
- `logoutUser()` - Logout do usuário

### Exemplo de Uso:

```tsx
import { authenticateUser } from "@/actions";

export default function LoginForm() {
  async function handleLogin(formData: FormData) {
    const result = await authenticateUser(formData);

    if (result.success) {
      console.log("Usuário autenticado:", result.user);
    } else {
      console.error("Erro:", result.error);
    }
  }

  return (
    <form action={handleLogin}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Entrar</button>
    </form>
  );
}
```

## 📊 Dashboard (dashboard.ts)

### Funções Disponíveis:

- `getDashboardStats(userId?)` - Estatísticas do dashboard
- `getRecentActivity(userId, limit?)` - Atividades recentes
- `getUserNotifications(userId)` - Notificações do usuário
- `markNotificationAsRead(notificationId, userId)` - Marcar como lida
- `createNotification(userId, title, message, type?)` - Criar notificação
- `logActivity(userId, action, description, ip?)` - Registrar atividade
- `getChartData(userId, period?)` - Dados para gráficos
- `exportDashboardData(userId, format?)` - Exportar dados
- `updateDashboardSettings(userId, formData)` - Atualizar configurações

### Exemplo de Uso:

```tsx
import { getDashboardStats, getRecentActivity } from "@/actions";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const activities = await getRecentActivity("user-id");

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total de usuários: {stats.totalUsers}</p>
      <p>Receita: R$ {stats.revenue}</p>

      <h2>Atividades Recentes</h2>
      {activities.success &&
        activities.activities.map((activity) => (
          <div key={activity.id}>{activity.description}</div>
        ))}
    </div>
  );
}
```

## 🛠️ Aplicação Geral (app.ts)

### Funções Disponíveis:

- `submitContactForm(formData)` - Enviar formulário de contato
- `submitFeedback(formData, userId?)` - Enviar feedback
- `subscribeNewsletter(formData)` - Inscrever-se na newsletter
- `unsubscribeNewsletter(email)` - Cancelar inscrição
- `updateAppSettings(userId, formData)` - Atualizar configurações
- `getAppSettings()` - Obter configurações
- `getContactMessages(userId)` - Mensagens de contato (admin)
- `updateContactStatus(userId, contactId, status)` - Atualizar status
- `getFeedbackSummary(userId)` - Resumo de feedback (admin)
- `reportIssue(formData, userId?)` - Reportar problema
- `searchApp(query, userId?)` - Buscar na aplicação

### Exemplo de Uso:

```tsx
import { submitContactForm } from "@/actions";

export default function ContactForm() {
  async function handleSubmit(formData: FormData) {
    const result = await submitContactForm(formData);

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.error);
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="name" placeholder="Nome" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="subject" placeholder="Assunto" required />
      <textarea name="message" placeholder="Mensagem" required />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

## 🔧 Configuração e Uso

### 1. Importação Centralizada

```tsx
// Importar todas as funções
import {
  authenticateUser,
  getDashboardStats,
  submitContactForm,
} from "@/actions";

// Ou importar específicas
import { authenticateUser } from "@/actions/auth";
import { getDashboardStats } from "@/actions/dashboard";
```

### 2. Uso em Componentes Server

```tsx
// app/dashboard/page.tsx
import { getDashboardStats } from "@/actions";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return <div>Stats: {JSON.stringify(stats)}</div>;
}
```

### 3. Uso em Formulários

```tsx
// components/LoginForm.tsx
import { authenticateUser } from "@/actions";

export default function LoginForm() {
  return (
    <form action={authenticateUser}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

### 4. Uso com Estados (Client Components)

```tsx
"use client";
import { useState, useTransition } from "react";
import { authenticateUser } from "@/actions";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await authenticateUser(formData);
      setMessage(result.success ? "Sucesso!" : result.error);
    });
  }

  return (
    <form action={handleSubmit}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Carregando..." : "Login"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
```

## 🛡️ Validação e Segurança

- **Zod**: Todas as entradas são validadas com Zod
- **Sanitização**: Dados são sanitizados antes do processamento
- **Autorização**: Verificação de permissões por função
- **Rate Limiting**: Considere implementar para produção
- **Logs**: Atividades são registradas para auditoria

## 📝 Boas Práticas

1. **Sempre validar dados** com Zod
2. **Tratar erros** adequadamente
3. **Usar `revalidatePath`** para atualizar cache
4. **Implementar logs** para auditoria
5. **Verificar permissões** antes de executar ações
6. **Sanitizar dados** de entrada
7. **Usar tipos TypeScript** para melhor IntelliSense

## 🔄 Migração de APIs

Se você tinha endpoints de API, pode migrar facilmente:

```tsx
// Antes (API Route)
// app/api/auth/login/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  // lógica de autenticação
}

// Depois (Server Action)
// actions/auth.ts
export async function authenticateUser(formData: FormData) {
  // mesma lógica de autenticação
}
```

## 🚀 Próximos Passos

1. Integrar com banco de dados real
2. Implementar cache Redis
3. Adicionar rate limiting
4. Implementar webhooks
5. Adicionar testes unitários
6. Configurar monitoring

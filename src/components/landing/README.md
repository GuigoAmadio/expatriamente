# Componentes Landing Page

Esta pasta contém todos os componentes específicos da página inicial (landing page) do Expatriamente.

## Componentes Disponíveis

### HeroSection

Seção principal da página com chamada para ação, imagem destacada e botões de navegação.

### ProcessStepsSection ✨ **NOVO**

Seção interativa que apresenta o processo em 5 etapas para conseguir uma sessão:

**Características:**

- Layout em formato de meia lua (semicírculo)
- 5 círculos conectados por linhas curvilíneas
- Animação progressiva de preenchimento das bordas em laranja (#D16708)
- Ícones representativos para cada etapa
- Intersection Observer para trigger da animação
- Responsivo para todos os dispositivos

**Etapas:**

1. 🔍 Ache um psicanalista no site
2. 📅 Agende pelo site uma sessão
3. 👤 Crie uma conta para concluir o agendamento
4. 🔐 Volte na data marcada e faça login
5. 🌟 Comece a melhorar sua vida

**Tecnologias:**

- SVG para círculos e paths curvos
- `stroke-dasharray` e `stroke-dashoffset` para animação de bordas
- CSS transitions com delays sequenciais
- React hooks para controle de estado
- Intersection Observer API

### MetricsSection

Estatísticas importantes sobre o serviço e resultados.

### WorkersSection

Apresentação dos tipos de profissionais disponíveis.

### PsychologistsSection

Lista de psicólogos parceiros com suas informações.

### StoriesSection

Histórias e depoimentos de sucesso de usuários.

### FAQSection

Perguntas frequentes com accordion interativo.

### ContactSection

Formulário de contato completo com validação e envio.

**Funcionalidades do ContactSection:**

- Formulário com campos: Nome, Email, Assunto, Mensagem
- Validação usando Zod schemas
- Estados visuais: loading, success, error
- Action server-side para processar envios
- Simulação de envio de email
- Design responsivo em duas colunas

## Estrutura dos Componentes

Todos os componentes seguem o mesmo padrão:

- TypeScript com tipagem adequada
- Tailwind CSS para estilização
- Uso do sistema de temas implementado
- Design responsivo mobile-first
- Acessibilidade considerada

## Sistema de Cores

Os componentes utilizam as variáveis de cor definidas em `src/config/design/themes.ts`:

- `primary`: Cor principal do tema
- `secondary`: Cor secundária
- `accent`: Cor de destaque
- `background`: Fundo principal
- `surface`: Superfícies elevadas
- `textPrimary`: Texto principal
- `textSecondary`: Texto secundário
- E outras...

## Como Usar

Importe o componente desejado:

```tsx
import ProcessStepsSection from "@/components/landing/ProcessStepsSection";
import ContactSection from "@/components/landing/ContactSection";

export default function Page() {
  return (
    <main>
      <ProcessStepsSection />
      <ContactSection />
    </main>
  );
}
```

## ContactSection

### Descrição

Seção de contato completa com formulário e informações da empresa, localizada no final da página principal.

### Estrutura

```
ContactSection/
├── Lado Esquerdo (Informações)
│   ├── Título e descrição
│   ├── Informações de contato (email, horário, especialidades)
│   └── Card de consulta gratuita
└── Lado Direito (Formulário)
    ├── Campos: nome, email, assunto, mensagem
    ├── Validação em tempo real
    ├── Estados de loading e feedback
    └── Lógica de envio de email
```

### Funcionalidades Implementadas

#### ✅ Formulário de Contato

- **Campos validados:** Nome, Email, Assunto, Mensagem
- **Validação:** Usando Zod schema no backend
- **Estados:** Loading, success, error
- **UX:** Limpa formulário após envio bem-sucedido

#### ✅ Lógica de Envio de Email

- **Action:** `submitContactForm` em `src/actions/app.ts`
- **Simulação:** Delay realista + logs detalhados
- **Template:** HTML e texto formatados
- **Armazenamento:** Salva mensagens em memória (app.ts)

#### ✅ Design Responsivo

- **Desktop:** Layout em duas colunas
- **Mobile:** Layout empilhado
- **Cores:** Usa o sistema de temas (primary, surface, etc.)

### Como Usar

#### Para o usuário final:

1. Preencher todos os campos obrigatórios
2. Clicar em "Enviar Mensagem"
3. Aguardar confirmação de envio

#### Para o desenvolvedor:

```typescript
// A action já está configurada e pode ser usada em outros componentes
import { submitContactForm } from "@/actions";

// Exemplo de uso
const result = await submitContactForm(formData);
if (result.success) {
  // Mensagem enviada com sucesso
}
```

### Integração com Serviços de Email

Atualmente usa uma simulação. Para implementar envio real:

#### 1. Nodemailer + SMTP

```bash
npm install nodemailer @types/nodemailer
```

#### 2. SendGrid

```bash
npm install @sendgrid/mail
```

#### 3. Resend (Recomendado)

```bash
npm install resend
```

### Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
# Para SMTP
SMTP_HOST=smtp.gmail.com
SMTP_USER=seu.email@gmail.com
SMTP_PASS=sua.senha.app

# Para SendGrid
SENDGRID_API_KEY=sua.chave.sendgrid

# Para Resend
RESEND_API_KEY=sua.chave.resend
```

### Personalização

#### Modificar informações de contato:

Edite diretamente em `ContactSection.tsx` nas linhas 47-100.

#### Modificar template de email:

Edite a função `simulateEmailSend` em `src/actions/app.ts`.

#### Modificar validação:

Edite o `contactSchema` em `src/actions/app.ts`.

### Logs e Debugging

#### Console logs incluem:

- 📧 Template do email que seria enviado
- 📋 Dados da mensagem de contato
- ⚠️ Erros de validação ou envio

#### Para ver os logs:

1. Abra o DevTools (F12)
2. Vá para a aba Console
3. Envie uma mensagem pelo formulário
4. Veja os logs detalhados

### Próximos Passos Sugeridos

1. **Integrar serviço de email real** (Resend recomendado)
2. **Adicionar banco de dados** para persistir mensagens
3. **Dashboard admin** para gerenciar mensagens
4. **Notificações** (email/Slack) para novas mensagens
5. **Auto-responder** para confirmar recebimento

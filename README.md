# 🚀 Expatriamente - Plataforma Web Moderna

Uma aplicação web moderna e completa construída com **Next.js 13+**, **React 18**, **TypeScript** e **Tailwind CSS**, com foco em **performance**, **acessibilidade** e **experiência do usuário** excepcional.

![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3+-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Características Principais

### 🔐 **Autenticação Segura**

- **NextAuth.js** com JWT e cookies seguros
- Múltiplos provedores: Credenciais, Google OAuth
- Hash de senhas com **bcryptjs**
- Sessões persistentes e controle de expiração
- Proteção contra CSRF e ataques de sessão

### 🎨 **Design Moderno**

- **Glassmorphism** e **color blur spheres**
- Animações suaves com **Framer Motion**
- Sistema de temas dinâmico (Light/Dark/System)
- Design responsivo e mobile-first
- Cores personalizáveis e bordas arredondadas

### ⚡ **Performance Extrema**

- **Next.js 13+** com App Router
- Lazy loading de componentes e imagens
- Otimização automática de imagens com `next/image`
- Preloading de rotas e recursos críticos
- Minimização de requisições HTTP

### 🌍 **Internacionalização**

- Suporte a **Português**, **Espanhol** e **Inglês**
- Troca de idioma dinâmica
- Persistência da preferência de idioma
- Formatação regional automática

### 🛡️ **Segurança Avançada**

- Cookies com flags `httpOnly`, `secure` e `sameSite`
- Validação de dados com **Zod**
- Proteção contra XSS e CSRF
- Sanitização de inputs

### ♿ **Acessibilidade**

- Navegação por teclado completa
- ARIA labels e roles adequados
- Contraste de cores otimizado
- Suporte a leitores de tela
- Redução de movimento para usuários sensíveis

## 🏗️ Arquitetura do Projeto

```
src/
├── app/                 # App Router do Next.js 13+
│   ├── api/            # API Routes
│   ├── auth/           # Páginas de autenticação
│   ├── dashboard/      # Dashboard protegido
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Landing page
├── components/         # Componentes reutilizáveis
│   └── ui/            # Componentes de interface
├── context/           # Contextos React (Auth, Theme)
├── hooks/             # Custom hooks
├── lib/               # Bibliotecas e configurações
├── services/          # Serviços e API calls
├── styles/            # Estilos globais
└── types/             # Definições TypeScript
```

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** 18+
- **npm** ou **yarn**

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/expatriamente.git
cd expatriamente
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

```bash
# Crie um arquivo .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu-secret-super-seguro-aqui

# Para Google OAuth (opcional)
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
```

4. **Execute o projeto**

```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🔑 Credenciais de Teste

Para testar a aplicação, use uma das contas pré-configuradas:

### Administrador

- **Email:** `admin@expatriamente.com`
- **Senha:** `password123`

### Usuário Comum

- **Email:** `user@expatriamente.com`
- **Senha:** `password123`

## 📦 Tecnologias Utilizadas

### Core

- **Next.js 13+** - Framework React com App Router
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário

### Autenticação & Segurança

- **NextAuth.js** - Autenticação completa
- **bcryptjs** - Hash de senhas
- **Zod** - Validação de esquemas

### UI & Animações

- **Framer Motion** - Animações e transições
- **Heroicons** - Ícones SVG
- **clsx** - Manipulação de classes CSS

### Desenvolvimento

- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **TypeScript** - Verificação de tipos

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação

- [x] Login com credenciais
- [x] Login com Google OAuth
- [x] Logout seguro
- [x] Proteção de rotas
- [x] Persistência de sessão

### ✅ Interface

- [x] Landing page moderna
- [x] Dashboard interativo
- [x] Tema claro/escuro
- [x] Design responsivo
- [x] Glassmorphism effects

### ✅ Experiência do Usuário

- [x] Animações suaves
- [x] Loading states
- [x] Validação de formulários
- [x] Feedback visual
- [x] Navegação intuitiva

### ✅ Performance

- [x] Lazy loading
- [x] Otimização de imagens
- [x] Preloading estratégico
- [x] Bundle optimization

### ✅ Acessibilidade

- [x] Navegação por teclado
- [x] ARIA labels
- [x] Contraste adequado
- [x] Suporte a screen readers

## 🔮 Próximas Funcionalidades

- [ ] Internacionalização completa (i18n)
- [ ] Sistema de notificações
- [ ] Upload de arquivos
- [ ] Chat em tempo real
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados
- [ ] Storybook para componentes
- [ ] API GraphQL

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**Expatriamente Team**

- Email: contato@expatriamente.com
- Website: [https://expatriamente.com](https://expatriamente.com)

---

<div align="center">
  <p>Feito com ❤️ e tecnologias modernas</p>
  <p>© 2024 Expatriamente - Todos os direitos reservados</p>
</div>

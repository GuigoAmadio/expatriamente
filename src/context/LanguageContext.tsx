"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "pt" | "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, namespace?: string) => string;
}

const translations = {
  pt: {
    // Common
    common: {
      close: "Fechar",
    },

    // Navbar
    navbar: {
      home: "Início",
      aboutUs: "Sobre Nós",
      services: "Serviços",
      psychologists: "Psicanalistas",
      blog: "Blog",
      signIn: "Entrar",
      register: "Começar Agora",
      contact: "Contato",
    },

    // Hero
    hero: {
      title: "Cuidado Emocional para Brasileiros no Exterior",
      subtitle:
        "Encontre acolhimento e compreensão em sua jornada como expatriado. Sessões de psicanálise online com profissionais que entendem sua realidade.",
      cta: "Agendar Consulta",
      ctaSecondary: "Conhecer Psicanalistas",
      trustBadge: "Mais de 2.000 brasileiros atendidos",
    },

    // Metrics
    metrics: {
      title: "Os Números Falam por Si",
      clientsServed: "Clientes Atendidos",
      averageRating: "Avaliação Média",
      savedPerWeek: "Economizados por Semana",
      responseTime: "Tempo de Resposta",
      servicesTitle: "Serviços de Psicoterapia<br/>Online",
      servicesDescription:
        "Oferecemos atendimento psicológico especializado para brasileiros no exterior, desde consultas individuais até terapia de casal. Nossa equipe garante que você se sinta acolhido com profissionais qualificados e compreensão cultural.",
      cta: {
        text: "Faça parte dessas estatísticas de transformação. Comece sua jornada de autoconhecimento hoje mesmo.",
        start: "Começar Agora",
        meet: "Conhecer Psicanalistas",
      },
    },

    // Stories
    stories: {
      title: "HISTÓRIAS DE TRANSFORMAÇÃO",
      subtitle:
        "Conheça histórias reais de brasileiros que encontraram acolhimento e crescimento pessoal através da psicanálise, mesmo estando longe de casa.",
      tag: "Depoimentos Reais",
      tellMyStory: "Compartilhar Minha História",
      seeAllStories: "Ver Mais Histórias",
      readStory: "Ler História",
      playStory: "Ouvir Depoimento",
      featured: "Destaque",
      testimonial: {
        text: '"Viver no exterior trouxe desafios que eu não esperava. A terapia me ajudou a entender que é normal sentir saudade e que posso criar minha nova identidade sem perder minhas raízes."',
        name: "Marina S.",
        info: "Brasileira em Londres • 2 anos de terapia",
      },
      stories: [
        {
          title: "De São Paulo para Toronto",
          description: "Como a terapia me ajudou a lidar com a solidão",
          category: "Adaptação Cultural",
        },
        {
          title: "Maternidade no Exterior",
          description:
            "Ser mãe longe da família: minha jornada de autoconhecimento",
          category: "Maternidade",
        },
        {
          title: "Carreira Internacional",
          description: "Superando a síndrome do impostor em outro país",
          category: "Vida Profissional",
        },
        {
          title: "Relacionamentos à Distância",
          description: "Mantendo vínculos familiares através dos oceanos",
          category: "Relacionamentos",
        },
      ],
    },

    // Psychologists
    psychologists: {
      title: "Nossos Psicanalistas Especialistas",
      subtitle:
        "Profissionais qualificados que entendem as particularidades da experiência brasileira no exterior",
      bookConsultation: "Agendar Consulta",
      yearsExperience: "anos de experiência",
      startingFrom: "A partir de",
      viewProfile: "Ver Todos os Profissionais",
      languages: "Idiomas",
      specialties: "Especialidades",
      approach: "Abordagem",
      availability: "Disponibilidade",
      testimonials: "Depoimentos",
      pricing: "Valores",
      freeConsultation: "Consulta Inicial Gratuita",
      about: "Sobre",
      education: "Formação",
      chat: "Conversar",
      close: "Fechar",
      categories: {
        all: "Todos",
        anxiety: "Ansiedade e Depressão",
        relationships: "Relacionamentos",
        trauma: "Trauma e PTSD",
        development: "Desenvolvimento",
        burnout: "Burnout e Estresse",
        addictions: "Vícios e Dependências",
        family: "Família e Maternidade",
        eating: "Transtornos Alimentares",
        neurodivergence: "Neurodivergência",
        elderly: "Terceira Idade",
        lgbtqia: "LGBTQIA+ e Identidade",
        grief: "Luto e Perdas",
      },
      specializations: {
        adaptation: "Adaptação Cultural",
        anxiety: "Ansiedade e Depressão",
        relationships: "Relacionamentos",
        identity: "Identidade Cultural",
        family: "Questões Familiares",
        career: "Vida Profissional",
        trauma: "Trauma e Luto",
        parenting: "Parentalidade no Exterior",
      },
    },

    // FAQ
    faq: {
      title: "Perguntas Frequentes",
      subtitle:
        "Esclarecemos suas principais dúvidas sobre nossos serviços de psicanálise online",
      tag: "Dúvidas Frequentes",
      cta: {
        text: "Ainda tem dúvidas? Nossa equipe está aqui para ajudar.",
        whatsapp: "Conversar no WhatsApp",
        schedule: "Agendar Consulta Gratuita",
      },
      items: [
        {
          question: "Como funcionam as sessões online?",
          answer:
            "Nossas sessões são realizadas por videochamada em plataforma segura e confidencial. Você pode se conectar de qualquer lugar do mundo, precisando apenas de internet estável. Garantimos total privacidade e sigilo profissional.",
        },
        {
          question:
            "Os psicanalistas entendem a realidade de viver no exterior?",
          answer:
            "Sim! Todos nossos profissionais são especializados no atendimento a brasileiros expatriados. Muitos viveram ou ainda vivem no exterior, compreendendo profundamente os desafios únicos dessa experiência.",
        },
        {
          question: "Qual o valor das sessões?",
          answer:
            "Nossos valores são acessíveis e pensados para brasileiros no exterior. Oferecemos primeira consulta gratuita e planos mensais flexíveis. Entre em contato para conhecer nossas opções de pagamento internacional.",
        },
        {
          question: "Posso escolher meu psicanalista?",
          answer:
            "Absolutamente! Você pode conhecer o perfil de todos nossos profissionais e escolher aquele com quem se identifica mais. Também oferecemos uma consulta inicial para garantir que seja a combinação ideal.",
        },
        {
          question: "Que tipos de questões vocês atendem?",
          answer:
            "Atendemos desde adaptação cultural, saudade de casa, questões de identidade, até ansiedade, depressão, relacionamentos e crescimento pessoal. Cada brasileiro no exterior tem sua jornada única.",
        },
        {
          question: "Como mantenho a privacidade morando com outras pessoas?",
          answer:
            "Oferecemos orientações sobre como criar um espaço privado para suas sessões. Muitos clientes usam fones de ouvido e escolhem horários específicos. Também temos flexibilidade de horários para diferentes fusos.",
        },
      ],
    },

    // Footer
    footer: {
      cta: "Pronto para Cuidar da Sua Saúde Mental?",
      ctaDesc:
        "Junte-se a milhares de brasileiros que encontraram acolhimento e crescimento pessoal conosco.",
      getStarted: "Começar Agora",
      freeConsultation: "Consulta Gratuita",
      company: "Expatriamente",
      companyDesc:
        "Conectando brasileiros no exterior com cuidado emocional especializado e acolhedor.",
      quickLinks: "Links Rápidos",
      services: "Serviços",
      support: "Suporte",
      legal: "Legal",
      followUs: "Nos Siga",
      allRights: "Todos os direitos reservados.",
      links: {
        aboutUs: "Sobre Nós",
        psychologists: "Psicanalistas",
        pricing: "Preços",
        stories: "Histórias",
        blog: "Blog",
        faq: "FAQ",
        contact: "Contato",
        help: "Ajuda",
        privacy: "Privacidade",
        terms: "Termos de Uso",
      },
    },
  },

  en: {
    // Common
    common: {
      close: "Close",
    },

    // Navbar
    navbar: {
      home: "Home",
      aboutUs: "About Us",
      services: "Services",
      psychologists: "Psychoanalysts",
      blog: "Blog",
      signIn: "Sign In",
      register: "Get Started",
      contact: "Contact",
    },

    // Hero
    hero: {
      title: "Emotional Care for Brazilians Living Abroad",
      subtitle:
        "Find comfort and understanding in your journey as an expatriate. Online psychoanalysis sessions with professionals who understand your reality.",
      cta: "Schedule Consultation",
      ctaSecondary: "Meet Our Psychoanalysts",
      trustBadge: "Over 2,000 Brazilians served",
    },

    // Metrics
    metrics: {
      title: "The Numbers Speak for Themselves",
      clientsServed: "Satisfied Customers",
      averageRating: "Average Rating",
      savedPerWeek: "Saved per Homeowner",
      responseTime: "Response Time",
      servicesTitle: "Online Psychotherapy<br/>Services",
      servicesDescription:
        "We offer specialized psychological care for Brazilians abroad, from individual consultations to couples therapy. Our team ensures you feel welcomed with qualified professionals and cultural understanding.",
      cta: {
        text: "Be part of these transformation statistics. Start your self-discovery journey today.",
        start: "Get Started",
        meet: "Meet Psychoanalysts",
      },
    },

    // Stories
    stories: {
      title: "TRANSFORMATION STORIES",
      subtitle:
        "Discover real stories of Brazilians who found comfort and personal growth through psychoanalysis, even while living far from home.",
      tag: "Real Testimonials",
      tellMyStory: "Share My Story",
      seeAllStories: "See More Stories",
      readStory: "Read Story",
      playStory: "Listen to Testimonial",
      featured: "Featured",
      testimonial: {
        text: "\"Living abroad brought challenges I didn't expect. Therapy helped me understand that it's normal to feel homesick and that I can create my new identity without losing my roots.\"",
        name: "Marina S.",
        info: "Brazilian in London • 2 years of therapy",
      },
      stories: [
        {
          title: "From São Paulo to Toronto",
          description: "How therapy helped me deal with loneliness",
          category: "Cultural Adaptation",
        },
        {
          title: "Motherhood Abroad",
          description:
            "Being a mother away from family: my self-discovery journey",
          category: "Motherhood",
        },
        {
          title: "International Career",
          description: "Overcoming impostor syndrome in another country",
          category: "Professional Life",
        },
        {
          title: "Long-Distance Relationships",
          description: "Maintaining family bonds across oceans",
          category: "Relationships",
        },
      ],
    },

    // Psychologists
    psychologists: {
      title: "Our Expert Psychoanalysts",
      subtitle:
        "Qualified professionals who understand the particularities of the Brazilian experience abroad",
      bookConsultation: "Book Consultation",
      yearsExperience: "years of experience",
      startingFrom: "Starting from",
      viewProfile: "View All Professionals",
      languages: "Languages",
      specialties: "Specialties",
      approach: "Approach",
      availability: "Availability",
      testimonials: "Testimonials",
      pricing: "Pricing",
      freeConsultation: "Free Initial Consultation",
      about: "About",
      education: "Education",
      chat: "Chat",
      close: "Close",
      categories: {
        all: "All",
        anxiety: "Anxiety and Depression",
        relationships: "Relationships",
        trauma: "Trauma and PTSD",
        development: "Development",
        burnout: "Burnout and Stress",
        addictions: "Addictions",
        family: "Family and Parenting",
        eating: "Eating Disorders",
        neurodivergence: "Neurodivergence",
        elderly: "Elderly",
        lgbtqia: "LGBTQIA+ and Identity",
        grief: "Grief and Loss",
      },
      specializations: {
        adaptation: "Cultural Adaptation",
        anxiety: "Anxiety and Depression",
        relationships: "Relationships",
        identity: "Cultural Identity",
        family: "Family Issues",
        career: "Professional Life",
        trauma: "Trauma and Grief",
        parenting: "Parenting Abroad",
      },
    },

    // FAQ
    faq: {
      title: "Frequently Asked Questions",
      subtitle:
        "We clarify your main questions about our online psychoanalysis services",
      tag: "Frequent Questions",
      cta: {
        text: "Still have questions? Our team is here to help.",
        whatsapp: "Chat on WhatsApp",
        schedule: "Schedule Free Consultation",
      },
      items: [
        {
          question: "How do online sessions work?",
          answer:
            "Our sessions are conducted via video call on a secure and confidential platform. You can connect from anywhere in the world, needing only stable internet. We guarantee total privacy and professional confidentiality.",
        },
        {
          question:
            "Do psychoanalysts understand the reality of living abroad?",
          answer:
            "Yes! All our professionals specialize in serving Brazilian expatriates. Many have lived or still live abroad, deeply understanding the unique challenges of this experience.",
        },
        {
          question: "What are the session fees?",
          answer:
            "Our rates are accessible and designed for Brazilians abroad. We offer a free first consultation and flexible monthly plans. Contact us to learn about our international payment options.",
        },
        {
          question: "Can I choose my psychoanalyst?",
          answer:
            "Absolutely! You can view the profile of all our professionals and choose the one you identify with most. We also offer an initial consultation to ensure it's the ideal match.",
        },
        {
          question: "What types of issues do you address?",
          answer:
            "We address everything from cultural adaptation, homesickness, identity issues, to anxiety, depression, relationships, and personal growth. Each Brazilian abroad has their unique journey.",
        },
        {
          question: "How do I maintain privacy while living with others?",
          answer:
            "We provide guidance on creating a private space for your sessions. Many clients use headphones and choose specific times. We also have flexible schedules for different time zones.",
        },
      ],
    },

    // Footer
    footer: {
      cta: "Ready to Take Care of Your Mental Health?",
      ctaDesc:
        "Join thousands of Brazilians who found comfort and personal growth with us.",
      getStarted: "Get Started",
      freeConsultation: "Free Consultation",
      company: "Expatriamente",
      companyDesc:
        "Connecting Brazilians abroad with specialized and welcoming emotional care.",
      quickLinks: "Quick Links",
      services: "Services",
      support: "Support",
      legal: "Legal",
      followUs: "Follow Us",
      allRights: "All rights reserved.",
      links: {
        aboutUs: "About Us",
        psychologists: "Psychoanalysts",
        pricing: "Pricing",
        stories: "Stories",
        blog: "Blog",
        faq: "FAQ",
        contact: "Contact",
        help: "Help",
        privacy: "Privacy",
        terms: "Terms of Use",
      },
    },
  },

  es: {
    // Common
    common: {
      close: "Cerrar",
    },

    // Navbar
    navbar: {
      home: "Inicio",
      aboutUs: "Sobre Nosotros",
      services: "Servicios",
      psychologists: "Psicoanalistas",
      blog: "Blog",
      signIn: "Iniciar Sesión",
      register: "Comenzar Ahora",
      contact: "Contacto",
    },

    // Hero
    hero: {
      title: "Cuidado Emocional para Brasileños en el Exterior",
      subtitle:
        "Encuentra acogida y comprensión en tu viaje como expatriado. Sesiones de psicoanálisis online con profesionales que entienden tu realidad.",
      cta: "Agendar Consulta",
      ctaSecondary: "Conocer Psicoanalistas",
      trustBadge: "Más de 2.000 brasileños atendidos",
    },

    // Metrics
    metrics: {
      title: "Los Números Hablan por Sí Mismos",
      clientsServed: "Clientes Atendidos",
      averageRating: "Calificación Promedio",
      savedPerWeek: "Ahorrados por Semana",
      responseTime: "Tiempo de Respuesta",
      servicesTitle: "Servicios de Psicoterapia<br/>Online",
      servicesDescription:
        "Ofrecemos atención psicológica especializada para brasileños en el exterior, desde consultas individuales hasta terapia de pareja. Nuestro equipo asegura que te sientas acogido con profesionales calificados y comprensión cultural.",
      cta: {
        text: "Forma parte de estas estadísticas de transformación. Comienza tu viaje de autoconocimiento hoy mismo.",
        start: "Comenzar Ahora",
        meet: "Conocer Psicoanalistas",
      },
    },

    // Stories
    stories: {
      title: "HISTORIAS DE TRANSFORMACIÓN",
      subtitle:
        "Conoce historias reales de brasileños que encontraron acogida y crecimiento personal a través del psicoanálisis, aún estando lejos de casa.",
      tag: "Testimonios Reales",
      tellMyStory: "Compartir Mi Historia",
      seeAllStories: "Ver Más Historias",
      readStory: "Leer Historia",
      playStory: "Escuchar Testimonio",
      featured: "Destacado",
      testimonial: {
        text: '"Vivir en el exterior trajo desafíos que no esperaba. La terapia me ayudó a entender que es normal sentir nostalgia y que puedo crear mi nueva identidad sin perder mis raíces."',
        name: "Marina S.",
        info: "Brasileña en Londres • 2 años de terapia",
      },
      stories: [
        {
          title: "De São Paulo a Toronto",
          description: "Cómo la terapia me ayudó a lidiar con la soledad",
          category: "Adaptación Cultural",
        },
        {
          title: "Maternidad en el Exterior",
          description:
            "Ser madre lejos de la familia: mi viaje de autoconocimiento",
          category: "Maternidad",
        },
        {
          title: "Carrera Internacional",
          description: "Superando el síndrome del impostor en otro país",
          category: "Vida Profesional",
        },
        {
          title: "Relaciones a Distancia",
          description:
            "Manteniendo vínculos familiares a través de los océanos",
          category: "Relaciones",
        },
      ],
    },

    // Psychologists
    psychologists: {
      title: "Nuestros Psicoanalistas Especialistas",
      subtitle:
        "Profesionales calificados que entienden las particularidades de la experiencia brasileña en el exterior",
      bookConsultation: "Agendar Consulta",
      yearsExperience: "años de experiencia",
      startingFrom: "A partir de",
      viewProfile: "Ver Todos los Profesionales",
      languages: "Idiomas",
      specialties: "Especialidades",
      approach: "Enfoque",
      availability: "Disponibilidad",
      testimonials: "Testimonios",
      pricing: "Precios",
      freeConsultation: "Consulta Inicial Gratuita",
      about: "Sobre",
      education: "Formación",
      chat: "Conversar",
      close: "Cerrar",
      categories: {
        all: "Todos",
        anxiety: "Ansiedad y Depresión",
        relationships: "Relaciones",
        trauma: "Trauma y PTSD",
        development: "Desarrollo",
        burnout: "Burnout y Estrés",
        addictions: "Adicciones",
        family: "Familia y Madre",
        eating: "Trastornos Alimentarios",
        neurodivergence: "Neurodivergencia",
        elderly: "Adulto Mayor",
        lgbtqia: "LGBTQIA+ e Identidad",
        grief: "Luto y Pérdidas",
      },
      specializations: {
        adaptation: "Adaptación Cultural",
        anxiety: "Ansiedad y Depresión",
        relationships: "Relaciones",
        identity: "Identidad Cultural",
        family: "Cuestiones Familiares",
        career: "Vida Profesional",
        trauma: "Trauma y Luto",
        parenting: "Paternidad en el Exterior",
      },
    },

    // FAQ
    faq: {
      title: "Preguntas Frecuentes",
      subtitle:
        "Aclaramos tus principales dudas sobre nuestros servicios de psicoanálisis online",
      tag: "Dudas Frecuentes",
      cta: {
        text: "¿Aún tienes dudas? Nuestro equipo está aquí para ayudar.",
        whatsapp: "Conversar en WhatsApp",
        schedule: "Agendar Consulta Gratuita",
      },
      items: [
        {
          question: "¿Cómo funcionan las sesiones online?",
          answer:
            "Nuestras sesiones se realizan por videollamada en plataforma segura y confidencial. Puedes conectarte desde cualquier lugar del mundo, necesitando solo internet estable. Garantizamos total privacidad y secreto profesional.",
        },
        {
          question:
            "¿Los psicoanalistas entienden la realidad de vivir en el exterior?",
          answer:
            "¡Sí! Todos nuestros profesionales se especializan en la atención a brasileños expatriados. Muchos vivieron o aún viven en el exterior, comprendiendo profundamente los desafíos únicos de esta experiencia.",
        },
        {
          question: "¿Cuál es el valor de las sesiones?",
          answer:
            "Nuestros valores son accesibles y pensados para brasileños en el exterior. Ofrecemos primera consulta gratuita y planes mensuales flexibles. Contáctanos para conocer nuestras opciones de pago internacional.",
        },
        {
          question: "¿Puedo elegir mi psicoanalista?",
          answer:
            "¡Absolutamente! Puedes conocer el perfil de todos nuestros profesionales y elegir aquel con quien te identifiques más. También ofrecemos una consulta inicial para garantizar que sea la combinación ideal.",
        },
        {
          question: "¿Qué tipos de cuestiones atienden?",
          answer:
            "Atendemos desde adaptación cultural, nostalgia del hogar, cuestiones de identidad, hasta ansiedad, depresión, relaciones y crecimiento personal. Cada brasileño en el exterior tiene su viaje único.",
        },
        {
          question: "¿Cómo mantengo la privacidad viviendo con otras personas?",
          answer:
            "Ofrecemos orientaciones sobre cómo crear un espacio privado para tus sesiones. Muchos clientes usan auriculares y eligen horarios específicos. También tenemos flexibilidad de horarios para diferentes husos horarios.",
        },
      ],
    },

    // Footer
    footer: {
      cta: "¿Listo para Cuidar tu Salud Mental?",
      ctaDesc:
        "Únete a miles de brasileños que encontraron acogida y crecimiento personal con nosotros.",
      getStarted: "Comenzar Ahora",
      freeConsultation: "Consulta Gratuita",
      company: "Expatriamente",
      companyDesc:
        "Conectando brasileños en el exterior con cuidado emocional especializado y acogedor.",
      quickLinks: "Enlaces Rápidos",
      services: "Servicios",
      support: "Soporte",
      legal: "Legal",
      followUs: "Síguenos",
      allRights: "Todos los derechos reservados.",
      links: {
        aboutUs: "Sobre Nosotros",
        psychologists: "Psicoanalistas",
        pricing: "Precios",
        stories: "Historias",
        blog: "Blog",
        faq: "FAQ",
        contact: "Contacto",
        help: "Ayuda",
        privacy: "Privacidad",
        terms: "Términos de Uso",
      },
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Verifica se há idioma salvo no localStorage (apenas no cliente)
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && ["pt", "en", "es"].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      } else {
        // Verifica idioma do navegador
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("pt")) {
          setLanguage("pt");
        } else if (browserLang.startsWith("es")) {
          setLanguage("es");
        } else {
          setLanguage("en");
        }
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("language", language);
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const t = (key: string, namespace?: string): string => {
    // Garante que language existe e tem um fallback
    const currentLang = language || "pt";
    let langTranslations: any = translations[currentLang];

    if (!langTranslations) {
      return key; // Retorna a chave como fallback se não há traduções
    }

    // Se namespace foi fornecido, navega para ele primeiro
    if (namespace) {
      langTranslations = langTranslations[namespace];
      if (!langTranslations) {
        return key;
      }
    }

    // Navega pelas chaves usando notação de ponto
    const keys = key.split(".");
    let value: any = langTranslations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  // Sempre fornece o contexto, mesmo durante a hidratação
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}

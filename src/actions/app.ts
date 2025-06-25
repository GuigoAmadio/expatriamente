"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Schemas de validação
const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, "Comentário deve ter pelo menos 5 caracteres"),
  category: z.enum(["bug", "feature", "improvement", "other"]),
});

const subscriptionSchema = z.object({
  email: z.string().email("Email inválido"),
  preferences: z.array(z.string()).optional(),
});

// Simulação de dados - substitua pela sua implementação real
let appData = {
  contacts: [] as Array<{
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: "pending" | "replied" | "resolved";
    createdAt: Date;
  }>,
  feedback: [] as Array<{
    id: string;
    userId?: string;
    rating: number;
    comment: string;
    category: string;
    createdAt: Date;
  }>,
  subscriptions: [] as Array<{
    id: string;
    email: string;
    preferences: string[];
    active: boolean;
    createdAt: Date;
  }>,
  settings: {
    maintenanceMode: false,
    allowRegistrations: true,
    maxUsers: 10000,
    featuresEnabled: {
      notifications: true,
      analytics: true,
      fileUpload: true,
      internalization: true,
    },
  },
};

export async function submitContactForm(formData: FormData) {
  try {
    const rawFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    // Validar dados
    const validatedData = contactSchema.parse(rawFormData);

    // Criar nova mensagem de contato
    const newContact = {
      id: (appData.contacts.length + 1).toString(),
      ...validatedData,
      status: "pending" as const,
      createdAt: new Date(),
    };

    appData.contacts.push(newContact);

    // Simular envio de email (substitua pela sua implementação)
    console.log("Email de contato enviado:", newContact);

    return {
      success: true,
      message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function submitFeedback(formData: FormData, userId?: string) {
  try {
    const rawFormData = {
      rating: parseInt(formData.get("rating") as string),
      comment: formData.get("comment") as string,
      category: formData.get("category") as string,
    };

    // Validar dados
    const validatedData = feedbackSchema.parse(rawFormData);

    // Criar novo feedback
    const newFeedback = {
      id: (appData.feedback.length + 1).toString(),
      userId,
      ...validatedData,
      createdAt: new Date(),
    };

    appData.feedback.push(newFeedback);

    return {
      success: true,
      message: "Feedback enviado com sucesso! Obrigado pela sua contribuição.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function subscribeNewsletter(formData: FormData) {
  try {
    const rawFormData = {
      email: formData.get("email") as string,
      preferences: formData.getAll("preferences") as string[],
    };

    // Validar dados
    const validatedData = subscriptionSchema.parse(rawFormData);

    // Verificar se email já está inscrito
    const existingSubscription = appData.subscriptions.find(
      (sub) => sub.email === validatedData.email
    );

    if (existingSubscription) {
      if (existingSubscription.active) {
        return {
          success: false,
          error: "Este email já está inscrito na newsletter",
        };
      } else {
        // Reativar inscrição
        existingSubscription.active = true;
        existingSubscription.preferences = validatedData.preferences || [];

        return {
          success: true,
          message: "Inscrição reativada com sucesso!",
        };
      }
    }

    // Criar nova inscrição
    const newSubscription = {
      id: (appData.subscriptions.length + 1).toString(),
      email: validatedData.email,
      preferences: validatedData.preferences || [],
      active: true,
      createdAt: new Date(),
    };

    appData.subscriptions.push(newSubscription);

    return {
      success: true,
      message: "Inscrição realizada com sucesso! Obrigado por se juntar a nós.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function unsubscribeNewsletter(email: string) {
  try {
    const subscriptionIndex = appData.subscriptions.findIndex(
      (sub) => sub.email === email
    );

    if (subscriptionIndex === -1) {
      return {
        success: false,
        error: "Email não encontrado nas inscrições",
      };
    }

    // Desativar inscrição
    appData.subscriptions[subscriptionIndex].active = false;

    return {
      success: true,
      message: "Inscrição cancelada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function updateAppSettings(userId: string, formData: FormData) {
  try {
    // Verificar se usuário é admin
    if (userId !== "1") {
      return {
        success: false,
        error: "Permissão negada",
      };
    }

    const settings = {
      maintenanceMode: formData.get("maintenanceMode") === "true",
      allowRegistrations: formData.get("allowRegistrations") === "true",
      maxUsers: parseInt(formData.get("maxUsers") as string) || 10000,
      featuresEnabled: {
        notifications: formData.get("notifications") === "true",
        analytics: formData.get("analytics") === "true",
        fileUpload: formData.get("fileUpload") === "true",
        internalization: formData.get("internalization") === "true",
      },
    };

    // Validar maxUsers
    if (settings.maxUsers < 1 || settings.maxUsers > 100000) {
      return {
        success: false,
        error: "Máximo de usuários deve estar entre 1 e 100.000",
      };
    }

    // Atualizar configurações
    appData.settings = settings;

    revalidatePath("/dashboard/settings");

    return {
      success: true,
      settings,
      message: "Configurações atualizadas com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function getAppSettings() {
  try {
    return {
      success: true,
      settings: appData.settings,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao carregar configurações",
    };
  }
}

export async function getContactMessages(userId: string) {
  try {
    // Verificar se usuário é admin
    if (userId !== "1") {
      return {
        success: false,
        error: "Permissão negada",
      };
    }

    const messages = appData.contacts.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    return {
      success: true,
      messages,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao carregar mensagens",
    };
  }
}

export async function updateContactStatus(
  userId: string,
  contactId: string,
  status: "pending" | "replied" | "resolved"
) {
  try {
    // Verificar se usuário é admin
    if (userId !== "1") {
      return {
        success: false,
        error: "Permissão negada",
      };
    }

    const contactIndex = appData.contacts.findIndex((c) => c.id === contactId);

    if (contactIndex === -1) {
      return {
        success: false,
        error: "Mensagem não encontrada",
      };
    }

    appData.contacts[contactIndex].status = status;

    revalidatePath("/dashboard/contacts");

    return {
      success: true,
      message: "Status atualizado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function getFeedbackSummary(userId: string) {
  try {
    // Verificar se usuário é admin
    if (userId !== "1") {
      return {
        success: false,
        error: "Permissão negada",
      };
    }

    const feedback = appData.feedback;
    const totalFeedback = feedback.length;
    const averageRating =
      totalFeedback > 0
        ? feedback.reduce((sum, f) => sum + f.rating, 0) / totalFeedback
        : 0;

    const categoryStats = feedback.reduce((stats, f) => {
      stats[f.category] = (stats[f.category] || 0) + 1;
      return stats;
    }, {} as Record<string, number>);

    const recentFeedback = feedback
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);

    return {
      success: true,
      summary: {
        totalFeedback,
        averageRating: Math.round(averageRating * 10) / 10,
        categoryStats,
        recentFeedback,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao carregar resumo de feedback",
    };
  }
}

export async function reportIssue(formData: FormData, userId?: string) {
  try {
    const issueData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      priority: formData.get("priority") as string,
      userId,
      createdAt: new Date(),
    };

    // Validação básica
    if (!issueData.title || issueData.title.length < 5) {
      return {
        success: false,
        error: "Título deve ter pelo menos 5 caracteres",
      };
    }

    if (!issueData.description || issueData.description.length < 10) {
      return {
        success: false,
        error: "Descrição deve ter pelo menos 10 caracteres",
      };
    }

    // Simular criação de issue (substitua pela sua implementação)
    console.log("Nova issue reportada:", issueData);

    return {
      success: true,
      message: "Issue reportada com sucesso! Nossa equipe irá analisar.",
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function searchApp(query: string, userId?: string) {
  try {
    if (!query || query.trim().length < 2) {
      return {
        success: false,
        error: "Consulta deve ter pelo menos 2 caracteres",
      };
    }

    // Simular busca em diferentes seções
    const results = {
      users: [], // Buscar usuários (apenas para admins)
      content: [], // Buscar conteúdo
      settings: [], // Buscar configurações
      help: [], // Buscar ajuda/documentação
    };

    // Simular delay de busca
    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      success: true,
      results,
      query: query.trim(),
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro na busca",
    };
  }
}

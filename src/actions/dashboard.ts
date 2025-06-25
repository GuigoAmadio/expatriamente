"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

// Tipos para o dashboard
interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
  conversionRate: number;
  averageTime: string;
}

interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  description: string;
  timestamp: Date;
  ip?: string;
}

interface NotificationData {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: Date;
}

// Simulação de dados - substitua pela sua implementação real
let dashboardData = {
  stats: {
    totalUsers: 2543,
    activeUsers: 1876,
    revenue: 45200,
    growth: 12.5,
    conversionRate: 89.3,
    averageTime: "2m 30s",
  },
  activityLogs: [
    {
      id: "1",
      userId: "1",
      action: "login",
      description: "Usuário fez login no sistema",
      timestamp: new Date(),
      ip: "192.168.1.1",
    },
    {
      id: "2",
      userId: "2",
      action: "profile_update",
      description: "Usuário atualizou o perfil",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min atrás
      ip: "192.168.1.2",
    },
  ] as ActivityLog[],
  notifications: [
    {
      id: "1",
      userId: "1",
      title: "Bem-vindo!",
      message: "Sua conta foi criada com sucesso.",
      type: "success" as const,
      read: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      userId: "1",
      title: "Nova funcionalidade",
      message: "Confira as novas funcionalidades do dashboard.",
      type: "info" as const,
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hora atrás
    },
  ] as NotificationData[],
};

export async function getDashboardStats(
  userId?: string
): Promise<DashboardStats> {
  try {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Aqui você pode filtrar estatísticas por usuário se necessário
    // Por exemplo, admins veem estatísticas globais, usuários veem apenas suas próprias

    return dashboardData.stats;
  } catch (error) {
    throw new Error("Erro ao carregar estatísticas do dashboard");
  }
}

export async function getRecentActivity(userId: string, limit: number = 10) {
  try {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Filtrar atividades por usuário ou retornar todas se for admin
    let activities = dashboardData.activityLogs;

    // Se não for admin, mostrar apenas atividades do próprio usuário
    if (userId !== "1") {
      // '1' é o ID do admin
      activities = activities.filter((activity) => activity.userId === userId);
    }

    // Ordenar por data mais recente e limitar resultados
    const sortedActivities = activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);

    return {
      success: true,
      activities: sortedActivities,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao carregar atividades recentes",
    };
  }
}

export async function getUserNotifications(userId: string) {
  try {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Filtrar notificações do usuário
    const userNotifications = dashboardData.notifications
      .filter((notification) => notification.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const unreadCount = userNotifications.filter((n) => !n.read).length;

    return {
      success: true,
      notifications: userNotifications,
      unreadCount,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao carregar notificações",
    };
  }
}

export async function markNotificationAsRead(
  notificationId: string,
  userId: string
) {
  try {
    const notificationIndex = dashboardData.notifications.findIndex(
      (n) => n.id === notificationId && n.userId === userId
    );

    if (notificationIndex === -1) {
      return {
        success: false,
        error: "Notificação não encontrada",
      };
    }

    dashboardData.notifications[notificationIndex].read = true;

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Notificação marcada como lida",
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao marcar notificação como lida",
    };
  }
}

export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: "info" | "success" | "warning" | "error" = "info"
) {
  try {
    const newNotification: NotificationData = {
      id: (dashboardData.notifications.length + 1).toString(),
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date(),
    };

    dashboardData.notifications.push(newNotification);

    revalidatePath("/dashboard");

    return {
      success: true,
      notification: newNotification,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao criar notificação",
    };
  }
}

export async function logActivity(
  userId: string,
  action: string,
  description: string,
  ip?: string
) {
  try {
    const newActivity: ActivityLog = {
      id: (dashboardData.activityLogs.length + 1).toString(),
      userId,
      action,
      description,
      timestamp: new Date(),
      ip,
    };

    dashboardData.activityLogs.push(newActivity);

    // Manter apenas os últimos 100 logs para não sobrecarregar a memória
    if (dashboardData.activityLogs.length > 100) {
      dashboardData.activityLogs = dashboardData.activityLogs.slice(-100);
    }

    return {
      success: true,
      activity: newActivity,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao registrar atividade",
    };
  }
}

export async function getChartData(
  userId: string,
  period: "7d" | "30d" | "90d" = "30d"
) {
  try {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Gerar dados fictícios baseados no período
    const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
    const chartData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      chartData.push({
        date: date.toISOString().split("T")[0],
        users: Math.floor(Math.random() * 100) + 50,
        revenue: Math.floor(Math.random() * 1000) + 200,
        conversions: Math.floor(Math.random() * 50) + 10,
      });
    }

    return {
      success: true,
      data: chartData,
      period,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao carregar dados do gráfico",
    };
  }
}

export async function exportDashboardData(
  userId: string,
  format: "csv" | "json" = "json"
) {
  try {
    // Verificar se usuário tem permissão (apenas admins)
    if (userId !== "1") {
      return {
        success: false,
        error: "Permissão negada",
      };
    }

    const exportData = {
      stats: dashboardData.stats,
      totalActivities: dashboardData.activityLogs.length,
      totalNotifications: dashboardData.notifications.length,
      exportedAt: new Date().toISOString(),
      exportedBy: userId,
    };

    // Log da atividade de exportação
    await logActivity(
      userId,
      "export_data",
      `Dados exportados em formato ${format}`
    );

    return {
      success: true,
      data: exportData,
      format,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao exportar dados",
    };
  }
}

export async function updateDashboardSettings(
  userId: string,
  formData: FormData
) {
  try {
    const settings = {
      theme: formData.get("theme") as string,
      notifications: formData.get("notifications") === "true",
      emailAlerts: formData.get("emailAlerts") === "true",
      language: formData.get("language") as string,
    };

    // Validação básica
    if (!["light", "dark", "system"].includes(settings.theme)) {
      return {
        success: false,
        error: "Tema inválido",
      };
    }

    if (!["pt", "en", "es"].includes(settings.language)) {
      return {
        success: false,
        error: "Idioma inválido",
      };
    }

    // Log da atividade
    await logActivity(
      userId,
      "settings_update",
      "Configurações do dashboard atualizadas"
    );

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/settings");

    return {
      success: true,
      settings,
      message: "Configurações atualizadas com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao atualizar configurações",
    };
  }
}

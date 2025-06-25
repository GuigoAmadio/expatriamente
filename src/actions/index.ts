// Exportar todas as Server Actions organizadas por categoria

// Autenticação
export {
  authenticateUser,
  registerUser,
  updateUserProfile,
  changeUserPassword,
  logoutUser,
  getUserByEmail,
  getUserById,
} from "./auth";

// Dashboard
export {
  getDashboardStats,
  getRecentActivity,
  getUserNotifications,
  markNotificationAsRead,
  createNotification,
  logActivity,
  getChartData,
  exportDashboardData,
  updateDashboardSettings,
} from "./dashboard";

// Aplicação Geral
export {
  submitContactForm,
  submitFeedback,
  subscribeNewsletter,
  unsubscribeNewsletter,
  updateAppSettings,
  getAppSettings,
  getContactMessages,
  updateContactStatus,
  getFeedbackSummary,
  reportIssue,
  searchApp,
} from "./app";

// Tipos para melhor IntelliSense
export type {} from // Pode adicionar tipos exportados das Server Actions aqui
"./auth";

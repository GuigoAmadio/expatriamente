// Auth actions
export {
  loginAction,
  logoutAction,
  getAuthUser,
  requireAuth,
  getCurrentClient,
  refreshTokenAction,
  clearAuthCookiesAction,
} from "./auth";

// Dashboard actions
export {
  getDashboardStats,
  getProductStats,
  getTopSellingProducts,
  getAppointmentStats,
  getTodayAppointments,
  getAppointments,
} from "./dashboard";

// Employee actions
export {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "./employees";

// Service actions
export {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
} from "./services";

// App actions
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

// ✅ Prefetch actions
export {
  prefetchDashboardStats,
  prefetchCurrentProfile,
  prefetchTodayAppointments,
  prefetchMyAppointments,
  prefetchEmployees,
  prefetchMyClients,
  prefetchAllClients,
  prefetchAvailableServices,
  prefetchAllServices,
  prefetchAppSettings,
  prefetchMonthlyAnalytics,
  prefetchPersonalAnalytics,
  prefetchAvailableEmployees,
  prefetchDetailedAnalytics,
  prefetchSystemHealth,
  prefetchAllUsers,
  prefetchRecentLogs,
  clearCache,
  getCacheStats,
  invalidateCachePattern,
} from "./prefetch";

// ✅ Request Manager actions
export {
  serverRequestGet,
  serverRequestPost,
  serverRequestPatch,
  serverRequestPut,
  serverRequestDelete,
  serverRequest,
} from "./request-manager";

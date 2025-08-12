// Tipos de autenticação
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EMPLOYEE" | "CLIENT";
  employeeId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  user: User;
  token: string;
  expires: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

// Tipos de tema
export type Theme = "light" | "dark" | "system";

export interface ThemeConfig {
  theme: Theme;
  primaryColor: string;
  accentColor: string;
  borderRadius: "none" | "sm" | "md" | "lg" | "xl";
  animations: boolean;
}

// Tipos de internacionalização
export type Locale = "pt" | "es" | "en";

export interface LanguageConfig {
  locale: Locale;
  label: string;
  flag: string;
}

// Tipos de API
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Tipos de componentes
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export interface InputProps extends BaseComponentProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

// Tipos de navegação
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<Record<string, unknown>>;
  badge?: string | number;
  children?: NavigationItem[];
}

// Tipos de dashboard
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

// Tipos de notificação
export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

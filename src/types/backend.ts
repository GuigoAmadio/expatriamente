// Tipos baseados no backend para comunicação com a API
export interface BackendUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EMPLOYEE" | "CLIENT";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  client?: {
    id: string;
    name: string;
    status: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: "SUPER_ADMIN" | "ADMIN" | "EMPLOYEE" | "CLIENT";
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    client_id: string;
    user: BackendUser;
    refresh_token: string;
    expires_in: string;
  };
}

export interface CreateEmployeeRequest {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  position: string;
  description?: string;
  workingHours?: object;
  isActive?: boolean;
}

export interface CreateServiceRequest {
  name: string;
  description?: string;
  duration: number;
  price: number;
  isActive?: boolean;
  categoryId?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  position: string;
  description?: string;
  workingHours?: object;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  duration: number;
  price: number;
  isActive: boolean;
  categoryId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  startTime: Date;
  endTime: Date;
  status: "SCHEDULED" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  serviceId: string;
  userId: string;
  employeeId: string;
  clientId: string;
  service?: Service;
  user?: BackendUser;
  employee?: Employee;
}

export interface DashboardStats {
  mainMetrics: {
    websiteVisits: number;
    totalSalesAmount: number;
    totalProductsSold: number;
    monthlyRevenue: number;
  };
  topSellingProducts: any[];
  today: {
    count: number;
    revenue: number;
  };
  month: {
    count: number;
    revenue: number;
  };
  todayAppointments: Appointment[];
  overview: {
    totalProducts: number;
    lowStockProducts: number;
    pendingOrders: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// Tipos para respostas das actions
export interface ActionResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface DashboardStatsResponse
  extends ActionResponse<DashboardStats> {}
export interface AppointmentsResponse extends ActionResponse<Appointment[]> {}
export interface EmployeesResponse extends ActionResponse<Employee[]> {}
export interface ServicesResponse extends ActionResponse<Service[]> {}

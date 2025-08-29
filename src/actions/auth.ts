"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { LoginInput, User } from "@/types";
import { serverPost, serverGet, serverPut } from "@/lib/server-api";
import { cacheUtils, CACHE_CONFIG } from "@/lib/intelligent-cache";

// Interfaces para tipar os dados da API
interface LoginApiResponse {
  data?: {
    token: string;
    client_id: string;
    refresh_token?: string;
    user: User;
  };
  token?: string;
  client_id?: string;
  refresh_token?: string;
  user?: User;
}

interface AuthMeResponse {
  id: string;
  employeeId?: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  client_id?: string;
  clientId?: string;
  client?: {
    id: string;
    name: string;
    status: string;
  };
}

// ... existing code ...

// ✅ Função otimizada para executar prefetchs baseados na role
async function executeRoleBasedPrefetch(userRole: string) {
  try {
    console.log(`🚀 [Auth] Executando prefetchs para role: ${userRole}`);

    // Importar prefetchs dinamicamente para evitar circular dependencies
    const {
      prefetchDashboardStats,
      prefetchCurrentProfile,
      prefetchTodayAppointments,
      prefetchMyAppointments,
      prefetchEmployees,
      prefetchAvailableServices,
      prefetchAllServices,
    } = await import("@/actions/prefetch");

    // ✅ Função de retry simples
    const retryOnce = async (promise: Promise<any>, prefetchName: string) => {
      try {
        return await promise;
      } catch (error) {
        console.log(`🔄 [Auth] Retry para ${prefetchName}...`);
        try {
          return await promise;
        } catch (retryError) {
          console.error(
            `❌ [Auth] ${prefetchName} falhou após retry:`,
            retryError
          );
          throw retryError;
        }
      }
    };

    const prefetchConfigs: Array<{
      name: string;
      fn: () => Promise<any>;
      essential: boolean;
    }> = [];

    // ✅ Prefetchs ESSENCIAIS para todos os usuários
    const essentialPrefetches = [
      {
        name: "prefetchCurrentProfile",
        fn: prefetchCurrentProfile,
        essential: true,
      },
    ];

    // ✅ Prefetchs BASEADOS NO ROLE
    if (userRole === "SUPER_ADMIN" || userRole === "ADMIN") {
      // Admins: Dashboard completo + todas as entidades
      const adminPrefetches = [
        {
          name: "prefetchDashboardStats",
          fn: prefetchDashboardStats,
          essential: false,
        },
        {
          name: "prefetchTodayAppointments",
          fn: prefetchTodayAppointments,
          essential: false,
        },
        { name: "prefetchEmployees", fn: prefetchEmployees, essential: false },
        {
          name: "prefetchAllServices",
          fn: prefetchAllServices,
          essential: false,
        },
        {
          name: "prefetchAvailableServices",
          fn: prefetchAvailableServices,
          essential: false,
        },
      ];
      prefetchConfigs.push(...adminPrefetches);
      console.log(
        `🔑 [Auth] Prefetchs ADMIN: ${adminPrefetches
          .map((p) => p.name)
          .join(", ")}`
      );
    } else if (userRole === "EMPLOYEE") {
      // Funcionários: Seus próprios dados + serviços
      const employeePrefetches = [
        {
          name: "prefetchMyAppointments",
          fn: prefetchMyAppointments,
          essential: false,
        },
        {
          name: "prefetchTodayAppointments",
          fn: prefetchTodayAppointments,
          essential: false,
        },
        {
          name: "prefetchAvailableServices",
          fn: prefetchAvailableServices,
          essential: false,
        },
      ];
      prefetchConfigs.push(...employeePrefetches);
      console.log(
        `��‍💼 [Auth] Prefetchs EMPLOYEE: ${employeePrefetches
          .map((p) => p.name)
          .join(", ")}`
      );
    } else {
      // Clientes: Apenas seus próprios dados
      const clientPrefetches = [
        {
          name: "prefetchMyAppointments",
          fn: prefetchMyAppointments,
          essential: false,
        },
        {
          name: "prefetchAvailableServices",
          fn: prefetchAvailableServices,
          essential: false,
        },
      ];
      prefetchConfigs.push(...clientPrefetches);
      console.log(
        `👤 [Auth] Prefetchs CLIENT: ${clientPrefetches
          .map((p) => p.name)
          .join(", ")}`
      );
    }

    // ✅ Adicionar prefetchs essenciais
    prefetchConfigs.push(...essentialPrefetches);
    console.log(
      `⭐ [Auth] Prefetchs ESSENCIAIS: ${essentialPrefetches
        .map((p) => p.name)
        .join(", ")}`
    );

    // ✅ Executar todos os prefetchs em paralelo com timeout otimizado
    const startTime = Date.now();
    const totalPrefetches = prefetchConfigs.length;

    console.log(
      `\n📊 [Auth] Iniciando ${totalPrefetches} prefetchs em paralelo...`
    );

    const results = await Promise.allSettled(
      prefetchConfigs.map(async (config, index) => {
        const prefetchStartTime = Date.now();
        try {
          // ✅ Timeout aumentado para 15 segundos + retry
          const result = await Promise.race([
            retryOnce(config.fn(), config.name),
            new Promise((_, reject) =>
              setTimeout(
                () => reject(new Error("Prefetch timeout (15s)")),
                15000
              )
            ),
          ]);

          const prefetchDuration = Date.now() - prefetchStartTime;
          console.log(
            `✅ [Auth] ${config.name} concluído em ${prefetchDuration}ms`
          );
          return result;
        } catch (error) {
          const prefetchDuration = Date.now() - prefetchStartTime;
          console.error(
            `❌ [Auth] ${config.name} falhou em ${prefetchDuration}ms:`,
            error
          );
          throw error;
        }
      })
    );

    const duration = Date.now() - startTime;
    const successCount = results.filter((r) => r.status === "fulfilled").length;
    const failureCount = results.filter((r) => r.status === "rejected").length;

    // ✅ Log detalhado de cada prefetch
    console.log(`\n📊 [Auth] Relatório detalhado dos prefetchs:`);
    console.log(`⏱️  Duração total: ${duration}ms`);
    console.log(`✅ Sucessos: ${successCount}/${totalPrefetches}`);
    console.log(`❌ Falhas: ${failureCount}/${totalPrefetches}`);

    // ✅ Listar prefetchs que falharam
    if (failureCount > 0) {
      console.log(`\n❌ [Auth] Prefetchs que falharam:`);
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          const config = prefetchConfigs[index];
          const isEssential = config?.essential ? " (ESSENCIAL)" : "";
          console.log(
            `  - ${config?.name}${isEssential}: ${
              result.reason?.message || result.reason
            }`
          );
        }
      });
    }

    // ✅ Verificar se prefetchs essenciais falharam
    const essentialFailures = results.filter((result, index) => {
      const config = prefetchConfigs[index];
      return result.status === "rejected" && config?.essential;
    });

    if (essentialFailures.length > 0) {
      console.warn(
        `⚠️ [Auth] ${essentialFailures.length} prefetchs essenciais falharam!`
      );
    }

    console.log(
      `✅ [Auth] Prefetchs concluídos em ${duration}ms: ${successCount} sucessos, ${failureCount} falhas`
    );

    return {
      success: true,
      totalPrefetches,
      successCount,
      failureCount,
      essentialFailures: essentialFailures.length,
      duration,
    };
  } catch (error) {
    console.error("❌ [Auth] Erro ao executar prefetchs:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

// ... existing code ...

// Login do usuário
export async function loginAction(data: LoginInput) {
  try {
    console.log("🔐 Expatriamente - Iniciando login...");

    // Limpar cache de usuário anterior antes do novo login
    console.log("🗑️ [Auth] Limpando cache de usuário anterior...");
    await cacheUtils.delete("profile:current-user");
    await cacheUtils.invalidateByType("profile");

    const result = await serverPost<LoginApiResponse>("/auth/login", data);
    console.log("📋 result.data:", JSON.stringify(result.data, null, 2));

    // A API retorna uma estrutura aninhada: result.data.data contém os dados reais
    const nestedResult = result.data as LoginApiResponse;
    const responseData = nestedResult?.data || result.data || result;

    console.log("✅ Expatriamente - Login bem-sucedido!");
    console.log("- Token recebido:", !!(responseData as any)?.token);
    console.log("- Client ID recebido:", (responseData as any)?.client_id);
    console.log(
      "- Refresh token recebido:",
      !!(responseData as any)?.refresh_token
    );
    console.log("- User recebido:", !!(responseData as any)?.user);

    // Verificar se temos os dados necessários
    if (!(responseData as any)?.token) {
      console.error("❌ Token não encontrado na resposta!");
      console.error("📋 Dados encontrados:", Object.keys(responseData || {}));
      return {
        success: false,
        message: "Token não recebido do servidor",
      };
    }

    if (!(responseData as any)?.client_id) {
      console.error("❌ Client ID não encontrado na resposta!");
      console.error("📋 Dados encontrados:", Object.keys(responseData || {}));
      return {
        success: false,
        message: "Client ID não recebido do servidor",
      };
    }

    // Salvar tokens e client_id nos cookies httpOnly
    const cookieStore = await cookies();

    cookieStore.set("auth_token", (responseData as any).token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    // Salvar client_id do usuário autenticado
    cookieStore.set("client_id", (responseData as any).client_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 dias
    });

    // Salvar refresh token se fornecido
    if ((responseData as any).refresh_token) {
      cookieStore.set("refresh_token", (responseData as any).refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 dias
      });
    }

    console.log("🍪 Expatriamente - Cookies salvos com sucesso!");
    console.log(
      "- auth_token:",
      cookieStore.get("auth_token") ? "Salvo" : "ERRO"
    );
    console.log("- client_id:", cookieStore.get("client_id")?.value);
    console.log(
      "- refresh_token:",
      cookieStore.get("refresh_token") ? "Salvo" : "N/A"
    );

    // Cache do usuário logado (sem dados sensíveis)
    if ((responseData as any)?.user) {
      console.log("💾 [Auth] Salvando dados do usuário no cache...");
      const userForCache = {
        id: (responseData as any).user.id,
        name: (responseData as any).user.name,
        email: (responseData as any).user.email,
        role: (responseData as any).user.role,
        clientId: (responseData as any).client_id,
        // NÃO cachear tokens, senhas ou dados sensíveis
      };

      await cacheUtils.getCachedData(
        "profile:current-user",
        async () => userForCache,
        { ...CACHE_CONFIG.profile, ttl: 30 * 60 * 1000 } // 30 minutos para dados de perfil
      );
      console.log("✅ [Auth] Dados do usuário salvos no cache");
    }

    // ✅ EXECUTAR PREFETCHS BASEADOS NA ROLE
    if ((responseData as any)?.user?.role) {
      const userRole = (responseData as any).user.role.toUpperCase();
      console.log(`🚀 [Auth] Iniciando prefetchs para role: ${userRole}`);

      // Executar prefetchs em background (não bloquear o login)
      executeRoleBasedPrefetch(userRole)
        .then((prefetchResult) => {
          if (prefetchResult.success) {
            console.log(
              `✅ [Auth] Prefetchs concluídos: ${prefetchResult.successCount}/${prefetchResult.totalPrefetches} em ${prefetchResult.duration}ms`
            );
          } else {
            console.error(
              `❌ [Auth] Erro nos prefetchs:`,
              prefetchResult.error
            );
          }
        })
        .catch((error) => {
          console.error("❌ [Auth] Erro ao executar prefetchs:", error);
        });
    }

    return {
      success: true,
      message: "Login realizado com sucesso",
      user: (responseData as any).user,
      clientId: (responseData as any).client_id,
      token: (responseData as any).token, // Incluir token para localStorage
    };
  } catch (error: unknown) {
    console.error("❌ Expatriamente - Erro no login:", error);
    console.error("❌ Erro completo:", JSON.stringify(error, null, 2));

    // Usar o sistema de sanitização de erros
    const { extractErrorMessage } = await import("@/lib/error-utils");
    const errorMessage = extractErrorMessage(error);

    return {
      success: false,
      message: errorMessage,
    };
  }
}

// Registro do usuário com login automático
export async function registerAction(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) {
  try {
    console.log("🔐 Expatriamente - Iniciando registro...");
    console.log("📧 Email:", data.email);

    const result = await serverPost<LoginApiResponse>("/auth/register", data);
    console.log("📋 result.data:", JSON.stringify(result.data, null, 2));

    // A API retorna uma estrutura aninhada: result.data.data contém os dados reais
    const nestedResult = result.data as LoginApiResponse;
    const responseData = nestedResult?.data || result.data || result;

    console.log("✅ Expatriamente - Registro bem-sucedido!");
    console.log("- Client ID recebido:", (responseData as any)?.client_id);
    console.log("- User recebido:", !!(responseData as any)?.user);

    // Verificar se temos os dados necessários
    if (!(responseData as any)?.token) {
      console.error("❌ Token não encontrado na resposta!");
      console.error("📋 Dados encontrados:", Object.keys(responseData || {}));
      return {
        success: false,
        message: "Token não recebido do servidor",
      };
    }

    if (!(responseData as any)?.client_id) {
      console.error("❌ Client ID não encontrado na resposta!");
      console.error("📋 Dados encontrados:", Object.keys(responseData || {}));
      return {
        success: false,
        message: "Client ID não recebido do servidor",
      };
    }

    // Salvar tokens e client_id nos cookies httpOnly
    const cookieStore = await cookies();

    cookieStore.set("auth_token", (responseData as any).token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    // Salvar client_id do usuário autenticado
    cookieStore.set("client_id", (responseData as any).client_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 dias
    });

    // Salvar refresh token se fornecido
    if ((responseData as any).refresh_token) {
      cookieStore.set("refresh_token", (responseData as any).refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 dias
      });
    }

    console.log("🍪 Expatriamente - Cookies salvos com sucesso!");
    console.log(
      "- auth_token:",
      cookieStore.get("auth_token") ? "Salvo" : "ERRO"
    );
    console.log("- client_id:", cookieStore.get("client_id")?.value);
    console.log(
      "- refresh_token:",
      cookieStore.get("refresh_token") ? "Salvo" : "N/A"
    );

    // Cache do usuário registrado (sem dados sensíveis)
    if ((responseData as any)?.user) {
      console.log("💾 [Auth] Salvando dados do usuário registrado no cache...");
      const userForCache = {
        id: (responseData as any).user.id,
        name: (responseData as any).user.name,
        email: (responseData as any).user.email,
        role: (responseData as any).user.role,
        clientId: (responseData as any).client_id,
        // NÃO cachear tokens, senhas ou dados sensíveis
      };

      await cacheUtils.getCachedData(
        `auth:user:${(responseData as any).user.id}`,
        async () => userForCache,
        { ...CACHE_CONFIG.profile, ttl: 30 * 60 * 1000 } // 30 minutos para dados de perfil
      );
      console.log("✅ [Auth] Dados do usuário registrado salvos no cache");
    }

    // ✅ EXECUTAR PREFETCHS BASEADOS NA ROLE (registro)
    if ((responseData as any)?.user?.role) {
      const userRole = (responseData as any).user.role.toUpperCase();
      console.log(
        `🚀 [Auth] Iniciando prefetchs para usuário registrado com role: ${userRole}`
      );

      // Executar prefetchs em background (não bloquear o registro)
      executeRoleBasedPrefetch(userRole)
        .then((prefetchResult) => {
          if (prefetchResult.success) {
            console.log(
              `✅ [Auth] Prefetchs de registro concluídos: ${prefetchResult.successCount}/${prefetchResult.totalPrefetches} em ${prefetchResult.duration}ms`
            );
          } else {
            console.error(
              `❌ [Auth] Erro nos prefetchs de registro:`,
              prefetchResult.error
            );
          }
        })
        .catch((error) => {
          console.error(
            "❌ [Auth] Erro ao executar prefetchs de registro:",
            error
          );
        });
    }

    return {
      success: true,
      message: "Registro realizado com sucesso",
      user: (responseData as any).user,
      clientId: (responseData as any).client_id,
    };
  } catch (error: unknown) {
    console.error("❌ Expatriamente - Erro no registro:", error);
    console.error("❌ Erro completo:", JSON.stringify(error, null, 2));

    // Usar o sistema de sanitização de erros
    const { extractErrorMessage } = await import("@/lib/error-utils");
    const errorMessage = extractErrorMessage(error);

    return {
      success: false,
      message: errorMessage,
    };
  }
}

// Logout do usuário
export async function logoutAction() {
  try {
    const cookieStore = await cookies();

    // Tentar fazer logout no backend
    try {
      await serverPost("/auth/logout");
    } catch (error) {
      console.error("Erro ao fazer logout no backend:", error);
      // Continuar com logout local mesmo se der erro no backend
    }

    // Limpar todos os cookies
    cookieStore.delete("auth_token");
    cookieStore.delete("refresh_token");
    cookieStore.delete("client_id");

    // Limpar cache de autenticação
    console.log("🗑️ [Auth] Invalidando cache de autenticação...");
    await cacheUtils.invalidateByType("profile");

    // Deletar também a chave específica do usuário atual
    await cacheUtils.delete("profile:current-user");

    console.log("✅ [Auth] Cache de autenticação invalidado");

    redirect("/auth/signin");
  } catch (error) {
    console.error("Erro no logout:", error);
    redirect("/auth/signin");
  }
}

// Verificar se o usuário está autenticado
export async function getAuthUser(): Promise<User | null> {
  try {
    // Verificar se existe token válido antes de usar cache
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (!authToken) {
      console.log("🔍 [Auth] Nenhum token encontrado, limpando cache...");
      await cacheUtils.delete("profile:current-user");
      return null;
    }

    // Tentar obter do cache primeiro
    const cachedUser = await cacheUtils.getCachedData(
      "profile:current-user",
      async () => {
        console.log("🔍 [Auth] Buscando dados do usuário no backend...");
        const result = await serverGet<AuthMeResponse>("/auth/me");

        // Verificar wrapper duplo
        const userData = (result.data as any)?.data || result.data;

        if (!userData) {
          return null;
        }

        // Transformar client_id em clientId para compatibilidade
        const user: User = {
          ...userData,
          clientId: userData.client_id || userData.clientId || "",
        };

        // NÃO cachear tokens ou dados sensíveis
        const userForCache = {
          id: user.id,
          clientId: user.clientId,
          employeeId: user.employeeId,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          // Remover dados sensíveis antes de cachear
        };

        return userForCache;
      },
      { ...CACHE_CONFIG.profile, ttl: 5 * 60 * 1000 } // 5 minutos para dados de auth
    );

    return cachedUser;
  } catch (error: unknown) {
    console.error("Erro ao verificar autenticação:", error);

    // NÃO deletar cookies aqui - apenas retornar null
    // A limpeza deve ser feita em uma Server Action separada
    return null;
  }
}

// Middleware para verificar autenticação
export async function requireAuth() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return user;
}

// Obter informações do tenant/cliente atual
export async function getCurrentClient() {
  const cookieStore = await cookies();
  return {
    clientId: cookieStore.get("client_id")?.value || null,
    token: cookieStore.get("auth_token")?.value || null,
  };
}

// Refresh do token (para uso em caso de erro 401)
export async function refreshTokenAction() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      throw new Error("Refresh token não encontrado");
    }

    const result = await serverPost<{ token: string; refresh_token: string }>(
      "/auth/refresh",
      {
        refresh_token: refreshToken,
      }
    );

    // Verificar wrapper duplo
    const tokenData = (result.data as any)?.data || result.data;

    if (!tokenData) {
      throw new Error("Dados não recebidos do servidor");
    }

    // Atualizar cookies com novos tokens
    cookieStore.set("auth_token", tokenData.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    cookieStore.set("refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 dias
    });

    // Invalidar cache de auth após refresh
    console.log("🔄 [Auth] Invalidando cache após refresh do token...");
    await cacheUtils.invalidateByType("profile");
    console.log("✅ [Auth] Cache invalidado após refresh");

    return {
      success: true,
      message: "Token atualizado com sucesso",
    };
  } catch (error: unknown) {
    console.error("Erro ao atualizar token:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Erro ao atualizar token",
    };
  }
}

// Limpar cookies de autenticação
export async function clearAuthCookiesAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
    cookieStore.delete("refresh_token");
    cookieStore.delete("client_id");

    // Limpar cache de autenticação
    console.log("🗑️ [Auth] Invalidando cache de autenticação...");
    await cacheUtils.invalidateByType("profile");
    console.log("✅ [Auth] Cache de autenticação invalidado");

    return {
      success: true,
      message: "Cookies de autenticação limpos",
    };
  } catch (error: unknown) {
    console.error("Erro ao limpar cookies:", error);
    return {
      success: false,
      message: "Erro ao limpar cookies de autenticação",
    };
  }
}

// Verificar se é primeira vez que o usuário acessa
export async function checkFirstTimeAccess(): Promise<{
  isFirstTime: boolean;
  message: string;
}> {
  try {
    const user = await getAuthUser();

    if (!user) {
      console.log("🔍 [FirstTime] Usuário não autenticado");
      return {
        isFirstTime: false,
        message: "Usuário não autenticado",
      };
    }

    // Verificar se é EMPLOYEE e se tem email padrão (gerado automaticamente)
    const isEmployee = (user as any).role === "EMPLOYEE";
    const hasDefaultEmail =
      user.email.includes("@expatriamente.com") &&
      (user.email.includes("psicanalista") ||
        user.email.includes("normalized") ||
        // Corrigir o match para retornar boolean
        !!user.email.match(/^[a-z.]+@expatriamente\.com$/));

    const isFirstTime = isEmployee && hasDefaultEmail;

    console.log("🔍 [FirstTime] Verificação:", {
      userId: user.id,
      userEmail: user.email,
      userRole: (user as any).role,
      isEmployee,
      hasDefaultEmail,
      isFirstTime,
    });

    return {
      isFirstTime,
      message: isFirstTime
        ? "Primeira vez acessando - precisa atualizar credenciais"
        : "Usuário já configurado",
    };
  } catch (error: any) {
    console.error("Erro ao verificar primeira vez:", error);
    return {
      isFirstTime: false,
      message: "Erro ao verificar status do usuário",
    };
  }
}

// Atualizar dados do usuário (email e senha)
export async function updateUserCredentialsAction(data: {
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const result = await serverPut<{
      success: true;
      data: User[];
      message: "Success";
    }>("/auth/update-credentials", data);

    // Invalidar cache de autenticação após atualização
    console.log(
      "🔄 [Auth] Invalidando cache após atualização de credenciais..."
    );
    await cacheUtils.invalidateByType("profile");

    // Invalidar também a chave específica do usuário atual
    await cacheUtils.delete("profile:current-user");

    console.log("✅ [Auth] Cache invalidado após atualização de credenciais");

    return {
      success: true,
      message: "Credenciais atualizadas com sucesso",
    };
  } catch (error: any) {
    console.error("Erro ao atualizar credenciais:", error);
    return {
      success: false,
      message: error.message || "Erro interno do servidor",
    };
  }
}

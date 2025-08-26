import { useState, useEffect, useCallback, useMemo } from "react";
// TEMPORARILY DISABLED FOR PROJECT DELIVERY
// import { requestManager, RequestOptions } from "@/lib/request-manager";
// import { apiClient } from "@/lib/api-client";

// ✅ Adicionar a constante API_BASE_URL no topo do arquivo
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.expatriamente.com/api/v1";

// ✅ Hook para gerenciar requisições com loading states - TEMPORARILY DISABLED FOR PROJECT DELIVERY
export const useRequestManager = () => {
  // FALLBACK VALUES FOR TEMPORARY DISABLE
  return {
    executeRequest: () => Promise.resolve(null),
    isLoading: () => false,
    hasAnyLoading: false,
    getRequestCount: () => 0,
    cancelRequest: () => {},
    cancelAllRequests: () => {},
    waitForAllRequests: () => Promise.resolve(),
    loadingStates: {},
    requestCounts: {},
  };
};

/*
// ORIGINAL IMPLEMENTATION - TEMPORARILY DISABLED
export const useRequestManager_DISABLED = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const [requestCounts, setRequestCounts] = useState<Record<string, number>>(
    {}
  );

  // Atualizar estados em tempo real
  useEffect(() => {
    const updateStates = () => {
      const stats = requestManager.getStats();
      const pendingRequests = requestManager.getPendingRequests();

      // Atualizar loading states
      const newLoadingStates: Record<string, boolean> = {};
      pendingRequests.forEach((key) => {
        newLoadingStates[key] = requestManager.isLoading(key);
      });

      // Atualizar contadores
      const newRequestCounts: Record<string, number> = {};
      pendingRequests.forEach((key) => {
        newRequestCounts[key] = requestManager.getRequestCount(key);
      });

      setLoadingStates(newLoadingStates);
      setRequestCounts(newRequestCounts);
    };

    // Atualizar a cada 500ms
    const interval = setInterval(updateStates, 500);
    updateStates(); // Atualização inicial

    return () => clearInterval(interval);
  }, []);

  // ✅ Executar requisição com loading state automático
  const executeRequest = useCallback(
    async <T>(
      key: string,
      requestFn: (signal?: AbortSignal) => Promise<T>,
      options?: RequestOptions
    ): Promise<T> => {
      try {
        setLoadingStates((prev) => ({ ...prev, [key]: true }));

        const result = await requestManager.executeRequest(
          key,
          requestFn,
          options
        );

        return result;
      } finally {
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
      }
    },
    []
  );

  // ✅ Verificar se está carregando
  const isLoading = useCallback(
    (key: string): boolean => {
      return loadingStates[key] || false;
    },
    [loadingStates]
  );

  // ✅ Verificar se alguma requisição está pendente
  const hasAnyLoading = useMemo(() => {
    return Object.values(loadingStates).some((loading) => loading);
  }, [loadingStates]);

  // ✅ Obter contador de requisições
  const getRequestCount = useCallback(
    (key: string): number => {
      return requestCounts[key] || 0;
    },
    [requestCounts]
  );

  // ✅ Cancelar requisição específica
  const cancelRequest = useCallback((key: string) => {
    requestManager.cancelRequest(key);
    setLoadingStates((prev) => ({ ...prev, [key]: false }));
  }, []);

  // ✅ Cancelar todas as requisições
  const cancelAllRequests = useCallback(() => {
    requestManager.cancelAllRequests();
    setLoadingStates({});
    setRequestCounts({});
  }, []);

  // ✅ Aguardar todas as requisições terminarem
  const waitForAllRequests = useCallback(async () => {
    await requestManager.waitForAllRequests();
  }, []);

  // ✅ Cleanup ao desmontar componente
  useEffect(() => {
    return () => {
      // Cancelar requisições específicas do componente se necessário
      // (pode ser implementado com contexto específico)
    };
  }, []);

  return {
    executeRequest,
    isLoading,
    hasAnyLoading,
    getRequestCount,
    cancelRequest,
    cancelAllRequests,
    waitForAllRequests,
    loadingStates,
    requestCounts,
  };
};
*/

// ✅ Hook especializado para formulários - TEMPORARILY DISABLED FOR PROJECT DELIVERY
export const useFormSubmission = () => {
  // FALLBACK VALUES FOR TEMPORARY DISABLE
  return {
    submitForm: () => Promise.resolve(null),
    isSubmitting: () => false,
    submitError: null,
    submitSuccess: false,
    resetForm: () => {},
  };
};

/*
// ORIGINAL IMPLEMENTATION - TEMPORARILY DISABLED
export const useFormSubmission_DISABLED = () => {
  const { executeRequest, isLoading } = useRequestManager();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const submitForm = useCallback(
    async <T>(
      formKey: string,
      submitFn: () => Promise<T>,
      options?: {
        successMessage?: string;
        onSuccess?: (result: T) => void;
        onError?: (error: any) => void;
      }
    ): Promise<T | null> => {
      setSubmitError(null);
      setSubmitSuccess(false);

      try {
        const result = await executeRequest(formKey, submitFn, {
          timeout: 15000,
          retries: 1,
        });

        setSubmitSuccess(true);
        if (options?.onSuccess) {
          options.onSuccess(result);
        }

        return result;
      } catch (error: any) {
        const errorMessage = error?.message || "Erro inesperado";
        setSubmitError(errorMessage);

        if (options?.onError) {
          options.onError(error);
        }

        return null;
      }
    },
    [executeRequest]
  );

  const resetForm = useCallback(() => {
    setSubmitError(null);
    setSubmitSuccess(false);
  }, []);

  return {
    submitForm,
    isSubmitting: (formKey: string) => isLoading(formKey),
    submitError,
    submitSuccess,
    resetForm,
  };
};
*/

// ✅ Hook para operações CRUD - TEMPORARILY DISABLED FOR PROJECT DELIVERY
export const useCrudOperations = (entityType: string) => {
  // FALLBACK VALUES FOR TEMPORARY DISABLE
  return {
    create: () => Promise.resolve(null),
    update: () => Promise.resolve(null),
    delete: () => Promise.resolve(false),
    isCreating: false,
    isUpdating: () => false,
    isDeleting: () => false,
    operationError: null,
    lastOperation: null,
    resetOperationState: () => {},
  };
};

/*
// ORIGINAL IMPLEMENTATION - TEMPORARILY DISABLED
export const useCrudOperations_DISABLED = (entityType: string) => {
  const { executeRequest, isLoading } = useRequestManager();
  const [operationError, setOperationError] = useState<string | null>(null);
  const [lastOperation, setLastOperation] = useState<{
    type: "create" | "update" | "delete";
    success: boolean;
    timestamp: Date;
  } | null>(null);

  const create = useCallback(
    async <T>(data: any, url?: string): Promise<T | null> => {
      setOperationError(null);

      try {
        const result = await executeRequest(
          `${entityType}:create`,
          async () => {
            const response = await fetch(
              url || `${API_BASE_URL}/${entityType}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              }
            );

            if (!response.ok) {
              throw new Error(
                `Erro ao criar ${entityType}: ${response.status}`
              );
            }

            return response.json();
          },
          { timeout: 15000, retries: 1 }
        );

        setLastOperation({
          type: "create",
          success: true,
          timestamp: new Date(),
        });

        return result;
      } catch (error: any) {
        const errorMessage = error?.message || `Erro ao criar ${entityType}`;
        setOperationError(errorMessage);

        setLastOperation({
          type: "create",
          success: false,
          timestamp: new Date(),
        });

        return null;
      }
    },
    [entityType, executeRequest]
  );

  const update = useCallback(
    async <T>(id: string, data: any, url?: string): Promise<T | null> => {
      setOperationError(null);

      try {
        const result = await executeRequest(
          `${entityType}:update:${id}`,
          async () => {
            const response = await fetch(
              url || `${API_BASE_URL}/${entityType}/${id}`,
              {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              }
            );

            if (!response.ok) {
              throw new Error(
                `Erro ao atualizar ${entityType}: ${response.status}`
              );
            }

            return response.json();
          },
          { timeout: 15000, retries: 1 }
        );

        setLastOperation({
          type: "update",
          success: true,
          timestamp: new Date(),
        });

        return result;
      } catch (error: any) {
        const errorMessage =
          error?.message || `Erro ao atualizar ${entityType}`;
        setOperationError(errorMessage);

        setLastOperation({
          type: "update",
          success: false,
          timestamp: new Date(),
        });

        return null;
      }
    },
    [entityType, executeRequest]
  );

  const remove = useCallback(
    async (id: string, url?: string): Promise<boolean> => {
      setOperationError(null);

      try {
        await executeRequest(
          `${entityType}:delete:${id}`,
          async () => {
            const response = await fetch(
              url || `${API_BASE_URL}/${entityType}/${id}`,
              {
                method: "DELETE",
              }
            );

            if (!response.ok) {
              throw new Error(
                `Erro ao deletar ${entityType}: ${response.status}`
              );
            }

            return response.json();
          },
          { timeout: 10000, retries: 1 }
        );

        setLastOperation({
          type: "delete",
          success: true,
          timestamp: new Date(),
        });

        return true;
      } catch (error: any) {
        const errorMessage = error?.message || `Erro ao deletar ${entityType}`;
        setOperationError(errorMessage);

        setLastOperation({
          type: "delete",
          success: false,
          timestamp: new Date(),
        });

        return false;
      }
    },
    [entityType, executeRequest]
  );

  const resetOperationState = useCallback(() => {
    setOperationError(null);
    setLastOperation(null);
  }, []);

  return {
    create,
    update,
    delete: remove,
    isCreating: isLoading(`${entityType}:create`),
    isUpdating: (id: string) => isLoading(`${entityType}:update:${id}`),
    isDeleting: (id: string) => isLoading(`${entityType}:delete:${id}`),
    operationError,
    lastOperation,
    resetOperationState,
  };
};
*/

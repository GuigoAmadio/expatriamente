import { useState, useEffect, useCallback, useMemo } from "react";
import { requestManager, RequestOptions } from "@/lib/request-manager";

// ✅ Hook para gerenciar requisições com loading states
export const useRequestManager = () => {
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

// ✅ Hook especializado para formulários
export const useFormSubmission = () => {
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

// ✅ Hook para operações CRUD
export const useCrudOperations = (entityType: string) => {
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
            const response = await fetch(url || `/api/${entityType}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

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
            const response = await fetch(url || `/api/${entityType}/${id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

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
            const response = await fetch(url || `/api/${entityType}/${id}`, {
              method: "DELETE",
            });

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

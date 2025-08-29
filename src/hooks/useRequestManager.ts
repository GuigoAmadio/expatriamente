import { useState, useCallback, useRef } from "react";

// ✅ Hook para gerenciar requisições com loading states
export const useRequestManager = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [requestCounts, setRequestCounts] = useState<Record<string, number>>({});
  const activeRequests = useRef<Set<string>>(new Set());

  // ✅ Adicionar loading state
  const addLoading = useCallback((key: string) => {
    setLoadingStates((prev) => ({ ...prev, [key]: true }));
    setRequestCounts((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    activeRequests.current.add(key);
  }, []);

  // ✅ Remover loading state
  const removeLoading = useCallback((key: string) => {
    setLoadingStates((prev) => ({ ...prev, [key]: false }));
    activeRequests.current.delete(key);
  }, []);

  // ✅ Verificar se há qualquer loading
  const hasAnyLoading = Object.values(loadingStates).some(Boolean);

  // ✅ Cancelar todas as requisições
  const cancelAllRequests = useCallback(() => {
    console.log("❌ [Request Manager] Cancelando todas as requisições...");
    setLoadingStates({});
    activeRequests.current.clear();
  }, []);

  // ✅ Verificar se uma requisição específica está carregando
  const isLoading = useCallback((key: string) => {
    return loadingStates[key] || false;
  }, [loadingStates]);

  return {
    loadingStates,
    requestCounts,
    hasAnyLoading,
    addLoading,
    removeLoading,
    cancelAllRequests,
    isLoading,
  };
};

// ✅ Hook especializado para formulários
export const useFormRequestManager = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // ✅ Iniciar submissão
  const startSubmit = useCallback(() => {
    setIsSubmitting(true);
    setSubmitCount((prev) => prev + 1);
  }, []);

  // ✅ Finalizar submissão
  const finishSubmit = useCallback(() => {
    setIsSubmitting(false);
  }, []);

  // ✅ Resetar estado
  const resetSubmit = useCallback(() => {
    setIsSubmitting(false);
    setSubmitCount(0);
  }, []);

  return {
    isSubmitting,
    submitCount,
    startSubmit,
    finishSubmit,
    resetSubmit,
  };
};

// ✅ Hook para operações CRUD
export const useCRUDRequestManager = () => {
  const [crudStates, setCrudStates] = useState<Record<string, boolean>>({});
  const [crudCounts, setCrudCounts] = useState<Record<string, number>>({});

  // ✅ Operação CREATE
  const startCreate = useCallback((key: string) => {
    setCrudStates((prev) => ({ ...prev, [`${key}_create`]: true }));
    setCrudCounts((prev) => ({ ...prev, [`${key}_create`]: (prev[`${key}_create`] || 0) + 1 }));
  }, []);

  const finishCreate = useCallback((key: string) => {
    setCrudStates((prev) => ({ ...prev, [`${key}_create`]: false }));
  }, []);

  // ✅ Operação READ
  const startRead = useCallback((key: string) => {
    setCrudStates((prev) => ({ ...prev, [`${key}_read`]: true }));
    setCrudCounts((prev) => ({ ...prev, [`${key}_read`]: (prev[`${key}_read`] || 0) + 1 }));
  }, []);

  const finishRead = useCallback((key: string) => {
    setCrudStates((prev) => ({ ...prev, [`${key}_read`]: false }));
  }, []);

  // ✅ Operação UPDATE
  const startUpdate = useCallback((key: string) => {
    setCrudStates((prev) => ({ ...prev, [`${key}_update`]: true }));
    setCrudCounts((prev) => ({ ...prev, [`${key}_update`]: (prev[`${key}_update`] || 0) + 1 }));
  }, []);

  const finishUpdate = useCallback((key: string) => {
    setCrudStates((prev) => ({ ...prev, [`${key}_update`]: false }));
  }, []);

  // ✅ Operação DELETE
  const startDelete = useCallback((key: string) => {
    setCrudStates((prev) => ({ ...prev, [`${key}_delete`]: true }));
    setCrudCounts((prev) => ({ ...prev, [`${key}_delete`]: (prev[`${key}_delete`] || 0) + 1 }));
  }, []);

  const finishDelete = useCallback((key: string) => {
    setCrudStates((prev) => ({ ...prev, [`${key}_delete`]: false }));
  }, []);

  // ✅ Verificar estados
  const isCreating = useCallback((key: string) => crudStates[`${key}_create`] || false, [crudStates]);
  const isReading = useCallback((key: string) => crudStates[`${key}_read`] || false, [crudStates]);
  const isUpdating = useCallback((key: string) => crudStates[`${key}_update`] || false, [crudStates]);
  const isDeleting = useCallback((key: string) => crudStates[`${key}_delete`] || false, [crudStates]);

  // ✅ Verificar se há qualquer operação em andamento
  const hasAnyCRUDLoading = Object.values(crudStates).some(Boolean);

  return {
    crudStates,
    crudCounts,
    startCreate,
    finishCreate,
    startRead,
    finishRead,
    startUpdate,
    finishUpdate,
    startDelete,
    finishDelete,
    isCreating,
    isReading,
    isUpdating,
    isDeleting,
    hasAnyCRUDLoading,
  };
};

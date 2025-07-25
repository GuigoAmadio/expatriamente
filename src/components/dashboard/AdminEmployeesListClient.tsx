"use client";
import { AdminEmployeesList } from "./AdminEmployeesList";
import { Employee } from "@/types/backend";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useToasts, Toast } from "@/components/ui/Toast";
import { deleteEmployee } from "@/actions/employees";

export default function AdminEmployeesListClient(props: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toasts, addToast, removeToast } = useToasts();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function updateQuery(params: Record<string, any>) {
    const current = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });
    router.push(`?${current.toString()}`);
  }

  const onSearchChange = (value: string) =>
    updateQuery({ search: value, page: 1 });
  const onStatusFilterChange = (value: string) =>
    updateQuery({ status: value, page: 1 });
  const onPageChange = (page: number) => updateQuery({ page });

  const onEditEmployee = (emp: Employee) =>
    router.push(`/dashboard/admin/employees/${emp.id}/edit`);
  const onDeleteEmployee = (id: string) => setConfirmDeleteId(id);
  const onSelectEmployee = (emp: Employee) =>
    router.push(`/dashboard/admin/employees/${emp.id}`);

  async function handleConfirmDelete() {
    if (!confirmDeleteId) return;
    setDeletingId(confirmDeleteId);
    try {
      const resp = await deleteEmployee(confirmDeleteId);
      if (resp.success) {
        addToast({
          message: "Funcionário excluído com sucesso!",
          type: "success",
        });
        setConfirmDeleteId(null);
        router.refresh();
      } else {
        addToast({
          message: resp.message || "Erro ao excluir funcionário.",
          type: "error",
        });
      }
    } catch (e) {
      addToast({ message: "Erro ao excluir funcionário.", type: "error" });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <AdminEmployeesList
        {...props}
        onSearchChange={onSearchChange}
        onStatusFilterChange={onStatusFilterChange}
        onPageChange={onPageChange}
        onEditEmployee={onEditEmployee}
        onDeleteEmployee={onDeleteEmployee}
        onSelectEmployee={onSelectEmployee}
        deletingId={deletingId || undefined}
        confirmDeleteId={confirmDeleteId || undefined}
      />
      <Modal
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        title="Confirmar exclusão"
      >
        <div className="mb-4">
          Tem certeza que deseja excluir este funcionário?
        </div>
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setConfirmDeleteId(null)}
            disabled={!!deletingId}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={handleConfirmDelete}
            disabled={!!deletingId}
          >
            {deletingId ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </Modal>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </>
  );
}

"use client";
import { AdminClientsList } from "./AdminClientsList";
import { BackendUser } from "@/types/backend";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useToasts, Toast } from "@/components/ui/Toast";
import { deleteUser } from "@/actions/users";

export default function AdminClientsListClient(props: any) {
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
  const onRoleFilterChange = (value: string) =>
    updateQuery({ role: value, page: 1 });
  const onPageChange = (page: number) => updateQuery({ page });

  const onAddClient = () => router.push("/dashboard/admin/clients/new");
  const onEditClient = (client: BackendUser) =>
    router.push(`/dashboard/admin/clients/${client.id}/edit`);
  const onDeleteClient = (id: string) => setConfirmDeleteId(id);
  const onSelectClient = (client: BackendUser) =>
    router.push(`/dashboard/admin/clients/${client.id}`);

  async function handleConfirmDelete() {
    if (!confirmDeleteId) return;
    setDeletingId(confirmDeleteId);
    try {
      const resp = await deleteUser(confirmDeleteId);
      if (resp.success) {
        addToast({ message: "Cliente excluído com sucesso!", type: "success" });
        setConfirmDeleteId(null);
        router.refresh();
      } else {
        addToast({ message: "Erro ao excluir cliente.", type: "error" });
      }
    } catch (e) {
      addToast({ message: "Erro ao excluir cliente.", type: "error" });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <AdminClientsList
        {...props}
        onSearchChange={onSearchChange}
        onStatusFilterChange={onStatusFilterChange}
        onRoleFilterChange={onRoleFilterChange}
        onPageChange={onPageChange}
        onAddClient={onAddClient}
        onEditClient={onEditClient}
        onDeleteClient={onDeleteClient}
        onSelectClient={onSelectClient}
        deletingId={deletingId || undefined}
        confirmDeleteId={confirmDeleteId || undefined}
      />
      <Modal
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        title="Confirmar exclusão"
      >
        <div className="mb-4">Tem certeza que deseja excluir este cliente?</div>
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

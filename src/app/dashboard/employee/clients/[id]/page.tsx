import { getClientById } from "@/actions/clients";
import { EmployeeClientNotes } from "@/components/dashboard/EmployeeClientNotes";
import { EmployeeClientProfile } from "@/components/dashboard/EmployeeClientProfile";
import { notFound } from "next/navigation";
import { getAnnotationsForUser, createAnnotation } from "@/actions/annotations";
import { revalidatePath } from "next/cache";

export default async function EmployeeClientProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const client = await getClientById(id);
  if (!client) return notFound();

  const annotationsResp = await getAnnotationsForUser(client.id, {
    page: 1,
    limit: 20,
  });
  const initialNotes = (annotationsResp?.data || []).map((a) => ({
    id: a.id,
    createdAt: a.createdAt,
    content: a.content,
  }));

  async function onCreate(formData: FormData) {
    "use server";
    const userId = String(formData.get("userId") || "");
    const content = String(formData.get("content") || "");
    if (!userId || !content) return;
    await createAnnotation({
      userId,
      content,
      visibility: "PRIVATE_TO_EMPLOYEE",
    });
    revalidatePath(`/dashboard/employee/clients/${userId}`);
  }

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <EmployeeClientProfile
          client={client}
          showEdit={false}
          showSystemInfo={false}
          showHistoryPlaceholder={false}
        />
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notas da Sessão
          </h2>
          <EmployeeClientNotes
            userId={client.id}
            initialNotes={initialNotes}
            onCreate={onCreate}
          />
        </div>
      </div>
    </div>
  );
}

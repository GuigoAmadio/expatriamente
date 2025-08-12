"use server";
import {
  serverGet,
  serverPost,
  serverPatch,
  serverDelete,
} from "@/lib/server-api";

export interface Annotation {
  id: string;
  clientId: string;
  userId: string;
  employeeId?: string | null;
  createdById: string;
  createdByRole: "SUPER_ADMIN" | "ADMIN" | "EMPLOYEE" | "CLIENT" | "GUEST";
  appointmentId?: string | null;
  content: string;
  visibility: "PRIVATE_TO_EMPLOYEE" | "SHARED_WITH_CLIENT";
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Paginated<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export async function getAnnotationsForUser(
  userId: string,
  q?: {
    appointmentId?: string;
    page?: number;
    limit?: number;
    visibility?: "PRIVATE_TO_EMPLOYEE" | "SHARED_WITH_CLIENT";
  }
): Promise<Paginated<Annotation>> {
  const params = new URLSearchParams();
  params.set("userId", userId);
  if (q?.appointmentId) params.set("appointmentId", q.appointmentId);
  if (q?.page) params.set("page", String(q.page));
  if (q?.limit) params.set("limit", String(q.limit));
  if (q?.visibility) params.set("visibility", q.visibility);

  const resp = await serverGet<{
    success: boolean;
    data: { data: Annotation[]; meta: Paginated<Annotation>["meta"] };
  }>(`/annotations?${params.toString()}`);
  const payload = resp?.data as any;
  return (
    (payload?.data as Paginated<Annotation>) || {
      data: [],
      meta: {
        page: 1,
        limit: 20,
        totalItems: 0,
        totalPages: 0,
        hasNext: false,
        hasPrevious: false,
      },
    }
  );
}

export async function createAnnotation(input: {
  userId: string;
  appointmentId?: string;
  content: string;
  visibility?: "PRIVATE_TO_EMPLOYEE" | "SHARED_WITH_CLIENT";
}): Promise<Annotation> {
  const resp = await serverPost<{
    success: boolean;
    data: { data: Annotation };
  }>("/annotations", input);
  const payload = resp?.data as any;
  return (payload?.data as { data: Annotation })?.data as Annotation;
}

export async function updateAnnotation(
  id: string,
  input: {
    content?: string;
    visibility?: "PRIVATE_TO_EMPLOYEE" | "SHARED_WITH_CLIENT";
    isPinned?: boolean;
  }
): Promise<Annotation> {
  const resp = await serverPatch<{
    success: boolean;
    data: { data: Annotation };
  }>(`/annotations/${id}`, input);
  const payload = resp?.data as any;
  return (payload?.data as { data: Annotation })?.data as Annotation;
}

export async function deleteAnnotation(id: string): Promise<boolean> {
  const resp = await serverDelete<{ success: boolean; message: string }>(
    `/annotations/${id}`
  );
  return !!resp;
}

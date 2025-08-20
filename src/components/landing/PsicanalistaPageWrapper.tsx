"use client";

import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { useEffect } from "react";

interface PsicanalistaPageWrapperProps {
  children: React.ReactNode;
  psychologistId: string;
  psychologistName: string;
}

export default function PsicanalistaPageWrapper({
  children,
  psychologistId,
  psychologistName,
}: PsicanalistaPageWrapperProps) {
  const { trackPageView, trackViewContent } = useFacebookPixel();

  useEffect(() => {
    console.log(`🔵 [Psicanalista Page] Página carregada:`, psychologistName);
    trackPageView();
    trackViewContent({
      content_name: psychologistName,
      content_category: 'Psychologist Page',
      content_type: 'page_view',
      psychologist_id: psychologistId,
      content_id: psychologistId
    });
  }, [trackPageView, trackViewContent, psychologistId, psychologistName]);

  return <>{children}</>;
}

"use client";

import { Header } from "@/components/ui";
import FooterSection from "@/components/landing/FooterSection";
import PsychologistsSection from "@/components/landing/PsychologistsSection";
import { useEffect, useState } from "react";

export default function PsicanalistasPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-[#deefff]">
      <Header />
      <main className="min-h-screen w-full">
        <div className="w-full">
          <PsychologistsSection />
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

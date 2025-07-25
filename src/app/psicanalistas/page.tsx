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
    <>
      <Header />
      <main className="min-h-screen bg-[#f5f6f3] flex flex-col items-center pt-12 pb-24 px-4 w-full">
        <h1 className="font-akzidens text-4xl md:text-5xl font-bold text-[#01386F] mb-10 text-center">
          Nossos Psicanalistas
        </h1>
        <div className="w-full max-w-6xl">
          <PsychologistsSection />
        </div>
      </main>
      <FooterSection />
    </>
  );
}

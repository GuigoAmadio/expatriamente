"use client";

import FAQSection from "@/components/landing/FAQSection";
import FooterSection from "@/components/landing/FooterSection";
import HeroSection from "@/components/landing/HeroSection";
import PsychologistsSection from "@/components/landing/PsychologistsSection";
import StoriesSection from "@/components/landing/StoriesSection";
import VideoCarouselSection from "@/components/landing/VideoCarouselSection";
import CTASection from "@/components/landing/CTASection";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useNavigation } from "@/context/NavigationContext";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

function HomeContent() {
  const searchParams = useSearchParams();
  const { setCurrentSection } = useNavigation();
  const { trackPageView } = useFacebookPixel();

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      setCurrentSection(section as any);
      // Scroll para o topo da página
      window.scrollTo(0, 0);
    }
  }, [searchParams, setCurrentSection]);

  useEffect(() => {
    console.log(`🔵 [Landing Page] Página carregada, rastreando PageView`);
    trackPageView();
  }, [trackPageView]);

  return (
    <div
      className="w-full overflow-x-hidden overflow-y-hidden"
      style={{ transform: "translateZ(0)" }}
    >
      <main className="w-full">
        <HeroSection />
        <StoriesSection />
        <VideoCarouselSection />
        <div className="bg-[#e4ded2]">
          <PsychologistsSection />
          <FAQSection />
        </div>
        <CTASection />
        <FooterSection />
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div
          className="w-full overflow-x-hidden overflow-y-hidden"
          style={{ transform: "translateZ(0)" }}
        >
          <main className="w-full">
            <HeroSection />
            <StoriesSection />
            <VideoCarouselSection />
            <div className="bg-gradient-to-br from-[#A6C0B3] to-[#85A899]">
              <PsychologistsSection />
              <FAQSection />
            </div>
            <CTASection />
            <FooterSection />
          </main>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}

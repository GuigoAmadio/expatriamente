import ContactSection from "@/components/landing/ContactSection";
import FAQSection from "@/components/landing/FAQSection";
import FooterSection from "@/components/landing/FooterSection";
import HeroSection from "@/components/landing/HeroSection";
import HowToUseSection from "@/components/landing/HowToUseSection";
import MetricsSection from "@/components/landing/MetricsSection";
import ProcessStepsSection from "@/components/landing/ProcessStepsSection";
import PsychologistsSection from "@/components/landing/PsychologistsSection";
import StoriesSection from "@/components/landing/StoriesSection";
import WorkersSection from "@/components/landing/WorkersSection";
import TopicsSection from "@/components/landing/TopicsSection";
import VideoCarouselSection from "@/components/landing/VideoCarouselSection";
import CTASection from "@/components/landing/CTASection";
import Header from "@/components/ui/Header";

export default function Home() {
  return (
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
  );
}

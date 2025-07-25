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
import Header from "@/components/ui/Header";

export default function Home() {
  return (
    <div
      className="w-full overflow-x-hidden overflow-y-hidden"
      style={{ transform: "translateZ(0)" }}
    >
      <Header />
      <main className="bg-[#deefff] transition-colors duration-300 w-full">
        <HeroSection />
        <StoriesSection />
        <VideoCarouselSection />
        <PsychologistsSection />
        <FAQSection />
        <FooterSection />
      </main>
    </div>
  );
}

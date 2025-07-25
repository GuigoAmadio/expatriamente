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

export default function Home() {
  return (
    <main className="bg-[#deefff] min-h-screen transition-colors duration-300">
      <HeroSection />
      <StoriesSection />
      <VideoCarouselSection />
      <PsychologistsSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}

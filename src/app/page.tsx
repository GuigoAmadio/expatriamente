import HeroSection from "@/components/landing/HeroSection";
import MetricsSection from "@/components/landing/MetricsSection";
import StoriesSection from "@/components/landing/StoriesSection";
import PsychologistsSection from "@/components/landing/PsychologistsSection";
import FAQSection from "@/components/landing/FAQSection";

export default function Home() {
  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <HeroSection />
      <MetricsSection />
      <StoriesSection />
      <PsychologistsSection />
      <FAQSection />
    </main>
  );
}

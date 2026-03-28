import { setRequestLocale } from "next-intl/server";
import { AnimatedBackground } from "@/components/animated-background";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { AiSimulatorSection } from "@/components/ai-simulator";
import { ExragPlatformSection } from "@/components/exrag-platform-section";
import { ServicesSection } from "@/components/services-section";
import { AboutSection } from "@/components/about-section";
import { CeoSection } from "@/components/ceo-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="grain" aria-hidden />
      <AnimatedBackground />
      <SiteHeader />
      <main>
        <HeroSection />
        <AiSimulatorSection />
        <ExragPlatformSection />
        <ServicesSection />
        <AboutSection />
        <ProjectsSection />
        <CeoSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}

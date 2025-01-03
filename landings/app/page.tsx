"use client";
import { OurServices } from "@/containers/OurServicesContainer";
import { MainHero } from "@/containers/MainHeroContainer";
import { CtaContainer } from "@/containers/CtaContainer";
import { FooterContainer } from "@/containers/FooterContainer";
import { OurTechs } from "@/containers/OurTechsContainer";
import { OurTeam } from "@/containers/OurTeamContainer";
import { TestimonialsContainer } from "@/containers/TestimonialsContainer";
import { FaqContainer } from "@/containers/FaqContainer";
import { ScrollTop } from "@/components/ScrollTop";
import ClientsCarousel from "@/components/ClientsCarousel";
import { ContactButton } from "@/components/ContactButton";

export default function Home() {
  return (
    <>
      <MainHero />
      <ClientsCarousel />
      <OurServices />
      {/* <OurTechs /> */}
      <TestimonialsContainer />
      <CtaContainer />
      <OurTeam />
      <FaqContainer />
      <FooterContainer />
      <ScrollTop right={20} bottom={80} />
      <ContactButton right={20} bottom={20} />
    </>
  );
}

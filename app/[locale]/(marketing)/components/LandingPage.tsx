"use client";

import { useState } from "react";
import { HeroSection } from "./HeroSection";
import { TrustStrip } from "./TrustStrip";
import { PresentationSection } from "./PresentationSection";
import { ModulesSection } from "./ModulesSection";
import { TutorialSection } from "./TutorialSection";
import { QuoteSection } from "./QuoteSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { InteractiveTutorial } from "./InteractiveTutorial";

export function LandingPage() {
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <>
      <HeroSection onStartTour={() => setTourOpen(true)} />
      <TrustStrip />
      <PresentationSection />
      <ModulesSection />
      <TutorialSection onStartTour={() => setTourOpen(true)} />
      <QuoteSection />
      <FinalCtaSection />

      <InteractiveTutorial open={tourOpen} onClose={() => setTourOpen(false)} />
    </>
  );
}

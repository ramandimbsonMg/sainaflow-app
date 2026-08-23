import { MousePointerClick } from "lucide-react";
import { tutorialSteps } from "./modules-data";

export function TutorialSection({ onStartTour }: { onStartTour: () => void }) {
  return (
    <section id="tutorial" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto w-full max-w-[1280px] px-6">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#e0e7ff] bg-[#eef2ff] px-3.5 py-1 text-xs font-semibold text-[#4F46E5]">
            Le tutoriel
          </div>
          <h2 className="mb-3 text-3xl font-extrabold tracking-[-0.02em] text-gray-900 lg:text-4xl">
            Comment ca <span className="text-[#4F46E5]">marche</span>
          </h2>
          <p className="text-[15px] text-gray-500">
            Quatre etapes suffisent pour comprendre SainaFlow. Lancez le tour
            guide pour decouvrir chaque module en detail.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tutorialSteps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-[16px] border border-[#f0f0f0] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(79,70,229,0.1)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff] text-[15px] font-extrabold text-[#4F46E5]">
                {step.number}
              </div>
              <div className="mb-1.5 text-[15px] font-bold text-gray-900">
                {step.title}
              </div>
              <p className="text-xs leading-[1.6] text-gray-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={onStartTour}
            className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] bg-[#4F46E5] px-[26px] py-[13px] text-sm font-semibold text-white shadow-[0_4px_12px_rgba(79,70,229,0.3)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(79,70,229,0.4)]"
          >
            <MousePointerClick size={16} />
            Lancer le tour guide
          </button>
        </div>
      </div>
    </section>
  );
}

import { CheckCircle2, LineChart, Target, Timer } from "lucide-react";

const POINTS = [
  "Une vue d'ensemble de votre entreprise en temps reel",
  "Pipeline commercial complet : leads, opportunites, contrats",
  "Gestion de projet avec Kanban, taches et suivi du temps",
  "Rapports automatiques et analyse de l'activite",
  "Assistant IA qui redefinit et priorise vos taches",
  "Emails et documents centralises et organises",
];

const MINI_FEATURES = [
  {
    icon: Target,
    title: "Pilotez",
    desc: "Objectifs, cibles et KPI",
  },
  {
    icon: Timer,
    title: "Suivez",
    desc: "Temps passe et activite",
  },
  {
    icon: LineChart,
    title: "Analysez",
    desc: "Rapports et tendances",
  },
];

export function PresentationSection() {
  return (
    <section
      id="presentation"
      className="scroll-mt-20 bg-white py-20"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Left: text */}
          <div>
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#e0e7ff] bg-[#eef2ff] px-3.5 py-1 text-xs font-semibold text-[#4F46E5]">
              La presentation
            </div>
            <h2 className="mb-4 text-3xl font-extrabold tracking-[-0.02em] text-gray-900 lg:text-4xl">
              Qu&apos;est-ce que{" "}
              <span className="text-[#4F46E5]">SainaFlow</span> ?
            </h2>
            <p className="mb-6 text-[15px] leading-[1.7] text-gray-500">
              SainaFlow est une plateforme tout-en-un de gestion d&apos;entreprise
              concue pour les agences digitales. Elle centralise votre CRM, vos
              projets, vos emails, vos documents et vos rapports, et les enrichit
              d&apos;un assistant IA pour vous faire gagner un temps precieux.
            </p>
            <ul className="mb-8 space-y-2.5">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#4F46E5]"
                  />
                  <span className="text-sm text-gray-600">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: feature cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {MINI_FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-[16px] border border-[#f0f0f0] bg-[#fafaff] p-5 shadow-[0_1px_3px_rgba(15,13,46,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(79,70,229,0.12)]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#4F46E5,#7C3AED)]">
                  <f.icon size={18} className="text-white" />
                </div>
                <div className="text-[15px] font-bold text-gray-900">
                  {f.title}
                </div>
                <div className="mt-1 text-xs leading-[1.5] text-gray-500">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

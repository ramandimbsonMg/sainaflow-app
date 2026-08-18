import { Layers, ShieldCheck, Sparkles, Users } from "lucide-react";

const PILLARS = [
  {
    icon: Layers,
    title: "Tout-en-un",
    desc: "CRM, projets, emails et documents dans une seule plateforme",
  },
  {
    icon: Sparkles,
    title: "Propulse par l'IA",
    desc: "Priorisation des taches et assistance intelligente",
  },
  {
    icon: ShieldCheck,
    title: "Securise",
    desc: "Vos donnees protegees et accessibles par role",
  },
  {
    icon: Users,
    title: "Concu pour les equipes",
    desc: "Collaboration temps reel et gestion par projet",
  },
];

export function TrustStrip() {
  return (
    <div className="border-b border-[#f0f0f0] bg-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 px-6 max-[480px]:grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <div
            key={p.title}
            className={`flex items-center gap-3 px-4 py-5 ${
              i < PILLARS.length - 1
                ? "max-lg:border-b max-lg:border-[#f0f0f0] lg:border-r lg:border-[#f0f0f0]"
                : ""
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef2ff]">
              <p.icon size={18} strokeWidth={1.8} className="text-[#4F46E5]" />
            </div>
            <div>
              <div className="mb-0.5 text-[13px] font-bold leading-[1.2] text-[#1a1a1a]">
                {p.title}
              </div>
              <div className="text-xs leading-[1.3] text-[#888]">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import {
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

interface Pillar {
  icon: LucideIcon;
  title: string;
  desc: string;
  accent: string;
}

const PILLARS: Pillar[] = [
  {
    icon: Layers,
    title: "Tout-en-un",
    desc: "CRM, projets, emails et documents dans une seule plateforme",
    accent: "#4F46E5",
  },
  {
    icon: Sparkles,
    title: "Propulse par l'IA",
    desc: "Priorisation des taches et assistance intelligente",
    accent: "#7C3AED",
  },
  {
    icon: ShieldCheck,
    title: "Securise",
    desc: "Vos donnees protegees et accessibles par role",
    accent: "#0EA5E9",
  },
  {
    icon: Users,
    title: "Concu pour les equipes",
    desc: "Collaboration temps reel et gestion par projet",
    accent: "#EC4899",
  },
];

export function TrustStrip() {
  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-6">
        {/* Desktop: bento asymmetric */}
        <div className="hidden gap-4 lg:grid lg:grid-cols-[1.4fr_0.6fr]">
          <BentoCard pillar={PILLARS[0]} large />
          <BentoCard pillar={PILLARS[1]} />
        </div>
        <div className="mt-4 hidden gap-4 lg:grid lg:grid-cols-3">
          <BentoCard pillar={PILLARS[2]} />
          <BentoCard pillar={PILLARS[3]} />
          <div className="flex items-center justify-center rounded-[14px] border border-dashed border-gray-200 bg-gray-50/60 p-5">
            <span className="text-sm font-medium text-gray-400">
              + d&apos;avantages dans l&apos;app
            </span>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="grid gap-3 lg:hidden">
          {PILLARS.map((p) => (
            <BentoCard key={p.title} pillar={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BentoCard({
  pillar,
  large = false,
}: {
  pillar: Pillar;
  large?: boolean;
}) {
  const Icon = pillar.icon;

  return (
    <div
      className={`group rounded-[14px] border border-gray-100 bg-gray-50/40 p-5 transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${
        large ? "flex items-center gap-6" : ""
      }`}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border"
        style={{
          backgroundColor: `${pillar.accent}08`,
          borderColor: `${pillar.accent}18`,
        }}
      >
        <Icon size={18} strokeWidth={1.8} style={{ color: pillar.accent }} />
      </div>
      <div>
        <div
          className={`font-bold leading-tight text-gray-900 ${
            large ? "text-base" : "mb-0.5 text-[13px]"
          }`}
        >
          {pillar.title}
        </div>
        <div
          className={`leading-snug text-gray-500 ${
            large ? "mt-1 max-w-md text-sm" : "text-xs"
          }`}
        >
          {pillar.desc}
        </div>
      </div>
    </div>
  );
}

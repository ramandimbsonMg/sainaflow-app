import { Check, Play } from "lucide-react";
import Link from "next/link";

const STATS = [
  { value: "8+", label: "Modules integres" },
  { value: "100%", label: "Assistant IA" },
  { value: "1", label: "Plateforme unique" },
];

export function HeroSection({ onStartTour }: { onStartTour: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#0c0a1a]">
      {/* Geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-[#4F46E5]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full bg-[#7C3AED]/15 blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-6 pt-16 pb-24 lg:grid-cols-[1fr_auto] lg:gap-16 lg:pt-20">
        {/* Left: text content */}
        <div>
          {/* Trust badge */}
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/[0.22] bg-white/[0.1] px-3.5 py-1 text-xs font-semibold text-white">
            <Check size={13} strokeWidth={3} className="shrink-0 text-emerald-400" />
            Plateforme de gestion pour agences digitales
          </div>

          {/* Headline */}
          <h1 className="mb-4 text-[clamp(34px,4.5vw,54px)] font-extrabold leading-[1.1] tracking-[-1px] text-white">
            Gerez vos projets
            <br />
            avec{" "}
            <span className="bg-[linear-gradient(135deg,#818CF8,#A78BFA)] bg-clip-text text-transparent">
              intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-8 max-w-[500px] text-[15px] leading-[1.65] text-[rgba(255,255,255,0.8)]">
            SainaFlow regroupe CRM, gestion de projet, emails, documents,
            rapports et intelligence artificielle dans une seule plateforme.
            Pilotez votre agence de A a Z, simplement et efficacement.
          </p>

          {/* CTA buttons */}
          <div className="mb-10 flex flex-wrap gap-3">
            <Link href="/register">
              <button className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border-none bg-white px-[26px] py-[13px] text-sm font-bold tracking-[0.01em] text-[#0c0a1a] transition-opacity hover:opacity-90">
                Commencer gratuitement
              </button>
            </Link>
            <button
              onClick={onStartTour}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border-[1.5px] border-white/40 bg-transparent px-[26px] py-[13px] text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Play size={14} className="fill-white" />
              Lancer le tour
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-9">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-[22px] font-extrabold leading-none text-[#A5B4FC]">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-[rgba(255,255,255,0.6)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: dashboard mockup */}
        <div className="relative w-full max-w-[460px] shrink-0 lg:w-[440px]">
          {/* Live badge */}
          <div className="absolute -top-3 right-4 z-[3] inline-flex items-center gap-1.5 rounded-full bg-[#4F46E5] px-3 py-[5px] text-xs font-bold text-white shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            En direct
          </div>

          {/* Mockup frame */}
          <div className="overflow-hidden rounded-2xl border-[2px] border-[#4F46E5]/50 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            {/* Window bar */}
            <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FECACA]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FDE68A]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#A7F3D0]" />
              <span className="ml-3 rounded-md bg-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                app.sainaflow.com
              </span>
            </div>

            {/* Mockup body */}
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-gray-900">Dashboard</div>
                  <div className="text-[11px] text-gray-400">
                    Vue d&apos;ensemble de l&apos;entreprise
                  </div>
                </div>
                <div className="rounded-lg bg-[#eef2ff] px-2.5 py-1 text-[11px] font-semibold text-[#4F46E5]">
                  Ce mois-ci
                </div>
              </div>

              {/* KPI tiles */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "Revenus", value: "48 200", delta: "+12%" },
                  { label: "Leads", value: "126", delta: "+8%" },
                  { label: "Taches", value: "32", delta: "-5%" },
                ].map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-xl border border-gray-100 bg-gray-50/60 p-3"
                  >
                    <div className="text-[10px] font-medium text-gray-400">
                      {kpi.label}
                    </div>
                    <div className="mt-1 text-lg font-bold text-gray-900">
                      {kpi.value}
                    </div>
                    <div
                      className={`mt-0.5 text-[10px] font-semibold ${
                        kpi.delta.startsWith("+")
                          ? "text-emerald-600"
                          : "text-rose-500"
                      }`}
                    >
                      {kpi.delta}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="rounded-xl border border-gray-100 p-3">
                <div className="mb-2 text-[10px] font-medium text-gray-400">
                  Evolution des revenus
                </div>
                <div className="flex h-16 items-end gap-1.5">
                  {[40, 55, 45, 70, 60, 85, 75, 100, 65, 90].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-[3px] ${
                        i === 7 || i === 9
                          ? "bg-[linear-gradient(180deg,#818CF8,#4F46E5)]"
                          : "bg-[#c7d2fe]"
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Task row */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-[#fafaff] p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef2ff]">
                  <SparklesMini />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-semibold text-gray-900">
                    Assistant IA
                  </div>
                  <div className="text-[10px] text-gray-400">
                    3 taches priorisees pour aujourd&apos;hui
                  </div>
                </div>
                <div className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  IA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="leading-none">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-[60px] w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 L0,30 Q180,0 360,20 Q540,40 720,20 Q900,0 1080,20 Q1260,40 1440,20 L1440,60 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

function SparklesMini() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 text-[#4F46E5]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3L13.8 9.2L20 11L13.8 12.8L12 19L10.2 12.8L4 11L10.2 9.2L12 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

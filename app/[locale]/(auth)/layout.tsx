import { getTranslations } from "next-intl/server";
import { Sparkles, Clock, FolderKanban, Zap, ArrowRight } from "lucide-react";

import "@/app/[locale]/globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "RootLayout" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const features = [
  {
    icon: FolderKanban,
    title: "Kanban Board",
    description: "Drag & drop, colonnes personnalisees, vue d'ensemble",
    color: "bg-[#4F46E5]",
  },
  {
    icon: Clock,
    title: "Suivi du temps",
    description: "Chronometre integre et rapports detailles",
    color: "bg-[#7C3AED]",
  },
  {
    icon: Sparkles,
    title: "Assistant IA",
    description: "Redefinition des taches et priorisation intelligente",
    color: "bg-[#EC4899]",
  },
];

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] relative overflow-hidden bg-[#0c0a1a]">
        {/* Geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between px-12 xl:px-16 w-full py-12">
          {/* Top - Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#4F46E5] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl font-bold text-white tracking-tight"
              style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
            >
              SainaFlow
            </span>
          </div>

          {/* Middle - Tagline + Features */}
          <div className="flex flex-col justify-center">
            <h1
              className="text-4xl xl:text-[2.75rem] font-bold text-white mb-3 leading-[1.15]"
              style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
            >
              Gerez vos projets
              <br />
              avec{" "}
              <span className="text-[#4F46E5]">intelligence</span>
            </h1>
            <p className="text-base text-gray-400 mb-10 max-w-md leading-relaxed">
              Plateforme de gestion de projet pour agences digitales.
              Kanban, suivi du temps, facturation et IA.
            </p>

            {/* Feature List */}
            <div className="space-y-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.04] border border-white/[0.06] max-w-md transition-colors hover:bg-white/[0.07]"
                >
                  <div
                    className={`flex-shrink-0 w-9 h-9 rounded-md ${feature.color} flex items-center justify-center`}
                  >
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom - Footer */}
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Propulse par l'intelligence artificielle</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-col w-full lg:w-[55%] xl:w-[50%] bg-white dark:bg-[#0f0e17]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 lg:px-10 py-5">
          <div className="lg:hidden flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#4F46E5] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
            >
              SainaFlow
            </span>
          </div>
          <ThemeToggle />
        </div>

        {/* Form Content */}
        <div className="flex items-center justify-center flex-1 px-6 py-8 lg:py-0">
          <div className="w-full max-w-[380px]">{children}</div>
        </div>

        {/* Bottom */}
        <div className="px-6 lg:px-10 py-5 text-xs text-muted-foreground hidden lg:block">
          &copy; {new Date().getFullYear()} SainaFlow. Tous droits reserves.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

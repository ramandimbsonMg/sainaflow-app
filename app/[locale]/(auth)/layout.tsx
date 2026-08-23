import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ThemeToggle";

import "@/app/[locale]/globals.css";

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

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#eef2ff] p-[24px_16px] dark:bg-[#0f0e17]">
      {/* Decorative */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#4F46E5]/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 h-[420px] w-[420px] rounded-full bg-[#7C3AED]/[0.08] blur-3xl" />

      {/* Theme toggle */}
      <div className="absolute top-5 right-5 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-[440px]">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        {/* Card */}
        <div className="rounded-[20px] border border-[#4F46E5]/[0.06] bg-white p-[40px_32px] shadow-[0_4px_40px_rgba(79,70,229,0.08),0_1px_4px_rgba(79,70,229,0.04)] sm:p-[40px_36px] dark:border-white/[0.06] dark:bg-[#171622]">
          {children}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} SainaFlow. Tous droits reserves.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;

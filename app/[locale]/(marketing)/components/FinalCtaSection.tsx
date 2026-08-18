import { Check } from "lucide-react";
import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="bg-[#fafaff] px-6 py-20">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#1e1b4b_0%,#312e81_55%,#4F46E5_130%)] px-8 py-16 text-center lg:px-16">
        {/* Decorative */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#7C3AED]/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-extrabold tracking-[-0.02em] text-white lg:text-4xl">
            Pret a piloter votre agence avec SainaFlow ?
          </h2>
          <p className="mb-8 text-[15px] leading-relaxed text-[rgba(255,255,255,0.75)]">
            Rejoignez la plateforme qui centralise votre CRM, vos projets, vos
            emails et vos documents, propulsee par l&apos;intelligence
            artificielle.
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-2.5">
            {["Gratuit pour demarrer", "Sans carte bancaire", "Setup en 2 minutes"].map(
              (item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white"
                >
                  <Check size={12} strokeWidth={3} className="text-emerald-400" />
                  {item}
                </span>
              )
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/register">
              <button className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border-none bg-white px-[26px] py-[13px] text-sm font-bold text-[#1e1b4b] transition-opacity hover:opacity-90">
                Creer un compte
              </button>
            </Link>
            <Link href="/sign-in">
              <button className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border-[1.5px] border-white/40 bg-transparent px-[26px] py-[13px] text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10">
                Se connecter
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, X } from "lucide-react";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { modules } from "./modules-data";

interface InteractiveTutorialProps {
  open: boolean;
  onClose: () => void;
}

export function InteractiveTutorial({
  open,
  onClose,
}: InteractiveTutorialProps) {
  const total = modules.length + 1;
  const [step, setStep] = useState(0);

  const handleClose = () => {
    setStep(0);
    onClose();
  };

  const isLast = step === total - 1;
  const isFirst = step === 0;

  const currentModule = step > 0 ? modules[step - 1] : null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-[480px] rounded-[20px] border-0 p-0 shadow-[0_20px_60px_rgba(15,13,46,0.3)] sm:rounded-[20px]">
        <button
          onClick={handleClose}
          aria-label="Fermer le tour"
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-md p-1 text-gray-400 transition-colors hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Top accent bar */}
        <div className="h-1.5 w-full rounded-t-[20px] bg-[linear-gradient(135deg,#4F46E5,#7C3AED)]" />

        <div className="p-7">
          {isFirst ? (
            /* Welcome step */
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4F46E5,#7C3AED)]">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <DialogTitle className="mb-2 text-xl font-extrabold tracking-tight text-gray-900">
                Bienvenue dans SainaFlow
              </DialogTitle>
              <p className="mb-2 text-sm leading-relaxed text-gray-500">
                Ce tour guide vous presente les modules essentiels de la
                plateforme. En quelques minutes, vous saurez a quoi sert chaque
                espace de l&apos;application.
              </p>
              <p className="text-xs text-gray-400">
                {modules.length} modules a decouvrir
              </p>
            </div>
          ) : isLast ? (
            /* Final step */
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#10B981,#059669)]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-7 w-7 text-white"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <DialogTitle className="mb-2 text-xl font-extrabold tracking-tight text-gray-900">
                Vous etes pret !
              </DialogTitle>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                Creez votre compte et commencez a piloter votre agence avec
                SainaFlow. C&apos;est gratuit et sans carte bancaire.
              </p>
              <Link
                href="/register"
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,#4F46E5,#4338CA)] px-[26px] py-[13px] text-sm font-semibold text-white shadow-[0_4px_12px_rgba(79,70,229,0.3)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(79,70,229,0.4)]"
              >
                Commencer gratuitement
              </Link>
            </div>
          ) : (
            /* Module step */
            currentModule && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${currentModule.color}`}
                  >
                    <currentModule.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Module {step} sur {modules.length}
                    </div>
                    <DialogTitle className="text-lg font-extrabold tracking-tight text-gray-900">
                      {currentModule.title}
                    </DialogTitle>
                  </div>
                </div>
                <p className="text-sm leading-[1.7] text-gray-500">
                  {currentModule.description}
                </p>
              </div>
            )
          )}

          {/* Navigation */}
          {!isLast && (
            <div className="mt-7 flex items-center justify-between border-t border-gray-100 pt-5">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={isFirst}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-[#c7d2fe] hover:text-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Precedent
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: total }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === step ? "w-5 bg-[#4F46E5]" : "w-1.5 bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA]"
              >
                {step === 0 ? "Commencer" : "Suivant"}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

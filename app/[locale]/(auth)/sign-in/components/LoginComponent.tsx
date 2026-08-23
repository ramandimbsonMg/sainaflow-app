"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MailIcon, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

type Step = "email" | "otp";

export function LoginComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      toast.error("Erreur avec la connexion Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async () => {
    if (!email) {
      toast.error("Veuillez entrer votre adresse email.");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });
      if (error) {
        toast.error(error.message || "Echec de l'envoi du code.");
        return;
      }
      setStep("otp");
      if (process.env.NODE_ENV !== "production") {
        toast.success("Code envoye ! Verifiez le terminal du serveur.");
      } else {
        toast.success("Code de verification envoye.");
      }
    } catch (error) {
      toast.error("Echec de l'envoi du code de verification.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Veuillez entrer le code a 6 chiffres.");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await authClient.signIn.emailOtp({
        email,
        otp,
      });
      if (error) {
        toast.error(error.message || "Code invalide ou expire.");
        return;
      }
      toast.success("Connexion reussie.");
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error("Verification echouee.");
    } finally {
      setIsLoading(false);
    }
  };

  const primaryButtonClass =
    "w-full h-11 rounded-[10px] bg-[#4F46E5] text-white font-semibold text-sm shadow-[0_4px_12px_rgba(79,70,229,0.3)] transition-all duration-200 enabled:hover:-translate-y-px enabled:hover:shadow-[0_6px_18px_rgba(79,70,229,0.4)]";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="m-0 mb-1.5 text-2xl font-bold tracking-[-0.02em] text-foreground">
          {step === "email" ? "Connexion" : "Verification"}
        </h1>
        <p className="m-0 text-sm text-muted-foreground">
          {step === "email"
            ? "Connectez-vous pour acceder a votre espace"
            : `Code envoye a ${email}`}
        </p>
      </div>

      {/* Google OAuth */}
      <Button
        variant="outline"
        onClick={loginWithGoogle}
        disabled={isLoading}
        className="h-11 w-full rounded-[10px] border-[1.5px] border-border bg-transparent text-sm font-medium"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Continuer avec Google
      </Button>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          ou
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Email Step */}
      {step === "email" && (
        <div className="space-y-5">
          <div>
            <Label
              htmlFor="email"
              className="mb-[7px] block text-[13px] font-semibold text-foreground"
            >
              Email
            </Label>
            <div className="relative">
              <MailIcon className="absolute top-1/2 left-[14px] h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                className="h-11 rounded-[10px] border-[1.5px] border-border bg-white pl-10 transition-colors duration-150 focus-visible:border-[#4F46E5] focus-visible:bg-white dark:bg-white/[0.03]"
              />
            </div>
          </div>
          <Button
            onClick={sendOtp}
            disabled={isLoading || !email}
            className={primaryButtonClass}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <MailIcon className="mr-2 h-4 w-4" />
            )}
            Envoyer le code
          </Button>
        </div>
      )}

      {/* OTP Step */}
      {step === "otp" && (
        <div className="space-y-6">
          <button
            onClick={() => {
              setStep("email");
              setOtp("");
            }}
            className="flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Changer d&apos;email
          </button>

          <div className="flex justify-center py-1">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              disabled={isLoading}
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} className="h-12 w-11 rounded-[10px] border-[1.5px] border-border text-lg font-semibold" />
                <InputOTPSlot index={1} className="h-12 w-11 rounded-[10px] border-[1.5px] border-border text-lg font-semibold" />
                <InputOTPSlot index={2} className="h-12 w-11 rounded-[10px] border-[1.5px] border-border text-lg font-semibold" />
                <InputOTPSlot index={3} className="h-12 w-11 rounded-[10px] border-[1.5px] border-border text-lg font-semibold" />
                <InputOTPSlot index={4} className="h-12 w-11 rounded-[10px] border-[1.5px] border-border text-lg font-semibold" />
                <InputOTPSlot index={5} className="h-12 w-11 rounded-[10px] border-[1.5px] border-border text-lg font-semibold" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={verifyOtp}
            disabled={isLoading || otp.length !== 6}
            className={primaryButtonClass}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="mr-2 h-4 w-4" />
            )}
            Se connecter
          </Button>
        </div>
      )}

      {/* Register */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          ou
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Link href="/register" className="block">
        <button
          type="button"
          className="w-full cursor-pointer rounded-[10px] border-[1.5px] border-[#4F46E5] bg-transparent p-[13px] text-sm font-semibold text-[#4F46E5] transition-colors duration-200 hover:bg-[#eef2ff] dark:hover:bg-[#4F46E5]/10"
        >
          Creer un compte
        </button>
      </Link>
    </div>
  );
}

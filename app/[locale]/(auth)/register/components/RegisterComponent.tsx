"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MailIcon, ArrowLeft, Loader2, UserIcon, CheckCircle2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

type Step = "form" | "otp";

export function RegisterComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    if (!name.trim()) {
      toast.error("Veuillez entrer votre nom.");
      return;
    }
    if (!email) {
      toast.error("Veuillez entrer votre adresse email.");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-up",
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
      const { error } = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });
      if (error) {
        toast.error(error.message || "Code invalide ou expire.");
        return;
      }

      // Update user name after account creation
      try {
        const session = await authClient.getSession();
        if (session?.data?.user?.id) {
          await fetch("/api/user/update-name", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: session.data.user.id, name }),
          });
        }
      } catch {
        // Name update is best-effort
      }

      toast.success("Compte cree avec succes !");
      window.location.href = "/";
    } catch (error) {
      toast.error("Verification echouee.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-foreground tracking-tight"
          style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
        >
          {step === "form" ? "Creer un compte" : "Verification"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          {step === "form"
            ? "Rejoignez SainaFlow en quelques secondes"
            : `Code envoye a ${email}`}
        </p>
      </div>

      {/* Google OAuth */}
      <Button
        variant="outline"
        onClick={async () => {
          setIsLoading(true);
          try {
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "/",
            });
          } catch (error) {
            toast.error("Erreur avec la connexion Google.");
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={isLoading}
        className="w-full h-11 rounded-lg border-border font-medium text-sm"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
        Continuer avec Google
      </Button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
          <span className="bg-white dark:bg-[#0f0e17] px-3 text-muted-foreground font-medium">
            ou
          </span>
        </div>
      </div>

      {/* Form Step */}
      {step === "form" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Nom complet
            </Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                className="h-11 pl-10 rounded-lg border-border bg-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </Label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                className="h-11 pl-10 rounded-lg border-border bg-transparent"
              />
            </div>
          </div>

          <Button
            onClick={sendOtp}
            disabled={isLoading || !email || !name.trim()}
            className="w-full h-11 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-sm"
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
        <div className="space-y-5">
          <button
            onClick={() => {
              setStep("form");
              setOtp("");
            }}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Modifier les informations
          </button>

          <div className="flex justify-center py-1">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              disabled={isLoading}
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} className="h-12 w-11 rounded-lg border-border text-lg font-semibold" />
                <InputOTPSlot index={1} className="h-12 w-11 rounded-lg border-border text-lg font-semibold" />
                <InputOTPSlot index={2} className="h-12 w-11 rounded-lg border-border text-lg font-semibold" />
                <InputOTPSlot index={3} className="h-12 w-11 rounded-lg border-border text-lg font-semibold" />
                <InputOTPSlot index={4} className="h-12 w-11 rounded-lg border-border text-lg font-semibold" />
                <InputOTPSlot index={5} className="h-12 w-11 rounded-lg border-border text-lg font-semibold" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={verifyOtp}
            disabled={isLoading || otp.length !== 6}
            className="w-full h-11 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-sm"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="mr-2 h-4 w-4" />
            )}
            Creer mon compte
          </Button>
        </div>
      )}

      {/* Login Link */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Deja un compte ?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors"
        >
          Se connecter
        </Link>
      </p>
    </div>
  );
}

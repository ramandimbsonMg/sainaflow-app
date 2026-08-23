import {
  BarChart3,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Mail,
  Megaphone,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface ModuleInfo {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  textColor: string;
}

export const modules: ModuleInfo[] = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description:
      "Vue d'ensemble de votre entreprise : revenus, indicateurs cles, stockage et activite de l'equipe.",
    color: "bg-[#4F46E5]/10",
    textColor: "text-[#4F46E5]",
  },
  {
    icon: Users,
    title: "CRM",
    description:
      "Comptes, contacts, leads, opportunites, contrats et produits pour piloter tout votre pipeline.",
    color: "bg-[#7C3AED]/10",
    textColor: "text-[#7C3AED]",
  },
  {
    icon: FolderKanban,
    title: "Projets & Kanban",
    description:
      "Tableaux drag & drop, taches, vue d'ensemble et suivi du temps integre.",
    color: "bg-[#0EA5E9]/10",
    textColor: "text-[#0EA5E9]",
  },
  {
    icon: Mail,
    title: "Emails",
    description:
      "Boite mail connectee et conversations reliees a vos projets et a vos clients.",
    color: "bg-[#EC4899]/10",
    textColor: "text-[#EC4899]",
  },
  {
    icon: FileText,
    title: "Documents",
    description:
      "Stockage centralise, upload et organisation de tous vos fichiers en un seul endroit.",
    color: "bg-[#F59E0B]/10",
    textColor: "text-[#F59E0B]",
  },
  {
    icon: BarChart3,
    title: "Rapports",
    description:
      "Rapports ventes, leads, comptes, activite et campagnes, mis a jour en temps reel.",
    color: "bg-[#10B981]/10",
    textColor: "text-[#10B981]",
  },
  {
    icon: Megaphone,
    title: "Campagnes",
    description:
      "Campagnes, templates, cibles et listes de cibles pour vos actions marketing.",
    color: "bg-[#EF4444]/10",
    textColor: "text-[#EF4444]",
  },
  {
    icon: Sparkles,
    title: "Assistant IA",
    description:
      "Redefinition des taches, priorisation intelligente et aide a la decision.",
    color: "bg-[#8B5CF6]/10",
    textColor: "text-[#8B5CF6]",
  },
];

export const tutorialSteps = [
  {
    number: "01",
    title: "Creez votre compte",
    description:
      "Inscrivez-vous en quelques secondes avec votre email ou Google. Aucune carte bancaire requise.",
  },
  {
    number: "02",
    title: "Explorez les modules",
    description:
      "Decouvrez le CRM, les projets, les emails, les documents et les rapports, tous regroupes dans une seule plateforme.",
  },
  {
    number: "03",
    title: "Invitez votre equipe",
    description:
      "Ajoutez vos collaborateurs, partagez les taches et collaborez en temps reel sur chaque projet.",
  },
  {
    number: "04",
    title: "Pilotez avec l'IA",
    description:
      "L'Assistant IA redefinit vos taches, priorise votre travail et vous aide a prendre les meilleures decisions.",
  },
];

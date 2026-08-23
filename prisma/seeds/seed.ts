import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// CRM Config seed data
import crmOpportunityTypeData from "../initial-data/crm_Opportunities_Type.json";
import crmOpportunitySaleStagesData from "../initial-data/crm_Opportunities_Sales_Stages.json";
import crmIndustryTypeData from "../initial-data/crm_Industry_Type.json";
import contactTypesData from "../initial-data/crm_Contact_Types.json";
import leadSourcesData from "../initial-data/crm_Lead_Sources.json";
import leadStatusesData from "../initial-data/crm_Lead_Statuses.json";
import leadTypesData from "../initial-data/crm_Lead_Types.json";

import { seedCurrencies } from "./currencies";

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

// Deterministic UUIDs for seed data
const UUIDS = {
  boardWebsite: "a1000000-0000-4000-8000-000000000001",
  boardMobile: "a1000000-0000-4000-8000-000000000002",
  boardMarketing: "a1000000-0000-4000-8000-000000000003",
  sectionWbBacklog: "b1000000-0000-4000-8000-000000000001",
  sectionWbProgress: "b1000000-0000-4000-8000-000000000002",
  sectionWbReview: "b1000000-0000-4000-8000-000000000003",
  sectionWbDone: "b1000000-0000-4000-8000-000000000004",
  sectionMbBacklog: "b1000000-0000-4000-8000-000000000005",
  sectionMbProgress: "b1000000-0000-4000-8000-000000000006",
  sectionMbDone: "b1000000-0000-4000-8000-000000000007",
  sectionMkTodo: "b1000000-0000-4000-8000-000000000008",
  sectionMkProgress: "b1000000-0000-4000-8000-000000000009",
  task001: "c1000000-0000-4000-8000-000000000001",
  task002: "c1000000-0000-4000-8000-000000000002",
  task003: "c1000000-0000-4000-8000-000000000003",
  task004: "c1000000-0000-4000-8000-000000000004",
  task005: "c1000000-0000-4000-8000-000000000005",
  task006: "c1000000-0000-4000-8000-000000000006",
  task007: "c1000000-0000-4000-8000-000000000007",
  task008: "c1000000-0000-4000-8000-000000000008",
  task009: "c1000000-0000-4000-8000-000000000009",
  task010: "c1000000-0000-4000-8000-000000000010",
  task011: "c1000000-0000-4000-8000-000000000011",
  task012: "c1000000-0000-4000-8000-000000000012",
  task013: "c1000000-0000-4000-8000-000000000013",
  accountAlpha: "d1000000-0000-4000-8000-000000000001",
  accountBeta: "d1000000-0000-4000-8000-000000000002",
  accountGamma: "d1000000-0000-4000-8000-000000000003",
  contact001: "e1000000-0000-4000-8000-000000000001",
  contact002: "e1000000-0000-4000-8000-000000000002",
  contact003: "e1000000-0000-4000-8000-000000000003",
  opp001: "f1000000-0000-4000-8000-000000000001",
  opp002: "f1000000-0000-4000-8000-000000000002",
} as const;

async function upsertByName(
  model: any,
  items: { name: string; [key: string]: any }[]
) {
  for (const item of items) {
    await model.upsert({
      where: { name: item.name },
      update: item,
      create: item,
    });
  }
}

async function main() {
  console.log("-------- Seeding DB --------");

  // CRM Opportunity Types (no unique on name — use findFirst + create/update)
  for (const item of crmOpportunityTypeData) {
    const existing = await prisma.crm_Opportunities_Type.findFirst({
      where: { name: item.name },
    });
    if (existing) {
      await prisma.crm_Opportunities_Type.update({
        where: { id: existing.id },
        data: { name: item.name, order: item.order, v: item.v },
      });
    } else {
      await prisma.crm_Opportunities_Type.create({
        data: { name: item.name, order: item.order, v: item.v },
      });
    }
  }
  console.log("Opportunity Types seeded");

  // CRM Opportunity Sales Stages (no unique on name — use findFirst + create/update)
  for (const item of crmOpportunitySaleStagesData) {
    const existing = await prisma.crm_Opportunities_Sales_Stages.findFirst({
      where: { name: item.name },
    });
    if (existing) {
      await prisma.crm_Opportunities_Sales_Stages.update({
        where: { id: existing.id },
        data: {
          name: item.name,
          probability: item.probability,
          order: item.order,
          v: item.v,
        },
      });
    } else {
      await prisma.crm_Opportunities_Sales_Stages.create({
        data: {
          name: item.name,
          probability: item.probability,
          order: item.order,
          v: item.v,
        },
      });
    }
  }
  console.log("Opportunity Sales Stages seeded");

  // CRM Industry Types (no unique on name — use findFirst + create/update)
  for (const item of crmIndustryTypeData) {
    const existing = await prisma.crm_Industry_Type.findFirst({
      where: { name: item.name },
    });
    if (existing) {
      await prisma.crm_Industry_Type.update({
        where: { id: existing.id },
        data: { name: item.name, v: item.v },
      });
    } else {
      await prisma.crm_Industry_Type.create({
        data: { name: item.name, v: item.v },
      });
    }
  }
  console.log("Industry Types seeded");

  // CRM Contact Types (has @unique on name — can use upsert)
  await upsertByName(prisma.crm_Contact_Types, contactTypesData);
  console.log("Contact Types seeded");

  // CRM Lead Sources (has @unique on name — can use upsert)
  await upsertByName(prisma.crm_Lead_Sources, leadSourcesData);
  console.log("Lead Sources seeded");

  // CRM Lead Statuses (has @unique on name — can use upsert)
  await upsertByName(prisma.crm_Lead_Statuses, leadStatusesData);
  console.log("Lead Statuses seeded");

  // CRM Lead Types (has @unique on name — can use upsert)
  await upsertByName(prisma.crm_Lead_Types, leadTypesData);
  console.log("Lead Types seeded");

  // ========== SAINAFLOW TEST DATA ==========

  // Admin User
  const adminUser = await prisma.users.upsert({
    where: { email: "ramandimbsonespoir@gmail.com" },
    update: {
      userStatus: "ACTIVE",
      is_admin: true,
      is_account_admin: true,
      role: "admin",
      name: "Espoir Ramandimbson",
    },
    create: {
      email: "ramandimbsonespoir@gmail.com",
      name: "Espoir Ramandimbson",
      userStatus: "ACTIVE",
      is_admin: true,
      is_account_admin: true,
      role: "admin",
    },
  });
  console.log(`Admin user seeded: ${adminUser.email}`);

  // Team Members
  const teresaUser = await prisma.users.upsert({
    where: { email: "teresperanto@gmail.com" },
    update: { userStatus: "ACTIVE", name: "Teresperanto" },
    create: {
      email: "teresperanto@gmail.com",
      name: "Teresperanto",
      userStatus: "ACTIVE",
      role: "member",
    },
  });

  const devesperantoUser = await prisma.users.upsert({
    where: { email: "devesperanto@gmail.com" },
    update: { userStatus: "ACTIVE", name: "Devesperanto" },
    create: {
      email: "devesperanto@gmail.com",
      name: "Devesperanto",
      userStatus: "ACTIVE",
      role: "member",
    },
  });

  console.log(`Team members seeded: ${teresaUser.email}, ${devesperantoUser.email}`);

  // ========== BOARDS (Projects) ==========

  const websiteBoard = await prisma.boards.upsert({
    where: { id: UUIDS.boardWebsite },
    update: { title: "Site Web Client Alpha", description: "Refonte du site web corporate avec integrazione CMS" },
    create: {
      id: UUIDS.boardWebsite,
      title: "Site Web Client Alpha",
      description: "Refonte du site web corporate avec integrazione CMS",
      user: adminUser.id,
      visibility: "PUBLIC",
      icon: "globe",
      position: 1,
      v: 1,
    },
  });

  const mobileBoard = await prisma.boards.upsert({
    where: { id: UUIDS.boardMobile },
    update: { title: "App Mobile Beta", description: "Application React Native pour e-commerce" },
    create: {
      id: UUIDS.boardMobile,
      title: "App Mobile Beta",
      description: "Application React Native pour e-commerce",
      user: adminUser.id,
      visibility: "PUBLIC",
      icon: "smartphone",
      position: 2,
      v: 1,
    },
  });

  const marketingBoard = await prisma.boards.upsert({
    where: { id: UUIDS.boardMarketing },
    update: { title: "Campagne Marketing Q1", description: "Strategie digitale et campagnes publicitaires" },
    create: {
      id: UUIDS.boardMarketing,
      title: "Campagne Marketing Q1",
      description: "Strategie digitale et campagnes publicitaires",
      user: adminUser.id,
      visibility: "PUBLIC",
      icon: "megaphone",
      position: 3,
      v: 1,
    },
  });

  console.log("Boards seeded");

  // ========== SECTIONS ==========

  // Website Board Sections
  const websiteBacklog = await prisma.sections.upsert({
    where: { id: UUIDS.sectionWbBacklog },
    update: { title: "Backlog", position: 1 },
    create: { id: UUIDS.sectionWbBacklog, board: websiteBoard.id, title: "Backlog", position: 1, v: 1 },
  });

  const websiteInProgress = await prisma.sections.upsert({
    where: { id: UUIDS.sectionWbProgress },
    update: { title: "En cours", position: 2 },
    create: { id: UUIDS.sectionWbProgress, board: websiteBoard.id, title: "En cours", position: 2, v: 1 },
  });

  const websiteReview = await prisma.sections.upsert({
    where: { id: UUIDS.sectionWbReview },
    update: { title: "En revue", position: 3 },
    create: { id: UUIDS.sectionWbReview, board: websiteBoard.id, title: "En revue", position: 3, v: 1 },
  });

  const websiteDone = await prisma.sections.upsert({
    where: { id: UUIDS.sectionWbDone },
    update: { title: "Termine", position: 4 },
    create: { id: UUIDS.sectionWbDone, board: websiteBoard.id, title: "Termine", position: 4, v: 1 },
  });

  // Mobile Board Sections
  const mobileBacklog = await prisma.sections.upsert({
    where: { id: UUIDS.sectionMbBacklog },
    update: { title: "Backlog", position: 1 },
    create: { id: UUIDS.sectionMbBacklog, board: mobileBoard.id, title: "Backlog", position: 1, v: 1 },
  });

  const mobileInProgress = await prisma.sections.upsert({
    where: { id: UUIDS.sectionMbProgress },
    update: { title: "En cours", position: 2 },
    create: { id: UUIDS.sectionMbProgress, board: mobileBoard.id, title: "En cours", position: 2, v: 1 },
  });

  const mobileDone = await prisma.sections.upsert({
    where: { id: UUIDS.sectionMbDone },
    update: { title: "Termine", position: 3 },
    create: { id: UUIDS.sectionMbDone, board: mobileBoard.id, title: "Termine", position: 3, v: 1 },
  });

  // Marketing Board Sections
  const marketingTodo = await prisma.sections.upsert({
    where: { id: UUIDS.sectionMkTodo },
    update: { title: "A faire", position: 1 },
    create: { id: UUIDS.sectionMkTodo, board: marketingBoard.id, title: "A faire", position: 1, v: 1 },
  });

  const marketingInProgress = await prisma.sections.upsert({
    where: { id: UUIDS.sectionMkProgress },
    update: { title: "En cours", position: 2 },
    create: { id: UUIDS.sectionMkProgress, board: marketingBoard.id, title: "En cours", position: 2, v: 1 },
  });

  console.log("Sections seeded");

  // ========== TASKS ==========

  const tasks = [
    // Website Board Tasks
    {
      id: UUIDS.task001,
      title: "Maquettes Figma - Page d'accueil",
      content: "Creer les maquettes haute fidibilite pour la page d'accueil du site",
      section: websiteBacklog.id,
      user: teresaUser.id,
      priority: "high",
      position: BigInt(1),
    },
    {
      id: UUIDS.task002,
      title: "Integrer le composant Hero",
      content: "Integrer la section hero avec animation fade-in et CTA",
      section: websiteInProgress.id,
      user: devesperantoUser.id,
      priority: "high",
      position: BigInt(1),
    },
    {
      id: UUIDS.task003,
      title: "Configurer le CMS Strapi",
      content: "Mettre en place Strapi avec les modesles de contenu necessaires",
      section: websiteInProgress.id,
      user: adminUser.id,
      priority: "medium",
      position: BigInt(2),
    },
    {
      id: UUIDS.task004,
      title: "Section temoignages clients",
      content: "Creer le composant carrousel pour les temoignages",
      section: websiteReview.id,
      user: teresaUser.id,
      priority: "medium",
      position: BigInt(1),
    },
    {
      id: UUIDS.task005,
      title: "Optimisation SEO - Meta tags",
      content: "Ajouter les meta tags OpenGraph et schema.org",
      section: websiteDone.id,
      user: devesperantoUser.id,
      priority: "low",
      position: BigInt(1),
    },

    // Mobile Board Tasks
    {
      id: UUIDS.task006,
      title: "Ecran de connexion",
      content: "Implementer l'ecran de connexion avec Google OAuth",
      section: mobileBacklog.id,
      user: devesperantoUser.id,
      priority: "high",
      position: BigInt(1),
    },
    {
      id: UUIDS.task007,
      title: "Catalogue produits - List view",
      content: "Creer la vue liste des produits avec filtres et recherche",
      section: mobileInProgress.id,
      user: teresaUser.id,
      priority: "high",
      position: BigInt(1),
    },
    {
      id: UUIDS.task008,
      title: "Panier d'achat",
      content: "Implementer le panier avec persistance locale",
      section: mobileBacklog.id,
      user: devesperantoUser.id,
      priority: "medium",
      position: BigInt(2),
    },
    {
      id: UUIDS.task009,
      title: "Paiement mobile money",
      content: "Integrer l'API MVola/Orange Money pour les paiements",
      section: mobileBacklog.id,
      user: adminUser.id,
      priority: "critical",
      position: BigInt(3),
    },
    {
      id: UUIDS.task010,
      title: "Notifications push",
      content: "Configurer Firebase Cloud Messaging pour les notifications",
      section: mobileDone.id,
      user: devesperantoUser.id,
      priority: "low",
      position: BigInt(1),
    },

    // Marketing Board Tasks
    {
      id: UUIDS.task011,
      title: "Strategie contenu LinkedIn",
      content: "Definir le calendrier editorial LinkedIn pour Q1",
      section: marketingTodo.id,
      user: teresaUser.id,
      priority: "high",
      position: BigInt(1),
    },
    {
      id: UUIDS.task012,
      title: "Campagne Google Ads",
      content: "Lancer la campagne de visibilite sur Google Ads",
      section: marketingInProgress.id,
      user: adminUser.id,
      priority: "high",
      position: BigInt(1),
    },
    {
      id: UUIDS.task013,
      title: "Newsletter mensuelle",
      content: "Rediger et envoyer la newsletter de janvier",
      section: marketingTodo.id,
      user: teresaUser.id,
      priority: "medium",
      position: BigInt(2),
    },
  ];

  for (const task of tasks) {
    await prisma.tasks.upsert({
      where: { id: task.id },
      update: {
        title: task.title,
        content: task.content,
        section: task.section,
        user: task.user,
        priority: task.priority,
        position: task.position,
      },
      create: {
        ...task,
        taskStatus: "ACTIVE",
        v: 1,
      },
    });
  }
  console.log("Tasks seeded");

  // ========== CRM ACCOUNTS (Clients) ==========

  const accountAlpha = await prisma.crm_Accounts.upsert({
    where: { id: UUIDS.accountAlpha },
    update: { name: "Alpha Technologies", email: "contact@alpha-tech.mg", status: "Active" },
    create: {
      id: UUIDS.accountAlpha,
      name: "Alpha Technologies",
      email: "contact@alpha-tech.mg",
      description: "Societe de developpement web et mobile basee a Antananarivo",
      status: "Active",
      type: "Customer",
      assigned_to: adminUser.id,
      website: "https://alpha-tech.mg",
      office_phone: "+261 34 00 000 01",
      billing_city: "Antananarivo",
      billing_country: "Madagascar",
      v: 1,
    },
  });

  const accountBeta = await prisma.crm_Accounts.upsert({
    where: { id: UUIDS.accountBeta },
    update: { name: "Beta Commerce", email: "info@beta-commerce.mg", status: "Active" },
    create: {
      id: UUIDS.accountBeta,
      name: "Beta Commerce",
      email: "info@beta-commerce.mg",
      description: "Plateforme e-commerce specialisee dans l'artisanat malgache",
      status: "Active",
      type: "Customer",
      assigned_to: adminUser.id,
      website: "https://beta-commerce.mg",
      office_phone: "+261 34 00 000 02",
      billing_city: "Toamasina",
      billing_country: "Madagascar",
      v: 1,
    },
  });

  const accountGamma = await prisma.crm_Accounts.upsert({
    where: { id: UUIDS.accountGamma },
    update: { name: "Gamma Consulting", email: "hello@gamma-consulting.mg", status: "Active" },
    create: {
      id: UUIDS.accountGamma,
      name: "Gamma Consulting",
      email: "hello@gamma-consulting.mg",
      description: "Cabinet de conseil en transformation digitale",
      status: "Active",
      type: "Partner",
      assigned_to: teresaUser.id,
      website: "https://gamma-consulting.mg",
      billing_city: "Antananarivo",
      billing_country: "Madagascar",
      v: 1,
    },
  });

  console.log("CRM Accounts seeded");

  // ========== CRM CONTACTS ==========

  await prisma.crm_Contacts.upsert({
    where: { id: UUIDS.contact001 },
    update: { first_name: "Rija", last_name: "Andriamana" },
    create: {
      id: UUIDS.contact001,
      first_name: "Rija",
      last_name: "Andriamana",
      email: "rija@alpha-tech.mg",
      office_phone: "+261 34 11 111 11",
      assigned_to: adminUser.id,
      account: accountAlpha.id,
    },
  });

  await prisma.crm_Contacts.upsert({
    where: { id: UUIDS.contact002 },
    update: { first_name: "Hery", last_name: "Razafindrabe" },
    create: {
      id: UUIDS.contact002,
      first_name: "Hery",
      last_name: "Razafindrabe",
      email: "hery@beta-commerce.mg",
      office_phone: "+261 34 22 222 22",
      assigned_to: adminUser.id,
      account: accountBeta.id,
    },
  });

  await prisma.crm_Contacts.upsert({
    where: { id: UUIDS.contact003 },
    update: { first_name: "Nirina", last_name: "Rasoloarison" },
    create: {
      id: UUIDS.contact003,
      first_name: "Nirina",
      last_name: "Rasoloarison",
      email: "nirina@gamma-consulting.mg",
      assigned_to: teresaUser.id,
      account: accountGamma.id,
    },
  });

  console.log("CRM Contacts seeded");

  // Currencies and Exchange Rates (must be before opportunities)
  await seedCurrencies(prisma);

  // ========== OPPORTUNITIES ==========

  const salesStage = await prisma.crm_Opportunities_Sales_Stages.findFirst({
    where: { name: "Qualification" },
  });

  await prisma.crm_Opportunities.upsert({
    where: { id: UUIDS.opp001 },
    update: { name: "Refonte site Alpha Tech" },
    create: {
      id: UUIDS.opp001,
      name: "Refonte site Alpha Tech",
      account: accountAlpha.id,
      assigned_to: adminUser.id,
      budget: 5000000,
      currency: "MGA",
      sales_stage: salesStage?.id,
      expected_revenue: 5000000,
      status: "ACTIVE",
      description: "Projet de refonte complete du site web corporate",
    },
  });

  await prisma.crm_Opportunities.upsert({
    where: { id: UUIDS.opp002 },
    update: { name: "App mobile Beta Commerce" },
    create: {
      id: UUIDS.opp002,
      name: "App mobile Beta Commerce",
      account: accountBeta.id,
      assigned_to: adminUser.id,
      budget: 10000000,
      currency: "MGA",
      sales_stage: salesStage?.id,
      expected_revenue: 10000000,
      status: "ACTIVE",
      description: "Developpement application mobile e-commerce",
    },
  });

  console.log("Opportunities seeded");

  // Note: seedCurrencies is called above (before opportunities) because they need MGA

  console.log("-------- Seed DB completed --------");
  console.log("");
  console.log("=== SAINAFLOW TEST ACCOUNTS ===");
  console.log("Admin:    ramandimbsonespoir@gmail.com");
  console.log("Member:   teresperanto@gmail.com");
  console.log("Member:   devesperanto@gmail.com");
  console.log("");
  console.log("=== BOARDS (Projects) ===");
  console.log("- Site Web Client Alpha (4 sections, 5 tasks)");
  console.log("- App Mobile Beta (3 sections, 5 tasks)");
  console.log("- Campagne Marketing Q1 (2 sections, 3 tasks)");
  console.log("");
  console.log("=== CRM DATA ===");
  console.log("- 3 Accounts: Alpha Technologies, Beta Commerce, Gamma Consulting");
  console.log("- 3 Contacts");
  console.log("- 2 Opportunities");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

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
    where: { id: "board-website-001" },
    update: { title: "Site Web Client Alpha", description: "Refonte du site web corporate avec integrazione CMS" },
    create: {
      id: "board-website-001",
      title: "Site Web Client Alpha",
      description: "Refonte du site web corporate avec integrazione CMS",
      user: adminUser.id,
      visibility: "PUBLIC",
      icon: "globe",
      position: 1,
    },
  });

  const mobileBoard = await prisma.boards.upsert({
    where: { id: "board-mobile-001" },
    update: { title: "App Mobile Beta", description: "Application React Native pour e-commerce" },
    create: {
      id: "board-mobile-001",
      title: "App Mobile Beta",
      description: "Application React Native pour e-commerce",
      user: adminUser.id,
      visibility: "PUBLIC",
      icon: "smartphone",
      position: 2,
    },
  });

  const marketingBoard = await prisma.boards.upsert({
    where: { id: "board-marketing-001" },
    update: { title: "Campagne Marketing Q1", description: "Strategie digitale et campagnes publicitaires" },
    create: {
      id: "board-marketing-001",
      title: "Campagne Marketing Q1",
      description: "Strategie digitale et campagnes publicitaires",
      user: adminUser.id,
      visibility: "PUBLIC",
      icon: "megaphone",
      position: 3,
    },
  });

  console.log("Boards seeded");

  // ========== SECTIONS ==========

  // Website Board Sections
  const websiteBacklog = await prisma.sections.upsert({
    where: { id: "section-wb-backlog" },
    update: { title: "Backlog", position: 1 },
    create: { id: "section-wb-backlog", board: websiteBoard.id, title: "Backlog", position: 1, v: 1 },
  });

  const websiteInProgress = await prisma.sections.upsert({
    where: { id: "section-wb-progress" },
    update: { title: "En cours", position: 2 },
    create: { id: "section-wb-progress", board: websiteBoard.id, title: "En cours", position: 2, v: 1 },
  });

  const websiteReview = await prisma.sections.upsert({
    where: { id: "section-wb-review" },
    update: { title: "En revue", position: 3 },
    create: { id: "section-wb-review", board: websiteBoard.id, title: "En revue", position: 3, v: 1 },
  });

  const websiteDone = await prisma.sections.upsert({
    where: { id: "section-wb-done" },
    update: { title: "Termine", position: 4 },
    create: { id: "section-wb-done", board: websiteBoard.id, title: "Termine", position: 4, v: 1 },
  });

  // Mobile Board Sections
  const mobileBacklog = await prisma.sections.upsert({
    where: { id: "section-mb-backlog" },
    update: { title: "Backlog", position: 1 },
    create: { id: "section-mb-backlog", board: mobileBoard.id, title: "Backlog", position: 1, v: 1 },
  });

  const mobileInProgress = await prisma.sections.upsert({
    where: { id: "section-mb-progress" },
    update: { title: "En cours", position: 2 },
    create: { id: "section-mb-progress", board: mobileBoard.id, title: "En cours", position: 2, v: 1 },
  });

  const mobileDone = await prisma.sections.upsert({
    where: { id: "section-mb-done" },
    update: { title: "Termine", position: 3 },
    create: { id: "section-mb-done", board: mobileBoard.id, title: "Termine", position: 3, v: 1 },
  });

  // Marketing Board Sections
  const marketingTodo = await prisma.sections.upsert({
    where: { id: "section-mk-todo" },
    update: { title: "A faire", position: 1 },
    create: { id: "section-mk-todo", board: marketingBoard.id, title: "A faire", position: 1, v: 1 },
  });

  const marketingInProgress = await prisma.sections.upsert({
    where: { id: "section-mk-progress" },
    update: { title: "En cours", position: 2 },
    create: { id: "section-mk-progress", board: marketingBoard.id, title: "En cours", position: 2, v: 1 },
  });

  console.log("Sections seeded");

  // ========== TASKS ==========

  const tasks = [
    // Website Board Tasks
    {
      id: "task-001",
      title: "Maquettes Figma - Page d'accueil",
      content: "Creer les maquettes haute fidibilite pour la page d'accueil du site",
      section: websiteBacklog.id,
      user: teresaUser.id,
      priority: "high",
      position: BigInt(1),
    },
    {
      id: "task-002",
      title: "Integrer le composant Hero",
      content: "Integrer la section hero avec animation fade-in et CTA",
      section: websiteInProgress.id,
      user: devesperantoUser.id,
      priority: "high",
      position: BigInt(1),
    },
    {
      id: "task-003",
      title: "Configurer le CMS Strapi",
      content: "Mettre en place Strapi avec les modesles de contenu necessaires",
      section: websiteInProgress.id,
      user: adminUser.id,
      priority: "medium",
      position: BigInt(2),
    },
    {
      id: "task-004",
      title: "Section temoignages clients",
      content: "Creer le composant carrousel pour les temoignages",
      section: websiteReview.id,
      user: teresaUser.id,
      priority: "medium",
      position: BigInt(1),
    },
    {
      id: "task-005",
      title: "Optimisation SEO - Meta tags",
      content: "Ajouter les meta tags OpenGraph et schema.org",
      section: websiteDone.id,
      user: devesperantoUser.id,
      priority: "low",
      position: BigInt(1),
    },

    // Mobile Board Tasks
    {
      id: "task-006",
      title: "Ecran de connexion",
      content: "Implementer l'ecran de connexion avec Google OAuth",
      section: mobileBacklog.id,
      user: devesperantoUser.id,
      priority: "high",
      position: BigInt(1),
    },
    {
      id: "task-007",
      title: "Catalogue produits - List view",
      content: "Creer la vue liste des produits avec filtres et recherche",
      section: mobileInProgress.id,
      user: teresaUser.id,
      priority: "high",
      position: BigInt(1),
    },
    {
      id: "task-008",
      title: "Panier d'achat",
      content: "Implementer le panier avec persistance locale",
      section: mobileBacklog.id,
      user: devesperantoUser.id,
      priority: "medium",
      position: BigInt(2),
    },
    {
      id: "task-009",
      title: "Paiement mobile money",
      content: "Integrer l'API MVola/Orange Money pour les paiements",
      section: mobileBacklog.id,
      user: adminUser.id,
      priority: "critical",
      position: BigInt(3),
    },
    {
      id: "task-010",
      title: "Notifications push",
      content: "Configurer Firebase Cloud Messaging pour les notifications",
      section: mobileDone.id,
      user: devesperantoUser.id,
      priority: "low",
      position: BigInt(1),
    },

    // Marketing Board Tasks
    {
      id: "task-011",
      title: "Strategie contenu LinkedIn",
      content: "Definir le calendrier editorial LinkedIn pour Q1",
      section: marketingTodo.id,
      user: teresaUser.id,
      priority: "high",
      position: BigInt(1),
    },
    {
      id: "task-012",
      title: "Campagne Google Ads",
      content: "Lancer la campagne de visibilite sur Google Ads",
      section: marketingInProgress.id,
      user: adminUser.id,
      priority: "high",
      position: BigInt(1),
    },
    {
      id: "task-013",
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
    where: { id: "account-alpha-001" },
    update: { name: "Alpha Technologies", email: "contact@alpha-tech.mg", status: "Active" },
    create: {
      id: "account-alpha-001",
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
    },
  });

  const accountBeta = await prisma.crm_Accounts.upsert({
    where: { id: "account-beta-001" },
    update: { name: "Beta Commerce", email: "info@beta-commerce.mg", status: "Active" },
    create: {
      id: "account-beta-001",
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
    },
  });

  const accountGamma = await prisma.crm_Accounts.upsert({
    where: { id: "account-gamma-001" },
    update: { name: "Gamma Consulting", email: "hello@gamma-consulting.mg", status: "Active" },
    create: {
      id: "account-gamma-001",
      name: "Gamma Consulting",
      email: "hello@gamma-consulting.mg",
      description: "Cabinet de conseil en transformation digitale",
      status: "Active",
      type: "Partner",
      assigned_to: teresaUser.id,
      website: "https://gamma-consulting.mg",
      billing_city: "Antananarivo",
      billing_country: "Madagascar",
    },
  });

  console.log("CRM Accounts seeded");

  // ========== CRM CONTACTS ==========

  await prisma.crm_Contacts.upsert({
    where: { id: "contact-001" },
    update: { first_name: "Rija", last_name: "Andriamana" },
    create: {
      id: "contact-001",
      first_name: "Rija",
      last_name: "Andriamana",
      email: "rija@alpha-tech.mg",
      office_phone: "+261 34 11 111 11",
      assigned_to: adminUser.id,
      account: accountAlpha.id,
    },
  });

  await prisma.crm_Contacts.upsert({
    where: { id: "contact-002" },
    update: { first_name: "Hery", last_name: "Razafindrabe" },
    create: {
      id: "contact-002",
      first_name: "Hery",
      last_name: "Razafindrabe",
      email: "hery@beta-commerce.mg",
      office_phone: "+261 34 22 222 22",
      assigned_to: adminUser.id,
      account: accountBeta.id,
    },
  });

  await prisma.crm_Contacts.upsert({
    where: { id: "contact-003" },
    update: { first_name: "Nirina", last_name: "Rasoloarison" },
    create: {
      id: "contact-003",
      first_name: "Nirina",
      last_name: "Rasoloarison",
      email: "nirina@gamma-consulting.mg",
      assigned_to: teresaUser.id,
      account: accountGamma.id,
    },
  });

  console.log("CRM Contacts seeded");

  // ========== OPPORTUNITIES ==========

  const salesStage = await prisma.crm_Opportunities_Sales_Stages.findFirst({
    where: { name: "Qualification" },
  });

  await prisma.crm_Opportunities.upsert({
    where: { id: "opp-001" },
    update: { name: "Refonte site Alpha Tech" },
    create: {
      id: "opp-001",
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
    where: { id: "opp-002" },
    update: { name: "App mobile Beta Commerce" },
    create: {
      id: "opp-002",
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

  // Currencies and Exchange Rates
  await seedCurrencies(prisma);

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

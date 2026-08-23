import { Suspense } from "react";
import { getSession } from "@/lib/auth-server";
import {
  CoinsIcon,
  Contact,
  DollarSignIcon,
  FilePenLine,
  HeartHandshakeIcon,
  LandmarkIcon,
  UserIcon,
  Users2Icon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import Container from "../components/ui/Container";
import LoadingBox from "../components/dasboard/loading-box";
import StorageQuota from "../components/dasboard/storage-quota";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  getTasksCount,
  getUsersTasksCount,
} from "@/actions/dashboard/get-tasks-count";
import { getEmployeesCount } from "@/actions/get-empoloyees";
import { getLeadsCount } from "@/actions/dashboard/get-leads-count";
import { getBoardsCount } from "@/actions/dashboard/get-boards-count";
import { getStorageSize } from "@/actions/documents/get-storage-size";
import { getContactCount } from "@/actions/dashboard/get-contacts-count";
import { getAccountsCount } from "@/actions/dashboard/get-accounts-count";
import { getContractsCount } from "@/actions/dashboard/get-contracts-count";
import { getDocumentsCount } from "@/actions/dashboard/get-documents-count";
import { getActiveUsersCount } from "@/actions/dashboard/get-active-users-count";
import { getOpportunitiesCount } from "@/actions/dashboard/get-opportunities-count";
import { getExpectedRevenue } from "@/actions/crm/opportunity/get-expected-revenue";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import {
  getDefaultCurrency,
  formatCurrency as formatCurrencyUtil,
} from "@/lib/currency";

const DashboardPage = async () => {
  const session = await getSession();

  if (!session) return null;

  const userId = session?.user?.id;

  const cookieStore = await cookies();
  const defaultCurrency = await getDefaultCurrency();
  const displayCurrency = cookieStore.get("display_currency")?.value || defaultCurrency;

  const dict = await getTranslations("DashboardPage");

  return (
    <Container
      title={dict("containerTitle")}
      description={
        "Welcome to SainaFlow, here you can see your company overview"
      }
    >
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {dict("totalRevenue")}
            </CardTitle>
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{"0"}</div>
          </CardContent>
        </Card>

        <Suspense fallback={<LoadingBox />}>
          <ExpectedRevenueCard
            displayCurrency={displayCurrency}
            title={dict("expectedRevenue")}
          />
        </Suspense>

        <Suspense fallback={<LoadingBox />}>
          <MetricCard
            query={getActiveUsersCount()}
            href="/admin/users"
            title={dict("activeUsers")}
            IconComponent={UserIcon}
          />
        </Suspense>

        <Suspense fallback={<LoadingBox />}>
          <MetricCard
            query={getEmployeesCount()}
            href="/employees"
            title="Employees"
            IconComponent={Users2Icon}
          />
        </Suspense>

        <Suspense fallback={<LoadingBox />}>
          <MetricCard
            query={getAccountsCount()}
            href="/crm/accounts"
            title={dict("accounts")}
            IconComponent={LandmarkIcon}
          />
        </Suspense>

        <Suspense fallback={<LoadingBox />}>
          <MetricCard
            query={getOpportunitiesCount()}
            href="/crm/opportunities"
            title={dict("opportunities")}
            IconComponent={HeartHandshakeIcon}
          />
        </Suspense>

        <Suspense fallback={<LoadingBox />}>
          <MetricCard
            query={getContactCount()}
            href="/crm/contacts"
            title={dict("contacts")}
            IconComponent={Contact}
          />
        </Suspense>

        <Suspense fallback={<LoadingBox />}>
          <MetricCard
            query={getLeadsCount()}
            href="/crm/leads"
            title={dict("leads")}
            IconComponent={CoinsIcon}
          />
        </Suspense>

        <Suspense fallback={<LoadingBox />}>
          <MetricCard
            query={getContractsCount()}
            href="/crm/contracts"
            title={dict("contracts")}
            IconComponent={FilePenLine}
          />
        </Suspense>

        <Suspense fallback={<LoadingBox />}>
          <MetricCard
            query={getBoardsCount()}
            href="/projects"
            title={dict("projects")}
            IconComponent={CoinsIcon}
          />
        </Suspense>

        <Suspense fallback={<LoadingBox />}>
          <TasksCard href="/projects/tasks" title={dict("tasks")} />
        </Suspense>

        <Suspense fallback={<LoadingBox />}>
          <MyTasksCard userId={userId} title={dict("myTasks")} />
        </Suspense>

        <Suspense fallback={<LoadingBox />}>
          <MetricCard
            query={getDocumentsCount()}
            href="/documents"
            title={dict("documents")}
            IconComponent={CoinsIcon}
          />
        </Suspense>

        <Suspense fallback={<LoadingBox />}>
          <StorageData title={dict("storage")} />
        </Suspense>
      </div>
    </Container>
  );
};

export default DashboardPage;

const MetricCard = async ({
  query,
  href,
  title,
  IconComponent,
}: {
  query: Promise<number>;
  href?: string;
  title: string;
  IconComponent: LucideIcon;
}) => {
  const content = await query;

  return (
    <DashboardCard
      href={href}
      title={title}
      IconComponent={IconComponent}
      content={content}
    />
  );
};

const ExpectedRevenueCard = ({
  displayCurrency,
  title,
}: {
  displayCurrency: string;
  title: string;
}) => (
  <MetricCard
    query={getExpectedRevenue(displayCurrency)}
    title={title}
    IconComponent={DollarSignIcon}
  />
);

const TasksCard = ({ href, title }: { href: string; title: string }) => (
  <MetricCard
    query={getTasksCount()}
    href={href}
    title={title}
    IconComponent={CoinsIcon}
  />
);

const MyTasksCard = ({ userId, title }: { userId: string; title: string }) => (
  <MetricCard
    query={getUsersTasksCount(userId)}
    href={`/projects/tasks/${userId}`}
    title={title}
    IconComponent={CoinsIcon}
  />
);

const StorageData = async ({ title }: { title: string }) => {
  const storage = await getStorageSize();
  return <StorageQuota actual={storage} title={title} />;
};

const DashboardCard = ({
  href,
  title,
  IconComponent,
  content,
}: {
  href?: string;
  title: string;
  IconComponent: LucideIcon;
  content: number;
}) => (
  <Link href={href || "#"}>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconComponent className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-medium">{content}</div>
      </CardContent>
    </Card>
  </Link>
);

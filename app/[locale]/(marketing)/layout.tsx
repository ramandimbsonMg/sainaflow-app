import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { href: "#presentation", label: "Presentation" },
  { href: "#modules", label: "Modules" },
  { href: "#tutorial", label: "Tutoriel" },
];

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="flex cursor-pointer items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#4F46E5]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Saina<span className="text-[#4F46E5]">Flow</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-gray-600 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#4F46E5]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/sign-in">Se connecter</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-lg bg-[linear-gradient(135deg,#4F46E5,#4338CA)] text-white shadow-[0_4px_12px_rgba(79,70,229,0.3)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(79,70,229,0.4)]"
            >
              <Link href="/register">Commencer</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <Link href="/" className="flex cursor-pointer items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#4F46E5]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight text-gray-900">
              Saina<span className="text-[#4F46E5]">Flow</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SainaFlow. Tous droits reserves.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MarketingLayout;

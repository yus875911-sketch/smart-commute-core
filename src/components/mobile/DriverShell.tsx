import { Link, useRouterState } from "@tanstack/react-router";
import { Car, ListChecks, Wallet, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/driver", label: "接单", icon: Car },
  { to: "/driver/order", label: "行程", icon: ListChecks },
  { to: "/driver/income", label: "收入", icon: Wallet },
  { to: "/driver/profile", label: "我的", icon: UserRound },
] as const;

export function DriverPhone({ children, caption }: { children: ReactNode; caption?: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-[390px] shrink-0 overflow-hidden rounded-[8px] border border-border bg-background shadow-[0_10px_40px_oklch(0.22_0.02_260/0.12)]">
        <div className="relative flex h-[820px] flex-col">
          <div className="flex-1 overflow-y-auto">{children}</div>
          <nav className="flex border-t border-border bg-card pb-2">
            {tabs.map((t) => {
              const active = path === t.to;
              const Icon = t.icon;
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={cn(
                    "flex flex-1 flex-col items-center gap-1 py-2 text-[11px]",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" />
                  {t.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      {caption ? <p className="text-[12px] text-muted-foreground">{caption}</p> : null}
    </div>
  );
}

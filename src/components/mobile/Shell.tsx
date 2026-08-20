import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, Home, ClipboardList, User } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "首页", icon: Home },
  { to: "/orders", label: "订单", icon: ClipboardList },
  { to: "/me", label: "我的", icon: User },
] as const;

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-5 pt-2 pb-1 text-[12px] font-semibold tracking-wide",
        dark ? "text-primary-foreground" : "text-foreground",
      )}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1 opacity-80">
        <span>5G</span>
        <span>·</span>
        <span>100%</span>
      </span>
    </div>
  );
}

export function PageHeader({
  title,
  back,
  right,
  tone = "light",
}: {
  title: string;
  back?: string;
  right?: ReactNode;
  tone?: "light" | "brand";
}) {
  const brand = tone === "brand";
  return (
    <header className={cn(brand ? "bg-primary text-primary-foreground" : "bg-card text-foreground")}>
      <StatusBar dark={brand} />
      <div className="relative flex h-12 items-center justify-center px-4">
        {back ? (
          <Link to={back} className="absolute left-3 inline-flex size-8 items-center justify-center">
            <ChevronLeft className="size-5" />
          </Link>
        ) : null}
        <h1 className="text-[17px] font-semibold">{title}</h1>
        <div className="absolute right-4 text-[13px]">{right}</div>
      </div>
    </header>
  );
}

export function Phone({
  children,
  caption,
  tab,
}: {
  children: ReactNode;
  caption?: string;
  tab?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-[390px] shrink-0 overflow-hidden rounded-[8px] border border-border bg-background shadow-[0_10px_40px_oklch(0.22_0.02_260/0.12)]">
        <div className="relative flex h-[820px] flex-col">
          <div className="flex-1 overflow-y-auto">{children}</div>
          {tab ? <TabBar /> : null}
        </div>
      </div>
      {caption ? (
        <p className="text-[12px] text-muted-foreground">{caption}</p>
      ) : null}
    </div>
  );
}

export function TabBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
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
            <Icon className={cn("size-5", active && "fill-primary/10")} />
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Money({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("tabular-nums", className)}>
      ¥{value.toFixed(2)}
    </span>
  );
}

export function MapArea({
  height = 260,
  children,
}: {
  height?: number;
  children?: ReactNode;
}) {
  return (
    <div className="relative w-full map-grid" style={{ height }}>
      <svg className="absolute inset-0 size-full" viewBox="0 0 390 260" fill="none">
        <path
          d="M56 214 C 110 214, 120 150, 176 140 S 250 120, 268 62"
          stroke="var(--color-map-line)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.9"
        />
        <circle cx="56" cy="214" r="8" fill="var(--color-accent)" stroke="white" strokeWidth="3" />
        <circle cx="268" cy="62" r="8" fill="var(--color-destructive)" stroke="white" strokeWidth="3" />
      </svg>
      {children}
    </div>
  );
}

export function Section({
  title,
  extra,
  children,
  className,
}: {
  title?: string;
  extra?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("card-flat mx-3 mt-3 p-4", className)}>
      {title ? (
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold">{title}</h2>
          {extra ? <div className="text-[12px] text-muted-foreground">{extra}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Row({
  label,
  value,
  strong,
  tone,
}: {
  label: ReactNode;
  value: ReactNode;
  strong?: boolean;
  tone?: "default" | "discount";
}) {
  return (
    <div className="flex items-center justify-between py-1.5 text-[14px]">
      <span className={cn("text-muted-foreground", strong && "text-foreground font-medium")}>{label}</span>
      <span
        className={cn(
          "tabular-nums",
          strong && "text-[18px] font-semibold text-foreground",
          tone === "discount" && "text-accent",
        )}
      >
        {value}
      </span>
    </div>
  );
}

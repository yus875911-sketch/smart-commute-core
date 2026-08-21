import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Desktop({
  children,
  title,
  caption,
}: {
  children: ReactNode;
  title: string;
  caption?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="w-full max-w-[1280px] overflow-hidden rounded-[8px] border border-border bg-background shadow-[0_10px_40px_oklch(0.22_0.02_260/0.12)]">
        <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-warning" />
          <span className="size-2.5 rounded-full bg-accent" />
          <div className="ml-3 flex-1 truncate rounded-[6px] bg-muted px-3 py-1 text-[12px] text-muted-foreground">
            {title}
          </div>
        </div>
        {children}
      </div>
      {caption ? <p className="text-[12px] text-muted-foreground">{caption}</p> : null}
    </div>
  );
}

export function Sidebar({
  brand,
  sub,
  items,
  active,
}: {
  brand: string;
  sub: string;
  items: { label: string; icon: React.ElementType; badge?: string }[];
  active: string;
}) {
  return (
    <aside className="w-[212px] shrink-0 bg-sidebar py-4 text-sidebar-foreground">
      <div className="px-4 pb-4">
        <div className="text-[16px] font-semibold text-primary">{brand}</div>
        <div className="mt-0.5 text-[12px] text-muted-foreground">{sub}</div>
      </div>
      <nav className="space-y-0.5 px-2">
        {items.map((it) => {
          const on = it.label === active;
          const Icon = it.icon;
          return (
            <div
              key={it.label}
              className={cn(
                "flex cursor-default items-center gap-2 rounded-[6px] px-3 py-2 text-[13px]",
                on ? "bg-primary text-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent",
              )}
            >
              <Icon className="size-4" />
              <span className="flex-1">{it.label}</span>
              {it.badge ? (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                    on ? "bg-primary-foreground/20" : "bg-destructive text-destructive-foreground",
                  )}
                >
                  {it.badge}
                </span>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export function TopBar({ title, user, role }: { title: string; user: string; role: string }) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      <h1 className="text-[18px] font-semibold">{title}</h1>
      <div className="flex items-center gap-3 text-[13px]">
        <span className="rounded-[6px] bg-muted px-2 py-1 text-muted-foreground">{role}</span>
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-primary text-[12px] font-semibold text-primary-foreground">
            {user.slice(0, 1)}
          </span>
          {user}
        </div>
      </div>
    </header>
  );
}

export function Stat({
  label,
  value,
  delta,
  hint,
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
}) {
  const up = delta?.startsWith("+");
  return (
    <div className="card-flat p-4">
      <div className="text-[13px] text-muted-foreground">{label}</div>
      <div className="mt-1.5 flex items-end gap-2">
        <div className="text-[26px] font-semibold tabular-nums leading-none">{value}</div>
        {delta ? (
          <span className={cn("text-[12px] tabular-nums", up ? "text-accent" : "text-destructive")}>{delta}</span>
        ) : null}
      </div>
      {hint ? <div className="mt-1.5 text-[12px] text-muted-foreground">{hint}</div> : null}
    </div>
  );
}

export function Panel({
  title,
  extra,
  children,
  className,
}: {
  title: string;
  extra?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("card-flat", className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-[15px] font-semibold">{title}</h2>
        {extra ? <div className="text-[12px] text-muted-foreground">{extra}</div> : null}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function Table({
  head,
  rows,
}: {
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="text-muted-foreground">
            {head.map((h) => (
              <th key={h} className="whitespace-nowrap px-2 pb-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border">
              {r.map((c, j) => (
                <td key={j} className="whitespace-nowrap px-2 py-2.5 tabular-nums">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Tag({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "success" | "warn" | "danger" | "brand";
}) {
  const map = {
    muted: "bg-muted text-muted-foreground",
    success: "bg-accent/12 text-accent",
    warn: "bg-warning/20 text-warning-foreground",
    danger: "bg-destructive/12 text-destructive",
    brand: "bg-primary/10 text-primary",
  } as const;
  return <span className={cn("rounded-[4px] px-1.5 py-0.5 text-[12px]", map[tone])}>{children}</span>;
}

export function Bars({
  data,
  height = 140,
}: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-3" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="text-[11px] tabular-nums text-muted-foreground">{d.value}</div>
          <div
            className="w-full rounded-t-[4px] bg-primary/80"
            style={{ height: `${(d.value / max) * (height - 40)}px` }}
          />
          <div className="text-[11px] text-muted-foreground">{d.label}</div>
        </div>
      ))}
    </div>
  );
}

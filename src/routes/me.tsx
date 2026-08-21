import { createFileRoute, Link } from "@tanstack/react-router";
import {
  UserRound,
  ShieldCheck,
  Wallet,
  Ticket,
  Gift,
  Headphones,
  Settings,
  ChevronRight,
  BadgePercent,
  Users,
} from "lucide-react";
import { Money, Phone, StatusBar, Section } from "@/components/mobile/Shell";

export const Route = createFileRoute("/me")({
  head: () => ({
    meta: [
      { title: "个人中心 · 兴红出行" },
      { name: "description", content: "兴红出行个人中心：余额充值、优惠券包、钱包提现、营销活动、客服售后与账号设置。" },
      { property: "og:title", content: "个人中心 · 兴红出行" },
      { property: "og:description", content: "余额与优惠券、钱包提现、邀请有礼与客服售后一站管理。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MePage,
});

const coupons = [
  { amount: "¥8", rule: "满 30 元可用 · 代驾", exp: "3 天后过期", urgent: true },
  { amount: "8.5折", rule: "折后价保底 ¥12 · 出租车", exp: "08-31 到期" },
  { amount: "¥15", rule: "满 60 元可用 · 全场景", exp: "09-12 到期" },
];

const settings = [
  { i: Headphones, t: "客服中心", s: "计费规则 / 在线工单", to: "/support" as const },
  { i: BadgePercent, t: "退款售后", s: "退款进度 / 举证上传", to: "/support" as const },
  { i: Settings, t: "设置中心", s: "安全 / 隐私 / 关于", to: "/me" as const },
];

function MePage() {
  return (
    <Phone tab>
      <div className="bg-primary pb-12 text-primary-foreground">
        <StatusBar dark />
        <div className="flex items-center gap-3 px-4 pt-3">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary-foreground/15">
            <UserRound className="size-7" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[18px] font-semibold">
              李小可
              <span className="flex items-center gap-0.5 rounded-[4px] bg-primary-foreground/15 px-1.5 py-0.5 text-[11px]">
                <ShieldCheck className="size-3" /> 已实名
              </span>
            </div>
            <div className="mt-0.5 text-[12px] opacity-80">ID 8823 0912 · 注册 2 年</div>
          </div>
          <ChevronRight className="size-5 opacity-70" />
        </div>
      </div>

      <div className="-mt-9">
        <Section className="pt-4">
          <div className="grid grid-cols-3 divide-x divide-border text-center">
            <div>
              <div className="text-[20px] font-semibold tabular-nums">
                <Money value={126.4} />
              </div>
              <div className="mt-0.5 text-[12px] text-muted-foreground">余额</div>
            </div>
            <div>
              <div className="text-[20px] font-semibold tabular-nums">3</div>
              <div className="mt-0.5 text-[12px] text-muted-foreground">优惠券</div>
            </div>
            <div>
              <div className="text-[20px] font-semibold tabular-nums">12</div>
              <div className="mt-0.5 text-[12px] text-muted-foreground">出行次数</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="rounded-[8px] bg-primary py-2.5 text-[14px] font-medium text-primary-foreground">
              充值（充 100 送 20）
            </button>
            <Link
              to="/wallet"
              className="flex items-center justify-center gap-1.5 rounded-[8px] border border-border py-2.5 text-[14px]"
            >
              <Wallet className="size-4" /> 我的钱包
            </Link>
          </div>
        </Section>

        <Section title="我的券包" extra={<span>全部 ›</span>}>
          <div className="space-y-2">
            {coupons.map((c) => (
              <div
                key={c.amount + c.rule}
                className="flex items-center gap-3 rounded-[8px] border border-dashed border-primary/30 bg-primary/4 p-3"
              >
                <div className="w-[68px] shrink-0 text-center text-[20px] font-semibold text-primary tabular-nums">
                  {c.amount}
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-medium">{c.rule}</div>
                  <div
                    className={
                      c.urgent ? "mt-0.5 text-[12px] text-destructive" : "mt-0.5 text-[12px] text-muted-foreground"
                    }
                  >
                    {c.exp}
                  </div>
                </div>
                <Ticket className="size-4 text-primary/60" />
              </div>
            ))}
          </div>
        </Section>

        <Section title="营销活动">
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { i: Gift, t: "首单立减", s: "最高减 25" },
              { i: Ticket, t: "新人专享", s: "3 张券" },
              { i: Users, t: "邀请有礼", s: "得佣金" },
            ].map((a) => (
              <Link to="/promo" key={a.t} className="rounded-[8px] bg-muted py-3">
                <a.i className="mx-auto mb-1 size-5 text-primary" />
                <div className="text-[13px] font-medium">{a.t}</div>
                <div className="text-[11px] text-muted-foreground">{a.s}</div>
              </Link>
            ))}
          </div>
        </Section>

        <Section className="mb-6 p-0">
          {settings.map((s, i) => (
            <Link
              key={s.t}
              to={s.to}
              className={
                "flex w-full items-center gap-3 px-4 py-3.5 text-left" +
                (i ? " border-t border-border" : "")
              }
            >
              <s.i className="size-5 text-primary" />
              <div className="flex-1">
                <div className="text-[14px] font-medium">{s.t}</div>
                <div className="text-[12px] text-muted-foreground">{s.s}</div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </Section>
      </div>
    </Phone>
  );
}

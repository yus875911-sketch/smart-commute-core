import { createFileRoute } from "@tanstack/react-router";
import { Gift, Ticket, Users, Copy, ChevronRight } from "lucide-react";
import { Money, PageHeader, Phone, Section } from "@/components/mobile/Shell";

export const Route = createFileRoute("/promo")({
  head: () => ({
    meta: [
      { title: "营销活动 · 兴红出行" },
      {
        name: "description",
        content: "兴红出行营销活动：首单立减阶梯满减、新人专享券领取、邀请有礼分享裂变与佣金奖励。",
      },
      { property: "og:title", content: "营销活动 · 兴红出行" },
      { property: "og:description", content: "首单立减、新人专享券与邀请有礼佣金奖励。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PromoPage,
});

const ladders = [
  { need: 20, off: 5 },
  { need: 50, off: 12 },
  { need: 100, off: 25 },
];

function PromoPage() {
  return (
    <Phone>
      <PageHeader title="活动中心" back="/me" tone="brand" />

      <div className="bg-primary px-4 pb-10 text-primary-foreground">
        <div className="text-[22px] font-semibold">首单立减最高 ¥25</div>
        <p className="mt-1 text-[13px] opacity-80">新用户注册即得三张专享券，出租车 / 代驾通用</p>
      </div>

      <div className="-mt-6">
        <Section title="首单立减 · 阶梯满减">
          <div className="space-y-2">
            {ladders.map((l) => (
              <div
                key={l.need}
                className="flex items-center justify-between rounded-[8px] bg-muted px-3 py-2.5 text-[14px]"
              >
                <span>
                  订单满 <span className="tabular-nums">¥{l.need}</span>
                </span>
                <span className="font-semibold text-primary">
                  立减 <Money value={l.off} />
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[12px] text-muted-foreground">
            仅限首单使用，与其他优惠券不叠加，活动期至 2026-09-30。
          </p>
        </Section>

        <Section title="新人专享券">
          <div className="space-y-2">
            {[
              { a: "¥8", r: "满 30 元可用 · 代驾" },
              { a: "¥15", r: "满 60 元可用 · 全场景" },
              { a: "8.5折", r: "折后价保底 ¥12 · 出租车" },
            ].map((c) => (
              <div
                key={c.a}
                className="flex items-center gap-3 rounded-[8px] border border-dashed border-primary/30 bg-primary/4 p-3"
              >
                <div className="w-[68px] shrink-0 text-center text-[20px] font-semibold text-primary tabular-nums">
                  {c.a}
                </div>
                <div className="flex-1 text-[13px]">{c.r}</div>
                <button className="rounded-[8px] bg-primary px-3 py-1.5 text-[13px] font-medium text-primary-foreground">
                  领取
                </button>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[12px] text-muted-foreground">
            每个账号限领 1 次，设备 ID + 手机号双重校验，重复领取将被拦截。
          </p>
        </Section>

        <Section title="邀请有礼" className="mb-6">
          <div className="flex items-center justify-between rounded-[8px] bg-muted px-3 py-3">
            <div>
              <div className="text-[12px] text-muted-foreground">我的邀请码</div>
              <div className="text-[20px] font-semibold tracking-widest tabular-nums">XH8823</div>
            </div>
            <button className="flex items-center gap-1 rounded-[8px] border border-border bg-card px-3 py-1.5 text-[13px]">
              <Copy className="size-3.5" /> 复制
            </button>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              { i: Users, t: "已邀请", v: "6 人" },
              { i: Gift, t: "累计佣金", v: "¥84.00" },
              { i: Ticket, t: "获得券", v: "9 张" },
            ].map((s) => (
              <div key={s.t} className="rounded-[8px] bg-muted py-3">
                <s.i className="mx-auto mb-1 size-5 text-primary" />
                <div className="text-[14px] font-semibold tabular-nums">{s.v}</div>
                <div className="text-[11px] text-muted-foreground">{s.t}</div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full rounded-[8px] bg-primary py-3 text-[15px] font-semibold text-primary-foreground">
            分享邀请链接
          </button>
          <button className="mt-2 flex w-full items-center justify-center gap-1 text-[13px] text-muted-foreground">
            查看佣金规则 <ChevronRight className="size-3.5" />
          </button>
        </Section>
      </div>
    </Phone>
  );
}

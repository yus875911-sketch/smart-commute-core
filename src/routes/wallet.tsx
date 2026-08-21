import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Money, PageHeader, Phone, Section } from "@/components/mobile/Shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "我的钱包 · 兴红出行" },
      {
        name: "description",
        content: "兴红出行钱包：余额与充值赠送、收支明细、优惠券使用记录、微信/支付宝/银行卡提现规则。",
      },
      { property: "og:title", content: "我的钱包 · 兴红出行" },
      { property: "og:description", content: "余额充值、收支明细与提现到账规则一目了然。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WalletPage,
});

const bills = [
  { t: "行程支付 · 代驾", d: "08-20 20:53", v: -36.0 },
  { t: "账户充值（充 100 送 20）", d: "08-18 12:04", v: 120.0 },
  { t: "取消订单退款", d: "08-17 23:45", v: 15.0 },
  { t: "行程支付 · 出租车", d: "08-19 09:40", v: -128.5 },
];

const recharge = [
  { a: 50, g: "送 5 元" },
  { a: 100, g: "送 20 元", hot: true },
  { a: 300, g: "送 80 元" },
];

function WalletPage() {
  const [tab, setTab] = useState<"bill" | "coupon">("bill");
  const [amt, setAmt] = useState(100);

  return (
    <Phone>
      <PageHeader title="我的钱包" back="/me" tone="brand" right={<span>提现规则</span>} />

      <div className="bg-primary px-4 pb-8 text-primary-foreground">
        <div className="text-[13px] opacity-80">账户余额（元）</div>
        <div className="mt-1 text-[36px] font-semibold tabular-nums">126.40</div>
        <div className="mt-3 flex gap-2">
          <button className="flex-1 rounded-[8px] bg-primary-foreground/15 py-2.5 text-[14px] font-medium">
            立即充值
          </button>
          <button className="flex-1 rounded-[8px] bg-primary-foreground/15 py-2.5 text-[14px] font-medium">
            申请提现
          </button>
        </div>
      </div>

      <div className="-mt-5">
        <Section title="充值优惠">
          <div className="grid grid-cols-3 gap-2">
            {recharge.map((r) => (
              <button
                key={r.a}
                onClick={() => setAmt(r.a)}
                className={cn(
                  "rounded-[8px] border py-3 text-center",
                  amt === r.a ? "border-primary bg-primary/5" : "border-border",
                )}
              >
                <div className="text-[18px] font-semibold tabular-nums">{r.a}</div>
                <div className={cn("mt-0.5 text-[11px]", r.hot ? "text-accent" : "text-muted-foreground")}>
                  {r.g}
                </div>
              </button>
            ))}
          </div>
          <button className="mt-3 w-full rounded-[8px] bg-primary py-3 text-[15px] font-semibold text-primary-foreground">
            充值 <Money value={amt} />
          </button>
        </Section>

        <Section title="提现">
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">提现账户</span>
              <span>微信 / 支付宝 / 银行卡</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">起提金额</span>
              <span className="tabular-nums">¥10.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">手续费</span>
              <span>0.6%（最低 ¥0.10）</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">到账时间</span>
              <span>审核通过后 1-3 个工作日</span>
            </div>
          </div>
        </Section>

        <Section className="mb-6 p-0">
          <div className="flex border-b border-border text-[14px]">
            {(
              [
                { k: "bill", t: "余额明细" },
                { k: "coupon", t: "券使用记录" },
              ] as const
            ).map((x) => (
              <button
                key={x.k}
                onClick={() => setTab(x.k)}
                className={cn(
                  "flex-1 border-b-2 py-3",
                  tab === x.k ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground",
                )}
              >
                {x.t}
              </button>
            ))}
          </div>

          {tab === "bill" ? (
            <div>
              {bills.map((b) => (
                <div
                  key={b.t + b.d}
                  className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
                >
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full",
                      b.v > 0 ? "bg-accent/12 text-accent" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {b.v > 0 ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
                  </span>
                  <div className="flex-1">
                    <div className="text-[14px]">{b.t}</div>
                    <div className="text-[12px] text-muted-foreground tabular-nums">{b.d}</div>
                  </div>
                  <span className={cn("text-[15px] font-semibold tabular-nums", b.v > 0 && "text-accent")}>
                    {b.v > 0 ? "+" : "-"}
                    <Money value={Math.abs(b.v)} />
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {[
                { t: "新人立减券 ¥4", d: "08-20 已使用 · 代驾订单" },
                { t: "满 30 减 8 券", d: "08-19 已使用 · 出租车订单" },
                { t: "8.5 折券", d: "剩余 1 张 · 08-31 到期" },
              ].map((c) => (
                <div key={c.t} className="border-b border-border px-4 py-3 last:border-b-0">
                  <div className="text-[14px]">{c.t}</div>
                  <div className="text-[12px] text-muted-foreground">{c.d}</div>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </Phone>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, UserRound, ShieldCheck, Check } from "lucide-react";
import { Money, PageHeader, Phone, Row, Section } from "@/components/mobile/Shell";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/complete")({
  head: () => ({
    meta: [
      { title: "行程完成 · 支付与评价 · 兴红出行" },
      { name: "description", content: "兴红出行行程完成页：费用明细、微信/支付宝/余额支付方式与星级标签评价。" },
      { property: "og:title", content: "行程完成 · 支付与评价 · 兴红出行" },
      { property: "og:description", content: "查看费用明细、选择支付方式并为本次服务打分评价。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompletePage,
});

const pays = [
  { k: "wx", t: "微信支付" },
  { k: "ali", t: "支付宝" },
  { k: "bal", t: "余额 ¥126.40" },
];
const tagList = ["驾驶平稳", "车内整洁", "服务态度好", "路线熟悉", "音乐好听"];

function CompletePage() {
  const [pay, setPay] = useState("wx");
  const [stars, setStars] = useState(5);
  const [tags, setTags] = useState<string[]>(["驾驶平稳"]);
  const [anon, setAnon] = useState(false);

  return (
    <Phone>
      <PageHeader title="行程完成" back="/trip" />

      <div className="bg-card px-4 pt-2 pb-5 text-center">
        <div className="text-[13px] text-muted-foreground">本次行程需支付</div>
        <div className="mt-1 text-[34px] font-semibold text-foreground tabular-nums">
          <Money value={36.0} />
        </div>
        <div className="mt-1 text-[12px] text-accent">已为您节省 ¥4.00</div>
      </div>

      <Section>
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <UserRound className="size-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[15px] font-semibold">
              王师傅 · 工号 D2098
              <ShieldCheck className="size-4 text-accent" />
            </div>
            <div className="mt-0.5 text-[12px] text-muted-foreground">
              评分 4.98 · 服务 3,821 单
            </div>
          </div>
        </div>
      </Section>

      <Section title="费用明细">
        <Row label="起步价" value={<Money value={18.0} />} />
        <Row label="里程费 8.6km" value={<Money value={11.0} />} />
        <Row label="时长费 22 分钟" value={<Money value={6.0} />} />
        <Row label="搬运附加费" value={<Money value={5.0} />} />
        <Row label="新人立减券" value={<span>-<Money value={4.0} /></span>} tone="discount" />
        <div className="mt-1 border-t border-border pt-2">
          <Row label="实付金额" value={<Money value={36.0} />} strong />
        </div>
      </Section>

      <Section title="支付方式" extra={<span className="text-destructive">待支付</span>}>
        <div className="space-y-2">
          {pays.map((p) => (
            <button
              key={p.k}
              onClick={() => setPay(p.k)}
              className={cn(
                "flex w-full items-center justify-between rounded-[8px] border px-3 py-2.5 text-[14px]",
                pay === p.k ? "border-primary bg-primary/5" : "border-border",
              )}
            >
              {p.t}
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border",
                  pay === p.k ? "border-primary bg-primary" : "border-border",
                )}
              >
                {pay === p.k ? <Check className="size-3.5 text-primary-foreground" /> : null}
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="服务评价">
        <div className="flex justify-center gap-2 py-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} onClick={() => setStars(s)}>
              <Star
                className={cn(
                  "size-8",
                  s <= stars ? "fill-warning text-warning" : "text-border",
                )}
              />
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tagList.map((t) => {
            const on = tags.includes(t);
            return (
              <button
                key={t}
                onClick={() => setTags(on ? tags.filter((x) => x !== t) : [...tags, t])}
                className={cn(
                  "rounded-[8px] border px-3 py-1.5 text-[13px]",
                  on ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground",
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
        <textarea
          rows={3}
          placeholder="说说本次乘车体验（选填）"
          className="mt-3 w-full resize-none rounded-[8px] border border-border p-3 text-[14px] outline-none placeholder:text-muted-foreground"
        />
        <div className="mt-2 flex items-center justify-between text-[13px]">
          <span className="text-muted-foreground">匿名评价</span>
          <Switch checked={anon} onCheckedChange={setAnon} />
        </div>
      </Section>

      <div className="px-3 py-4 pb-6">
        <button className="w-full rounded-[8px] bg-primary py-3.5 text-[17px] font-semibold text-primary-foreground">
          {pay === "wx" ? "微信支付" : pay === "ali" ? "支付宝支付" : "余额支付"} ¥36.00
        </button>
        <Link
          to="/orders"
          className="mt-3 block text-center text-[13px] text-muted-foreground"
        >
          稍后支付，查看订单
        </Link>
      </div>
    </Phone>
  );
}

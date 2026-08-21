import { createFileRoute } from "@tanstack/react-router";
import { Share2, Siren, ShieldCheck, ChevronDown } from "lucide-react";
import { MapArea, Money, PageHeader, Phone, Row, Section } from "@/components/mobile/Shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tracking")({
  head: () => ({
    meta: [
      { title: "订单跟踪 · 兴红出行" },
      {
        name: "description",
        content: "兴红出行订单跟踪页：已接单到已完成的行程时间线、起终点信息、完整费用明细与安全求助入口。",
      },
      { property: "og:title", content: "订单跟踪 · 兴红出行" },
      { property: "og:description", content: "行程状态时间线、起终点信息与完整费用明细。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackingPage,
});

const timeline = [
  { t: "已接单", time: "20:24", done: true },
  { t: "已到达上车点", time: "20:29", done: true },
  { t: "行程中", time: "20:31", done: true },
  { t: "已完成", time: "20:53", done: false },
];

function TrackingPage() {
  return (
    <Phone>
      <PageHeader title="订单跟踪" back="/orders" right={<span className="text-primary">客服</span>} />

      <MapArea height={200} />

      <Section title="行程状态">
        <div className="relative pl-5">
          <span className="absolute top-2 bottom-4 left-[5px] w-px bg-border" />
          {timeline.map((s) => (
            <div key={s.t} className="relative flex items-center justify-between py-2">
              <span
                className={cn(
                  "absolute -left-5 size-2.5 rounded-full ring-4 ring-card",
                  s.done ? "bg-primary" : "bg-border",
                )}
              />
              <span className={cn("text-[14px]", s.done ? "font-medium" : "text-muted-foreground")}>
                {s.t}
              </span>
              <span className="text-[12px] text-muted-foreground tabular-nums">
                {s.done ? s.time : "预计 20:53"}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="行程信息">
        <div className="space-y-2 text-[14px]">
          <div className="flex gap-2">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
            世纪大道地铁站 2 号口
          </div>
          <div className="flex gap-2">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-destructive" />
            长宁区虹桥路 1 号 万象城
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-center">
          <div className="rounded-[8px] bg-muted py-2.5">
            <div className="text-[16px] font-semibold tabular-nums">20:53</div>
            <div className="text-[12px] text-muted-foreground">预计到达</div>
          </div>
          <div className="rounded-[8px] bg-muted py-2.5">
            <div className="text-[16px] font-semibold tabular-nums">8.6 km</div>
            <div className="text-[12px] text-muted-foreground">实际里程</div>
          </div>
        </div>
      </Section>

      <Section
        title="费用明细"
        extra={
          <span className="flex items-center gap-0.5">
            收起 <ChevronDown className="size-3.5" />
          </span>
        }
      >
        <Row label="起步价" value={<Money value={18.0} />} />
        <Row label="里程费 8.6km" value={<Money value={11.0} />} />
        <Row label="时长费 22 分钟" value={<Money value={6.0} />} />
        <Row label="等候费 3 分钟" value={<Money value={1.5} />} />
        <Row label="夜间服务费" value={<Money value={3.0} />} />
        <Row label="高速费" value={<Money value={15.0} />} />
        <Row label="停车费" value={<Money value={5.0} />} />
        <Row label="优惠券抵扣" value={<span>-<Money value={4.0} /></span>} tone="discount" />
        <div className="mt-1 border-t border-border pt-2">
          <Row label="实付金额" value={<Money value={55.5} />} strong />
        </div>
      </Section>

      <Section title="安全操作" className="mb-6">
        <div className="grid grid-cols-3 gap-2">
          {[
            { i: Share2, t: "行程分享" },
            { i: ShieldCheck, t: "紧急求助" },
            { i: Siren, t: "一键报警", danger: true },
          ].map((s) => (
            <button
              key={s.t}
              className={cn(
                "rounded-[8px] border py-3 text-[12px]",
                s.danger ? "border-destructive/40 text-destructive" : "border-border",
              )}
            >
              <s.i className={cn("mx-auto mb-1 size-5", !s.danger && "text-primary")} />
              {s.t}
            </button>
          ))}
        </div>
      </Section>
    </Phone>
  );
}

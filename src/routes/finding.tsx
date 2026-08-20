import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Share2, Siren, UserRound, ShieldCheck } from "lucide-react";
import { MapArea, Money, PageHeader, Phone, Row, Section } from "@/components/mobile/Shell";

export const Route = createFileRoute("/finding")({
  head: () => ({
    meta: [
      { title: "正在寻找车辆 · 兴红出行" },
      { name: "description", content: "兴红出行派单中页面：实时寻车状态、司机信息、订单预估费用与安全功能。" },
      { property: "og:title", content: "正在寻找车辆 · 兴红出行" },
      { property: "og:description", content: "实时寻车状态、司机信息、预估费用与一键报警等安全功能。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FindingPage,
});

function FindingPage() {
  return (
    <Phone>
      <PageHeader title="寻找车辆中" back="/" tone="brand" right={<span>取消</span>} />

      <MapArea height={220}>
        <div className="absolute inset-x-3 top-3 card-flat px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            <span className="text-[15px] font-semibold">正在为您寻找附近车辆…</span>
          </div>
          <p className="mt-1 text-[12px] text-muted-foreground">
            已通知 12 位附近司机 · 司机接单前取消免费
          </p>
        </div>
      </MapArea>

      <Section title="导航信息">
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { t: "预计等待", v: "3 分钟" },
            { t: "预计行程", v: "22 分钟" },
            { t: "全程里程", v: "8.6 km" },
          ].map((i) => (
            <div key={i.t} className="rounded-[8px] bg-muted py-2.5">
              <div className="text-[16px] font-semibold tabular-nums">{i.v}</div>
              <div className="text-[12px] text-muted-foreground">{i.t}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-2 text-[13px]">
          <div className="flex gap-2">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
            世纪大道地铁站 2 号口
          </div>
          <div className="flex gap-2">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-destructive" />
            长宁区虹桥路 1号 万象城
          </div>
          <div className="text-[12px] text-warning-foreground">路况：延安高架局部缓行，已为您避开</div>
        </div>
      </Section>

      <Section title="订单信息">
        <Row label="车型" value="经济型 · 大众朗逸" />
        <Row label="车牌号" value="沪A · 8H2K9" />
        <Row label="实时里程 / 时长" value="0.0 km · 00:00" />
        <Row label="预估价格" value={<Money value={28.5} />} strong />
      </Section>

      <Section title="司机信息">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <UserRound className="size-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[15px] font-semibold">
              王师傅
              <span className="flex items-center gap-0.5 rounded-[4px] bg-accent/15 px-1.5 py-0.5 text-[11px] text-accent">
                <ShieldCheck className="size-3" /> 已认证
              </span>
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-0.5 text-warning">
                <Star className="size-3 fill-current" />
                4.98
              </span>
              <span>接单 3,821 单</span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="安全保障">
        <div className="grid grid-cols-3 gap-2">
          {[
            { i: Siren, t: "一键报警" },
            { i: Share2, t: "行程分享" },
            { i: ShieldCheck, t: "紧急联系人" },
          ].map((s) => (
            <button key={s.t} className="rounded-[8px] border border-border py-3 text-[12px]">
              <s.i className="mx-auto mb-1 size-5 text-primary" />
              {s.t}
            </button>
          ))}
        </div>
      </Section>

      <div className="px-3 py-4">
        <Link
          to="/trip"
          className="flex w-full items-center justify-center rounded-[8px] bg-primary py-3.5 text-[16px] font-semibold text-primary-foreground"
        >
          司机已接单，查看行程
        </Link>
      </div>
    </Phone>
  );
}

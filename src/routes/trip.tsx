import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquare, Phone as PhoneIcon, MapPinned, Siren, Share2 } from "lucide-react";
import { MapArea, Money, PageHeader, Phone, Row, Section } from "@/components/mobile/Shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trip")({
  head: () => ({
    meta: [
      { title: "行程进行中 · 兴红出行" },
      { name: "description", content: "兴红出行行程页：实时位置、剩余距离、预计到达、联系司机、修改目的地与费用明细。" },
      { property: "og:title", content: "行程进行中 · 兴红出行" },
      { property: "og:description", content: "实时位置、剩余距离、预计到达与费用明细一目了然。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TripPage,
});

const steps = ["接驾中", "行程中", "已完成"];

function TripPage() {
  const current = 1;
  return (
    <Phone>
      <PageHeader title="行程进行中" back="/finding" tone="brand" />

      <div className="bg-card px-4 pb-4">
        <div className="flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "size-3 rounded-full",
                    i <= current ? "bg-primary" : "bg-border",
                  )}
                />
                <span
                  className={cn(
                    "mt-1 text-[12px]",
                    i <= current ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 ? (
                <div className={cn("mx-1 h-0.5 flex-1", i < current ? "bg-primary" : "bg-border")} />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <MapArea height={230}>
        <div className="absolute inset-x-3 bottom-3 card-flat flex items-center justify-between px-3 py-2.5">
          <div>
            <div className="text-[15px] font-semibold">剩余 4.2 公里</div>
            <div className="text-[12px] text-muted-foreground">预计 20:48 到达 · 路况畅通</div>
          </div>
          <div className="text-[13px] text-primary">刷新</div>
        </div>
      </MapArea>

      <Section title="车辆信息">
        <Row label="车型 / 颜色" value="大众朗逸 · 珠光白" />
        <Row label="车牌号" value="沪A · 8H2K9" />
        <Row label="司机" value="王师傅 · 4.98 分" />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-1.5 rounded-[8px] bg-primary/8 py-2.5 text-[14px] font-medium text-primary">
            <PhoneIcon className="size-4" /> 电话联系
          </button>
          <button className="flex items-center justify-center gap-1.5 rounded-[8px] bg-primary/8 py-2.5 text-[14px] font-medium text-primary">
            <MessageSquare className="size-4" /> 发送消息
          </button>
        </div>
        <button className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-[8px] border border-border py-2.5 text-[14px]">
          <MapPinned className="size-4" /> 修改目的地（重新预估费用）
        </button>
      </Section>

      <Section title="费用明细" extra={<span>实时更新</span>}>
        <Row label="起步价" value={<Money value={18.0} />} />
        <Row label="里程费 4.4km" value={<Money value={11.0} />} />
        <Row label="时长费 12 分钟" value={<Money value={6.0} />} />
        <Row label="附加费（搬运）" value={<Money value={5.0} />} />
        <Row label="优惠抵扣" value={<span>-<Money value={4.0} /></span>} tone="discount" />
        <div className="mt-1 border-t border-border pt-2">
          <Row label="当前预估" value={<Money value={36.0} />} strong />
        </div>
      </Section>

      <div className="flex gap-2 px-3 py-4">
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-[8px] border border-border py-3 text-[14px]">
          <Share2 className="size-4" /> 行程分享
        </button>
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-[8px] border border-destructive/40 py-3 text-[14px] text-destructive">
          <Siren className="size-4" /> 一键报警
        </button>
      </div>
      <div className="px-3 pb-6">
        <Link
          to="/complete"
          className="flex w-full items-center justify-center rounded-[8px] bg-primary py-3.5 text-[16px] font-semibold text-primary-foreground"
        >
          到达目的地，去支付
        </Link>
      </div>
    </Phone>
  );
}

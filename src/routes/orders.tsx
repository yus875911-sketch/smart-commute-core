import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Calendar, ChevronRight, Inbox } from "lucide-react";
import { Money, Phone, StatusBar } from "@/components/mobile/Shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "我的订单 · 兴红出行" },
      { name: "description", content: "兴红出行订单中心：按状态、时间与服务类型筛选历史订单，查看金额、行程与支付状态。" },
      { property: "og:title", content: "我的订单 · 兴红出行" },
      { property: "og:description", content: "按状态与时间筛选订单，查看行程详情与支付状态。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrdersPage,
});

const tabs = ["全部", "待接单", "进行中", "已完成", "已取消"];

const orders = [
  {
    id: "XH2026082000381",
    type: "代驾",
    from: "世纪大道地铁站 2 号口",
    to: "长宁区虹桥路 1 号 万象城",
    amount: 36.0,
    status: "待支付",
    tone: "warn",
    time: "08-20 20:26",
    note: "15 分钟后自动取消",
  },
  {
    id: "XH2026081900177",
    type: "出租车",
    from: "虹桥机场 T2 到达层",
    to: "浦东新区世纪大道 100 号",
    amount: 128.5,
    status: "已完成",
    tone: "ok",
    time: "08-19 09:12",
  },
  {
    id: "XH2026081700642",
    type: "代驾",
    from: "静安嘉里中心",
    to: "康桥半岛 3 期",
    amount: 88.0,
    status: "已取消",
    tone: "muted",
    time: "08-17 23:40",
    note: "司机接单后 2 分钟内取消，未扣费",
  },
];

function OrdersPage() {
  const [tab, setTab] = useState("全部");
  const list = tab === "全部" ? orders : orders.filter((o) => o.status.includes(tab.slice(0, 2)));

  return (
    <Phone tab>
      <div className="sticky top-0 z-10 bg-card">
        <StatusBar />
        <div className="flex h-12 items-center justify-center text-[17px] font-semibold">订单中心</div>
        <div className="flex gap-4 overflow-x-auto px-4 text-[14px]">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "shrink-0 border-b-2 pb-2",
                tab === t ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2 border-t border-border px-4 py-2.5 text-[12px]">
          <span className="flex items-center gap-1 rounded-[8px] bg-primary/8 px-2 py-1 text-primary">
            <Calendar className="size-3" /> 近一周
          </span>
          <span className="rounded-[8px] bg-muted px-2 py-1 text-muted-foreground">服务类型</span>
          <span className="rounded-[8px] bg-muted px-2 py-1 text-muted-foreground">支付状态</span>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
          <Inbox className="mb-3 size-10" />
          <p className="text-[14px]">暂无相关订单</p>
          <Link to="/" className="mt-3 rounded-[8px] bg-primary px-4 py-2 text-[13px] text-primary-foreground">
            去下单
          </Link>
        </div>
      ) : (
        <div className="space-y-3 p-3">
          {list.map((o) => (
            <div key={o.id} className="card-flat p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                  <span className="rounded-[4px] bg-primary/8 px-1.5 py-0.5 text-primary">{o.type}</span>
                  <span className="tabular-nums">{o.id}</span>
                  <Copy className="size-3" />
                </div>
                <span
                  className={cn(
                    "text-[13px] font-medium",
                    o.tone === "warn" && "text-destructive",
                    o.tone === "ok" && "text-accent",
                    o.tone === "muted" && "text-muted-foreground",
                  )}
                >
                  {o.status}
                </span>
              </div>

              <div className="mt-3 space-y-2 text-[14px]">
                <div className="flex gap-2">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
                  <span className="line-clamp-1">{o.from}</span>
                </div>
                <div className="flex gap-2">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-destructive" />
                  <span className="line-clamp-1">{o.to}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="text-[12px] text-muted-foreground">{o.time}</span>
                <span className="text-[17px] font-semibold tabular-nums">
                  <Money value={o.amount} />
                </span>
              </div>

              {o.note ? (
                <p
                  className={cn(
                    "mt-2 text-[12px]",
                    o.tone === "warn" ? "text-destructive" : "text-muted-foreground",
                  )}
                >
                  {o.note}
                </p>
              ) : null}

              <div className="mt-3 flex justify-end gap-2">
                {o.status === "待支付" ? (
                  <Link
                    to="/complete"
                    className="rounded-[8px] bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground"
                  >
                    去支付
                  </Link>
                ) : (
                  <button className="flex items-center rounded-[8px] border border-border px-3 py-1.5 text-[13px] text-muted-foreground">
                    订单详情 <ChevronRight className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Phone>
  );
}

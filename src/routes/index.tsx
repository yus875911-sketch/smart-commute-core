import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  ChevronRight,
  Search,
  Users,
  Clock,
  ShieldAlert,
  ChevronDown,
  Phone as PhoneIcon,
} from "lucide-react";
import { Phone, StatusBar, MapArea, Section, Row, Money } from "@/components/mobile/Shell";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "兴红出行 · 打车与代驾一键呼叫" },
      {
        name: "description",
        content: "兴红出行小程序：出租车与代驾即时/预约下单、实时寻车、行程跟踪、在线支付与评价，全流程城市出行服务。",
      },
      { property: "og:title", content: "兴红出行 · 打车与代驾一键呼叫" },
      {
        property: "og:description",
        content: "出租车与代驾即时/预约下单、实时寻车、行程跟踪、在线支付与评价。",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const cars = [
  { key: "eco", name: "经济型", price: 28.5, wait: "3 分钟", seats: 4, tag: "特惠" },
  { key: "cft", name: "舒适型", price: 38.0, wait: "5 分钟", seats: 4 },
  { key: "biz", name: "商务型", price: 62.0, wait: "8 分钟", seats: 6 },
];

function HomePage() {
  const [biz, setBiz] = useState<"taxi" | "driver">("driver");
  const [mode, setMode] = useState<"now" | "book">("now");
  const [car, setCar] = useState("eco");
  const [forOther, setForOther] = useState(false);
  const selected = cars.find((c) => c.key === car)!;

  return (
    <Phone tab>
      <div className="bg-primary pb-4 text-primary-foreground">
        <StatusBar dark />
        <div className="flex items-center gap-1 px-4 pt-1 pb-3 text-[13px]">
          <MapPin className="size-4" />
          <span className="font-medium">上海市</span>
          <span className="opacity-80">· 浦东新区世纪大道 100 号</span>
          <ChevronDown className="size-3.5 opacity-80" />
        </div>

        <div className="mx-3 card-flat p-3 text-foreground">
          <div className="flex items-center gap-2 border-b border-border pb-2.5">
            <span className="size-2 rounded-full bg-accent" />
            <input
              defaultValue="世纪大道地铁站 2 号口"
              className="w-full bg-transparent text-[14px] outline-none"
            />
            <span className="shrink-0 text-[12px] text-primary">切换</span>
          </div>
          <div className="flex items-center gap-2 pt-2.5">
            <span className="size-2 rounded-full bg-destructive" />
            <input
              placeholder="您要去哪儿？"
              className="w-full bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
            />
            <Search className="size-4 text-muted-foreground" />
          </div>
          <div className="mt-2.5 flex gap-2 overflow-x-auto text-[12px] text-muted-foreground">
            {["虹桥机场 T2", "陆家嘴中心", "家 · 康桥半岛"].map((h) => (
              <span key={h} className="shrink-0 rounded-[8px] bg-muted px-2 py-1">
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      <MapArea height={190}>
        <div className="absolute right-3 bottom-3 rounded-[8px] bg-card px-2.5 py-1.5 text-[12px] shadow">
          附近 12 辆车
        </div>
      </MapArea>

      <div className="-mt-3">
        <Section className="pt-3">
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { k: "taxi", t: "出租车", s: "扬招同价 · 打表计费" },
                { k: "driver", t: "代驾", s: "专业司机 · 安全到家" },
              ] as const
            ).map((b) => (
              <button
                key={b.k}
                onClick={() => setBiz(b.k)}
                className={cn(
                  "rounded-[8px] border px-3 py-3 text-left transition-colors",
                  biz === b.k
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card",
                )}
              >
                <div className={cn("text-[16px] font-semibold", biz === b.k && "text-primary")}>
                  {b.t}
                </div>
                <div className="mt-0.5 text-[12px] text-muted-foreground">{b.s}</div>
              </button>
            ))}
          </div>

          {biz === "driver" ? (
            <div className="mt-3 flex rounded-[8px] bg-muted p-1 text-[13px]">
              {(
                [
                  { k: "now", t: "即时代驾" },
                  { k: "book", t: "预约代驾" },
                ] as const
              ).map((m) => (
                <button
                  key={m.k}
                  onClick={() => setMode(m.k)}
                  className={cn(
                    "flex-1 rounded-[6px] py-1.5",
                    mode === m.k ? "bg-card font-medium text-primary shadow-sm" : "text-muted-foreground",
                  )}
                >
                  {m.t}
                </button>
              ))}
            </div>
          ) : null}

          {biz === "driver" && mode === "book" ? (
            <button className="mt-2 flex w-full items-center justify-between rounded-[8px] border border-border px-3 py-2.5 text-[14px]">
              <span className="text-muted-foreground">预约时间</span>
              <span className="flex items-center gap-1 font-medium">
                今天 21:30 <ChevronRight className="size-4 text-muted-foreground" />
              </span>
            </button>
          ) : null}

          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <div>
              <div className="text-[14px] font-medium">帮他人呼叫</div>
              <div className="text-[12px] text-muted-foreground">填写朋友信息，本人支付</div>
            </div>
            <Switch checked={forOther} onCheckedChange={setForOther} />
          </div>
          {forOther ? (
            <div className="mt-2 space-y-2">
              <input
                placeholder="乘车人姓名"
                className="w-full rounded-[8px] border border-border px-3 py-2 text-[14px] outline-none"
              />
              <input
                placeholder="联系电话"
                className="w-full rounded-[8px] border border-border px-3 py-2 text-[14px] outline-none"
              />
            </div>
          ) : null}
        </Section>

        <Section title="选择车型">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {cars.map((c) => (
              <button
                key={c.key}
                onClick={() => setCar(c.key)}
                className={cn(
                  "w-[110px] shrink-0 rounded-[8px] border p-2.5 text-left",
                  car === c.key ? "border-primary bg-primary/5" : "border-border",
                )}
              >
                <div className="mb-2 h-9 rounded-[6px] bg-muted" />
                <div className="flex items-center gap-1 text-[14px] font-medium">
                  {c.name}
                  {c.tag ? (
                    <span className="rounded-[4px] bg-accent/15 px-1 text-[10px] text-accent">{c.tag}</span>
                  ) : null}
                </div>
                <div className="mt-1 text-[15px] font-semibold text-primary tabular-nums">
                  <Money value={c.price} />
                </div>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Clock className="size-3" />
                    {c.wait}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Users className="size-3" />
                    {c.seats}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[13px]">
            <span className="text-muted-foreground">附加服务 · 搬运服务 / 等候费说明</span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </div>
        </Section>

        <Section title="费用预估" extra={<span>明细 ▾</span>}>
          <Row label="起步价（3 公里）" value={<Money value={18.0} />} />
          <Row label={`里程费 · ${selected.name}`} value={<Money value={14.5} />} />
          <Row label="新人立减券" value={<span>-<Money value={4.0} /></span>} tone="discount" />
          <div className="mt-1 border-t border-border pt-2">
            <Row label="预估总价" value={<Money value={selected.price} />} strong />
          </div>
        </Section>

        <div className="px-3 pt-4 pb-6">
          <Link
            to="/finding"
            className="flex h-13 w-full items-center justify-center rounded-[8px] bg-primary py-3.5 text-[17px] font-semibold text-primary-foreground"
          >
            {biz === "driver" ? "呼叫代驾" : "呼叫出租车"} · <Money value={selected.price} />
          </Link>
          <div className="mt-3 flex items-center justify-center gap-4 text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <ShieldAlert className="size-3.5" /> 紧急联系人
            </span>
            <span className="flex items-center gap-1">
              <PhoneIcon className="size-3.5" /> 客服中心
            </span>
          </div>
        </div>
      </div>
    </Phone>
  );
}

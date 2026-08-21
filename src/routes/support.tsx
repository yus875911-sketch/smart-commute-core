import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  MessageSquare,
  FileText,
  ChevronRight,
  Upload,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Money, PageHeader, Phone, Section } from "@/components/mobile/Shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "客服与售后 · 兴红出行" },
      {
        name: "description",
        content: "兴红出行客服中心：计费规则解读、帮助文档搜索、在线工单提交，以及退款进度、举证上传与投诉处理。",
      },
      { property: "og:title", content: "客服与售后 · 兴红出行" },
      { property: "og:description", content: "帮助文档、在线工单与退款售后进度查询。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SupportPage,
});

const faqs = [
  "代驾计费规则是怎样的？",
  "等候费、夜间服务费如何计算？",
  "取消订单会扣费吗？",
  "优惠券为什么无法使用？",
];

const refundSteps = [
  { t: "提交退款申请", d: "08-20 21:02", done: true },
  { t: "客服审核通过", d: "08-20 21:20", done: true },
  { t: "原路退回处理中", d: "预计 1-3 个工作日", done: false },
];

function SupportPage() {
  const [tab, setTab] = useState<"help" | "refund">("help");

  return (
    <Phone>
      <PageHeader title="客服与售后" back="/me" />

      <div className="bg-card px-3 pb-3">
        <div className="flex gap-2 rounded-[8px] bg-muted px-3 py-2.5">
          <Search className="size-4 text-muted-foreground" />
          <input
            placeholder="搜索问题关键词，如「等候费」"
            className="w-full bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="mt-3 flex text-[14px]">
          {(
            [
              { k: "help", t: "客服中心" },
              { k: "refund", t: "退款售后" },
            ] as const
          ).map((x) => (
            <button
              key={x.k}
              onClick={() => setTab(x.k)}
              className={cn(
                "flex-1 border-b-2 pb-2",
                tab === x.k ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground",
              )}
            >
              {x.t}
            </button>
          ))}
        </div>
      </div>

      {tab === "help" ? (
        <>
          <Section title="常见问题">
            {faqs.map((f, i) => (
              <button
                key={f}
                className={cn(
                  "flex w-full items-center justify-between py-3 text-left text-[14px]",
                  i && "border-t border-border",
                )}
              >
                {f}
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            ))}
          </Section>

          <Section title="计费规则解读">
            <div className="space-y-1.5 text-[13px] text-muted-foreground">
              <p>起步价含 3 公里，超出部分按里程费计算。</p>
              <p>等候超过 5 分钟起计等候费，¥0.50 / 分钟。</p>
              <p>23:00-05:00 加收夜间服务费，高速费与停车费据实收取。</p>
            </div>
          </Section>

          <Section title="联系我们" className="mb-6">
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1.5 rounded-[8px] bg-primary py-3 text-[14px] font-medium text-primary-foreground">
                <MessageSquare className="size-4" /> 在线沟通
              </button>
              <button className="flex items-center justify-center gap-1.5 rounded-[8px] border border-border py-3 text-[14px]">
                <FileText className="size-4" /> 提交工单
              </button>
            </div>
            <div className="mt-3 rounded-[8px] bg-muted p-3 text-[13px]">
              <div className="flex items-center justify-between">
                <span>工单 #T20860 · 费用异议</span>
                <span className="rounded-[4px] bg-warning/20 px-1.5 py-0.5 text-[11px] text-warning-foreground">
                  高优先级
                </span>
              </div>
              <p className="mt-1 text-[12px] text-muted-foreground">客服已介入，预计 2 小时内回复</p>
            </div>
          </Section>
        </>
      ) : (
        <>
          <Section title="退款进度" extra={<span>订单 XH2026081700642</span>}>
            <div className="relative pl-5">
              <span className="absolute top-2 bottom-4 left-[5px] w-px bg-border" />
              {refundSteps.map((s) => (
                <div key={s.t} className="relative flex items-center justify-between py-2">
                  <span
                    className={cn(
                      "absolute -left-5 size-2.5 rounded-full ring-4 ring-card",
                      s.done ? "bg-accent" : "bg-border",
                    )}
                  />
                  <span className={cn("text-[14px]", s.done ? "font-medium" : "text-muted-foreground")}>
                    {s.t}
                  </span>
                  <span className="text-[12px] text-muted-foreground">{s.d}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-[14px]">
              <span className="text-muted-foreground">退款金额</span>
              <span className="text-[18px] font-semibold tabular-nums">
                <Money value={15.0} />
              </span>
            </div>
            <p className="mt-1 flex items-center gap-1 text-[12px] text-muted-foreground">
              <Clock className="size-3.5" /> 原路退回倒计时 2 天 04 小时
            </p>
          </Section>

          <Section title="举证与投诉">
            <button className="flex w-full flex-col items-center justify-center rounded-[8px] border border-dashed border-border py-6 text-[13px] text-muted-foreground">
              <Upload className="mb-1 size-5" />
              上传图片 / 视频举证（最多 6 个）
            </button>
            <textarea
              rows={3}
              placeholder="补充说明问题经过"
              className="mt-2 w-full resize-none rounded-[8px] border border-border p-3 text-[14px] outline-none placeholder:text-muted-foreground"
            />
            <button className="mt-2 w-full rounded-[8px] bg-primary py-3 text-[15px] font-semibold text-primary-foreground">
              提交投诉
            </button>
          </Section>

          <Section title="处理记录" className="mb-6">
            <div className="flex gap-2 text-[13px]">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
              <div>
                <div>投诉「绕路」已处理完毕</div>
                <div className="text-[12px] text-muted-foreground">
                  08-15 · 已补偿 8 元代驾券，客服介入记录已归档
                </div>
              </div>
            </div>
          </Section>
        </>
      )}
    </Phone>
  );
}

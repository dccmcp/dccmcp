// SPDX-License-Identifier: Apache-2.0
import { useState } from "react";
import { buildDiagnostics, fakeConnections, type ConnectionCard } from "./lib/fakeState";

const tierLabel: Record<ConnectionCard["tier"], string> = {
  readonly: "只读档",
  write: "写已解锁",
  degraded: "降级档",
};

const stateLabel: Record<ConnectionCard["state"], string> = {
  connected: "已连接",
  degraded: "降级连接",
  disconnected: "已断开",
};

function StateDot({ state }: { state: ConnectionCard["state"] }) {
  const color =
    state === "connected" ? "bg-mint" : state === "degraded" ? "bg-amber-400" : "bg-red-400";
  return <span aria-hidden className={`inline-block h-2 w-2 rounded-full ${color}`} />;
}

function ConnectionCardView({ card }: { card: ConnectionCard }) {
  return (
    <section className="rounded-lg border border-line bg-panel p-4">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-medium">
          <StateDot state={card.state} />
          {card.host} {card.hostVersion}
          <span className="text-sm font-normal text-muted">{stateLabel[card.state]}</span>
        </h2>
        <span className="rounded border border-line px-2 py-0.5 text-xs text-mint">
          {tierLabel[card.tier]}
        </span>
      </header>
      <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">插件版本</dt>
          <dd className={card.pluginMatch ? "" : "text-amber-400"}>
            {card.pluginVersion} {card.pluginMatch ? "✓" : "不匹配"}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">传输</dt>
          <dd>
            {card.transport} :{card.port}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">当前会话</dt>
          <dd>{card.session ?? "无"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">待审批</dt>
          <dd>{card.approvals}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">最近检查点</dt>
          <dd>{card.lastCheckpoint ?? "无"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">断连历史</dt>
          <dd>{card.disconnects.length ? card.disconnects.join("，") : "无"}</dd>
        </div>
      </dl>
    </section>
  );
}

export default function App() {
  const [copied, setCopied] = useState(false);

  async function copyDiagnostics() {
    try {
      await navigator.clipboard.writeText(buildDiagnostics(fakeConnections));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink px-6 py-5">
      <header className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-baseline gap-3">
          <h1 className="text-lg font-semibold tracking-tight">DCCMCP Desktop</h1>
          <span className="text-sm text-muted">M0 占位界面 · 数据为假</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded border border-line px-2 py-0.5 text-muted">Community</span>
          <button
            type="button"
            onClick={copyDiagnostics}
            className="rounded border border-line px-3 py-1 hover:border-mint hover:text-mint"
          >
            {copied ? "已复制" : "复制诊断块"}
          </button>
        </div>
      </header>

      <p className="mt-3 rounded border border-line bg-panel-raised px-3 py-2 text-sm text-muted">
        首启四步向导在 M3 落地；当前卡片为占位数据，M1 起由本地 gateway 推送真实连接状态。
      </p>

      <div className="mt-4 grid gap-3">
        {fakeConnections.map((card) => (
          <ConnectionCardView key={card.id} card={card} />
        ))}
      </div>
    </main>
  );
}

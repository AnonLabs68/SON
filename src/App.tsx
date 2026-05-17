import { motion } from 'motion/react';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Brain,
  Cpu,
  Database,
  Github,
  Globe2,
  LockKeyhole,
  Network,
  RadioTower,
  Sparkles,
  Terminal,
  WalletCards,
  Zap,
} from 'lucide-react';
import React, { ReactNode } from 'react';

const PUBLIC_REPO_URL = 'https://github.com/AnonLabs68/SON-Public';
const DEMO_URL = 'https://www.youtube.com/watch?v=BX_QbiYKN4M';
const EMAIL = 'mailto:Chndrabhinav@gmail.com';
const NetworkGlobe = React.lazy(() => import('./components/NetworkGlobe'));

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Section({
  children,
  id,
  className = '',
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-5 py-20 md:px-8 md:py-28 ${className}`}>
      <div className="relative z-10 mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

const proofPoints = [
  { label: 'Native Core', value: 'C++ / OpenGL3 / ImGui' },
  { label: 'Agent Layer', value: 'Quantum WebView2 + memory' },
  { label: 'Protocol', value: 'HexaField 48-byte packets' },
  { label: 'Network', value: 'SON peer market-state backfill' },
];

const productLayers = [
  {
    icon: Terminal,
    title: 'Institutional terminal',
    copy: 'Native terminal surface for charting, order book, portfolio, TP/SL, strategy controls, and low-overhead rendering.',
  },
  {
    icon: Brain,
    title: 'Oracle / Cortex',
    copy: 'Market intelligence layer for derivatives, order flow, wallet/trader signals, regimes, and AI-assisted briefs.',
  },
  {
    icon: Sparkles,
    title: 'Quantum agentic browser',
    copy: 'Embedded research browser with page context, snapshots, memory/history, API settings, and security gating.',
  },
  {
    icon: Network,
    title: 'SON node layer',
    copy: 'Active terminals share real observed candle/state ranges, health, latency, and compact packet updates.',
  },
  {
    icon: Database,
    title: 'Kinetic data',
    copy: 'Hot/cold state model for live market memory, durable observed ranges, replay logs, and restoration paths.',
  },
  {
    icon: WalletCards,
    title: 'Node passport',
    copy: 'Wallet-linked identity direction for saves, layouts, receipts, compute policy, and devnet anchoring.',
  },
];

const architecture = [
  'Market ingest -> native state -> OpenGL terminal',
  'Oracle context -> physics fallback / ONNX path -> action output',
  'Quantum browser -> page snapshot -> agent tools -> memory',
  'HexaField packet -> decode -> dedupe -> state apply',
  'Kinetic hot state -> cold replay range -> peer recovery',
  'Wallet passport -> node identity -> Solana devnet receipts',
];

const milestones = [
  'SON alpha network with LAN/WAN peer discovery and health scoring.',
  'Kinetic hot/cold state with replayable observed market ranges.',
  'Real peer backfill where new nodes hydrate from active terminals.',
  'Wallet-linked node passport with selected Solana devnet receipts.',
  'Oracle/Cortex signal pipeline that produces inspectable outputs.',
  'Public release package with docs, demo, and weekly proof-of-work updates.',
];

function LiveTerminal() {
  const logs = [
    '[SON] node passport loaded: devnet owner pending',
    '[MARKET] observed candle range indexed for peer backfill',
    '[HEXA] packet route=market_state ttl=04 crc=ok',
    '[KINETIC] hot state committed, cold replay segment open',
    '[ORACLE] cortex context fused: oi/funding/flow/wallets',
    '[QUANTUM] page snapshot attached to agent memory',
  ];

  return (
    <div className="relative h-full min-h-[360px] w-full max-w-full min-w-0 overflow-hidden border border-theme-border bg-[#07080a] p-4 font-mono text-[11px] shadow-2xl shadow-black/40">
      <div className="mb-4 flex items-center justify-between border-b border-theme-border pb-3">
        <div className="flex items-center gap-2 text-theme-text-secondary">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f43f5e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f4b740]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
        </div>
        <span className="max-w-[46%] truncate text-right text-[10px] uppercase tracking-[0.2em] text-theme-text-muted">Sovereign Native Core</span>
      </div>
      <div className="grid gap-2">
        {logs.map((log, index) => (
          <motion.div
            key={log}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.18 }}
            className="flex items-start gap-2 rounded border border-white/[0.04] bg-white/[0.025] px-3 py-2 text-theme-text-secondary"
          >
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-theme-accent shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
            <span className="min-w-0 break-all sm:break-words">{log}</span>
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-x-4 bottom-4 grid grid-cols-1 gap-2 text-center text-[10px] uppercase tracking-[0.16em] text-theme-text-muted sm:grid-cols-3">
        <div className="border border-theme-border bg-black/30 px-2 py-3">
          <div className="text-theme-accent">Target</div>
          <div className="mt-1 text-theme-text-primary">&lt;1ms local</div>
        </div>
        <div className="border border-theme-border bg-black/30 px-2 py-3">
          <div className="text-[#22c55e]">Packets</div>
          <div className="mt-1 text-theme-text-primary">dedupe on</div>
        </div>
        <div className="border border-theme-border bg-black/30 px-2 py-3">
          <div className="text-[#f4b740]">State</div>
          <div className="mt-1 text-theme-text-primary">hot/cold</div>
        </div>
      </div>
    </div>
  );
}

function TradingChartMockup() {
  const [activeTab, setActiveTab] = React.useState<'single' | 'grid'>('single');

  return (
    <div id="demo" className="mx-auto mt-12 max-w-6xl overflow-hidden border border-theme-border bg-theme-surface shadow-2xl shadow-black/40">
      <div className="flex flex-col gap-3 border-b border-theme-border bg-black/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-theme-text-muted">
          <Activity className="h-3.5 w-3.5 text-[#22c55e]" />
          Live product surface
        </div>
        <div className="flex rounded-md border border-theme-border bg-[#050507] p-1 font-mono text-[11px] uppercase tracking-[0.14em]">
          <button
            type="button"
            onClick={() => setActiveTab('single')}
            className={`px-3 py-1.5 transition-colors ${activeTab === 'single' ? 'bg-theme-accent text-black' : 'text-theme-text-muted hover:text-white'}`}
          >
            Chart
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('grid')}
            className={`px-3 py-1.5 transition-colors ${activeTab === 'grid' ? 'bg-theme-accent text-black' : 'text-theme-text-muted hover:text-white'}`}
          >
            Grid
          </button>
        </div>
      </div>
      <div className="relative aspect-video bg-[#090b10]">
        <motion.img
          key={activeTab}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.28 }}
          src={activeTab === 'single' ? '/chart-ss-1.png.png' : '/chart-ss-2.png.png'}
          alt={activeTab === 'single' ? 'Sovereign native trading chart' : 'Sovereign multi-workspace chart grid'}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute bottom-4 left-4 hidden border border-theme-border bg-black/60 px-3 py-2 font-mono text-[11px] text-theme-text-secondary backdrop-blur md:block">
          Native C++ terminal screenshots from the current prototype
        </div>
      </div>
    </div>
  );
}

export default function App() {
  React.useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace('#', '');
      if (!id) return;

      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'auto' }), 0);
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'auto' }), 160);
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);

    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-theme-bg text-theme-text-primary">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-theme-border bg-theme-bg/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-3 font-bold tracking-normal">
            <span className="grid h-7 w-7 place-items-center border border-theme-accent/40 bg-theme-accent-dim">
              <span className="h-3 w-3 rotate-45 bg-theme-accent" />
            </span>
            <span>Sovereign</span>
            <span className="hidden text-theme-accent sm:inline">Octahedral Network</span>
          </a>
          <div className="hidden items-center gap-6 text-sm text-theme-text-secondary md:flex">
            <a href="#architecture" className="hover:text-white">Architecture</a>
            <a href="#kinetic" className="hover:text-white">Kinetic</a>
            <a href="#milestones" className="hover:text-white">Milestones</a>
            <a href={PUBLIC_REPO_URL} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          </div>
        </div>
      </nav>

      <main id="top" className="relative pt-16">
        <section className="relative min-h-[92vh] overflow-hidden px-5 py-24 md:px-8 md:py-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_28%,rgba(0,245,255,0.16),transparent_34%),radial-gradient(circle_at_22%_80%,rgba(34,197,94,0.12),transparent_28%)]" [...]
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[[...]
          </div>
          <div className="relative z-10 mx-auto grid w-full max-w-7xl min-w-0 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <FadeIn className="min-w-0 max-w-[calc(100vw-40px)] sm:max-w-full">
              <div className="mb-6 inline-flex items-center gap-2 border border-theme-border bg-white/[0.03] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-theme-text-secondary"[...]
                <BadgeCheck className="h-3.5 w-3.5 text-theme-accent" />
                Grant-stage prototype from AnonLabs
              </div>
              <h1 className="max-w-[11ch] break-words text-4xl font-black leading-[1.03] tracking-normal text-white sm:max-w-3xl sm:text-5xl md:text-7xl">
                The terminal is the node.
              </h1>
              <p className="mt-7 max-w-[320px] break-words text-base leading-7 text-theme-text-secondary sm:max-w-2xl sm:text-lg sm:leading-8 md:text-xl">
                A native C++ Solana trading OS that fuses an institutional terminal, Oracle/Cortex intelligence, and a Quantum agentic browser with HexaField packets and SON peer market-state bac[...]
              </p>
              <div className="mt-8 flex max-w-[320px] flex-col gap-3 sm:max-w-none sm:flex-row">
                <a href={DEMO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-theme-accent px-5 py-3 font-semibold text-black transition-colors h[...]
                  Watch live demo <ArrowRight className="h-4 w-4" />
                </a>
                <a href={PUBLIC_REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 border border-theme-border bg-white/[0.03] px-5 py-3 font-semib[...]
                  Public proof repo <Github className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-9 grid max-w-[320px] gap-3 sm:max-w-none sm:grid-cols-2">
                {proofPoints.map((point) => (
                  <div key={point.label} className="border border-theme-border bg-black/20 p-4">
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-theme-text-muted">{point.label}</div>
                    <div className="mt-2 text-sm font-semibold text-theme-text-primary">{point.value}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="hidden min-w-0 max-w-[calc(100vw-40px)] md:block md:max-w-full">
              <LiveTerminal />
            </FadeIn>
          </div>
        </section>

        <TradingChartMockup />

        <Section id="problem">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <FadeIn>
              <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-theme-accent">Problem</div>
              <h2 className="mt-4 text-3xl font-bold tracking-normal text-white md:text-5xl">
                Retail traders are still stitched across slow, separate tools.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  'Trading, research, wallet, AI, and layouts are split across separate apps.',
                  'Web dashboards duplicate the same API and chart hydration work for every user.',
                  'Cloud-only AI adds cost and latency to flows that can be local or hybrid.',
                  'Most terminals consume the network without contributing useful observed state back.',
                ].map((item) => (
                  <div key={item} className="border border-theme-border bg-theme-surface/55 p-5 text-theme-text-secondary">
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </Section>

        <Section id="architecture" className="border-y border-theme-border bg-theme-surface/25">
          <FadeIn className="mx-auto mb-12 max-w-3xl text-center">
            <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-theme-accent">Architecture</div>
            <h2 className="mt-4 text-3xl font-bold tracking-normal text-white md:text-5xl">
              One workstation, six connected layers.
            </h2>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {productLayers.map((layer, index) => {
              const Icon = layer.icon;
              return (
                <FadeIn key={layer.title} delay={index * 0.05}>
                  <div className="h-full border border-theme-border bg-[#090a0d] p-6 transition-colors hover:border-theme-accent/40">
                    <Icon className="mb-6 h-7 w-7 text-theme-accent" />
                    <h3 className="text-lg font-semibold text-white">{layer.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-theme-text-secondary">{layer.copy}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Section>

        <Section id="kinetic">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <FadeIn>
              <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-theme-accent">SON + Kinetic Data</div>
              <h2 className="mt-4 text-3xl font-bold tracking-normal text-white md:text-5xl">
                Active terminals should reduce load, not increase it.
              </h2>
              <p className="mt-5 text-lg leading-8 text-theme-text-secondary">
                SON is designed so nodes share real observed market-state ranges with peers. Kinetic data separates hot live state from cold replayable ranges, allowing new terminals to recover w[...]
              </p>
              <div className="mt-8 grid gap-3">
                {architecture.map((item) => (
                  <div key={item} className="flex items-start gap-3 border border-theme-border bg-white/[0.025] p-4 text-sm text-theme-text-secondary">
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-theme-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <React.Suspense
                fallback={
                  <div className="glass-panel my-10 grid min-h-[560px] w-full place-items-center border-theme-border/30 font-mono text-[11px] uppercase tracking-[0.22em] text-theme-text-muted">
                    Loading SON network surface
                  </div>
                }
              >
                <NetworkGlobe />
              </React.Suspense>
            </FadeIn>
          </div>
        </Section>

        <Section id="proof" className="border-y border-theme-border bg-theme-surface/30">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                icon: Cpu,
                title: 'Native hot path',
                metric: '<=1ms target',
                copy: 'Receive, decode, dedupe, and apply compact state locally inside the native runtime.',
              },
              {
                icon: RadioTower,
                title: 'Peer propagation',
                metric: '<=5ms LAN target',
                copy: 'Compact market-state packets across local peers, with WAN measured separately and honestly.',
              },
              {
                icon: LockKeyhole,
                title: 'Replay safety',
                metric: '0 duplicate accepts',
                copy: 'Message identity, replay windows, and dedupe validation become part of the SON proof run.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={index * 0.08}>
                  <div className="border border-theme-border bg-[#08090c] p-7">
                    <Icon className="h-7 w-7 text-theme-accent" />
                    <div className="mt-6 font-mono text-[12px] uppercase tracking-[0.2em] text-theme-text-muted">{item.title}</div>
                    <div className="mt-2 text-3xl font-black text-white">{item.metric}</div>
                    <p className="mt-4 text-sm leading-6 text-theme-text-secondary">{item.copy}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Section>

        <Section id="milestones">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <FadeIn>
              <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-theme-accent">Roadmap to Aug 31</div>
              <h2 className="mt-4 text-3xl font-bold tracking-normal text-white md:text-5xl">
                From prototype to measured network proof.
              </h2>
              <p className="mt-5 text-lg leading-8 text-theme-text-secondary">
                The next phase is about turning the built prototype into a measured, inspectable public-good release for the Solana ecosystem.
              </p>
            </FadeIn>
            <div className="grid gap-4">
              {milestones.map((milestone, index) => (
                <FadeIn key={milestone} delay={index * 0.05}>
                  <div className="flex gap-4 border border-theme-border bg-white/[0.025] p-4">
                    <div className="grid h-9 w-9 shrink-0 place-items-center border border-theme-accent/40 font-mono text-sm text-theme-accent">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className="pt-1 text-sm leading-6 text-theme-text-secondary">{milestone}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Section>

        <Section className="border-t border-theme-border bg-[#07090d] text-center">
          <FadeIn>
            <Globe2 className="mx-auto mb-6 h-9 w-9 text-theme-accent" />
            <h2 className="mx-auto max-w-4xl text-3xl font-bold tracking-normal text-white md:text-5xl">
              Sovereign is building toward a terminal that trades, researches, remembers, and contributes.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-theme-text-secondary">
              The first proof is not a giant mainnet claim. It is a native workstation, a measured SON state path, Kinetic recovery, and Solana-verifiable identity events.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={PUBLIC_REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-theme-accent px-5 py-3 font-semibold text-black transition-col[...]
                Review proof repo <ArrowRight className="h-4 w-4" />
              </a>
              <a href={EMAIL} className="inline-flex items-center justify-center gap-2 border border-theme-border bg-white/[0.03] px-5 py-3 font-semibold text-white transition-colors hover:bg-whi[...]
                Contact AnonLabs
              </a>
            </div>
          </FadeIn>
        </Section>
      </main>

      <footer className="border-t border-theme-border bg-theme-bg px-5 py-10 text-sm text-theme-text-muted md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold text-theme-text-primary">Sovereign Octahedral Network</div>
            <div className="mt-1">Native C++ terminal, Oracle/Cortex, Quantum browser, HexaField, Kinetic state, SON.</div>
          </div>
          <div className="flex gap-5">
            <a href={PUBLIC_REPO_URL} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
            <a href={DEMO_URL} target="_blank" rel="noreferrer" className="hover:text-white">Demo</a>
            <a href={EMAIL} className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

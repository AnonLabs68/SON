/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, Activity, Cpu, Zap, LineChart, Server, ChevronRight, BarChart3, Database, Layers, Shield, Brain, Network, Terminal } from 'lucide-react';
import React, { ReactNode } from 'react';
import NetworkGlobe from './components/NetworkGlobe';

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const TERMINAL_LOGS = [
  "[13:04:12] [SYS] Sovereign Engine HFT Core booting...",
  "[13:04:12] [SEC] Hardware Enclave ECDSA-P256 keys verified.",
  "[13:04:12] [NET] UDP Hole Punch successful. Port: 27891 bindings active.",
  "[13:04:13] [AI] defai_model.onnx locally mapped to physical RAM.",
  "[13:04:13] [SYS] Matrioshka Brain Swarm ignited: 16 physical cores online.",
  "[13:04:14] [L2] WebSocket streams attached. Lock-free ring buffer initialized.",
  "[13:04:14] [PHYS] Vivaldi Spatial Entropy mapping established to 6 peers.",
  "[13:04:15] [EXEC] Hamiltonian physics collapse algorithm ready. Awaiting signal..."
];

function LiveTerminal() {
  const [logs, setLogs] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < TERMINAL_LOGS.length) {
        setLogs(prev => {
          const nextLog = TERMINAL_LOGS[i];
          if (!nextLog || prev.includes(nextLog)) return prev;
          return [...prev, nextLog];
        });
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-[#020202] flex flex-col font-mono text-[9.5px] p-4 overflow-hidden z-20" style={{ boxShadow: 'inset 0 0 40px rgba(0,245,255,0.02)' }}>
      {logs.map((log, i) => {
         if (!log) return null;
         return (
           <motion.div 
             key={i} 
             initial={{ opacity: 0, x: -5 }} 
             animate={{ opacity: 1, x: 0 }} 
             className={`mb-1.5 ${log.includes('[EXEC]') ? 'text-theme-accent font-bold' : log.includes('[SYS]') ? 'text-[#10b981]' : log.includes('[SEC]') ? 'text-[#f43f5e]' : 'text-theme-text-secondary'}`}
           >
             {log}
           </motion.div>
         );
      })}
      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2.5 h-3.5 bg-theme-accent mt-1"></motion.div>
      
      {/* Background Grid behind terminal */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,245,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-[-1]"></div>
    </div>
  );
}

// Emulates a trading chart visual in the hero
function TradingChartMockup() {
  const [activeTab, setActiveTab] = React.useState('single');

  return (
    <div id="demo-chart" className="relative w-full max-w-5xl mx-auto mt-20 glass-panel overflow-hidden shadow-2xl shadow-theme-accent/20 scroll-mt-24 border border-theme-border/50 rounded-xl">
      <div className="flex items-center justify-between px-4 py-3 bg-theme-surface border-b border-theme-border">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#f43f5e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#eab308]"></div>
          <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
        </div>
        <div className="flex space-x-1 rounded bg-[#050507] p-1 border border-white/5">
          <button 
            onClick={() => setActiveTab('single')}
            className={`px-4 py-1.5 text-[0.65rem] uppercase tracking-widest font-mono rounded transition-colors ${activeTab === 'single' ? 'bg-theme-accent text-black font-bold' : 'text-theme-text-muted hover:text-white'}`}
          >
            Footprint UI
          </button>
          <button 
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-1.5 text-[0.65rem] uppercase tracking-widest font-mono rounded transition-colors ${activeTab === 'grid' ? 'bg-theme-accent text-black font-bold' : 'text-theme-text-muted hover:text-white'}`}
          >
            Multi-Grid Mesh
          </button>
        </div>
        <div className="text-[0.65rem] font-mono text-theme-text-muted uppercase tracking-widest flex items-center space-x-2">
          <Activity className="w-3 h-3 text-[#10b981]" />
          <span className="hidden sm:inline">L1 Direct Feed</span>
        </div>
      </div>
      
      {/* Dynamic Image Display Based on Tab */}
      <div className="relative w-full aspect-video bg-[#0A0D12] overflow-hidden flex items-center justify-center">
         {activeTab === 'single' ? (
            <motion.img 
              key="img-single"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src="/chart-ss-1.png.png" 
              alt="Sovereign Node Footprint Chart"
              className="w-full h-full object-cover object-center"
            />
         ) : (
            <motion.img 
              key="img-grid"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src="/chart-ss-2.png.png" 
              alt="Sovereign Node 4-Grid View"
              className="w-full h-full object-cover object-center"
            />
         )}
         
         <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none hidden md:flex">
           <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[0.65rem] font-mono">
            Actual native C++ ImGui rendering via OpenGL3
           </div>
           {activeTab === 'single' && (
             <div className="bg-[#10b981]/20 backdrop-blur-md px-3 py-1.5 rounded border border-[#10b981]/30 text-[0.65rem] font-mono text-[#10b981]">
              211 FPS / VSYNC LOCKED
             </div>
           )}
           {activeTab === 'grid' && (
             <div className="bg-[#10b981]/20 backdrop-blur-md px-3 py-1.5 rounded border border-[#10b981]/30 text-[0.65rem] font-mono text-[#10b981]">
              137 FPS / 4x CONCURRENCY
             </div>
           )}
         </div>
      </div>
    </div>
  );
}

function Section({ children, id, className = "" }: { children: ReactNode, id?: string, className?: string }) {
  return (
    <section id={id} className={`py-24 md:py-32 px-6 lg:px-8 relative ${className}`}>
      <div className="max-w-6xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
}

export default function App() {
  const [showEmail, setShowEmail] = React.useState(false);

  return (
    <div className="min-h-screen text-theme-text-primary font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-theme-bg/80 backdrop-blur-md border-b border-theme-border">
        <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center font-extrabold text-[1.25rem] tracking-tight">
            <div className="w-[18px] h-[18px] bg-theme-accent rounded-[2px] rotate-45 mr-2"></div>
            SOVEREIGN<span className="text-theme-accent ml-1">OCTAHEDRAL</span>
          </div>
          <div className="flex items-center">
            <div className="text-[0.7rem] font-mono text-theme-text-secondary uppercase tracking-widest border border-theme-border/60 bg-theme-surface/50 px-3 py-1 rounded-full">
              V1 In Progress
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-16">
        {/* HERO SECTION */}
        <Section className="text-center pt-32 pb-40">
          <FadeIn>
            <h1 className="text-[3.5rem] md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.05] mb-6">
              Ultra-Low Latency <br className="hidden md:block" />
              <span className="text-theme-accent">Trading</span> Infrastructure
            </h1>
            <p className="text-[1.1rem] text-theme-text-secondary max-w-2xl mx-auto mb-10 leading-[1.6]">
              The Sovereign Octahedral Network (SON) is a GPU-accelerated, native trading engine delivering real-time analytics—rendering massive order books even on low-end hardware.
            </p>
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                <button onClick={() => setShowEmail(true)} className="w-full sm:w-auto px-7 py-3.5 bg-theme-accent text-[#050507] font-semibold text-[0.95rem] rounded-md hover:bg-[#00d6e0] transition-colors flex items-center justify-center">
                  Get Early Access 
                </button>
                <a href="#demo-chart" className="w-full sm:w-auto px-7 py-3.5 bg-transparent border border-theme-border text-theme-text-primary font-semibold text-[0.95rem] rounded-md hover:bg-white/[0.02] transition-colors flex items-center justify-center">
                  View Demo
                </a>
              </div>
              {showEmail && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[0.75rem] font-mono text-theme-text-secondary tracking-wide border border-theme-border/40 bg-theme-surface/40 px-4 py-2 rounded-full backdrop-blur-sm">
                  Contact for beta access: <a href="mailto:Chndrabhinav@gmail.com" className="text-theme-accent hover:underline">Chndrabhinav@gmail.com</a>
                </motion.div>
              )}
            </div>
            
            <TradingChartMockup />
          </FadeIn>
        </Section>

        {/* PROBLEM SECTION */}
        <Section className="bg-theme-surface/30 border-y border-theme-border">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-theme-text-primary mb-6">
                Modern Trading Platforms Are Inefficient
              </h2>
              <p className="text-theme-text-secondary text-[1.1rem] leading-relaxed mb-8">
                The tools built for split-second decisions are built on heavy web technologies. The result? Stuttering charts, missed executions, and impossible hardware requirements.
              </p>
            </FadeIn>
            <div className="space-y-4 font-mono text-[0.8rem] leading-[1.5]">
              {[
                "Web-based platforms consume excessive memory and CPU",
                "High latency reduces execution clarity",
                "Advanced tools are inaccessible on low-end hardware"
              ].map((point, i) => (
                <React.Fragment key={i}>
                  <FadeIn delay={i * 0.1}>
                    <div className="flex items-start p-4 rounded-lg bg-theme-surface border border-theme-border text-theme-text-secondary">
                      <span className="text-theme-text-muted mr-3 mt-0.5">✗</span>
                      {point}
                    </div>
                  </FadeIn>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Section>

        {/* SOLUTION SECTION */}
        <Section className="text-center">
           <FadeIn>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-theme-accent-dim border border-theme-border text-theme-accent mb-6">
               <Zap className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              A Performance-First Trading Engine
            </h2>
            <p className="text-[1.1rem] text-theme-text-secondary max-w-3xl mx-auto leading-[1.6]">
              We are building a native, GPU-accelerated system using C++ and OpenGL to deliver real-time market visualization, low-latency data processing, and efficient resource usage. We don't compromise on speed.
            </p>
          </FadeIn>
        </Section>

        {/* FEATURES SECTION */}
        <Section id="features">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <FadeIn delay={0.1}>
              <div className="group h-full p-6 glass-panel hover:border-theme-accent/30 transition-colors">
                <LineChart className="w-6 h-6 text-theme-accent mb-6 opacity-80" />
                <h3 className="font-mono text-[0.9rem] text-theme-accent mb-3">01. Real-Time Rendering</h3>
                <p className="space-y-2 text-theme-text-secondary text-[0.8rem] leading-[1.5]">
                  Smooth 120+ FPS high-performance charts with multi-asset workspace support and zero stutter.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="group h-full p-6 glass-panel hover:border-theme-accent/30 transition-colors">
                <Database className="w-6 h-6 text-theme-accent mb-6 opacity-80" />
                <h3 className="font-mono text-[0.9rem] text-theme-accent mb-3">02. Low Latency Data</h3>
                <p className="space-y-2 text-theme-text-secondary text-[0.8rem] leading-[1.5]">
                  Optimized WebSocket pipeline for real-time market ingestion with minimal memory footprint.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="group h-full p-6 glass-panel hover:border-theme-accent/30 transition-colors">
                <BarChart3 className="w-6 h-6 text-theme-accent mb-6 opacity-80" />
                <h3 className="font-mono text-[0.9rem] text-theme-accent mb-3">03. Advanced Visuals</h3>
                <p className="space-y-2 text-theme-text-secondary text-[0.8rem] leading-[1.5]">
                  Order book heatmaps, Cumulative Volume Delta (CVD), and professional Time & Sales analytics.
                </p>
              </div>
            </FadeIn>
             <FadeIn delay={0.4}>
              <div className="group h-full p-6 glass-panel hover:border-theme-accent/30 transition-colors">
                <Cpu className="w-6 h-6 text-theme-accent mb-6 opacity-80" />
                <h3 className="font-mono text-[0.9rem] text-theme-accent mb-3">04. Low-End Support</h3>
                <p className="space-y-2 text-theme-text-secondary text-[0.8rem] leading-[1.5]">
                  Efficient C++ core runs natively on older hardware, maximizing RAM efficiency across devices.
                </p>
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* DISTRIBUTED ARCHITECTURE SECTION */}
        <Section id="architecture" className="bg-theme-surface/10 border-t border-theme-border pb-24">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Deep Backend Protocol
              </h2>
              <p className="text-[1.1rem] text-theme-text-secondary max-w-3xl mx-auto leading-[1.6]">
                The Sovereign Octahedral Network isn't just a charting tool; it's a decentralized, hardware-accelerated powerhouse featuring a proprietary proof-of-physics mesh and real-time cryptography.
              </p>
            </FadeIn>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <FadeIn delay={0.1}>
              <div className="group h-full p-6 glass-panel hover:border-theme-accent/30 transition-colors">
                <Network className="w-6 h-6 text-theme-accent mb-6 opacity-80" />
                <h3 className="font-mono text-[0.9rem] text-theme-accent mb-3">Proof of Physics</h3>
                <p className="space-y-2 text-theme-text-secondary text-[0.8rem] leading-[1.5]">
                  6-Agent Quorum Consensus mesh powered by Vivaldi Spatial Entropy mapping. Zero-waste mining where the inference collapse IS the proof of work.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="group h-full p-6 glass-panel hover:border-theme-accent/30 transition-colors">
                <Shield className="w-6 h-6 text-theme-accent mb-6 opacity-80" />
                <h3 className="font-mono text-[0.9rem] text-theme-accent mb-3">Hardware Enclave</h3>
                <p className="space-y-2 text-theme-text-secondary text-[0.8rem] leading-[1.5]">
                  Military-grade ECDSA-P256 keys embedded at the metal layer with real-time SHA-256 cryptographic Proof of Solvency verification.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="group h-full p-6 glass-panel hover:border-theme-accent/30 transition-colors">
                <Brain className="w-6 h-6 text-theme-accent mb-6 opacity-80" />
                <h3 className="font-mono text-[0.9rem] text-theme-accent mb-3">On-Device ONNX</h3>
                <p className="space-y-2 text-theme-text-secondary text-[0.8rem] leading-[1.5]">
                  Hot-swappable neural plasticity via local ONNX C++ Runtime logic. Eliminates external reliance for microsecond execution AI inference.
                </p>
              </div>
            </FadeIn>
             <FadeIn delay={0.4}>
              <div className="group h-full p-6 glass-panel hover:border-theme-accent/30 transition-colors">
                <Terminal className="w-6 h-6 text-theme-accent mb-6 opacity-80" />
                <h3 className="font-mono text-[0.9rem] text-theme-accent mb-3">Integrated Bot IDE</h3>
                <p className="space-y-2 text-theme-text-secondary text-[0.8rem] leading-[1.5]">
                  Fully embedded VS Code-style terminal right on the chart. Compile, hot-load, and execute Python algorithms directly inside the C++ core.
                </p>
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* SOVEREIGN MESH NETWORK SECTION */}
        <Section id="mesh-network" className="bg-[#0a0f16] border-t border-theme-border py-16 hidden md:block">
          <div className="max-w-6xl mx-auto flex flex-col h-full w-full">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-4 text-center">
                Real-Time Mesh Visualization
              </h2>
              <p className="text-center text-theme-text-secondary max-w-2xl mx-auto mb-8 leading-[1.6]">
                Live visualization of the Global Spatial Entropy mapping. The Octahedral validation loop processes inputs synchronously across multiple geographic zones.
              </p>
            </FadeIn>
            <div className="h-[600px] w-full">
              <NetworkGlobe />
            </div>
          </div>
        </Section>

        {/* TECHNOLOGY & CLOUD SPLIT SECTION */}
        <Section id="tech" className="bg-theme-surface/30 border-y border-theme-border">
          <div className="grid lg:grid-cols-2 gap-16">
            <FadeIn>
               <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                  <Layers className="w-6 h-6 mr-3 text-theme-accent" /> Build With High-Performance Tech
               </h2>
               <div className="grid grid-cols-2 gap-4 font-mono text-[0.8rem] text-theme-text-primary">
                  {["C++ Core Engine", "OpenGL Rendering", "ImGui Interface", "WebSocket Streaming", "ONNX Runtime for ML"].map((tech, i) => (
                    <div key={i} className="bg-theme-surface border border-theme-border p-4 rounded-md">
                       <span className="text-theme-text-muted pr-2">{'>'}</span> {tech}
                    </div>
                  ))}
               </div>
            </FadeIn>

            <FadeIn delay={0.2}>
               <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                  <Server className="w-6 h-6 mr-3 text-[#10b981]" /> Native Google Cloud Infrastructure
               </h2>
               <p className="text-theme-text-secondary text-[1.1rem] leading-[1.6] mb-6">Our C++ nodes are deeply integrated into Google Cloud Platform (GCP) natively to utilize enterprise-grade big data pipelines and inference accelerators off-client:</p>
               <ul className="space-y-4 font-mono text-[0.85rem]">
                  {[
                    "Google Kubernetes Engine (GKE) for C++ Swarms",
                    "GCP Vertex AI for distributed ONNX model training",
                    "Cloud Spanner for zero-downtime global tick ledger",
                    "Ultra-low latency VPC peering to exchanges"
                  ].map((item, i) => (
                     <li key={i} className="flex items-center p-3 border-l-2 text-theme-text-secondary border-[#10b981]/50 bg-theme-surface">
                        <span className="text-[#10b981] mr-3">●</span> {item}
                     </li>
                  ))}
               </ul>
            </FadeIn>
          </div>
        </Section>

        {/* TECH STRIP */}
        <div className="h-14 border-t border-theme-border bg-theme-bg hidden md:flex items-center overflow-hidden whitespace-nowrap">
           <div className="max-w-7xl mx-auto w-full flex justify-between items-center space-x-10 px-6">
              {[
                { label: "Core", val: "C++ / OpenGL / ImGui" },
                { label: "Consensus", val: "Kinetic Proof-of-Physics" },
                { label: "Streaming", val: "Vivaldi Mesh Networking" },
                { label: "Intelligence", val: "ONNX Local Tensor Execution" },
                { label: "Cloud", val: "GCP / Kubernetes / Vertex AI" }
              ].map((item, i) => (
                <div key={i} className="font-mono text-[0.7rem] uppercase tracking-widest text-theme-text-muted">
                   {item.label}: <span className="text-theme-text-secondary">{item.val}</span>
                </div>
              ))}
           </div>
        </div>

        {/* VISION SECTION */}
        <Section id="vision" className="text-center py-40">
           <FadeIn>
              <h2 className="font-mono text-theme-text-muted mb-8 text-[0.75rem] tracking-[0.2em] hidden md:block">///////////////// MISSION STATEMENT /////////////////</h2>
              <div className="text-[2.5rem] md:text-5xl font-bold tracking-tight text-theme-text-primary mb-8 max-w-4xl mx-auto leading-[1.1]">
                "Redefining Trading Performance"
              </div>
              <p className="text-[1.1rem] md:text-xl text-theme-text-secondary max-w-3xl mx-auto leading-[1.6]">
                Our goal is to build the most efficient and accessible trading infrastructure, enabling professional-grade tools to run seamlessly across <span className="text-theme-text-primary font-medium border-b border-theme-border pb-0.5">all hardware tiers</span>.
              </p>
           </FadeIn>
        </Section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-theme-border bg-theme-bg py-10 px-10 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center text-[0.75rem] font-sans text-theme-text-muted relative z-10">
           <div className="mb-6 md:mb-0 flex flex-col">
             <span className="text-theme-text-primary font-semibold tracking-wider mb-1">© 2026 Sovereign Octahedral Network (SON)</span>
             <span>Private Beta. Prototype Engine V1.</span>
             <span className="text-theme-accent/60 font-mono mt-3 opacity-80 text-[0.65rem] tracking-widest uppercase">
               {"// Architected in stealth by a solo 17-year-old engineer."}
             </span>
           </div>
           <div className="flex flex-col items-start md:items-end">
             <div className="flex items-center text-[#10b981] mb-4 font-medium bg-[#10b981]/10 px-3 py-1.5 rounded-full border border-[#10b981]/20">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] mr-2 animate-pulse"></div>
                System Status: Optimal (1.2μs Average)
             </div>
             <div className="flex space-x-6 uppercase font-medium tracking-wide mt-2">
               <a href="mailto:Chndrabhinav@gmail.com" className="hover:text-theme-text-secondary transition-colors">Contact</a>
               <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-theme-text-secondary transition-colors">Back to Top</a>
               <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-theme-text-secondary transition-colors">GitHub</a>
             </div>
           </div>
         </div>
         {/* Subtle background glow for the footer */}
         <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-theme-accent to-transparent opacity-20"></div>
      </footer>
    </div>
  );
}


"use client";

import React, { useState } from "react";
import { Copy, Terminal, Monitor, Code2 } from "lucide-react";
import { COMPONENTS } from "@/lib/registry";
import { cn } from "@/lib/utils";
import * as Tabs from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeComponentId, setActiveComponentId] = useState(COMPONENTS[0].id);
  const activeComponent = COMPONENTS.find((c) => c.id === activeComponentId) || COMPONENTS[0];
  const [activeTab, setActiveTab] = useState("preview");
  const [codeType, setCodeType] = useState<"tsx" | "jsx">("tsx");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const codeToCopy = codeType === "tsx" ? activeComponent.code : (activeComponent.codeJsx || activeComponent.code);
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-900 bg-background flex flex-col h-full">
        <div className="p-6 border-b border-neutral-900/50">
          <h1 className="font-mono font-bold text-xl tracking-tighter flex items-center gap-2">
            <Terminal className="w-5 h-5 text-neutral-400" />
            ASCII.REPO
          </h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {COMPONENTS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveComponentId(item.id)}
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-md font-mono text-sm transition-all duration-200",
                    activeComponentId === item.id
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/50"
                  )}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-neutral-900/50 text-xs text-neutral-600 font-mono">
          © 2026 ASCII.REPO
        </div>
      </aside>

      {/* Main Stage */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#050505] relative">
        {/* Modern Noir Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        </div>

        {/* Header */}
        <header className="h-16 border-b border-neutral-900 px-8 flex items-center justify-between z-10 bg-background/50 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white tracking-tight">{activeComponent.name}</h2>
              <span className="px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 font-mono">
                {activeComponent.version}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1 font-mono">{activeComponent.description}</p>
          </div>
          {/* Simple controls could go here */}
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-hidden z-10 flex flex-col">
          <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <Tabs.List className="flex gap-1 bg-neutral-900/50 p-1 rounded-lg border border-neutral-800">
                <Tabs.Trigger
                  value="preview"
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                    "data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500"
                  )}>
                  <Monitor className="w-3.5 h-3.5" /> Preview
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="code"
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                    "data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500"
                  )}>
                  <Code2 className="w-3.5 h-3.5" /> Code
                </Tabs.Trigger>
              </Tabs.List>

              {activeTab === "code" && (
                <div className="flex items-center gap-3">
                  <div className="flex bg-neutral-900/50 p-0.5 rounded-md border border-neutral-800">
                    <button
                      onClick={() => setCodeType("tsx")}
                      className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-mono transition-colors",
                        codeType === "tsx" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-white"
                      )}
                    >
                      TSX
                    </button>
                    <button
                      onClick={() => setCodeType("jsx")}
                      className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-mono transition-colors",
                        codeType === "jsx" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-white"
                      )}
                    >
                      JSX
                    </button>
                  </div>
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "flex items-center gap-2 text-xs transition-all duration-300 px-2 py-1 rounded-md",
                      copied
                        ? "bg-white text-black font-medium scale-105"
                        : "text-neutral-500 hover:text-white"
                    )}
                  >
                    {copied ? (
                      "Copied!"
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 relative overflow-hidden bg-neutral-900/20 border border-neutral-900 rounded-xl">
              <AnimatePresence mode="wait">
                {activeTab === "preview" ? (
                  <Tabs.Content key="preview" value="preview" className="h-full w-full outline-none" forceMount>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="h-full w-full relative flex flex-col"
                    >
                      {/* Viewport Container with subtle gradient */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.1)_0%,transparent_70%)]" />

                      {/* The rendering stage */}
                      <div className="flex-1 flex items-center justify-center relative">
                        <div className="text-neutral-700 font-mono text-sm opacity-20 select-none absolute">
                            // Component Rendering Stage
                        </div>
                      </div>

                      {/* Component Placement - Bottom Fixed as per request */}
                      <div className="z-20 w-full mt-auto mb-8">
                        <activeComponent.component />
                      </div>
                    </motion.div>
                  </Tabs.Content>
                ) : (
                  <Tabs.Content key="code" value="code" className="h-full w-full outline-none overflow-hidden" forceMount>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="h-full w-full text-sm font-mono overflow-auto p-4 bg-[#0a0a0a]"
                    >
                      <pre className="text-neutral-300">
                        <code>{codeType === "tsx" ? activeComponent.code : (activeComponent.codeJsx || activeComponent.code)}</code>
                      </pre>
                    </motion.div>
                  </Tabs.Content>
                )}
              </AnimatePresence>
            </div>
          </Tabs.Root>
        </div>
      </main>
    </>
  );
}

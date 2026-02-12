import React, { useState, useEffect, useRef } from "react";

/**
 * CyberCity Component: The "High-Rise Noir" Edition
 * Improvements:
 * - Sky-Bridges: Cables and bridges connecting skyscrapers.
 * - Floating Holograms: Flickering abstract symbols between structures.
 * - Toxic Rain: Slanted ASCII precipitation with splash effects.
 * - Foreground Cables: Dangling wires at the top of the frame.
 * - Enhanced HUD: Live weather and district metadata.
 */

const GRID_W = 120;
const GRID_H = 40;

const CyberCity = () => {
    const [display, setDisplay] = useState("");
    const [status, setStatus] = useState({ weather: "ACID_STORM", temp: "42°C", threat: "LOW" });
    const frameRef = useRef(0);

    // Advanced Building Registry
    const buildings = useRef([
        { h: 32, w: 16, x: 5, speed: 0.04, style: 'billboard', label: "CYBER-Dyne" },
        { h: 38, w: 10, x: 30, speed: 0.04, style: 'antenna' },
        { h: 28, w: 18, x: 55, speed: 0.04, style: 'bridge_anchor' },
        { h: 35, w: 12, x: 85, speed: 0.04, style: 'windows' },
        { h: 22, w: 20, x: 105, speed: 0.04, style: 'solid' },
        // Back Layer (Parallax)
        { h: 15, w: 25, x: 15, speed: 0.02, style: 'bg' },
        { h: 20, w: 20, x: 75, speed: 0.02, style: 'bg' },
    ]);

    const renderFrame = () => {
        frameRef.current++;
        const f = frameRef.current;
        let grid = new Array(GRID_H).fill(0).map(() => new Array(GRID_W).fill(" "));

        // 1. LAYER: TOXIC RAIN (Slanted ASCII)
        for (let i = 0; i < 40; i++) {
            const rx = (i * 17 + f * 2) % GRID_W;
            const ry = (i * 7 + f * 3) % GRID_H;
            grid[ry][rx] = "\\";
            if (ry < GRID_H - 1 && Math.random() > 0.8) grid[ry + 1][rx] = "."; // Splash
        }

        // 2. LAYER: SKY-BRIDGES & CABLES (Inter-building logic)
        const bridgeY = 15;
        for (let x = 0; x < GRID_W; x++) {
            // High-tension cables on specific row
            if (Math.sin(x * 0.1 + f * 0.01) > 0.8) grid[5][x] = "~";
            // Sky-bridge between main towers on specific row
            if (x > 20 && x < 80 && (x + f) % 5 === 0) grid[bridgeY][x] = "=";
        }

        // 3. LAYER: BUILDINGS
        buildings.current.forEach((b) => {
            const scrollX = Math.floor(b.x + (f * b.speed)) % GRID_W;

            for (let by = 0; by < b.h; by++) {
                const y = GRID_H - 1 - by;
                if (y < 0) continue;

                for (let bx = 0; bx < b.w; bx++) {
                    const x = (scrollX + bx) % GRID_W;
                    const isLeft = bx === 0;
                    const isRight = bx === b.w - 1;
                    const isTop = by === b.h - 1;

                    if (b.style === 'bg') {
                        if (isTop) grid[y][x] = "━";
                        else if (isLeft || isRight) grid[y][x] = "┆";
                        else if ((x + y + f) % 60 === 0) grid[y][x] = "·";
                    } else {
                        // Main Layer
                        if (isTop && isLeft) grid[y][x] = "┏";
                        else if (isTop && isRight) grid[y][x] = "┓";
                        else if (isTop) grid[y][x] = "━";
                        else if (isLeft || isRight) grid[y][x] = "┃";
                        else {
                            // Building Interiors/Facades
                            if (b.style === 'billboard' && by > 12 && by < 22 && bx > 1 && bx < b.w - 2) {
                                const label = b.label || "NEO_CITY";
                                grid[y][x] = label[(bx + f) % label.length];
                            } else if (b.style === 'windows') {
                                const win = (bx > 1 && bx < b.w - 2) && (by % 4 === 0);
                                if (win) grid[y][x] = Math.sin(f * 0.1 + x * 0.5) > 0 ? "▒" : " ";
                            } else if (b.style === 'antenna' && bx === Math.floor(b.w / 2) && isTop) {
                                grid[y - 1][x] = (f % 10 > 5) ? "!" : "."; // Warning Light
                                grid[y - 2][x] = "|";
                            }
                        }
                    }
                }
            }
        });

        // 4. LAYER: FLOATING HOLOGRAMS
        const holoX = Math.floor(GRID_W / 2 + Math.sin(f * 0.05) * 20);
        const holoY = 10;
        const symbols = ["Ω", "Ψ", "Ξ", "Δ", "0", "1"];
        if (f % 4 === 0) {
            for (let i = 0; i < 3; i++) {
                const hx = (holoX + i) % GRID_W;
                grid[holoY][hx] = symbols[(f + i) % symbols.length];
            }
        }

        // 5. LAYER: SIGNAL GLITCH (Displacement)
        if (f % 100 > 95) {
            grid.forEach(row => row.reverse());
        }

        setDisplay(grid.map(row => row.join("")).join("\n"));

        // Update metadata occasionally
        if (f % 200 === 0) {
            setStatus({
                weather: Math.random() > 0.5 ? "ACID_STORM" : "NEON_FOG",
                temp: `${Math.floor(Math.random() * 10 + 35)}°C`,
                threat: Math.random() > 0.8 ? "HIGH" : "LOW"
            });
        }
    };

    useEffect(() => {
        const timer = setInterval(renderFrame, 40);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[600px] bg-[#000000] rounded-3xl overflow-hidden border border-emerald-500/30 font-mono select-none flex items-center justify-center">

            {/* Dynamic Grid Background */}
            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Main ASCII Content */}
            <pre className="text-emerald-400 text-[8px] sm:text-[10px] leading-none tracking-tighter filter drop-shadow-[0_0_3px_rgba(16,185,129,0.4)]">
                {display}
            </pre>

            {/* TACTICAL HUD */}
            <div className="absolute top-8 left-8 space-y-4">
                <div className="bg-black/80 border border-emerald-500/40 p-3 rounded-sm backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-emerald-500 animate-ping rounded-full" />
                        <span className="text-[10px] font-bold text-emerald-300 tracking-widest">LIVE_UPLINK</span>
                    </div>
                    <div className="text-[9px] text-emerald-500/80 space-y-1">
                        <p>DISTRICT: 09_SLUMS</p>
                        <p>METEO: {status.weather}</p>
                        <p>TEMP: {status.temp}</p>
                    </div>
                </div>

                <div className="bg-emerald-950/20 border-l-2 border-emerald-500/50 p-2 text-[8px] text-emerald-500/60 uppercase">
                    Signal_Strength: ||||||||.. 82%<br />
                    Threat_Level: <span className={status.threat === 'HIGH' ? 'text-red-500 animate-pulse' : ''}>{status.threat}</span>
                </div>
            </div>

            <div className="absolute top-8 right-8 text-right space-y-2">
                <div className="bg-black/60 p-2 border border-white/5 rounded">
                    <span className="text-emerald-500/40 text-[9px] block">KERNEL_LOGS</span>
                    <div className="h-12 w-32 overflow-hidden text-[8px] text-emerald-500/20 text-left mt-1">
                        {`> INIT_SEC\n> BRIDGING...\n> ${Math.random().toString(16).slice(2, 10)}\n> SYNC_OK`}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 right-8">
                <div className="flex items-end gap-2">
                    <div className="flex flex-col gap-1 items-end">
                        <span className="text-[8px] text-emerald-500/30 uppercase tracking-widest font-bold">Grid_Load</span>
                        <div className="flex gap-0.5">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className={`w-1 h-3 ${i < 9 ? 'bg-emerald-500/50' : 'bg-emerald-500/10'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Screen Overlays */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Rapid Glitch Line */}
                <div className="w-full h-[1px] bg-white/10 absolute top-[30%] shadow-[0_0_10px_white] opacity-20 animate-glitch-line" />

                {/* Scanlines */}
                <div className="w-full h-full bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px]" />

                {/* Color Aberration Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.9)_110%)] shadow-[inset_0_0_100px_rgba(16,185,129,0.1)]" />
            </div>

            <style>
                {`
          @keyframes glitch-line {
            0% { top: -10%; opacity: 0; }
            10% { opacity: 0.5; }
            20% { top: 110%; opacity: 0; }
            100% { top: 110%; opacity: 0; }
          }
          .animate-glitch-line {
            animation: glitch-line 8s ease-in-out infinite;
          }
        `}
            </style>
        </div>
    );
};

export default CyberCity;
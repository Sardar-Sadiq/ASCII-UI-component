import React, { useState, useEffect, useRef, useMemo } from "react";

/**
 * CyberCore: Professional Layered ASCII System
 * * PHASES:
 * 1. BOOT (0-3s): Fragmented noise and data corruption
 * 2. SILHOUETTE (3-8s): Masked figures / Thunder S swarm
 * 3. STABILIZE (8s+): Inward rotating hypnotic spiral
 */

const GRID_W = 80;
const GRID_H = 30;

const CyberCore = () => {
    const [frame, setFrame] = useState(0);
    const [glitchTrigger, setGlitchTrigger] = useState(false);

    // Buffers for different layers
    const [layers, setLayers] = useState({
        core: "",
        rings: "",
        data: "",
        hud: { top: "", bottom: "" }
    });

    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        let startTime = Date.now();

        const loop = () => {
            const elapsed = Date.now() - startTime;
            const f = Math.floor(elapsed / 50);
            setFrame(f);
            setGlitchTrigger(Math.random() > 0.98); // Occasional glitch

            renderAll(f);
            timerRef.current = requestAnimationFrame(loop);
        };

        timerRef.current = requestAnimationFrame(loop);
        return () => {
            if (timerRef.current) cancelAnimationFrame(timerRef.current);
        };
    }, []);

    const renderAll = (f: number) => {
        // 1. REACTOR CORE (Pulsing Center)
        let coreStr = "";
        const coreSize = 12;
        const centerX = 40;
        const centerY = 15;
        const coreChars = "█▓▒░ ";

        for (let y = 0; y < 30; y++) {
            for (let x = 0; x < 80; x++) {
                const dx = (x - centerX) * 0.5;
                const dy = y - centerY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Pulsing effect
                const pulse = Math.sin(f * 0.1) * 2;

                if (dist < coreSize + pulse) {
                    const noise = Math.random() > 0.5 ? 1 : 0;
                    if (dist < 4) coreStr += "█"; // Hot center
                    else if (dist < 8) coreStr += coreChars[1 + noise];
                    else coreStr += coreChars[3 + noise];
                } else {
                    coreStr += " ";
                }
            }
            coreStr += "\n";
        }

        // 2. ROTATING RINGS
        let ringsStr = "";
        const ringChars = "-\\|/";

        for (let y = 0; y < 30; y++) {
            for (let x = 0; x < 80; x++) {
                const dx = (x - centerX) * 0.55;
                const dy = y - centerY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);

                // Ring 1 (Clockwise)
                if (dist > 14 && dist < 15) {
                    const idx = Math.floor(((angle + f * 0.05) / (Math.PI * 2) * 4) + 4) % 4;
                    ringsStr += ringChars[idx];
                }
                // Ring 2 (Counter-Clockwise)
                else if (dist > 18 && dist < 19) {
                    const idx = Math.floor(((angle - f * 0.03) / (Math.PI * 2) * 4) + 4) % 4;
                    ringsStr += ringChars[idx];
                } else {
                    ringsStr += " ";
                }
            }
            ringsStr += "\n";
        }

        // 3. DATA STREAMS (Left/Right pillars)
        let dataStr = "";
        const hex = "0123456789ABCDEF";
        for (let y = 0; y < 30; y++) {
            let row = "";
            for (let x = 0; x < 80; x++) {
                if (x < 10 || x > 70) {
                    // Rain effect
                    if ((y + f + (x % 2) * 5) % 15 < 8) {
                        row += hex[Math.floor(Math.random() * hex.length)];
                    } else {
                        row += " ";
                    }
                } else {
                    row += " ";
                }
            }
            dataStr += row + "\n";
        }

        // 4. HUD ELEMENTS
        const voltage = (2400 + Math.sin(f * 0.1) * 100).toFixed(0);
        const temp = (450 + Math.cos(f * 0.05) * 50).toFixed(0);

        const topHud = `╔═ REACTOR STATUS ════════════╗\n║ CORE_VOLT: ${voltage}kV  TEMP: ${temp}K ║\n╚═════════════════════════════╝`;

        setLayers({
            core: coreStr,
            rings: ringsStr,
            data: dataStr,
            hud: { top: topHud, bottom: "SYSTEM STABLE" }
        });
    };

    return (
        <div className={`relative w-full h-[600px] bg-black overflow-hidden font-mono select-none transition-all duration-100 ${glitchTrigger ? 'translate-x-[2px]' : ''}`}>

            {/* BACKGROUND GRID */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* LAYER 1: DATA STREAMS (Dark Green) */}
            <pre className="absolute inset-0 text-emerald-900/50 text-[12px] leading-[1] pointer-events-none whitespace-pre font-bold">
                {layers.data}
            </pre>

            {/* LAYER 2: RINGS (Cyan) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <pre className="text-cyan-500/80 text-[12px] leading-[1] whitespace-pre font-bold filter drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">
                    {layers.rings}
                </pre>
            </div>

            {/* LAYER 3: CORE (Bright White/Blue) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <pre className="text-white text-[12px] leading-[1] whitespace-pre font-bold filter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] mix-blend-screen">
                    {layers.core}
                </pre>
            </div>

            {/* HUD OVERLAY */}
            <div className="absolute top-4 left-4 p-2 bg-black/80 border border-emerald-500/50 rounded pointer-events-none backdrop-blur-sm">
                <pre className="text-emerald-400 text-xs font-bold leading-tight">
                    {layers.hud.top}
                </pre>
            </div>

            {/* VIGNETTE */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-50 pointer-events-none" />
        </div>
    );
};

export default CyberCore;
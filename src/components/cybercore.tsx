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
    const [phase, setPhase] = useState("BOOT"); // BOOT, SILHOUETTE, SPIRAL
    const [frame, setFrame] = useState(0);
    const [glitchTrigger, setGlitchTrigger] = useState(false);

    // Buffers for different layers
    const [layers, setLayers] = useState({
        noise: "",
        swarm: "",
        spiral: "",
        diagnostics: ""
    });

    const timerRef = useRef(null);

    // Define the "Thunder S / Bolt" Mask Coordinates
    // This is a simplified mathematical representation of your bolt logo
    const isInsideBolt = (x, y) => {
        const nx = x / GRID_W;
        const ny = y / GRID_H;

        // Top part of bolt
        const top = ny > 0.1 && ny < 0.5 && nx > 0.4 && nx < 0.6 && (nx - 0.4) < (ny - 0.1) * 0.8;
        // Bottom part of bolt
        const bottom = ny > 0.4 && ny < 0.9 && nx > 0.35 && nx < 0.55 && (nx - 0.35) > (ny - 0.9) * -0.5;
        // Middle connector
        const mid = ny >= 0.4 && ny <= 0.5 && nx > 0.3 && nx < 0.7;

        return top || bottom || mid;
    };

    useEffect(() => {
        let startTime = Date.now();

        const loop = () => {
            const elapsed = Date.now() - startTime;
            const f = Math.floor(elapsed / 50);
            setFrame(f);

            // Phase Control
            if (elapsed < 3000) setPhase("BOOT");
            else if (elapsed < 9000) setPhase("SILHOUETTE");
            else setPhase("SPIRAL");

            // Glitch Chance
            setGlitchTrigger(Math.random() > 0.97);

            renderAll(f, elapsed);
            timerRef.current = requestAnimationFrame(loop);
        };

        timerRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(timerRef.current);
    }, []);

    const renderAll = (f, elapsed) => {
        const currentPhase = elapsed < 3000 ? "BOOT" : elapsed < 9000 ? "SILHOUETTE" : "SPIRAL";

        // 1. Layer: Noise (Boot phase & Background)
        let noiseStr = "";
        if (currentPhase === "BOOT" || Math.random() > 0.95) {
            const noiseChars = "#%@&|/\\_";
            for (let y = 0; y < 10; y++) {
                for (let x = 0; x < GRID_W; x++) {
                    noiseStr += Math.random() > 0.8 ? noiseChars[Math.floor(Math.random() * noiseChars.length)] : " ";
                }
                noiseStr += "\n";
            }
        }

        // 2. Layer: Swarm (Silhouette phase)
        let swarmStr = "";
        if (currentPhase === "SILHOUETTE") {
            const swarmChars = ["f", "r", "a", "m", "e"];
            for (let y = 0; y < GRID_H; y++) {
                for (let x = 0; x < GRID_W; x++) {
                    if (isInsideBolt(x, y)) {
                        // "Thunder S" Swarm movement
                        const motion = Math.sin(x * 0.2 + f * 0.5) * Math.cos(y * 0.2 + f * 0.3);
                        if (motion > 0) {
                            swarmStr += swarmChars[(x + y + f) % swarmChars.length];
                        } else {
                            swarmStr += " ";
                        }
                    } else {
                        swarmStr += " ";
                    }
                }
                swarmStr += "\n";
            }
        }

        // 3. Layer: Spiral (Final phase)
        let spiralStr = "";
        if (currentPhase === "SPIRAL") {
            const sChars = "@#*o. ";
            const rot = f * 0.15;
            for (let y = 0; y < 24; y++) {
                for (let x = 0; x < 60; x++) {
                    const dx = (x - 30) * 0.6;
                    const dy = y - 12;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx) + dist * 0.5 - rot;
                    if (dist < 12) {
                        const idx = Math.floor(((Math.sin(angle * 3) + 1) / 2) * sChars.length);
                        spiralStr += sChars[idx];
                    } else {
                        spiralStr += " ";
                    }
                }
                spiralStr += "\n";
            }
        }

        // 4. Layer: Diagnostics
        const cpu = `SYS_STATUS: ${currentPhase}\nCPU_CYCLE: ${(f % 999).toString().padStart(3, '0')}\nMEM_VOID: ${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
        const logs = `> SIG_INTRCPT\n> ${currentPhase === "BOOT" ? "CORRUPT_DATA" : "LINK_ESTABLISHED"}\n> CRYPT_KEY_0x${f.toString(16)}`;

        setLayers({
            noise: noiseStr,
            swarm: swarmStr,
            spiral: spiralStr,
            diagnostics: { cpu, logs }
        });
    };

    return (
        <div className={`relative w-full h-[600px] bg-black overflow-hidden font-mono select-none transition-all duration-500 ${glitchTrigger ? 'invert' : ''}`}>

            {/* LAYER 1: GRID BACKGROUND */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:30px_30px]" />

            {/* LAYER 2: BOOT NOISE (Top Section) */}
            <pre className="absolute top-0 left-0 w-full text-emerald-500/40 text-[10px] leading-none p-4 mix-blend-screen">
                {layers.noise}
            </pre>

            {/* LAYER 3: THUNDER S SWARM (Centered) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <pre className="text-white text-[10px] md:text-[12px] leading-none drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                    {layers.swarm}
                </pre>
            </div>

            {/* LAYER 5: HYPNOTIC SPIRAL (Centered) */}
            <div className="absolute inset-0 flex items-center justify-center">
                <pre className="text-emerald-400 text-[14px] leading-none drop-shadow-[0_0_10px_rgba(52,211,153,0.6)] animate-pulse">
                    {layers.spiral}
                </pre>
            </div>

            {/* LAYER 4: SYSTEM PANELS */}
            <div className="absolute top-10 right-10 border-l-2 border-emerald-500/30 pl-4 bg-black/40 backdrop-blur-sm p-2">
                <pre className="text-emerald-500/80 text-[11px] leading-tight font-bold">
                    {layers.diagnostics.cpu}
                </pre>
            </div>
            <div className="absolute bottom-10 left-10 border-r-2 border-emerald-500/30 pr-4 text-right bg-black/40 backdrop-blur-sm p-2">
                <pre className="text-emerald-500/80 text-[11px] leading-tight font-bold">
                    {layers.diagnostics.logs}
                </pre>
            </div>

            {/* LAYER 6: GLITCH & SCANLINES */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Moving scanline */}
                <div className="w-full h-[2px] bg-emerald-500/10 absolute animate-scanline"
                    style={{ animation: 'scanline 4s linear infinite' }} />

                {/* Static Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px]" />

                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_100%)] opacity-80" />
            </div>

            <style>
                {`
          @keyframes scanline {
            0% { top: -10%; }
            100% { top: 110%; }
          }
          pre {
            text-shadow: 0 0 2px rgba(52, 211, 153, 0.2);
          }
        `}
            </style>
        </div>
    );
};

export default CyberCore;
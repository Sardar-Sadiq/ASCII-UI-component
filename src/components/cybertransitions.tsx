import React, { useState, useEffect, useRef } from "react";

/**
 * CyberTransition Component: Pure Glitch-Slice Logic
 * Architecture:
 * - 6-Row Horizontal Split: Screen is sliced into 6 distinct segments.
 * - Snap-Back Mechanism: Random 100ms horizontal displacements.
 * - Minimal Background: Clean data-grid background to focus on the slice distortion.
 */

const GRID_W = 100;
const GRID_H = 30;

const CyberTransition = () => {
    const [display, setDisplay] = useState("");
    const [isGlitching, setIsGlitching] = useState(false);
    const frameRef = useRef(0);
    const offsetsRef = useRef(new Array(6).fill(0));

    const generateBaseBuffer = (f: number) => {
        let buffer = new Array(GRID_H).fill(0).map(() => new Array(GRID_W).fill(" "));
        const dataChars = "01:. ";

        for (let y = 0; y < GRID_H; y++) {
            for (let x = 0; x < GRID_W; x++) {
                const noise = Math.sin(x * 0.15 + y * 0.1 + f * 0.08);
                if (noise > 0.85) {
                    buffer[y][x] = dataChars[Math.floor(Math.random() * dataChars.length)];
                }
            }
        }
        return buffer;
    };

    const renderFrame = () => {
        frameRef.current++;
        const f = frameRef.current;

        let glitchActive = false;
        if (Math.random() > 0.982) {
            glitchActive = true;
            offsetsRef.current = offsetsRef.current.map(() =>
                Math.floor((Math.random() - 0.5) * 45)
            );

            setTimeout(() => {
                offsetsRef.current = offsetsRef.current.fill(0);
                setIsGlitching(false);
            }, 100);
        }

        if (glitchActive) setIsGlitching(true);

        const buffer = generateBaseBuffer(f);
        const sliceHeight = Math.floor(GRID_H / 6);
        const glitchChars = ["@", "#", "|", "!", "X", " "];
        let output = "";

        for (let y = 0; y < GRID_H; y++) {
            const sliceIdx = Math.floor(y / sliceHeight);
            const xOffset = offsetsRef.current[sliceIdx] || 0;

            let row = "";
            for (let x = 0; x < GRID_W; x++) {
                const targetX = (x + xOffset + GRID_W) % GRID_W;

                if (isGlitching && Math.random() > 0.90 && xOffset !== 0) {
                    row += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    row += buffer[y][targetX];
                }
            }
            output += row + "\n";
        }

        setDisplay(output);
    };

    useEffect(() => {
        const timer = setInterval(renderFrame, 50);
        return () => clearInterval(timer);
    }, [isGlitching]);

    return (
        <div className={`relative w-full h-[500px] flex items-center justify-center bg-[#000000] rounded-2xl overflow-hidden border border-emerald-500/20 font-mono select-none transition-all duration-75 ${isGlitching ? 'brightness-150' : ''}`}>
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:40px_40px]" />

            <pre className="text-emerald-500 text-[10px] sm:text-[12px] leading-none tracking-tighter filter drop-shadow-[0_0_2px_rgba(16,185,129,0.4)]">
                {display}
            </pre>

            <div className="absolute bottom-6 left-6 border-l-2 border-emerald-500/30 pl-3">
                <span className="text-[9px] text-emerald-500/40 uppercase tracking-widest block">System_Sync</span>
                <span className={`text-[10px] font-bold ${isGlitching ? 'text-red-500' : 'text-emerald-400'}`}>
                    {isGlitching ? "!!_INTERRUPT_!!" : "STREAM_STABLE"}
                </span>
            </div>

            <div className="absolute top-6 right-6 flex gap-1">
                {offsetsRef.current.map((offset, i) => (
                    <div
                        key={i}
                        className={`w-1 h-4 transition-all duration-75 ${offset !== 0 ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-emerald-500/10'}`}
                    />
                ))}
            </div>

            <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] opacity-80" />
            </div>
        </div>
    );
};

export default CyberTransition;
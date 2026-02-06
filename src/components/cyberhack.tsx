import React, { useEffect, useState, useRef } from "react";

const CyberHack = () => {
    const [display, setDisplay] = useState("");
    const frameRef = useRef(0);
    const phaseRef = useRef<"BOOT" | "GLITCH" | "SPIRAL">("BOOT");

    const width = 80;
    const height = 24;
    const noiseChars = "#%@&|/\\_";
    const spiralChars = "@#*o. ";

    const renderFrame = () => {
        frameRef.current++;
        const f = frameRef.current;
        let grid = new Array(height).fill(0).map(() => new Array(width).fill(" "));

        // 1. STATE LOGIC
        if (f < 50) phaseRef.current = "BOOT";
        else if (f < 150) phaseRef.current = "GLITCH";
        else phaseRef.current = "SPIRAL";

        // 2. LAYER GENERATION
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {

                // --- PHASE: BOOT (Fragmented Noise) ---
                if (phaseRef.current === "BOOT") {
                    if (Math.random() > 0.8) grid[y][x] = noiseChars[Math.floor(Math.random() * noiseChars.length)];
                }

                // --- PHASE: GLITCH (Abstract Silhouettes) ---
                if (phaseRef.current === "GLITCH") {
                    // Create vertical "hacker" bar silhouettes
                    const isSilhouette = Math.abs(x - width / 2) < 5 + Math.sin(y * 0.5 + f * 0.2) * 2;
                    if (isSilhouette && Math.random() > 0.4) {
                        grid[y][x] = noiseChars[Math.floor(Math.random() * noiseChars.length)];
                    }
                    // Horizontal Glitch Sweep
                    if (y === Math.floor(f % height)) grid[y][x] = noiseChars[Math.floor(Math.random() * noiseChars.length)];
                }

                // --- PHASE: SPIRAL (Stabilized Inward Rotation) ---
                if (phaseRef.current === "SPIRAL") {
                    const dx = (x - width / 2) * 0.6; // Aspect ratio correction
                    const dy = y - height / 2;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx) + dist * 0.5 - f * 0.1;

                    if (dist < 12) {
                        const intensity = Math.floor((Math.sin(angle * 3) + 1) * (spiralChars.length / 2));
                        grid[y][x] = spiralChars[intensity] || " ";
                    }
                }
            }
        }

        // 3. GLOBAL GLITCH EFFECTS (Character Displacement & Flicker)
        if (f % 20 > 18) { // Random Freeze/Flicker
            setDisplay(prev => prev.split("").reverse().join("").substring(0, width * height));
        } else {
            setDisplay(grid.map(row => row.join("")).join("\n"));
        }
    };

    useEffect(() => {
        const interval = setInterval(renderFrame, 60);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center bg-[#050505] overflow-hidden p-4">
            <pre className="font-mono text-[10px] md:text-xs leading-[1] text-emerald-500/80 selection:bg-emerald-500/30">
                {display}
            </pre>
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </div>
    );
};

export default CyberHack;
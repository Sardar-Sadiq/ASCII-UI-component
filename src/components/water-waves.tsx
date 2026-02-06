"use client";

import React, { useEffect, useRef, useState } from "react";

const WaterWaves = () => {
    const [frame, setFrame] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const [cols, setCols] = useState(120);
    const rows = 40;

    // Animation state refs
    const timeRef = useRef(0);

    // Responsive width handler
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const w = containerRef.current.offsetWidth;
                setCols(Math.max(80, Math.floor(w / 6)));
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const render = () => {
            timeRef.current += 0.016;
            const t = timeRef.current;

            let output = "";

            // Water wave that rises from bottom and falls back
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const nx = x / cols; // 0 to 1 (left to right)
                    const ny = y / rows; // 0 to 1 (top to bottom)

                    // Create a wave cycle that rises and falls
                    // Wave height oscillates between 0 and 1
                    const waveCycle = Math.sin(t * 0.3) * 0.5 + 0.5; // 0 to 1

                    // Maximum water level (rises from bottom)
                    // When waveCycle = 0, water at bottom (ny = 1)
                    // When waveCycle = 1, water reaches higher (ny = 0.3)
                    const maxWaterLevel = 1 - (waveCycle * 0.7); // 1.0 to 0.3

                    // Add horizontal wave variation (not perfectly flat)
                    const horizontalWave1 = Math.sin(nx * Math.PI * 4 + t * 0.5) * 0.05;
                    const horizontalWave2 = Math.sin(nx * Math.PI * 6 - t * 0.7) * 0.03;
                    const horizontalWave3 = Math.sin(nx * Math.PI * 10 + t * 1.2) * 0.02;

                    // Combined water surface level with waves
                    const waterSurface = maxWaterLevel + horizontalWave1 + horizontalWave2 + horizontalWave3;

                    // Distance from current pixel to water surface
                    const distToSurface = ny - waterSurface;

                    // Add foam/turbulence at the wave crest
                    const foamNoise = Math.sin(nx * Math.PI * 15 + t * 2) * 0.5 + 0.5;
                    const isFoamZone = distToSurface > -0.02 && distToSurface < 0.03;

                    // Determine character based on position relative to water
                    if (distToSurface < -0.15) {
                        // Deep water
                        output += "~";
                    } else if (distToSurface < -0.08) {
                        // Mid water
                        output += "∼";
                    } else if (distToSurface < -0.03) {
                        // Shallow water
                        output += "-";
                    } else if (distToSurface < 0.0) {
                        // Very shallow / surface
                        output += "·";
                    } else if (isFoamZone && foamNoise > 0.5) {
                        // Foam at crest
                        output += "≈";
                    } else if (distToSurface < 0.05) {
                        // Just above water - spray
                        if (foamNoise > 0.7) output += "·";
                        else output += " ";
                    } else {
                        // Air above water
                        output += " ";
                    }
                }
                output += "\n";
            }

            setFrame(output);
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [cols]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-hidden bg-transparent flex items-center justify-center select-none pointer-events-none absolute inset-0 mix-blend-screen"
            aria-hidden="true"
        >
            <pre
                className="font-mono text-[8px] md:text-[10px] leading-[8px] md:leading-[10px] text-cyan-500/30 whitespace-pre"
                style={{
                    textShadow: "0 0 15px rgba(6, 182, 212, 0.4)"
                }}
            >
                {frame}
            </pre>
        </div>
    );
};

export default WaterWaves;

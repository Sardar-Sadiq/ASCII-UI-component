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
                    const ny = 1 - (y / rows); // 1 to 0 (FLIPPED: bottom to top)

                    // Create a wave cycle that rises and falls
                    const waveCycle = Math.sin(t * 0.3) * 0.5 + 0.5; // 0 to 1

                    // Maximum water level (rises from bottom)
                    const maxWaterLevel = waveCycle * 0.7; // 0.0 to 0.7

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

                    // Add water detail - bubbles and turbulence within water
                    const bubbleNoise1 = Math.sin(nx * Math.PI * 8 + ny * Math.PI * 6 - t * 0.8) * 0.5 + 0.5;
                    const bubbleNoise2 = Math.sin(nx * Math.PI * 12 - ny * Math.PI * 4 + t * 1.1) * 0.5 + 0.5;
                    const turbulence = Math.sin(nx * Math.PI * 20 + ny * Math.PI * 15 - t * 1.5) * 0.5 + 0.5;

                    // Determine character based on position relative to water
                    if (distToSurface < 0.0) {
                        // Under water - add detail based on depth and turbulence
                        const depth = -distToSurface; // How deep below surface

                        if (depth > 0.3) {
                            // Deep water with occasional bubbles
                            if (bubbleNoise1 > 0.85 && bubbleNoise2 > 0.8) {
                                output += "o"; // Bubble
                            } else if (turbulence > 0.75) {
                                output += "∼";
                            } else {
                                output += "~";
                            }
                        } else if (depth > 0.15) {
                            // Mid-depth water with more activity
                            if (bubbleNoise1 > 0.8) {
                                output += "°"; // Small bubble
                            } else if (turbulence > 0.7) {
                                output += "∼";
                            } else {
                                output += "~";
                            }
                        } else if (depth > 0.05) {
                            // Shallow water - more turbulent
                            if (turbulence > 0.65) {
                                output += "∼";
                            } else {
                                output += "-";
                            }
                        } else {
                            // Very shallow / near surface
                            if (turbulence > 0.6) {
                                output += "-";
                            } else {
                                output += "·";
                            }
                        }
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
            className="w-full h-full overflow-hidden bg-transparent flex items-end justify-center select-none pointer-events-none absolute inset-0 mix-blend-screen"
            aria-hidden="true"
        >
            <pre
                className="font-mono text-[8px] md:text-[10px] leading-[8px] md:leading-[10px] text-cyan-500/30 whitespace-pre"
                style={{
                    textShadow: "0 0 15px rgba(127,205,255,1)"
                }}
            >
                {frame}
            </pre>
        </div>
    );
};

export default WaterWaves;

"use client";

import React, { useEffect, useRef, useState } from "react";

const AsciiAurora = () => {
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
            timeRef.current += 0.016; // ~60fps increment
            const t = timeRef.current;

            let output = "";

            // Water wave simulation with multiple layers
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    // Normalize coordinates
                    const nx = x / cols; // 0 to 1
                    const ny = y / rows; // 0 to 1

                    // Multiple water wave layers moving in different directions
                    // Wave 1: Primary horizontal wave (left to right)
                    const wave1 = Math.sin(nx * Math.PI * 4 - t * 0.5) * 0.15;

                    // Wave 2: Secondary wave (right to left)
                    const wave2 = Math.sin(nx * Math.PI * 3 + t * 0.3) * 0.1;

                    // Wave 3: Diagonal wave
                    const wave3 = Math.sin((nx + ny) * Math.PI * 5 - t * 0.4) * 0.08;

                    // Wave 4: Circular ripple from center
                    const dx = nx - 0.5;
                    const dy = ny - 0.5;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const wave4 = Math.sin(dist * Math.PI * 8 - t * 0.6) * 0.05;

                    // Wave 5: Fine surface detail
                    const wave5 = Math.sin(nx * Math.PI * 12 + ny * Math.PI * 8 - t * 0.8) * 0.03;

                    // Combine all waves to get water surface height at this point
                    const waterHeight = wave1 + wave2 + wave3 + wave4 + wave5;

                    // Add vertical gradient (water gets darker with depth)
                    const depth = ny - 0.5 + waterHeight;

                    // Map depth to character density
                    // Positive = surface/peaks (bright), negative = troughs (dark)
                    const intensity = depth;

                    // Character selection based on wave intensity
                    if (intensity > 0.15) {
                        output += "≈"; // Wave crest
                    } else if (intensity > 0.08) {
                        output += "~"; // High water
                    } else if (intensity > 0.02) {
                        output += "∼"; // Mid water
                    } else if (intensity > -0.05) {
                        output += "-"; // Low water
                    } else if (intensity > -0.12) {
                        output += "."; // Trough
                    } else {
                        output += " "; // Deep trough
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

export default AsciiAurora;

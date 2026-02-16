"use client";

import React, { useEffect, useRef, useState } from "react";

interface CyberpunkNebulaProps {
    className?: string;
    starCount?: number;
}

const CyberpunkNebula: React.FC<CyberpunkNebulaProps> = ({
    className = "",
    starCount = 300
}) => {
    const [frame, setFrame] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 80, height: 40 });

    // Dithering characters for "dust" opacity - Dark to Light
    const dustChars = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"];

    interface Star {
        x: number;
        y: number;
        z: number;
        char: string;
        colorClass: string;
    }

    const starsRef = useRef<Star[]>([]);

    // 1. Dynamic Sizing
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = () => {
            if (containerRef.current) {
                // Approximate ratio for text-xs (12px)
                // Using 7.2px width, 14px height roughly
                const w = Math.floor(containerRef.current.clientWidth / 7.2);
                const h = Math.floor(containerRef.current.clientHeight / 14);

                setDimensions({
                    width: Math.max(20, w),
                    height: Math.max(10, h)
                });
            }
        };

        handleResize();
        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    // 2. Init Stars
    useEffect(() => {
        const { width, height } = dimensions;

        // Regenerate stars on massive resize (simplest strategy)
        // Or we could try to scale existing, but regeneration is cheap.
        const stars: Star[] = [];
        const colors = ["text-blue-500", "text-purple-500", "text-cyan-400"];

        // Adjust starcount density based on area
        // Standard area approx 100x40 = 4000 cells.
        const area = width * height;
        const dynamicStarCount = Math.floor(area * 0.075); // 7.5% density

        for (let i = 0; i < Math.max(starCount, dynamicStarCount); i++) {
            const z = Math.random() * 2 + 0.2;
            let char = ".";
            if (z > 1.5) char = "✦";
            else if (z > 1.0) char = "*";

            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: z,
                char: char,
                colorClass: colors[Math.floor(Math.random() * colors.length)]
            });
        }
        starsRef.current = stars;
    }, [dimensions, starCount]); // Re-init on resize or starCount change

    // 3. Render Loop
    useEffect(() => {
        let animationFrameId: number;
        let t = 0;

        const render = () => {
            t += 0.05;
            const { width, height } = dimensions;
            const grid: string[][] = Array(height).fill(null).map(() => Array(width).fill(" "));

            // 1. NEBULA LAYER (Background Noise)
            // Use looping noise
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const nx = x * 0.08 + t * 0.2;
                    const ny = y * 0.15 + t * 0.1;

                    const v = Math.sin(nx) * Math.cos(ny) + Math.sin(nx + ny);

                    if (v > 0.5) {
                        const density = Math.floor((v - 0.5) * 4); // 0 to ~4
                        const idx = Math.min(density, dustChars.length - 1);
                        grid[y][x] = dustChars[idx];
                    }
                }
            }

            // 2. STARFIELD (Mid/Fore ground)
            const stars = starsRef.current;
            stars.forEach((star) => {
                star.x -= (star.z * 0.5);

                if (star.x < 0) {
                    star.x = width;
                    star.y = Math.floor(Math.random() * height);
                }

                const px = Math.floor(star.x);
                const py = Math.floor(star.y);

                if (px >= 0 && px < width && py >= 0 && py < height) {
                    grid[py][px] = star.char;
                }
            });

            // 3. GLITCH
            if (Math.random() > 0.98) {
                const row = Math.floor(Math.random() * height);
                const offset = Math.floor(Math.random() * 10);
                const original = [...grid[row]];
                for (let i = 0; i < width; i++) {
                    grid[row][i] = original[(i + offset) % width];
                }
            }

            setFrame(grid.map(row => row.join("")).join("\n"));
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions]);

    return (
        <div ref={containerRef} className={`w-full h-full flex justify-center items-center overflow-hidden bg-[#0d0d12] relative rounded-xl border border-blue-900/30 ${className}`}>
            {/* Background Gradient & Post-Processing */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-transparent to-[#2a0e3b] opacity-60 z-0" />

            <pre
                className="font-mono text-[10px] md:text-xs leading-none select-none pointer-events-none whitespace-pre z-10 relative"
                style={{
                    color: '#a5b4fc',
                    textShadow: '0 0 2px #4f46e5, 2px 0 4px #c026d3'
                }}
            >
                {frame}
            </pre>

            <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_3px)]" />
        </div>
    );
};

export default CyberpunkNebula;

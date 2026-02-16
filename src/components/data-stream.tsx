"use client";

import React, { useEffect, useRef, useState } from "react";

interface DataStreamProps {
    className?: string;
}

const DataStream: React.FC<DataStreamProps> = ({ className = "" }) => {
    const [frame, setFrame] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 80, height: 40 });

    // Characters
    const hexChars = "01AF";

    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = () => {
            if (containerRef.current) {
                // Approximate ratio for text-xs (12px)
                // Width roughly 0.6 * height. 
                const w = Math.floor(containerRef.current.clientWidth / 7.2);
                const h = Math.floor(containerRef.current.clientHeight / 14);

                setDimensions({
                    width: Math.max(20, w),
                    height: Math.max(10, h)
                });
            }
        };

        handleResize(); // Initial measurement
        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let animationFrameId: number;
        let frameCount = 0;

        const render = () => {
            frameCount++;
            const { width, height } = dimensions;
            const grid: string[][] = Array(height).fill(null).map(() => Array(width).fill(" "));
            const cx = width / 2;
            const cy = height / 2;

            // Time factor for swirl
            const t = frameCount * 0.05;

            // Ray marching / Tunnel logic inverted
            // We iterate pixels and map them to tunnel coordinates
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const dx = x - cx;
                    const dy = (y - cy) * 2; // Correct aspect ratio roughly (chars are taller than wide)

                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx);

                    // Simple Void Check
                    if (dist < 5) continue; // Center void

                    // Spiral effect
                    const spiralAngle = angle + (dist * 0.05) - t; // Rotating spiral

                    // Quantize angle to create discrete streams
                    const streamCount = 12;
                    // Check if we are inside a stream
                    // sin(stream_frequency * angle)
                    const streamIntensity = Math.sin(streamCount * spiralAngle);

                    if (streamIntensity > 0.8) {
                        // We are in a stream
                        // Move "characters" along the stream outwards
                        const flowSpeed = t * 2;
                        const patternPos = Math.floor(dist - flowSpeed);

                        if (patternPos % 3 === 0) {
                            grid[y][x] = hexChars[Math.floor(Math.abs(Math.sin(patternPos)) * hexChars.length) % hexChars.length];
                        }
                    }
                }
            }

            setFrame(grid.map(row => row.join("")).join("\n"));
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions]);

    return (
        <div ref={containerRef} className={`w-full h-full flex justify-center items-center overflow-hidden bg-black relative rounded-xl border border-gray-800 ${className}`}>
            {/* Premium Post-processing glow */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.2)_0%,rgba(0,0,0,1)_80%)]" />

            <pre
                className="font-mono text-xs leading-none select-none pointer-events-none whitespace-pre z-10 relative text-gray-300"
                style={{
                    textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' // Soft white glow
                }}
            >
                {frame}
            </pre>

            {/* Central "Void" Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] z-20 mix-blend-soft-light" />
        </div>
    );
};

export default DataStream;

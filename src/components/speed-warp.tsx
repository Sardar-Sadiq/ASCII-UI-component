"use client";

import React, { useEffect, useRef, useState } from "react";

interface SpeedWarpProps {
    className?: string;
    speed?: number;
    starCount?: number;
}

const SpeedWarp: React.FC<SpeedWarpProps> = ({
    className = "",
    speed = 1.6,
    starCount = 200
}) => {
    const [frame, setFrame] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 80, height: 40 });

    // Static center characters
    const centerChars = ".,+*";

    interface Star {
        x: number;
        y: number;
        z: number;
    }

    const starsRef = useRef<Star[]>([]);

    // 1. Handle resize to adjust grid resolution
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = () => {
            if (containerRef.current) {
                // Approximate char size for monospace font at 12px/xs
                // Width roughly 0.6 * height. 
                // We'll estimate loosely to ensure coverage.
                const w = Math.floor(containerRef.current.clientWidth / 7.2);
                const h = Math.floor(containerRef.current.clientHeight / 14); // leading-none means roughly 1em height

                // Ensure min dimensions
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

    // 2. Initialize and maintain stars count based on volume (optional, or just fixed count)
    // We'll keep fixed count or scale it with dimensions for consistency
    useEffect(() => {
        const { width, height } = dimensions;
        const currentCount = starsRef.current.length;

        // If we need to add more stars for larger screens
        if (currentCount < starCount) {
            const newStars: Star[] = [];
            for (let i = currentCount; i < starCount; i++) {
                newStars.push({
                    x: (Math.random() - 0.5) * width,
                    y: (Math.random() - 0.5) * height,
                    z: Math.random() * width
                });
            }
            starsRef.current = [...starsRef.current, ...newStars];
        }
    }, [dimensions, starCount]);


    // 3. Animation Loop
    useEffect(() => {
        let animationFrameId: number;

        const render = () => {
            const { width, height } = dimensions;
            const grid: string[][] = Array(height).fill(null).map(() => Array(width).fill(" "));
            const stars = starsRef.current;
            const cx = width / 2;
            const cy = height / 2;

            stars.forEach((star) => {
                // Move star closer
                star.z -= speed;

                // Reset if it passes the viewer
                if (star.z <= 0) {
                    star.z = width;
                    star.x = (Math.random() - 0.5) * width;
                    star.y = (Math.random() - 0.5) * height;
                }

                // Project 3D to 2D
                const k = 128.0 / star.z;
                const px = Math.floor(star.x * k + cx);
                const py = Math.floor(star.y * k + cy);

                if (px >= 0 && px < width && py >= 0 && py < height) {
                    const dx = px - cx;
                    const dy = py - cy;
                    const depthRatio = 1 - (star.z / width); // 0 (far) to 1 (near)

                    let char = ".";

                    if (star.z > width * 0.8) {
                        char = ".";
                    } else if (star.z > width * 0.4) {
                        char = centerChars[Math.floor(Math.random() * centerChars.length)];
                    } else {
                        // Motion Blur Logic
                        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                        const absAngle = Math.abs(angle);

                        if (absAngle < 22.5 || absAngle > 157.5) char = "-";
                        else if (absAngle > 67.5 && absAngle < 112.5) char = "|";
                        else if (angle > 0) char = angle < 67.5 ? "\\" : "/";
                        else char = angle > -67.5 ? "/" : "\\";
                    }

                    grid[py][px] = char;
                }
            });

            setFrame(grid.map(row => row.join("")).join("\n"));
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions, speed]); // Re-bind render if dimensions change

    return (
        <div
            ref={containerRef}
            className={`w-full h-full flex justify-center items-center overflow-hidden bg-black rounded-lg border border-green-900/30 font-mono relative ${className}`}
        >
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
            <pre
                className="text-green-500 leading-none select-none pointer-events-none whitespace-pre z-0"
                style={{
                    fontSize: '12px',
                    lineHeight: '12px',
                    textShadow: '0 0 5px rgba(34, 197, 94, 0.9)'
                }}
            >
                {frame}
            </pre>
            <style jsx>{`
                /* Optional override for extremely small screens */
                @media (max-width: 640px) {
                    pre { font-size: 10px !important; line-height: 10px !important; }
                }
            `}</style>
        </div>
    );
};

export default SpeedWarp;

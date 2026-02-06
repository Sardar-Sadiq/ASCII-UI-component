"use client";

import React, { useEffect, useRef, useState } from "react";

const AsciiLightning = () => {
    const [frame, setFrame] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mask, setMask] = useState<boolean[][]>([]);

    // Grid settings
    const cols = 80;
    const rows = 40;

    // Character set for electricity (high energy feel)
    const chars = "⚡↯~*+!=^";

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        // Set canvas size to match grid (1 pixel = 1 cell for sampling)
        canvas.width = cols;
        canvas.height = rows;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cols, rows);

        ctx.fillStyle = "white";
        // Draw Lightning Bolt Path
        // A simple stylized bolt path scaled to the grid
        const path = new Path2D("M45 2 L25 22 H38 L30 38 L55 16 H42 L48 2 Z");

        ctx.save();
        // Scale path to fit roughly in the center/fill height
        // The path coordinates above are roughly 20-55 width and 2-38 height.
        // Grid is 80x40. It fits reasonably well centered.
        // Let's center it a bit better.
        ctx.translate(10, 0);
        ctx.fill(path);
        ctx.restore();

        // Sample the grid
        const newMask: boolean[][] = [];
        const imageData = ctx.getImageData(0, 0, cols, rows).data;

        for (let y = 0; y < rows; y++) {
            const row: boolean[] = [];
            for (let x = 0; x < cols; x++) {
                // Pixel index: (y * width + x) * 4 (RGBA)
                const index = (y * cols + x) * 4;
                // If red channel > 128, consider it active
                row.push(imageData[index] > 128);
            }
            newMask.push(row);
        }
        setMask(newMask);

    }, []);

    useEffect(() => {
        if (mask.length === 0) return;

        const animate = () => {
            let buffer = "";

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    if (mask[y][x]) {
                        // "Flicker" Logic: Random chance to show char. 
                        // High energy center? We can just use random noise for electricity.
                        // 70% chance to render a character
                        if (Math.random() > 0.3) {
                            buffer += chars[Math.floor(Math.random() * chars.length)];
                        } else {
                            buffer += " "; // Flicker gap
                        }
                    } else {
                        // Background
                        buffer += " ";
                    }
                }
                buffer += "\n";
            }
            setFrame(buffer);
        };

        const interval = setInterval(animate, 60);
        return () => clearInterval(interval);
    }, [mask]);

    // Color logic: Electric Yellow/White
    return (
        <div className="w-full h-full flex justify-center items-center overflow-hidden bg-black relative">
            <canvas ref={canvasRef} className="hidden" /> {/* Hidden sampling canvas */}

            {/* 
                Glow effect behind the text for extra juice.
                We can emulate the bolt shape glow with a simple filtered div or just text-shadow.
            */}
            <pre
                className="font-mono leading-none select-none pointer-events-none whitespace-pre text-yellow-400 font-bold"
                style={{
                    fontSize: '12px',
                    textShadow: '0 0 10px rgba(255, 230, 0, 0.6), 0 0 20px rgba(255, 230, 0, 0.4)'
                }}
            >
                {frame}
            </pre>

            <style jsx>{`
                @media (max-width: 768px) {
                    pre { font-size: 8px !important; }
                }
            `}</style>
        </div>
    );
};

export default AsciiLightning;

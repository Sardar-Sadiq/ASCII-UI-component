"use client";

import React, { useEffect, useRef, useState } from "react";

const AsciiBatman = () => {
    const [frame, setFrame] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mask, setMask] = useState<boolean[][]>([]);

    // Grid settings
    const cols = 140;
    const rows = 50;

    // Character set for Batman logo
    const chars = "·-/\\|+";

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        // Set canvas size to match grid
        canvas.width = cols;
        canvas.height = rows;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cols, rows);

        ctx.fillStyle = "white";

        // Classic Batman logo path (Dark Knight style)
        const path = new Path2D("M70 5 L65 8 L60 10 L50 12 L40 13 L30 14 L20 15 L10 17 L5 20 L2 25 L0 30 L2 35 L5 38 L10 40 L20 42 L30 43 L35 44 L38 46 L40 48 L42 47 L45 45 L50 42 L55 40 L60 38 L62 36 L64 33 L66 30 L68 25 L69 20 L69.5 15 L69.8 12 L70 10 L70.2 12 L70.5 15 L71 20 L72 25 L74 30 L76 33 L78 36 L80 38 L85 40 L90 42 L95 45 L98 47 L100 48 L102 46 L105 44 L110 43 L120 42 L130 40 L135 38 L138 35 L140 30 L138 25 L135 20 L130 17 L120 15 L110 14 L100 13 L90 12 L80 10 L75 8 Z M68 12 L66 15 L65 18 L64 22 L64 26 L65 28 L67 29 L69 28 L70 26 L70 22 L70 18 L70 15 Z M72 15 L72 18 L72 22 L72 26 L73 28 L75 29 L77 28 L78 26 L78 22 L77 18 L76 15 Z");

        ctx.save();
        ctx.translate(0, 0);
        ctx.fill(path);
        ctx.restore();

        // Sample the grid
        const newMask: boolean[][] = [];
        const imageData = ctx.getImageData(0, 0, cols, rows).data;

        for (let y = 0; y < rows; y++) {
            const row: boolean[] = [];
            for (let x = 0; x < cols; x++) {
                const index = (y * cols + x) * 4;
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
                        // Flicker effect: 70% chance to show character
                        if (Math.random() > 0.3) {
                            buffer += chars[Math.floor(Math.random() * chars.length)];
                        } else {
                            buffer += " "; // Flicker gap
                        }
                    } else {
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

    return (
        <div className="w-full h-full flex justify-center items-center overflow-hidden bg-black relative">
            <canvas ref={canvasRef} className="hidden" />

            <pre
                className="font-mono leading-none select-none pointer-events-none whitespace-pre text-white font-bold"
                style={{
                    fontSize: '9px',
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)'
                }}
            >
                {frame}
            </pre>

            <style jsx>{`
                @media (max-width: 768px) {
                    pre { font-size: 6px !important; }
                }
            `}</style>
        </div>
    );
};

export default AsciiBatman;

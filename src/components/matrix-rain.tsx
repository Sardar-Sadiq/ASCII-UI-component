"use client";

import React, { useEffect, useState, useRef } from "react";

const MatrixRain = () => {
    const [matrixString, setMatrixString] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    // Increase density grid
    const width = 160;
    const height = 60;

    // Using pure ASCII to guarantee perfect vertical alignment (no font fallback width mismatches)
    const chars = "101010102345689ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Store stable grid of characters to avoid "glittering"
    const gridRef = useRef<string[][]>([]);

    // Track the "head" position of the rain drop in each column
    // Store as objects { y: float, speed: float }
    // Initialize with a variety of starting positions and random speeds
    const columnsRef = useRef<{ y: number; speed: number }[]>([]);

    // Initialize once on mount
    useEffect(() => {
        // Grid setup
        const newGrid = [];
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                row.push(chars[Math.floor(Math.random() * chars.length)]);
            }
            newGrid.push(row);
        }
        gridRef.current = newGrid;

        // Columns setup with variable speed
        if (columnsRef.current.length === 0) {
            columnsRef.current = Array(width).fill(0).map(() => ({
                y: Math.floor(Math.random() * -100),
                speed: 0.5 + Math.random() * 0.8 // Random speed between 0.5 and 1.3
            }));
        }
    }, []);


    const generateMatrix = () => {
        let display = "";
        const grid = gridRef.current;
        if (grid.length === 0 || columnsRef.current.length === 0) return;

        // Occasional random character flip
        for (let k = 0; k < 20; k++) {
            const randX = Math.floor(Math.random() * width);
            const randY = Math.floor(Math.random() * height);
            grid[randY][randX] = chars[Math.floor(Math.random() * chars.length)];
        }

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Use floor for rendering comparison
                const currentColumn = columnsRef.current[x];
                if (!currentColumn) continue; // Safety check

                const headY = Math.floor(currentColumn.y);
                const trailLength = 15;

                if (y === headY) {
                    display += grid[y][x];
                } else if (y < headY && y > headY - trailLength) {
                    display += grid[y][x];
                } else {
                    display += " ";
                }
            }
            display += "\n";
        }

        // Update physics
        columnsRef.current = columnsRef.current.map((col) => {
            let newY = col.y + col.speed;

            if (newY > height + 10) {
                // Reset
                newY = Math.floor(Math.random() * -50) - 10;
                // Re-roll speed for variation
                col.speed = 0.5 + Math.random() * 0.8;
            }

            return { ...col, y: newY };
        });

        setMatrixString(display);
    };

    useEffect(() => {
        const interval = setInterval(generateMatrix, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex justify-center items-center overflow-hidden bg-black">
            <pre
                className="font-mono text-green-500 leading-none select-none pointer-events-none whitespace-pre"
                style={{
                    fontSize: '10px',
                    textAlign: "left" // Critical fix for 'straight line' alignment
                }}
            >
                {matrixString}
            </pre>

            <style jsx>{`
                @media (max-width: 768px) {
                    pre { font-size: 6px !important; }
                }
            `}</style>
        </div>
    );
};

export default MatrixRain;

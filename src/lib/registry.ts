import FireEffectFooter from "@/components/fire-effect";
import MatrixRain from "@/components/matrix-rain";
import AsciiLightning from "@/components/ascii-lightning";
import WaterWaves from "@/components/water-waves";
import CyberTransition from "@/components/cybertransitions";
import SpeedWarp from "@/components/speed-warp";
import CyberpunkNebula from "@/components/cyberpunk-nebula";
import DataStream from "@/components/data-stream";


export interface ComponentMetadata {
    id: string;
    name: string;
    version: string;
    description: string;
    component: React.ComponentType;
    code: string;
    codeJsx: string;
}

const FIRE_EFFECT_CODE_TSX = `"use client";

import React, { useEffect, useState, useRef } from "react";

const FireEffectFooter = () => {
    const [fireString, setFireString] = useState("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Width remains the same, height reduced to half
    const width = 205;
    const height = 14; 

    const fireChars = " ,;+ltgti!lI?/\\|)(1}{][rcvzjftJUOQocxfXhqwWB8&%$#@";
    const maxCharIndex = fireChars.length;

    // Use a ref for the pixels array to persist state across renders without causing re-renders itself
    const firePixelsArrayRef = useRef<number[]>(Array(width * height + 1).fill(0));

    const generateFire = () => {
        const firePixelsArray = firePixelsArrayRef.current;
        let generatedString = "";

        // Set bottom row to random high intensity
        for (let i = 0; i < width; i++) {
            let randomCol = Math.floor(Math.random() * width);
            let index = randomCol + width * (height - 1);
            firePixelsArray[index] = Math.floor(Math.random() * maxCharIndex);
        }

        // Randomly decay some bottom pixels
        for (let i = 0; i < width; i++) {
            let randomCol = Math.floor(Math.random() * width);
            let index = randomCol + width * (height - 1);
            firePixelsArray[index] = 0;
        }

        // Calculate fire propagation
        for (let i = 0; i < width * (height - 1); i++) {
            let averageValue =
                (firePixelsArray[i] +
                    firePixelsArray[i + 1] +
                    firePixelsArray[i + width] +
                    firePixelsArray[i + width + 1]) / 4;

            firePixelsArray[i] = Math.floor(averageValue);

            generatedString += fireChars[firePixelsArray[i]];
            if (i % width === 0) generatedString += \`\\n\`;
        }

        setFireString(generatedString);
        timeoutRef.current = setTimeout(generateFire, 30);
    };

    useEffect(() => {
        generateFire();
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div
            className="fire-effect-container w-full flex justify-center items-end"
            style={{
                height: "300px", //adjust height as per you need
                position: "relative",
                overflow: "hidden"
            }}
        >
            <pre
                id="fire"
                className="font-mono text-white/40 select-none pointer-events-none"
                style={{
                    margin: 0,
                    padding: 0,
                    lineHeight: 1,
                    textAlign: "center",
                    maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
                }}
            >
                {fireString}
            </pre>

            {/* Responsive font size handling via CSS */}
            <style jsx>{\`
                #fire {
                    font-size: 11px;
                }
                @media (max-width: 1200px) {
                    #fire { font-size: 9px; }
                }
                @media (max-width: 768px) {
                    #fire { font-size: 6px; }
                }
                @media (max-width: 480px) {
                    #fire { font-size: 4px; }
                }
            \`}</style>
        </div>
    );
};

export default FireEffectFooter;
`;

const FIRE_EFFECT_CODE_JSX = `"use client";

import React, { useEffect, useState, useRef } from "react";

const FireEffectFooter = () => {
    const [fireString, setFireString] = useState("");
    const timeoutRef = useRef(null);

    // Width remains the same, height reduced to half
    const width = 205;
    const height = 14; 

    const fireChars = " ,;+ltgti!lI?/\\|)(1}{][rcvzjftJUOQocxfXhqwWB8&%$#@";
    const maxCharIndex = fireChars.length;

    // Use a ref for the pixels array to persist state across renders without causing re-renders itself
    const firePixelsArrayRef = useRef(Array(width * height + 1).fill(0));

    const generateFire = () => {
        const firePixelsArray = firePixelsArrayRef.current;
        let generatedString = "";

        // Set bottom row to random high intensity
        for (let i = 0; i < width; i++) {
            let randomCol = Math.floor(Math.random() * width);
            let index = randomCol + width * (height - 1);
            firePixelsArray[index] = Math.floor(Math.random() * maxCharIndex);
        }

        // Randomly decay some bottom pixels
        for (let i = 0; i < width; i++) {
            let randomCol = Math.floor(Math.random() * width);
            let index = randomCol + width * (height - 1);
            firePixelsArray[index] = 0;
        }

        // Calculate fire propagation
        for (let i = 0; i < width * (height - 1); i++) {
            let averageValue =
                (firePixelsArray[i] +
                    firePixelsArray[i + 1] +
                    firePixelsArray[i + width] +
                    firePixelsArray[i + width + 1]) / 4;

            firePixelsArray[i] = Math.floor(averageValue);

            generatedString += fireChars[firePixelsArray[i]];
            if (i % width === 0) generatedString += \`\\n\`;
        }

        setFireString(generatedString);
        timeoutRef.current = setTimeout(generateFire, 30);
    };

    useEffect(() => {
        generateFire();
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div
            className="fire-effect-container w-full flex justify-center items-end"
            style={{
                height: "300px", //adjust height as per you need
                position: "relative",
                overflow: "hidden"
            }}
        >
            <pre
                id="fire"
                className="font-mono text-white/40 select-none pointer-events-none"
                style={{
                    margin: 0,
                    padding: 0,
                    lineHeight: 1,
                    textAlign: "center",
                    maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
                }}
            >
                {fireString}
            </pre>

            {/* Responsive font size handling via CSS */}
            <style jsx>{\`
                #fire {
                    font-size: 11px;
                }
                @media (max-width: 1200px) {
                    #fire { font-size: 9px; }
                }
                @media (max-width: 768px) {
                    #fire { font-size: 6px; }
                }
                @media (max-width: 480px) {
                    #fire { font-size: 4px; }
                }
            \`}</style>
        </div>
    );
};

export default FireEffectFooter;
`;

const MATRIX_RAIN_CODE_TSX = `"use client";

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
            display += "\\n";
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
            
            <style jsx>{\`
                @media (max-width: 768px) {
                    pre { font-size: 6px !important; }
                }
            \`}</style>
        </div>
    );
};

export default MatrixRain;
`;

const MATRIX_RAIN_CODE_JSX = `"use client";

import React, { useEffect, useState, useRef } from "react";

const MatrixRain = () => {
    const [matrixString, setMatrixString] = useState("");
    
    // Width and height of the grid
    const width = 100;
    const height = 30;
    
    // Track the "head" position of the rain drop in each column
    // Initialize with random positions so it doesn't start all at 0
    const columnsRef = useRef(
        Array(width).fill(0).map(() => Math.floor(Math.random() * -40))
    );

    const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEF";

    const generateMatrix = () => {
        let display = "";
        
        // Build the current frame string
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const headY = columnsRef.current[x];
                
                if (headY === y) {
                     // Head of the stream (white)
                    display += chars[Math.floor(Math.random() * chars.length)];
                } 
                else if (y < headY && y > headY - 12) {
                    // Trail
                    display += chars[Math.floor(Math.random() * chars.length)];
                } else {
                    display += " ";
                }
            }
            display += "\\n";
        }

        // Update column positions
        columnsRef.current = columnsRef.current.map((y) => {
             // Reset if it goes off screen (with some randomness)
            if (y > height + Math.random() * 20) {
                 return Math.floor(Math.random() * -10); // Start slightly above
            }
            return y + 1;
        });

        setMatrixString(display);
    };

    useEffect(() => {
        const interval = setInterval(generateMatrix, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex justify-center items-center overflow-hidden h-[300px]">
            <pre 
                className="font-mono text-green-500 leading-none select-none pointer-events-none whitespace-pre"
                style={{
                    fontSize: '10px',
                    textShadow: '0 0 8px rgba(34, 197, 94, 0.5)'
                }}
            >
                {matrixString}
            </pre>
            
            <style jsx>{\`
                @media (max-width: 768px) {
                    pre { font-size: 6px !important; }
                }
            \`}</style>
        </div>
    );
};

export default MatrixRain;
`;

const ASCII_LIGHTNING_CODE_TSX = `"use client";

import React, { useEffect, useRef, useState } from "react";

const AsciiLightning = () => {
    const [frame, setFrame] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mask, setMask] = useState<boolean[][]>([]);
    
    // Grid settings
    const cols = 80;
    const rows = 40;
    
    // Character set for electricity (Safe ASCII to prevent layout jitter)
    const chars = "s";

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
                buffer += "\\n";
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
            
             <style jsx>{\`
                @media (max-width: 768px) {
                    pre { font-size: 8px !important; }
                }
            \`}</style>
        </div>
    );
};

export default AsciiLightning;
`;

const ASCII_LIGHTNING_CODE_JSX = `"use client";

import React, { useEffect, useRef, useState } from "react";

const AsciiLightning = () => {
    const [frame, setFrame] = useState("");
    const canvasRef = useRef(null);
    const [mask, setMask] = useState([]);
    
    // Grid settings
    const cols = 80;
    const rows = 40;
    
    // Character set for electricity (Safe ASCII to prevent layout jitter)
    const chars = "s";

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
        ctx.translate(10, 0); 
        ctx.fill(path);
        ctx.restore();

        // Sample the grid
        const newMask = [];
        const imageData = ctx.getImageData(0, 0, cols, rows).data;

        for (let y = 0; y < rows; y++) {
            const row = [];
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
                buffer += "\\n";
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
            
             <style jsx>{\`
                @media (max-width: 768px) {
                    pre { font-size: 8px !important; }
                }
            \`}</style>
        </div>
    );
};

export default AsciiLightning;
`;

const ASCII_BATMAN_CODE_TSX = `"use client";

import React, { useEffect, useRef, useState } from "react";

const AsciiBatman = () => {
    const [frame, setFrame] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mask, setMask] = useState<boolean[][]>([]);

    const cols = 120;
    const rows = 45;
    const chars = "·-/\\\\|+";

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        canvas.width = cols;
        canvas.height = rows;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cols, rows);
        ctx.fillStyle = "white";
        
        const path = new Path2D("M40 2.12513H0C25.75 11.5625 16.85 25.0625 17.35 25.0125C48.1564 21.9318 58.6667 35.1125 59.85 42.4125C67.15 18.9625 102.35 25.0125 102.35 25.0125C102.35 25.0125 95.3 10.4125 119.8 0.625127C107.65 -0.0375209 79.85 0.0125125 79.85 0.125125C78.8 5.51251 75.983 8.01251 74.65 8.51251C72.45 9.17918 67.67 10.4625 66.15 10.2625C64.25 10.0125 64.1 9.41251 64.1 8.71251C64.1 8.15251 63.433 3.94585 63.1 1.91251C62.9 2.81251 62.218 6.17939 62.1 6.11251C60.26 5.07251 58.167 5.67918 57.35 6.11251L56.4 1.81251C56.133 3.42918 55.56 7.07251 55.4 8.71251C55.24 10.3525 53.233 10.4625 52.25 10.3125C42.05 8.79251 41.65 6.46251 40.1 2.12513Z");

        ctx.save();
        ctx.translate(0, 0);
        ctx.fill(path);
        ctx.restore();

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
                        if (Math.random() > 0.3) {
                            buffer += chars[Math.floor(Math.random() * chars.length)];
                        } else {
                            buffer += " ";
                        }
                    } else {
                        buffer += " ";
                    }
                }
                buffer += "\\n";
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
                className="font-mono leading-none select-none pointer-events-none whitespace-pre text-cyan-400 font-bold"
                style={{
                    fontSize: '10px',
                    textShadow: '0 0 10px rgba(6, 182, 212, 0.6), 0 0 20px rgba(6, 182, 212, 0.4)'
                }}
            >
                {frame}
            </pre>
            <style jsx>{\`
                @media (max-width: 768px) {
                    pre { font-size: 7px !important; }
                }
            \`}</style>
        </div>
    );
};

export default AsciiBatman;
`;

const ASCII_BATMAN_CODE_JSX = `"use client";

import React, { useEffect, useRef, useState } from "react";

const AsciiBatman = () => {
    const [frame, setFrame] = useState("");
    const canvasRef = useRef(null);
    const [mask, setMask] = useState([]);

    const cols = 120;
    const rows = 45;
    const chars = "·-/\\\\|+";

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        canvas.width = cols;
        canvas.height = rows;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cols, rows);
        ctx.fillStyle = "white";
        
        const path = new Path2D("M40 2.12513H0C25.75 11.5625 16.85 25.0625 17.35 25.0125C48.1564 21.9318 58.6667 35.1125 59.85 42.4125C67.15 18.9625 102.35 25.0125 102.35 25.0125C102.35 25.0125 95.3 10.4125 119.8 0.625127C107.65 -0.0375209 79.85 0.0125125 79.85 0.125125C78.8 5.51251 75.983 8.01251 74.65 8.51251C72.45 9.17918 67.67 10.4625 66.15 10.2625C64.25 10.0125 64.1 9.41251 64.1 8.71251C64.1 8.15251 63.433 3.94585 63.1 1.91251C62.9 2.81251 62.218 6.17939 62.1 6.11251C60.26 5.07251 58.167 5.67918 57.35 6.11251L56.4 1.81251C56.133 3.42918 55.56 7.07251 55.4 8.71251C55.24 10.3525 53.233 10.4625 52.25 10.3125C42.05 8.79251 41.65 6.46251 40.1 2.12513Z");

        ctx.save();
        ctx.translate(0, 0);
        ctx.fill(path);
        ctx.restore();

        const newMask = [];
        const imageData = ctx.getImageData(0, 0, cols, rows).data;

        for (let y = 0; y < rows; y++) {
            const row = [];
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
                        if (Math.random() > 0.3) {
                            buffer += chars[Math.floor(Math.random() * chars.length)];
                        } else {
                            buffer += " ";
                        }
                    } else {
                        buffer += " ";
                    }
                }
                buffer += "\\n";
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
                className="font-mono leading-none select-none pointer-events-none whitespace-pre text-cyan-400 font-bold"
                style={{
                    fontSize: '10px',
                    textShadow: '0 0 10px rgba(6, 182, 212, 0.6), 0 0 20px rgba(6, 182, 212, 0.4)'
                }}
            >
                {frame}
            </pre>
            <style jsx>{\`
                @media (max-width: 768px) {
                    pre { font-size: 7px !important; }
                }
            \`}</style>
        </div>
    );
};

export default AsciiBatman;
`;

const WATER_WAVES_CODE_TSX = `"use client";

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
            
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const nx = x / cols;
                    const ny = y / rows;

                    const wave1 = Math.sin(ny * Math.PI * 3 - t * 0.4) * 0.2;
                    const wave2 = Math.sin(ny * Math.PI * 4 - t * 0.5 + nx * Math.PI) * 0.15;
                    const wave3 = Math.sin(nx * Math.PI * 6 + ny * Math.PI * 2 - t * 0.3) * 0.1;
                    
                    const shoreProximity = Math.max(0, ny - 0.6);
                    const foam = Math.sin(nx * Math.PI * 10 - t * 1.2) * shoreProximity * 0.15;
                    const breakingWave = Math.sin(ny * Math.PI * 5 - t * 0.6 + nx * 0.5) * 0.08;

                    let waveHeight = wave1 + wave2 + wave3 + foam + breakingWave;
                    const shoreIntensity = ny * 0.3;
                    waveHeight += shoreIntensity;
                    
                    const washCycle = Math.sin(t * 0.25) * 0.5 + 0.5;
                    const washEffect = ny * washCycle * 0.2;
                    waveHeight += washEffect;
                    
                    if (waveHeight > 0.5) output += "≈";
                    else if (waveHeight > 0.35) output += "~";
                    else if (waveHeight > 0.2) output += "∼";
                    else if (waveHeight > 0.1) output += "-";
                    else if (waveHeight > 0.0) output += "·";
                    else output += " ";
                }
                output += "\\n";
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
`;

const WATER_WAVES_CODE_JSX = `"use client";

import React, { useEffect, useRef, useState } from "react";

const WaterWaves = () => {
    const [frame, setFrame] = useState("");
    const containerRef = useRef(null);
    const [cols, setCols] = useState(120);
    const rows = 40;

    const timeRef = useRef(0);

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
        let animationFrameId;

        const render = () => {
            timeRef.current += 0.016;
            const t = timeRef.current;

            let output = "";
            
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const nx = x / cols;
                    const ny = y / rows;

                    const wave1 = Math.sin(ny * Math.PI * 3 - t * 0.4) * 0.2;
                    const wave2 = Math.sin(ny * Math.PI * 4 - t * 0.5 + nx * Math.PI) * 0.15;
                    const wave3 = Math.sin(nx * Math.PI * 6 + ny * Math.PI * 2 - t * 0.3) * 0.1;
                    
                    const shoreProximity = Math.max(0, ny - 0.6);
                    const foam = Math.sin(nx * Math.PI * 10 - t * 1.2) * shoreProximity * 0.15;
                    const breakingWave = Math.sin(ny * Math.PI * 5 - t * 0.6 + nx * 0.5) * 0.08;

                    let waveHeight = wave1 + wave2 + wave3 + foam + breakingWave;
                    const shoreIntensity = ny * 0.3;
                    waveHeight += shoreIntensity;
                    
                    const washCycle = Math.sin(t * 0.25) * 0.5 + 0.5;
                    const washEffect = ny * washCycle * 0.2;
                    waveHeight += washEffect;
                    
                    if (waveHeight > 0.5) output += "≈";
                    else if (waveHeight > 0.35) output += "~";
                    else if (waveHeight > 0.2) output += "∼";
                    else if (waveHeight > 0.1) output += "-";
                    else if (waveHeight > 0.0) output += "·";
                    else output += " ";
                }
                output += "\\n";
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
`;

const CYBER_TRANSITION_CODE_TSX = `"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * CyberTransition Component: Pure Glitch-Slice Logic
 * Architecture:
 * - 6-Row Horizontal Split: Screen is sliced into 6 distinct segments.
 * - Snap-Back Mechanism: Random 100ms horizontal displacements.
 * - Minimal Background: Clean data-grid background to focus on the slice distortion.
 */

const GRID_W = 100;
const GRID_H = 30;

const CyberTransition = () => {
    const [display, setDisplay] = useState("");
    const [isGlitching, setIsGlitching] = useState(false);
    const frameRef = useRef(0);
    const offsetsRef = useRef(new Array(6).fill(0));

    const generateBaseBuffer = (f) => {
        let buffer = new Array(GRID_H).fill(0).map(() => new Array(GRID_W).fill(" "));
        const dataChars = "01:. ";

        for (let y = 0; y < GRID_H; y++) {
            for (let x = 0; x < GRID_W; x++) {
                const noise = Math.sin(x * 0.15 + y * 0.1 + f * 0.08);
                if (noise > 0.85) {
                    buffer[y][x] = dataChars[Math.floor(Math.random() * dataChars.length)];
                }
            }
        }
        return buffer;
    };

    const renderFrame = () => {
        frameRef.current++;
        const f = frameRef.current;

        let glitchActive = false;
        if (Math.random() > 0.982) {
            glitchActive = true;
            offsetsRef.current = offsetsRef.current.map(() =>
                Math.floor((Math.random() - 0.5) * 45)
            );

            setTimeout(() => {
                offsetsRef.current = offsetsRef.current.fill(0);
                setIsGlitching(false);
            }, 100);
        }

        if (glitchActive) setIsGlitching(true);

        const buffer = generateBaseBuffer(f);
        const sliceHeight = Math.floor(GRID_H / 6);
        const glitchChars = ["@", "#", "|", "!", "X", " "];
        let output = "";

        for (let y = 0; y < GRID_H; y++) {
            const sliceIdx = Math.floor(y / sliceHeight);
            const xOffset = offsetsRef.current[sliceIdx] || 0;

            let row = "";
            for (let x = 0; x < GRID_W; x++) {
                const targetX = (x + xOffset + GRID_W) % GRID_W;

                if (isGlitching && Math.random() > 0.90 && xOffset !== 0) {
                    row += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    row += buffer[y][targetX];
                }
            }
            output += "\\n";
        }

        setDisplay(output);
    };

    useEffect(() => {
        const timer = setInterval(renderFrame, 50);
        return () => clearInterval(timer);
    }, [isGlitching]);

    return (
        <div className={\`relative w-full h-[500px] flex items-center justify-center bg-[#000000] rounded-2xl overflow-hidden border border-emerald-500/20 font-mono select-none transition-all duration-75 \${isGlitching ? 'brightness-150' : ''}\`}>
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:40px_40px]" />

            <pre className="text-emerald-500 text-[10px] sm:text-[12px] leading-none tracking-tighter filter drop-shadow-[0_0_2px_rgba(16,185,129,0.4)]">
                {display}
            </pre>

            <div className="absolute bottom-6 left-6 border-l-2 border-emerald-500/30 pl-3">
                <span className="text-[9px] text-emerald-500/40 uppercase tracking-widest block">System_Sync</span>
                <span className={\`text-[10px] font-bold \${isGlitching ? 'text-red-500' : 'text-emerald-400'}\`}>
                    {isGlitching ? "!!_INTERRUPT_!!" : "STREAM_STABLE"}
                </span>
            </div>

            <div className="absolute top-6 right-6 flex gap-1">
                {offsetsRef.current.map((offset, i) => (
                    <div
                        key={i}
                        className={\`w-1 h-4 transition-all duration-75 \${offset !== 0 ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-emerald-500/10'}\`}
                    />
                ))}
            </div>

            <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] opacity-80" />
            </div>
        </div>
    );
};

export default CyberTransition;
`;

const CYBER_TRANSITION_CODE_JSX = CYBER_TRANSITION_CODE_TSX;

const SPEED_WARP_CODE_TSX = `"use client";

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
                        else if (angle > 0) char = angle < 67.5 ? "\\\\" : "/";
                        else char = angle > -67.5 ? "/" : "\\\\";
                    }

                    grid[py][px] = char;
                }
            });

            setFrame(grid.map(row => row.join("")).join("\\n"));
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions, speed]); // Re-bind render if dimensions change

    return (
        <div 
            ref={containerRef} 
            className={"w-full h-full flex justify-center items-center overflow-hidden bg-black rounded-lg border border-green-900/30 font-mono relative " + className}
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
            <style jsx>{\`
                /* Optional override for extremely small screens */
                @media (max-width: 640px) {
                    pre { font-size: 10px !important; line-height: 10px !important; }
                }
            `}</style>
    </div>
    );
};

export default SpeedWarp; `;
const SPEED_WARP_CODE_JSX = SPEED_WARP_CODE_TSX;

const CYBERPUNK_NEBULA_CODE_TSX = `"use client";

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

        // Regenerate stars on massive resize
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
    }, [dimensions, starCount]);

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

            setFrame(grid.map(row => row.join("")).join("\\n"));
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions]);

    return (
        <div ref= { containerRef } className = { "w-full h-full flex justify-center items-center overflow-hidden bg-[#0d0d12] relative rounded-xl border border-blue-900/30 " + className } >
            {/* Background Gradient & Post-Processing */ }
            < div className = "absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-transparent to-[#2a0e3b] opacity-60 z-0" />

                <pre 
                className="font-mono text-[10px] md:text-xs leading-none select-none pointer-events-none whitespace-pre z-10 relative"
    style = {{
        color: '#a5b4fc',
            textShadow: '0 0 2px #4f46e5, 2px 0 4px #c026d3'
    }
}
            >
    { frame }
    </pre>

    < div className = "absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_3px)]" />
        </div>
    );
};

export default CyberpunkNebula; `;

const CYBERPUNK_NEBULA_CODE_JSX = CYBERPUNK_NEBULA_CODE_TSX;

const DATA_STREAM_CODE_TSX = `"use client";

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

            setFrame(grid.map(row => row.join("")).join("\\n"));
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions]);

    return (
        <div ref= { containerRef } className = { "w-full h-full flex justify-center items-center overflow-hidden bg-black relative rounded-xl border border-gray-800 " + className } >
            {/* Premium Post-processing glow */ }
            < div className = "absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.2)_0%,rgba(0,0,0,1)_80%)]" />

                <pre 
                className="font-mono text-xs leading-none select-none pointer-events-none whitespace-pre z-10 relative text-gray-300"
    style = {{
        textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' // Soft white glow
    }
}
            >
    { frame }
    </pre>

{/* Central "Void" Glow */ }
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] z-20 mix-blend-soft-light" />
    </div>
    );
};

export default DataStream; `;

    const DATA_STREAM_CODE_JSX = DATA_STREAM_CODE_TSX;

    export const COMPONENTS: ComponentMetadata[] = [
        {
            id: "speed-warp",
            name: "Speed Warp",
            version: "1.0.0",
            description: "High-speed terminal starfield with motion blur.",
            component: SpeedWarp,
            code: SPEED_WARP_CODE_TSX,
            codeJsx: SPEED_WARP_CODE_JSX
        },
        {
            id: "cyberpunk-nebula",
            name: "Cyberpunk Nebula",
            version: "1.0.0",
            description: "Stylized 3D deep space effect with parallax stars and glitch effects.",
            component: CyberpunkNebula,
            code: CYBERPUNK_NEBULA_CODE_TSX,
            codeJsx: CYBERPUNK_NEBULA_CODE_JSX
        },
        {
            id: "data-stream",
            name: "Data Stream",
            version: "1.0.0",
            description: "Swirling binary/hex data streams radiating from a central void.",
            component: DataStream,
            code: DATA_STREAM_CODE_TSX,
            codeJsx: DATA_STREAM_CODE_JSX
        },
        {
            id: "fire-effect",
            name: "Fire Effect",
            version: "1.0.0",
            description: "A procedural buffer-based ASCII fire simulation.",
            component: FireEffectFooter,
            code: FIRE_EFFECT_CODE_TSX,
            codeJsx: FIRE_EFFECT_CODE_JSX
        },
        {
            id: "matrix-02",
            name: "Matrix Data Stream",
            version: "1.0.0",
            description: "A vertical digital rain effect inspired by the classic terminal stream.",
            component: MatrixRain,
            code: MATRIX_RAIN_CODE_TSX,
            codeJsx: MATRIX_RAIN_CODE_JSX
        },
        {
            id: "ascii-lightning",
            name: "Electric Bolt",
            version: "1.0.0",
            description: "Shape-bounded particle system forming a flickering lighting bolt.",
            component: AsciiLightning,
            code: ASCII_LIGHTNING_CODE_TSX,
            codeJsx: ASCII_LIGHTNING_CODE_JSX
        },

        {
            id: "water-waves",
            name: "Water Waves",
            version: "1.0.0",
            description: "Ocean waves reaching shore with realistic wash cycles and foam effects.",
            component: WaterWaves,
            code: WATER_WAVES_CODE_TSX,
            codeJsx: WATER_WAVES_CODE_JSX
        },
        {
            id: "cyber-transition",
            name: "Cyber Transition",
            version: "1.0.0",
            description: "A screen transition effect with digital noise and slicing.",
            component: CyberTransition,
            code: CYBER_TRANSITION_CODE_TSX,
            codeJsx: CYBER_TRANSITION_CODE_JSX
        },
    ];

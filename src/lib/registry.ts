import FireEffectFooter from "@/components/fire-effect";
import MatrixRain from "@/components/matrix-rain";
import AsciiLightning from "@/components/ascii-lightning";

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
                height: "300px", //adjuste height as per you need
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
                height: "300px", //adjuste height as per you need
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

const MATRIX_RAIN_CODE_TSX = \`"use client";

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
\`;

const MATRIX_RAIN_CODE_JSX = \`"use client";

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
\`;

const ASCII_LIGHTNING_CODE_TSX = \`"use client";

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
\`;

const ASCII_LIGHTNING_CODE_JSX = \`"use client";

import React, { useEffect, useRef, useState } from "react";

const AsciiLightning = () => {
    const [frame, setFrame] = useState("");
    const canvasRef = useRef(null);
    const [mask, setMask] = useState([]);
    
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
\`;

export const COMPONENTS: ComponentMetadata[] = [
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
];

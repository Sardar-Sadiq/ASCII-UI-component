import React, { useEffect, useState, useRef } from "react";

const CyberHack = () => {
    const [display, setDisplay] = useState("");
    const [status, setStatus] = useState("INITIALIZING...");
    const frameRef = useRef(0);
    const bootLinesRef = useRef<string[]>([]);

    const width = 80;
    const height = 24;

    const BOOT_SEQUENCE = [
        "BIOS DATE 01/15/2099 14:22:55 VER 1.0.2",
        "CPU: QUANTUM CORE i9-9900K @ 80.0GHz",
        "DETECTING NEURAL LINK... [OK]",
        "LOADING KERNEL... [OK]",
        "MOUNTING VFS... [OK]",
        "BYPASSING FIREWALL... [FAIL]",
        "RETRYING... [OK]",
        "INJECTING PAYLOAD...",
        "DECRYPTING SECURITY KEYS...",
        "ACCESSING MAINFRAME...",
    ];

    const renderFrame = () => {
        frameRef.current++;
        const f = frameRef.current;
        let output = "";

        // PHASE 1: BOOT SEQUENCE (0 - 150 frames)
        if (f < 180) {
            if (f % 15 === 0 && bootLinesRef.current.length < BOOT_SEQUENCE.length) {
                bootLinesRef.current.push(BOOT_SEQUENCE[Math.floor(f / 15)]);
            }

            // Render boot lines
            output = bootLinesRef.current.join("\n");

            // Add blinking cursor
            if (f % 10 < 5) output += "_";

            // Fill rest with empty lines to maintain height
            const emptyLines = height - output.split("\n").length;
            for (let i = 0; i < emptyLines; i++) output += "\n";

            setStatus("SYSTEM_BOOT");
        }

        // PHASE 2: GLITCH & DECRYPT (150 - 300 frames)
        else if (f < 350) {
            const matrixChars = "01ABCD";
            let glitchGrid = "";

            for (let y = 0; y < height; y++) {
                let row = "";
                for (let x = 0; x < width; x++) {
                    // Create a "wave" of clear data vs glitch
                    const glitchWave = Math.sin(y * 0.2 + f * 0.1) * 20;
                    if (Math.abs(x - width / 2 + glitchWave) < 10) {
                        row += matrixChars[Math.floor(Math.random() * matrixChars.length)];
                    } else if (f % 20 > 15) {
                        row += String.fromCharCode(33 + Math.floor(Math.random() * 60));
                    } else {
                        row += " ";
                    }
                }
                glitchGrid += row + "\n";
            }
            output = glitchGrid;
            setStatus("DECRYPTING_HASH_");
        }

        // PHASE 3: ACCESS GRANTED / LOCK (300+ frames)
        else {
            const message = [
                "╔════════════════════════════════════════╗",
                "║                                        ║",
                "║           ACCESS GRANTED 🔓            ║",
                "║                                        ║",
                "║        WELCOME TO THE SYSTEM           ║",
                "║                                        ║",
                "╚════════════════════════════════════════╝"
            ];

            const startY = Math.floor((height - message.length) / 2);
            for (let y = 0; y < height; y++) {
                if (y >= startY && y < startY + message.length) {
                    const line = message[y - startY];
                    const padding = " ".repeat(Math.max(0, Math.floor((width - line.length) / 2)));
                    output += padding + line + "\n";
                } else {
                    // Background noise
                    let row = "";
                    for (let x = 0; x < width; x++) {
                        row += Math.random() > 0.98 ? "." : " ";
                    }
                    output += row + "\n";
                }
            }
            setStatus("CONNECTION_SECURE");
        }

        setDisplay(output);

        // Loop back
        if (f > 450) {
            frameRef.current = 0;
            bootLinesRef.current = [];
        }
    };

    useEffect(() => {
        const interval = setInterval(renderFrame, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden p-4 font-mono relative">
            {/* CRT Screen Container */}
            <div className="relative z-10 w-full max-w-3xl border-4 border-emerald-900/50 bg-black rounded-lg p-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] overflow-hidden">

                {/* Screen Content */}
                <div className="relative bg-[#0a0a0a] p-4 min-h-[400px] rounded border border-emerald-500/20">

                    {/* Status Header */}
                    <div className="flex justify-between border-b border-emerald-500/30 pb-2 mb-2 text-xs text-emerald-500/70">
                        <span>TERM :// ROOT_ACCESS</span>
                        <span className="animate-pulse">{status}</span>
                    </div>

                    {/* Main ASCII Display */}
                    <pre className="text-emerald-500 text-[10px] sm:text-xs leading-[1.1] whitespace-pre-wrap font-bold filter drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">
                        {display}
                    </pre>

                </div>

                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
            </div>
        </div>
    );
};

export default CyberHack;
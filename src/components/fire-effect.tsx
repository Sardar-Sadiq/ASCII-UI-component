"use client";

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
            if (i % width === 0) generatedString += `\n`;
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
                height: "300px",
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
            <style jsx>{`
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
            `}</style>
        </div>
    );
};

export default FireEffectFooter;

import React from 'react';

export function fireConfetti(count = 60) {
    const container = document.getElementById("confetti-container");
    if (!container) return;

    const colors = ['#7c3aed','#ec4899','#f59e0b','#10b981','#06b6d4','#ffffff'];
    for (let i = 0; i < count; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const dur = 1.5 + Math.random() * 2;
        const delay = Math.random() * 0.6;
        const size = 6 + Math.random() * 10;
        const rotate = Math.random() * 360;
        piece.style.cssText = `
            left:${left}%;
            width:${size}px;
            height:${size}px;
            background:${color};
            border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
            animation-duration:${dur}s;
            animation-delay:${delay}s;
            transform:rotate(${rotate}deg);
        `;
        container.appendChild(piece);
        setTimeout(() => piece.remove(), (dur + delay) * 1000 + 200);
    }
}

export default function ConfettiContainer() {
    return <div id="confetti-container" aria-hidden="true" />;
}

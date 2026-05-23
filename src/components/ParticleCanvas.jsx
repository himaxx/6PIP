import React, { useRef, useEffect } from 'react';

export default function ParticleCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles = [];
        let animationFrameId;

        const initCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            // For slow-moving bokeh, fewer large orbs look extremely clean and run perfectly
            const count = Math.min(18, Math.floor(window.innerWidth / 60));
            const colors = [
                'rgba(99, 102, 241, 0.08)',  // Indigo
                'rgba(244, 63, 94, 0.06)',   // Rose
                'rgba(217, 119, 6, 0.06)',   // Amber
                'rgba(13, 148, 136, 0.06)',  // Teal
                'rgba(16, 185, 129, 0.06)'   // Emerald
            ];

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    // Large premium bokeh orbs
                    r: Math.random() * 30 + 20, 
                    // Extremely slow, soothing drift
                    dx: (Math.random() - 0.5) * 0.18,
                    dy: (Math.random() - 0.5) * 0.18,
                    alpha: Math.random() * 0.5 + 0.3,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.dx;
                p.y += p.dy;
                
                // Wrap around edges smoothly
                if (p.x < -p.r) p.x = canvas.width + p.r;
                if (p.x > canvas.width + p.r) p.x = -p.r;
                if (p.y < -p.r) p.y = canvas.height + p.r;
                if (p.y > canvas.height + p.r) p.y = -p.r;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(animateParticles);
        };

        initCanvas();
        createParticles();
        animateParticles();

        const handleResize = () => {
            initCanvas();
            createParticles();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas id="particle-canvas" ref={canvasRef} />;
}

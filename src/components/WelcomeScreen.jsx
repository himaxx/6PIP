import React from 'react';

const AVATARS = [
    { emoji: "🦁", name: "Lion" },
    { emoji: "🦋", name: "Butterfly" },
    { emoji: "🦅", name: "Eagle" },
    { emoji: "🌺", name: "Lotus" }
];

export default function WelcomeScreen({ selectedAvatar, onSelectAvatar, onStart }) {
    return (
        <section id="screen-welcome" className="screen active">
            <div className="welcome-glow-ring"></div>
            
            <div className="brand-chip">
                <span className="brand-dot"></span>
                Humsafar Initiative · ABTMM
            </div>
            
            <div className="game-icon-hero" id="hero-icon">💑</div>
            
            <h1 className="game-title">हमसफर</h1>
            <p className="game-tagline">6PIP <span className="highlight">Personality</span> Quest</p>
            
            <p className="game-desc">
                बोरिंग survey नहीं — यह है एक <strong>personality game!</strong><br />
                30 सवाल, Quest Points, badges और आपकी असली personality! 🏆
            </p>

            <div className="stats-row">
                <div className="stat-chip">
                    <span className="stat-num">30</span>
                    <span className="stat-label">Questions</span>
                </div>
                <div className="stat-chip">
                    <span className="stat-num">150</span>
                    <span className="stat-label">Max Points</span>
                </div>
                <div className="stat-chip">
                    <span className="stat-num">3</span>
                    <span className="stat-label">Minutes</span>
                </div>
            </div>

            <div className="level-select-section">
                <p className="level-label">⚔️ अपना Avatar चुनें:</p>
                <div className="avatar-grid" id="avatar-grid">
                    {AVATARS.map((av) => (
                        <button
                            key={av.name}
                            className={`avatar-btn ${selectedAvatar === av.emoji ? 'selected' : ''}`}
                            onClick={() => onSelectAvatar(av.emoji, av.name)}
                        >
                            {av.emoji}
                            <span>{av.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <button className="btn-launch" id="btn-start" onClick={onStart}>
                <span className="btn-launch-inner">
                    <span className="btn-launch-icon">🚀</span>
                    Quest शुरू करें!
                </span>
            </button>
            
            <p className="privacy-note">🔒 कोई data save नहीं होता। 100% Private.</p>
        </section>
    );
}

import React, { useEffect, useState } from 'react';
import { fireConfetti } from './Confetti';

export default function ResultsScreen({
    selectedAvatar,
    selectedAvatarName,
    totalXP,
    maxStreak,
    answers,
    pipData,
    onRestart,
    showXPToast
}) {
    const [animateBars, setAnimateBars] = useState(false);

    useEffect(() => {
        // Fire confetti on mount
        fireConfetti(80);
        
        // Trigger score bars animation after brief delay
        const timer = setTimeout(() => {
            setAnimateBars(true);
        }, 150);

        return () => clearTimeout(timer);
    }, []);

    // Calculate Scores & Levels
    const results = pipData.map(cat => {
        const score = cat.statements.reduce((sum, st) => sum + (answers[st.id] || 0), 0);
        let level = "Normal";
        if (score >= 20) level = "Strong";
        else if (score <= 12) level = "Weak";
        return { ...cat, score, level };
    });

    const sorted = [...results].sort((a, b) => b.score - a.score);
    const top1 = sorted[0];
    const top2 = sorted[1];

    // Determine Achievements list (Refined professional labels)
    const achievements = [];
    if (totalXP >= 120) achievements.push({ emoji: "🏆", label: "Gold Category" });
    else if (totalXP >= 80) achievements.push({ emoji: "🥈", label: "Silver Category" });
    else achievements.push({ emoji: "🥉", label: "Bronze Category" });

    if (maxStreak >= 10) achievements.push({ emoji: "🔥", label: `${maxStreak} Streak!` });
    
    const strongCount = results.filter(r => r.level === "Strong").length;
    if (strongCount >= 2) achievements.push({ emoji: "💪", label: "Multi-Strong Needs" });
    
    const hasPerfectScore = results.some(r => r.score === 25);
    if (hasPerfectScore) achievements.push({ emoji: "⭐", label: "Perfect Score!" });
    
    achievements.push({ emoji: selectedAvatar, label: `${selectedAvatarName} Quest` });

    // WhatsApp Share logic (Cleaned up point references)
    const handleShare = () => {
        let text = `🎮 *हमसफर 6PIP Personality Quest — Result*\n`;
        text += `अखिल भारतीय तेरापंथ महिला मंडल\n`;
        text += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        text += `${selectedAvatar} *Player:* ${selectedAvatarName}\n`;
        text += `⚡ *Total Points:* ${totalXP}/150\n\n`;
        text += `✨ *Personality Type:*\n`;
        text += `${top1.emoji} ${top1.titleHindi.split(" (")[0]} + ${top2.emoji} ${top2.titleHindi.split(" (")[0]}\n\n`;
        text += `📊 *Score Card:*\n`;
        results.forEach(r => {
            const bar = "█".repeat(Math.round(r.score / 5)) + "░".repeat(5 - Math.round(r.score / 5));
            text += `${r.emoji} ${r.titleHindi.split(" (")[0]}: ${bar} ${r.score}/25\n`;
        });
        text += `\n💡 *अपने पार्टनर की PIP जानें और रिश्ता मज़बूत बनाएं!*\n`;
        text += `👉 आप भी खेलें — Humsafar 6PIP Quest!`;

        if (navigator.share) {
            navigator.share({ title: "Humsafar 6PIP Result", text }).catch(() => {});
        } else {
            navigator.clipboard.writeText(text).then(() => {
                showXPToast("✅ Copied! WhatsApp पर Paste करें।");
            }).catch(() => {
                showXPToast("❌ Copy failed. Screenshot लें।");
            });
        }
    };

    return (
        <section id="screen-results" className="screen active">
            
            {/* Trophy Header */}
            <div className="results-hero">
                <div className="trophy-glow">
                    <div className="trophy-icon" id="results-avatar">🏆</div>
                </div>
                <div className="final-xp-badge" id="final-xp-badge">{totalXP} Points Earned! ⚡</div>
                <h2 className="results-title">Quest Complete! 🎉</h2>
                <p className="results-org">अखिल भारतीय तेरापंथ महिला मंडल – हमसफर</p>
            </div>

            {/* Personality Reveal Card */}
            <div className="personality-reveal-card" id="personality-reveal-card">
                <div className="prc-label">✨ आपकी Personality Type</div>
                <div className="prc-avatar" id="prc-avatar">{selectedAvatar}</div>
                <h3 className="prc-type" id="prc-type">
                    {top1.emoji} {top1.titleHindi.split(" (")[0]} + {top2.emoji} {top2.titleHindi.split(" (")[0]}
                </h3>
                <p className="prc-desc" id="prc-desc">
                    आपकी प्राथमिक आवश्यकताओं में {top1.titleHindi.split(" (")[0]} और {top2.titleHindi.split(" (")[0]} सबसे आगे हैं। {top1.descriptionHindi}
                </p>
                <div className="prc-badges-row" id="prc-badges-row">
                    <span className="prc-badge prc-badge-1">{top1.emoji} {top1.id.toUpperCase()}</span>
                    <span className="prc-badge prc-badge-2">{top2.emoji} {top2.id.toUpperCase()}</span>
                </div>
            </div>

            {/* Score Board */}
            <div className="results-section-title">📊 आपका Score Board</div>
            <div className="score-board" id="score-board">
                {results.map((res) => {
                    const pct = Math.round((res.score / 25) * 100);
                    let fillClass = "score-fill-normal";
                    if (res.level === "Strong") fillClass = "score-fill-strong";
                    else if (res.level === "Weak") fillClass = "score-fill-weak";

                    return (
                        <div key={res.id} className="score-row">
                            <div className="score-row-top">
                                <span className="score-label">{res.emoji} {res.titleHindi.split(" (")[0]}</span>
                                <span className="score-val">{res.score}/25</span>
                            </div>
                            <div className="score-track">
                                <div
                                    className={`score-fill ${fillClass}`}
                                    style={{ width: animateBars ? `${pct}%` : '0%' }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Detailed Breakdown */}
            <div className="results-section-title">🔍 Personality Analysis</div>
            <div className="breakdown-cards" id="breakdown-cards">
                {results.map((res) => {
                    let badgeClass = "bd-badge-normal";
                    let badgeLabel = "🙂 Normal";
                    if (res.level === "Strong") {
                        badgeClass = "bd-badge-strong";
                        badgeLabel = "💪 Strong";
                    } else if (res.level === "Weak") {
                        badgeClass = "bd-badge-weak";
                        badgeLabel = "😬 Weak";
                    }

                    return (
                        <div key={res.id} className="bd-card">
                            <div className="bd-card-header">
                                <span className="bd-card-title">{res.emoji} {res.titleHindi}</span>
                                <span className={`bd-badge ${badgeClass}`}>{badgeLabel} ({res.score})</span>
                            </div>
                            <p className="bd-card-desc">{res.descriptionHindi}</p>
                        </div>
                    );
                })}
            </div>

            {/* Partner Insight */}
            <div className="insight-card-premium" id="insight-card">
                <div className="insight-icon">💑</div>
                <h4 className="insight-title">Humsafar Insight</h4>
                <p className="insight-body" id="insight-body">
                    आपकी Top Needs: {top1.titleHindi.split(" (")[0]} और {top2.titleHindi.split(" (")[0]} हैं। दाम्पत्य जीवन में अपने पार्टनर की PIP आवश्यकताओं को समझें और सामंजस्य बनाएं — यही Humsafar का संदेश है। 💑
                </p>
            </div>

            {/* Action Buttons */}
            <div className="results-actions">
                <button className="btn-share-wa" id="btn-share" onClick={handleShare}>
                    <span>📲</span> WhatsApp पर Share करें
                </button>
                <button className="btn-play-again" id="btn-restart" onClick={onRestart}>
                    <span>🔄</span> फिर से खेलें
                </button>
            </div>

            {/* Achievements row */}
            <div className="achievement-row" id="achievement-row">
                {achievements.map((ach, i) => (
                    <div
                        key={i}
                        className="achievement-chip"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    >
                        {ach.emoji} {ach.label}
                    </div>
                ))}
            </div>

        </section>
    );
}

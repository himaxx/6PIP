import React from 'react';

export default function QuizScreen({
    selectedAvatar,
    totalXP,
    streak,
    answers,
    currentQuestionFlat,
    allQuestions,
    pipData,
    RATING_LABELS,
    onAnswerSelect,
    onPrev,
    onNext,
    roundOverlayCatIndex,
    onCloseRoundOverlay,
    hintShown
}) {
    const q = allQuestions[currentQuestionFlat];
    const cat = q.category;
    const catIdx = q.catIndex;
    const qIdx = q.qIndex;

    const globalNum = currentQuestionFlat + 1;
    const answeredCount = Object.keys(answers).length;
    const progressPct = Math.round((answeredCount / allQuestions.length) * 100);

    const isAnswered = answers[q.id] !== undefined;
    const isLast = currentQuestionFlat === allQuestions.length - 1;

    // Calculate score for the overlay category if active
    let catScore = 0;
    let stars = "⭐";
    let overlayCat = null;
    if (roundOverlayCatIndex !== null) {
        overlayCat = pipData[roundOverlayCatIndex];
        catScore = overlayCat.statements.reduce((sum, st) => sum + (answers[st.id] || 0), 0);
        stars = catScore >= 20 ? "⭐⭐⭐" : catScore >= 13 ? "⭐⭐" : "⭐";
    }

    return (
        <section id="screen-quiz" className="screen active">
            
            {/* HUD Bar */}
            <div className="hud-bar">
                <div className="hud-left">
                    <span id="hud-avatar">{selectedAvatar}</span>
                    <div className="hud-xp-block">
                        <span className="hud-xp-label">XP</span>
                        <span className="hud-xp-val" id="hud-xp">{totalXP}</span>
                    </div>
                </div>
                
                <div className="hud-center">
                    <div className="hud-progress-track">
                        <div className="hud-progress-fill" style={{ width: `${progressPct}%` }}></div>
                    </div>
                    <span className="hud-q-count">{answeredCount}/{allQuestions.length}</span>
                </div>
                
                <div className="hud-right">
                    <span className="hud-streak">🔥 {streak}</span>
                </div>
            </div>

            {/* Category Banner */}
            <div className="category-banner" id="category-banner">
                <div className="category-banner-inner">
                    <span className="cat-emoji">{cat.emoji}</span>
                    <div className="cat-info">
                        <span className="cat-stage">Round {catIdx + 1} of {pipData.length}</span>
                        <span className="cat-name">{cat.titleHindi.split(" (")[0]}</span>
                    </div>
                    <div className="cat-xp-badge">+5 XP each</div>
                </div>
                
                {/* Category Progress Dots */}
                <div className="cat-progress-dots">
                    {cat.statements.map((st, i) => {
                        const isStAnswered = answers[st.id] !== undefined;
                        const isCurrent = i === qIdx;
                        let dotClass = "cat-dot";
                        if (isStAnswered) dotClass += " answered";
                        if (isCurrent) dotClass += " current";
                        return <div key={st.id} className={dotClass}></div>;
                    })}
                </div>
            </div>

            {/* Question Card */}
            <div className="question-card-wrap">
                <div className="question-card" id="question-card">
                    <div className="q-header">
                        <span className="q-number">Q{globalNum}</span>
                        <span className="q-category-tag">{cat.titleHindi.split(" (")[0]}</span>
                    </div>
                    
                    <p className="q-text-hindi">{q.hindi}</p>
                    <p className="q-text-eng">{q.english}</p>

                    {/* Swipe Hint */}
                    {!hintShown && (
                        <div className="swipe-hint">👆 एक option tap करें!</div>
                    )}

                    {/* Rating Options */}
                    <div className="rating-grid">
                        {RATING_LABELS.map((opt) => (
                            <button
                                key={opt.score}
                                className={`rating-btn ${answers[q.id] === opt.score ? 'selected' : ''}`}
                                onClick={() => onAnswerSelect(q.id, opt.score)}
                            >
                                <span className="rate-emoji">{opt.emoji}</span>
                                <span className="rate-label">{opt.label}</span>
                                <span className="rate-score">{opt.score}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Round Complete Overlay */}
            {roundOverlayCatIndex !== null && overlayCat && (
                <div className="round-complete-overlay" id="round-complete-overlay">
                    <div className="round-complete-card">
                        <div className="rc-emoji">{overlayCat.emoji}</div>
                        <h2 className="rc-title">{overlayCat.titleHindi.split(" (")[0]} Complete!</h2>
                        <p className="rc-score">Score: {catScore}/25 · +{catScore} XP!</p>
                        <div className="rc-stars">{stars}</div>
                        <button className="btn-next-round" onClick={onCloseRoundOverlay}>Next Round ➔</button>
                    </div>
                </div>
            )}

            {/* Navigation controls */}
            <div className="quiz-nav">
                <button
                    className="nav-btn nav-prev"
                    disabled={currentQuestionFlat === 0}
                    onClick={onPrev}
                >
                    ← Back
                </button>
                
                {/* Global category progress dots */}
                <div className="nav-dots">
                    {pipData.map((c, i) => {
                        const catAnswered = c.statements.every(st => answers[st.id] !== undefined);
                        const isCurrentCat = i === catIdx;
                        let dotClass = "nav-dot";
                        if (catAnswered) dotClass += " done";
                        if (isCurrentCat) dotClass += " active";
                        return <div key={c.id} className={dotClass}></div>;
                    })}
                </div>
                
                <button
                    className="nav-btn nav-next"
                    disabled={!isAnswered}
                    onClick={onNext}
                >
                    {isLast && isAnswered ? "🏆 Results!" : "Next →"}
                </button>
            </div>

        </section>
    );
}

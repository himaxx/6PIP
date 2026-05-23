import React, { useState, useEffect } from 'react';
import { pipData, RATING_LABELS, allQuestions } from './data/pipData';
import ParticleCanvas from './components/ParticleCanvas';
import ConfettiContainer, { fireConfetti } from './components/Confetti';
import XPToast from './components/XPToast';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

export default function App() {
    const [screen, setScreen] = useState('welcome'); // 'welcome' | 'quiz' | 'results'
    const [selectedAvatar, setSelectedAvatar] = useState('🦁');
    const [selectedAvatarName, setSelectedAvatarName] = useState('Lion');
    
    // Quiz state
    const [currentQuestionFlat, setCurrentQuestionFlat] = useState(0);
    const [answers, setAnswers] = useState({}); // { questionId: score }
    const [totalXP, setTotalXP] = useState(0);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [hintShown, setHintShown] = useState(false);
    const [roundOverlayCatIndex, setRoundOverlayCatIndex] = useState(null);

    // Toast state
    const [toastInfo, setToastInfo] = useState({ text: '', key: 0 });

    const showXPToast = (text) => {
        setToastInfo({ text, key: Date.now() });
    };

    // Welcome start
    const handleStart = () => {
        // Reset state
        setAnswers({});
        setTotalXP(0);
        setStreak(0);
        setMaxStreak(0);
        setCurrentQuestionFlat(0);
        setRoundOverlayCatIndex(null);
        setScreen('quiz');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Selecting an answer rating
    const handleAnswerSelect = (questionId, score) => {
        const prevAnswer = answers[questionId];
        
        // Update answers state
        setAnswers(prev => ({ ...prev, [questionId]: score }));

        // Dismiss instructions hint
        if (!hintShown) {
            setHintShown(true);
        }

        // Award Points if first-time answering this question
        if (prevAnswer === undefined) {
            setTotalXP(prev => prev + score);
            setStreak(prev => {
                const nextStreak = prev + 1;
                if (nextStreak > maxStreak) {
                    setMaxStreak(nextStreak);
                }
                return nextStreak;
            });
            showXPToast(`+${score} Points ⚡`);
        }

        // Auto-advance after 600ms
        setTimeout(() => {
            if (currentQuestionFlat < allQuestions.length - 1) {
                const nextQ = allQuestions[currentQuestionFlat + 1];
                const currentQ = allQuestions[currentQuestionFlat];
                
                // If moving to a new category, trigger Round Complete Overlay
                if (nextQ.catIndex !== currentQ.catIndex) {
                    setRoundOverlayCatIndex(currentQ.catIndex);
                    fireConfetti(40);
                } else {
                    setCurrentQuestionFlat(prev => prev + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        }, 600);
    };

    // Moving forward via nav button
    const handleNext = () => {
        const q = allQuestions[currentQuestionFlat];
        if (answers[q.id] === undefined) return;

        if (currentQuestionFlat < allQuestions.length - 1) {
            const nextQ = allQuestions[currentQuestionFlat + 1];
            if (nextQ.catIndex !== q.catIndex) {
                setRoundOverlayCatIndex(q.catIndex);
                fireConfetti(40);
            } else {
                setCurrentQuestionFlat(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            setScreen('results');
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Moving backward via nav button
    const handlePrev = () => {
        if (currentQuestionFlat > 0) {
            setStreak(0); // Streak resets on back-tracking navigation!
            setCurrentQuestionFlat(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Close Round Overlay and continue
    const handleCloseRoundOverlay = () => {
        setRoundOverlayCatIndex(null);
        setCurrentQuestionFlat(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Restart game
    const handleRestart = () => {
        setAnswers({});
        setTotalXP(0);
        setStreak(0);
        setMaxStreak(0);
        setCurrentQuestionFlat(0);
        setRoundOverlayCatIndex(null);
        setScreen('welcome');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Keyboard navigation shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (screen !== 'quiz' || roundOverlayCatIndex !== null) return;

            const n = parseInt(e.key);
            if (n >= 1 && n <= 5) {
                const q = allQuestions[currentQuestionFlat];
                handleAnswerSelect(q.id, n);
            } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
                const q = allQuestions[currentQuestionFlat];
                if (answers[q.id] !== undefined) {
                    handleNext();
                }
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [screen, currentQuestionFlat, answers, roundOverlayCatIndex]);

    return (
        <>
            {/* Background elements */}
            <ParticleCanvas />
            <ConfettiContainer />
            <XPToast toastKey={toastInfo.key} text={toastInfo.text} />

            <div className="app-shell">
                {screen === 'welcome' && (
                    <WelcomeScreen
                        selectedAvatar={selectedAvatar}
                        onSelectAvatar={(avatar, name) => {
                            setSelectedAvatar(avatar);
                            setSelectedAvatarName(name);
                        }}
                        onStart={handleStart}
                    />
                )}

                {screen === 'quiz' && (
                    <QuizScreen
                        selectedAvatar={selectedAvatar}
                        totalXP={totalXP}
                        streak={streak}
                        answers={answers}
                        currentQuestionFlat={currentQuestionFlat}
                        allQuestions={allQuestions}
                        pipData={pipData}
                        RATING_LABELS={RATING_LABELS}
                        onAnswerSelect={handleAnswerSelect}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        roundOverlayCatIndex={roundOverlayCatIndex}
                        onCloseRoundOverlay={handleCloseRoundOverlay}
                        hintShown={hintShown}
                    />
                )}

                {screen === 'results' && (
                    <ResultsScreen
                        selectedAvatar={selectedAvatar}
                        selectedAvatarName={selectedAvatarName}
                        totalXP={totalXP}
                        maxStreak={maxStreak}
                        answers={answers}
                        pipData={pipData}
                        onRestart={handleRestart}
                        showXPToast={showXPToast}
                    />
                )}
            </div>
        </>
    );
}

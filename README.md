# हमसफर – 6PIP Personality Quest 🎮 (React Edition)

एक मज़ेदार, तेज़ और रोमांचक self-discovery game! अपनी personality जानें, points कमाएं, streak बनाए रखें और achievements जीतें!

यह application **अखिल भारतीय तेरापंथ महिला मंडल (ABTMM)** के **हमसफर Initiative** के लिए बनाया गया है, जो दंपतियों को 6 प्राथमिक मानवीय आवश्यकताओं (Certainty, Uncertainty, Significance, Love, Growth, Contribution) के माध्यम से एक-दूसरे को बेहतर समझने में मदद करता है।

---

## 🚀 Features (Gaming & Gamification)

- **Vibrant Dark Gaming UI**: Neon glows, harmonious space-purple styling, glassmorphism card controls, and smooth animations.
- **Custom Physics Particles**: Lightweight HTML5 canvas particle background synced to requestAnimationFrame for 60fps performance without extra libraries.
- **Interactive Rating System**: Emojis accompanied by Hindi and English labels to make selection seamless and non-monotonous.
- **Game Engine & HUD**:
  - Track total XP points dynamically.
  - Maintain an active gameplay **Streak**! (Streak resets if you step back to change previous questions, encouraging direct and honest gameplay).
  - Round Complete celebrations with stars and full-screen confetti bursts after completing each of the 6 categories.
- **Trophy & Results Summary**:
  - Calculates your top 2 personality drivers.
  - Assigns unique **achievements** (Gold/Silver/Bronze rank, Streak bonuses, Multi-Strong metrics, Perfect Scores).
  - Offers custom **Humsafar Insight** recommendations for marital harmony.
  - **WhatsApp Share Integration**: Effortlessly format and copy a beautiful scorecard report or directly share it with your partner.
- **Keyboard Controls & Accessibility**:
  - Keys `1` to `5` to instantly select option ratings.
  - `ArrowLeft` / `ArrowRight` or `Enter` to navigate questions.

---

## 🛠️ Technology Stack

- **Framework**: React 18
- **Bundler**: Vite (Lightning fast)
- **Styling**: Vanilla CSS custom variables (HSL tailored, zero bloating, zero external dependency)
- **State Management**: Pure functional state hooks (`useState`, `useEffect`, `useRef`)

---

## 💻 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone or copy the project files.
2. Open your terminal inside the project directory:
   ```bash
   npm install
   ```

### Running Development Server

To launch the local development environment:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

To build a fully optimized, lightweight, production-ready bundle:
```bash
npm run build
```
The output will be placed in the `dist/` directory, ready to be hosted anywhere.

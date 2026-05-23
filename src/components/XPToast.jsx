import React, { useEffect, useState } from 'react';

export default function XPToast({ toastKey, text }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!text) return;
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 1800);
        return () => clearTimeout(timer);
    }, [toastKey, text]);

    return (
        <div id="xp-toast" className={`xp-toast ${visible ? 'show' : ''}`} aria-live="polite">
            {text}
        </div>
    );
}

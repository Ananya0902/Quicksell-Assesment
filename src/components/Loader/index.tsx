import React, { useState, useEffect } from 'react';
import './loader.css';

/**
 * Loader Component
 * 
 * This component displays a loader animation along with a custom message. It can optionally
 * be displayed in fullscreen mode. The loader is shown for at least 3 seconds if loading completes faster.
 * 
 * Props:
 * @param {boolean} [fullscreen=true] - Determines if the loader should take up the entire screen. Defaults to true.
 */

function Loader({ fullscreen = true }: { fullscreen?: boolean }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const MINIMUM_DISPLAY_TIME = 3000; // Minimum display time of 3 seconds
        const startTime = Date.now();

        // Simulate an asynchronous loading process (replace with actual loading logic)
        const fakeLoadingProcess = new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 3000); // Simulated loading time of 1 second (can replace with actual logic)
        });

        fakeLoadingProcess.then(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = MINIMUM_DISPLAY_TIME - elapsedTime;

            // Ensure loader shows for at least the remaining time
            if (remainingTime > 0) {
                setTimeout(() => setIsLoading(false), remainingTime);
            } else {
                setIsLoading(false);
            }
        });

    }, []);

    if (!isLoading) {
        return null; // Or return the actual content of your application
    }

    return (
        // Container for the loader, applies 'fullscreen' class if fullscreen is true
        <div className={`loader-container ${fullscreen ? "fullscreen" : ""}`}>
            
            {/* Emoji displayed in the loader */}
            <span className="emoji">🙏</span>
            
            {/* Loader animation with four animated squares */}
            <div className="loader-animation">
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
            </div>

            {/* Custom loader message */}
            <div className="loader-message">
                <h2>Please hire me.</h2>
                <p>You won't regret it.</p>
            </div>
        </div>
    );
}

export default Loader;

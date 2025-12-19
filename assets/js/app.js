
document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    setTimeout(() => {
        const loader = document.getElementById('preloader');
        if(loader) loader.style.transform = 'translateY(-100%)';
    }, 1800);

    // Glitch Effect
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    document.querySelectorAll('[data-glitch]').forEach(el => {
        el.onmouseenter = event => {
            let iteration = 0;
            const originalText = event.target.dataset.value || event.target.innerText;
            clearInterval(event.target.interval);
            event.target.interval = setInterval(() => {
                event.target.innerText = originalText.split("").map((letter, index) => {
                        if(index < iteration) return originalText[index];
                        return letters[Math.floor(Math.random() * 26)]
                    }).join("");
                if(iteration >= originalText.length) clearInterval(event.target.interval);
                iteration += 1 / 3;
            }, 30);
        }
    });

    // Icons
    if(typeof feather !== 'undefined') feather.replace();

    // --- NEW: The 200-Move Living Logo Engine ---
    const logoWrapper = document.getElementById('living-logo-wrapper');
    const totalCycles = 200;
    let currentCycle = 0;
    const cycleDuration = 60000; // 1 minute total cycle
    const activePhaseDuration = 30000; // 30 seconds moving out

    function generateRandomTransform() {
        // Generate random parameters within constrained limits to keep it professional
        const moveX = (Math.random() - 0.5) * 50; // Move between -25px to +25px
        const moveY = (Math.random() - 0.5) * 30; // Move between -15px to +15px
        const rotate = (Math.random() - 0.5) * 45; // Rotate between -22.5deg to +22.5deg
        const scale = 0.9 + Math.random() * 0.3;  // Scale between 0.9x to 1.2x
        const skewX = (Math.random() - 0.5) * 15; // Skew slightly

        return `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(${scale}) skewX(${skewX}deg)`;
    }

    function runLogoAnimationCycle() {
        if (currentCycle >= totalCycles) {
            console.log("Logo animation sequence completed (200 minutes).");
            return; // Stop after 200 cycles
        }

        // Phase 1: Move to a NEW unique random state (takes 30s via CSS transition)
        const newTransform = generateRandomTransform();
        logoWrapper.style.transform = newTransform;

        // Phase 2: Return to base state after 30 seconds
        setTimeout(() => {
             logoWrapper.style.transform = 'translate(0,0) rotate(0) scale(1) skew(0)';
        }, activePhaseDuration);

        currentCycle++;
        // Schedule the next cycle to start exactly 1 minute after this one started
        setTimeout(runLogoAnimationCycle, cycleDuration);
    }

    // Start the engine after a short delay to allow initial render
    if (logoWrapper) {
        setTimeout(runLogoAnimationCycle, 2000);
        console.log("Living Logo Engine Started: 200 unique cycles initiated.");
    }
});

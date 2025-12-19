
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('living-logo');
    
    if (!logo) {
        console.error("LOGO NOT FOUND!");
        return;
    }

    console.log("Logo Engine: STARTED");

    // Animation Variables
    let time = 0;

    function animate() {
        time += 0.02; // Speed of time flow

        // 1. WANDERING (Movement X/Y)
        // Combining multiple Sine waves creates a path that never perfectly repeats
        const x = Math.sin(time) * 15 + Math.cos(time * 2.3) * 10;
        const y = Math.cos(time * 1.5) * 15 + Math.sin(time * 0.7) * 10;

        // 2. BREATHING (Scale)
        // Squashing and stretching like a lung
        const scaleX = 1 + Math.sin(time * 3) * 0.05;
        const scaleY = 1 + Math.cos(time * 3) * 0.05;

        // 3. JITTER (Rotation/Shake)
        // Fast, random noise for the "nervous" look
        const jitter = (Math.random() - 0.5) * 2; // Shake by 2 degrees

        // Apply Logic
        logo.style.transform = `
            translate(${x}px, ${y}px) 
            rotate(${jitter}deg) 
            scale(${scaleX}, ${scaleY})
        `;

        requestAnimationFrame(animate);
    }

    // Start the loop
    animate();
});

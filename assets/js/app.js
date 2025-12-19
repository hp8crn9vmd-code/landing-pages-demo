
document.addEventListener('DOMContentLoaded', () => {
    const creature = document.getElementById('living-creature');
    if (!creature) return;

    console.log("Organism: ALIVE");

    // --- Organism State Variables ---
    let posX = 0, posY = 0; // Current Position
    let velX = 0, velY = 0; // Velocity
    let targetX = 0, targetY = 0; // Where it wants to go
    
    let breatheTimer = 0;
    let jitterTimer = 0;

    // --- Behavior Parameters ---
    const wanderSpeed = 0.05;  // How fast it accelerates towards target
    const damping = 0.95;      // Friction (prevents it from flying off forever)
    const wanderRange = 60;    // How far it can roam from center (pixels)
    const breatheSpeed = 0.03; // Speed of inhaling/exhaling
    const jitterIntensity = 2; // How violently it shakes

    // Pick a new random target to wander towards
    function pickNewTarget() {
        targetX = (Math.random() - 0.5) * wanderRange * 2;
        targetY = (Math.random() - 0.5) * wanderRange * 2;
        // Pick a new target randomly between 1 and 3 seconds
        setTimeout(pickNewTarget, 1000 + Math.random() * 2000);
    }
    pickNewTarget(); // Start wandering

    // THE MAIN LIFE LOOP (Runs 60fps)
    function animateOrganism() {
        // 1. Physics: Calculate Movement toward target
        const forceX = (targetX - posX) * wanderSpeed;
        const forceY = (targetY - posY) * wanderSpeed;
        
        velX += forceX;
        velY += forceY;
        
        // Apply damping (friction)
        velX *= damping;
        velY *= damping;

        posX += velX;
        posY += velY;

        // 2. Organic Breathing (Jelly Effect) using sine waves
        breatheTimer += breatheSpeed;
        // Scale X and Y inversely to create squashing stretch
        const scaleX = 1 + Math.sin(breatheTimer) * 0.05;
        const scaleY = 1 + Math.cos(breatheTimer) * 0.05;

        // 3. Nervous Jitter (High frequency noise)
        jitterTimer += 0.5; // Fast timer
        // Perlin-like noise simulation using multiple sines
        const jitterRot = (Math.sin(jitterTimer) + Math.cos(jitterTimer * 1.3)) * jitterIntensity;
        const jitterScale = 1 + (Math.sin(jitterTimer * 2) * 0.01);

        // 4. Combine all forces into final transform
        const finalTransform = `
            translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0)
            rotate(${jitterRot.toFixed(2)}deg)
            scale(${scaleX * jitterScale}, ${scaleY * jitterScale})
        `;

        creature.style.transform = finalTransform;

        requestAnimationFrame(animateOrganism);
    }

    // Start the life engine
    animateOrganism();
    
    if(typeof feather !== 'undefined') feather.replace();
});

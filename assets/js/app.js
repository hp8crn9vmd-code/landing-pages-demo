
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP
    // @ts-ignore
    gsap.config({ nullTargetWarn: false });

    const logoArea = document.querySelector('.logo-magnetic-area');
    const logoGroup = document.getElementById('pro-logo');
    const hexagon = document.querySelector('.hex-svg');
    
    // 1. CONSTANT MOTION: Smooth Rotation
    // Hexagon rotates slowly and endlessly like a precision part
    gsap.to(hexagon, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none" // Linear constant speed
    });

    // 2. CONSTANT MOTION: Hover / Float
    // The whole logo gently floats up and down (Breathing)
    gsap.to(logoGroup, {
        y: 10,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut" // Very smooth wave
    });

    // 3. INTERACTIVE PHYSICS: Magnetic Mouse Follow
    // This creates the "Professional" heavy feel
    
    // We create "quickSetters" for performance
    const xTo = gsap.quickTo(logoGroup, "x", {duration: 1, ease: "power3.out"});
    const yTo = gsap.quickTo(logoGroup, "y", {duration: 1, ease: "power3.out"});
    
    // Track mouse relative to center of screen
    window.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate distance from center (LogicDriven focuses on YOU)
        // We limit the movement so it doesn't fly off screen (max 30px)
        const moveX = (mouseX - centerX) * 0.03; 
        const moveY = (mouseY - centerY) * 0.03;

        // Apply physics-based movement (Inertia)
        xTo(moveX);
        yTo(moveY);

        // 4. 3D TILT EFFECT (Subtle)
        const rotX = (mouseY - centerY) * -0.01;
        const rotY = (mouseX - centerX) * 0.01;
        
        gsap.to(logoGroup, {
            rotationX: rotX,
            rotationY: rotY,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Icons
    if(typeof feather !== 'undefined') feather.replace();
});

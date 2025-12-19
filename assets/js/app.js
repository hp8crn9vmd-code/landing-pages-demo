
// Load tsParticles via CDN in HTML, then config here
document.addEventListener('DOMContentLoaded', async () => {
    // @ts-ignore
    await loadFull(tsParticles);

    // @ts-ignore
    await tsParticles.load("tsparticles", {
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" }, // Connect to mouse like logic
                resize: true
            },
            modes: {
                grab: { distance: 140, links: { opacity: 0.5 } }
            }
        },
        particles: {
            color: { value: "#ffffff" },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.2, // Subtle connections
                width: 1
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1, // Slow, professional movement
                straight: false
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } }
        },
        detectRetina: true
    });

    if(typeof feather !== 'undefined') feather.replace();
});

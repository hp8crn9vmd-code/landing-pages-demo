
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Vanta.js (The 3D Background)
    // @ts-ignore
    VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xfbbf24,       // Gold connection lines
        backgroundColor: 0x050505, // Deep Black/Navy background
        points: 10.00,         // Amount of dots
        maxDistance: 22.00,    // Connection distance
        spacing: 18.00         // Space between dots
    });

    // 2. Scroll Observer for Fade Effects
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 3. Mobile Menu
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if(btn && menu) {
        btn.addEventListener('click', () => menu.classList.toggle('hidden'));
    }

    // 4. Icons
    if(typeof feather !== 'undefined') feather.replace();
});


class LogicDrivenApp {
    constructor() { this.init(); }
    init() {
        console.log("🚀 LogicDriven: GSAP Mode");
        gsap.registerPlugin(ScrollTrigger);
        this.runAnimations();
        this.setupMenu();
        if (typeof feather !== 'undefined') feather.replace();
    }
    
    runAnimations() {
        // Hero Sequence
        const tl = gsap.timeline();
        tl.from(".hero-title", { y: 60, opacity: 0, duration: 1, ease: "power4.out" })
          .from(".hero-text", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".hero-actions", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".lottie-container", { scale: 0.8, opacity: 0, duration: 1 }, "-=0.8");

        // Service Cards Stagger
        gsap.from(".service-card", {
            scrollTrigger: { trigger: "#services", start: "top 80%" },
            y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out"
        });
        
        // Form Reveal
        gsap.from("#contact-form", {
            scrollTrigger: { trigger: "#contact", start: "top 75%" },
            y: 40, opacity: 0, duration: 0.8, ease: "power2.out"
        });

        // Nav Glass Effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if(window.scrollY > 50) nav.classList.add('shadow-md', 'bg-white/95');
            else nav.classList.remove('shadow-md', 'bg-white/95');
        });
    }

    setupMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if(btn && menu) btn.addEventListener('click', () => menu.classList.toggle('hidden'));
    }
}
document.addEventListener('DOMContentLoaded', () => new LogicDrivenApp());

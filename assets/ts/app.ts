
// تعريف مكتبات الطرف الثالث (للتخلص من أخطاء المترجم)
declare var gsap: any;
declare var ScrollTrigger: any;
declare var feather: any;

class LogicDrivenApp {
    constructor() {
        this.init();
    }

    private init(): void {
        console.log("🚀 LogicDriven: GSAP & Lottie Engine Online");
        
        // تسجيل الإضافات
        gsap.registerPlugin(ScrollTrigger);
        
        this.initAnimations();
        this.setupMobileMenu();
        if (typeof feather !== 'undefined') feather.replace();
    }

    private initAnimations(): void {
        // 1. Hero Animation (تسلسل زمني عند التحميل)
        const tl = gsap.timeline();
        tl.from(".hero-title", { duration: 1, y: 50, opacity: 0, ease: "power4.out" })
          .from(".hero-text", { duration: 1, y: 30, opacity: 0, ease: "power3.out" }, "-=0.6")
          .from(".hero-btn", { duration: 0.8, y: 20, opacity: 0, ease: "back.out(1.7)" }, "-=0.6")
          .from(".hero-visual", { duration: 1.5, scale: 0.9, opacity: 0, ease: "elastic.out(1, 0.75)" }, "-=1.0");

        // 2. ScrollTrigger Cards (ظهور البطاقات عند التمرير)
        gsap.utils.toArray(".service-card").forEach((card: any, i: number) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%", // يبدأ عندما يصل العنصر لـ 85% من الشاشة
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1, // تأخير بسيط بين كل بطاقة
                ease: "power2.out"
            });
        });

        // 3. Navbar Blur on Scroll
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: {className: 'scrolled', targets: 'nav'}
        });
    }

    private setupMobileMenu(): void {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
                // Simple GSAP animation for menu
                if (!menu.classList.contains('hidden')) {
                    gsap.from("#mobile-menu a", {y: 20, opacity: 0, stagger: 0.1});
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LogicDrivenApp();
});

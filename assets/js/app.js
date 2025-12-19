
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('particle-container');
    if (!container) return;

    const particles = [];
    const numParticles = 12; // عدد الجسيمات
    const center = { x: 50, y: 50 };
    const maxRadius = 32; // أقصى مسافة عن المركز قبل الارتداد

    // 1. تهيئة الجسيمات
    for (let i = 0; i < numParticles; i++) {
        // إنشاء عنصر الدائرة في SVG
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("class", "particle");
        // حجم عشوائي صغير للجسيمات
        circle.setAttribute("r", Math.random() * 1.5 + 0.5); 
        container.appendChild(circle);

        // إضافة خصائص فيزيائية لكل جسيم
        particles.push({
            element: circle,
            x: center.x,
            y: center.y,
            // سرعة واتجاه عشوائي
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8
        });
    }

    // 2. حلقة التحريك (Animation Loop)
    function animate() {
        particles.forEach(p => {
            // تحديث الموقع بناءً على السرعة
            p.x += p.vx;
            p.y += p.vy;

            // حساب المسافة عن المركز
            const dx = p.x - center.x;
            const dy = p.y - center.y;
            const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);

            // التحقق من الحدود (الارتداد)
            if (distanceFromCenter > maxRadius) {
                // عكس الاتجاه
                p.vx = -p.vx;
                p.vy = -p.vy;
                
                // دفع الجسيم للداخل قليلاً لمنع الالتصاق بالحافة
                const angle = Math.atan2(dy, dx);
                p.x = center.x + Math.cos(angle) * (maxRadius - 0.5);
                p.y = center.y + Math.sin(angle) * (maxRadius - 0.5);
            }

            // تطبيق الموقع الجديد على العنصر
            p.element.setAttribute("cx", p.x);
            p.element.setAttribute("cy", p.y);
        });

        requestAnimationFrame(animate);
    }

    // بدء التحريك
    animate();
    console.log("Quantum Particles: Active");
});

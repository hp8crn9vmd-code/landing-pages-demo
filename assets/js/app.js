
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hex-particles');
    if (!container) return;

    // إعدادات الجسيمات
    const particles = [];
    const count = 6; // عدد قليل ليبقى التصميم نظيفاً
    const centerX = 50;
    const centerY = 50;
    
    // إنشاء الجسيمات
    for(let i=0; i<count; i++) {
        const p = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        p.setAttribute("class", "particle");
        p.setAttribute("r", Math.random() * 1 + 0.5); // حجم صغير جداً (دقيق)
        container.appendChild(p);
        
        particles.push({
            el: p,
            angle: (Math.PI * 2 * i) / count, // توزيع دائري
            radius: Math.random() * 15 + 5,   // مسافة عن المركز
            speed: Math.random() * 0.02 + 0.005, // سرعة بطيئة جداً
            wobble: Math.random() * 10
        });
    }

    let time = 0;

    function animate() {
        time += 0.02;
        
        particles.forEach(p => {
            // حركة انسيابية دائرية مع تموج خفيف
            p.angle += p.speed;
            const r = p.radius + Math.sin(time + p.wobble) * 2; // تنفس خفيف للمدار
            
            const x = centerX + Math.cos(p.angle) * r;
            const y = centerY + Math.sin(p.angle) * r;
            
            p.el.setAttribute("cx", x);
            p.el.setAttribute("cy", y);
            
            // تغيير الشفافية لإعطاء عمق
            const opacity = 0.5 + Math.sin(time + p.angle) * 0.5;
            p.el.style.opacity = opacity;
        });

        requestAnimationFrame(animate);
    }

    animate();
});


document.addEventListener('DOMContentLoaded', () => {
    const core = document.getElementById('living-core');
    
    if (!core) return;
    
    // متغيرات الحركة
    let time = 0;
    
    function live() {
        time += 0.05; // سرعة الزمن

        // 1. التجول (Wandering): يتحرك يمين/يسار وفوق/تحت بعشوائية منظمة
        // نستخدم sin/cos بترددات مختلفة لكسر التكرار
        const x = Math.sin(time) * 8 + Math.cos(time * 2.1) * 5;
        const y = Math.cos(time * 1.3) * 8 + Math.sin(time * 0.7) * 5;

        // 2. التنفس (Breathing): ينفعص ويتمدد
        // عندما يتمدد أفقياً يتقلص عمودياً (الحفاظ على الحجم)
        const breathe = Math.sin(time * 3) * 0.2;
        const scaleX = 1 + breathe;
        const scaleY = 1 - breathe;

        // 3. الارتعاش (Nervous Jitter): حركة سريعة جداً توحي بالطاقة
        const jitter = (Math.random() - 0.5) * 5; // دوران عشوائي سريع

        // تطبيق الحركة على الكائن
        core.style.transform = `
            translate(${x}px, ${y}px)
            rotate(${jitter}deg)
            scale(${scaleX}, ${scaleY})
        `;

        requestAnimationFrame(live);
    }

    // بدء الحياة
    live();
});

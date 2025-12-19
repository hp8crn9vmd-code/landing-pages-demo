
document.addEventListener('DOMContentLoaded', () => {
    // 1. Hide Preloader
    setTimeout(() => { document.getElementById('preloader').style.transform = 'translateY(-100%)'; }, 1200);

    // 2. THE INTELLIGENT ENGINE
    const target = document.getElementById('smart-logo-target');
    const dataDisplay = document.getElementById('logo-coords');
    
    // متغيرات الحركة (الزمن)
    let t = 0; 
    
    // دالة لتوليد حركة انسيابية معقدة (Lissajous figures inspired)
    // نستخدم ترددات مختلفة (أرقام أولية) لضمان عدم تكرار النمط بسرعة
    function updateFrame() {
        t += 0.005; // سرعة الزمن (بطيء ودقيق)

        // معادلات الحركة (Math-Driven Logic)
        // دمج موجات الجيب وجيب التمام بترددات مختلفة يخلق مساراً "عضويًا" وغير مكرر
        const x = Math.sin(t * 1.7) * 4 + Math.cos(t * 2.3) * 2; 
        const y = Math.cos(t * 1.3) * 3 + Math.sin(t * 2.9) * 2;
        const rotate = Math.sin(t * 0.5) * 2; // دوران خفيف جداً (درجتين فقط)
        const scale = 1 + (Math.sin(t * 4) * 0.02); // "تنفس" خفيف جداً

        // تطبيق التحويل بدقة عالية
        if (target) {
            target.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        }

        // تحديث إحداثيات البيانات (للمظهر الاحترافي)
        if (dataDisplay) {
            dataDisplay.innerText = `X:${x.toFixed(1)} Y:${y.toFixed(1)}`;
        }

        // طلب الإطار التالي (60fps) - حركة ناعمة جداً
        requestAnimationFrame(updateFrame);
    }

    // بدء المحرك
    console.log("Smart Engine: Initialized");
    requestAnimationFrame(updateFrame);
    
    // Feather Icons
    if(typeof feather !== 'undefined') feather.replace();
});

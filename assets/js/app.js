
document.addEventListener('DOMContentLoaded', () => {
    // Hide Preloader
    setTimeout(() => { document.getElementById('preloader').style.transform = 'translateY(-100%)'; }, 1000);

    // --- LOGO ENGINE START ---
    const logoWrapper = document.getElementById('living-logo-wrapper');
    
    if (logoWrapper) {
        console.log("Logo Engine: ONLINE");
        let cycle = 0;
        
        // دالة الحركة العشوائية
        const moveLogo = () => {
            cycle++;
            
            // توليد قيم عشوائية كبيرة (للـتوضيح)
            const x = (Math.random() - 0.5) * 50;  // 50px يمين/يسار
            const y = (Math.random() - 0.5) * 30;  // 30px فوق/تحت
            const rot = (Math.random() - 0.5) * 30; // 30 درجة دوران
            const scale = 0.9 + Math.random() * 0.3; // تكبير وتصغير
            
            // تطبيق الحركة
            logoWrapper.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;
            
            // العودة للوضع الطبيعي بعد 1.5 ثانية
            setTimeout(() => {
                logoWrapper.style.transform = 'translate(0,0) rotate(0) scale(1)';
            }, 1500);
        };

        // تشغيل الحركة كل 3 ثواني
        setInterval(moveLogo, 3000);
        
        // تشغيل أول حركة فوراً
        setTimeout(moveLogo, 500);
    }
    
    if(typeof feather !== 'undefined') feather.replace();
});

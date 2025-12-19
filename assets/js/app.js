
document.addEventListener('DOMContentLoaded', () => {
    // Select the SVG elements
    const core = document.querySelector('.living-core');
    const frame = document.querySelector('.hex-frame');
    
    if (!core) return;
    
    let time = 0;
    
    function live() {
        time += 0.05;

        // --- 1. THE CORE (Living Organism) ---
        // يتجول داخل الحدود
        const x = Math.sin(time) * 5 + Math.cos(time * 2.5) * 3;
        const y = Math.cos(time * 1.5) * 5 + Math.sin(time * 1.0) * 3;
        
        // يتنفس
        const scale = 1 + Math.sin(time * 4) * 0.1;
        
        // يرتعش
        const jitter = (Math.random() - 0.5) * 10;

        core.style.transform = `
            translate(${x}px, ${y}px)
            scale(${scale})
            rotate(${jitter}deg)
        `;

        // --- 2. THE FRAME (Stability) ---
        // يدور ببطء شديد ليعطي شعور الاحتواء
        // نستخدم CSS transform في JS للتحكم الدقيق
        // frame.style.transform = `rotate(${Math.sin(time * 0.1) * 10}deg)`;

        requestAnimationFrame(live);
    }

    live();
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animation Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    
    // 2. Mobile Menu Logic
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if(btn) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // 3. Functional Contact Form Simulation
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Simulation Logic
            btn.innerHTML = '<span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span> جاري الإرسال...';
            btn.disabled = true;
            
            setTimeout(() => {
                Swal.fire({
                    title: 'تم استلام طلبك بنجاح!',
                    text: 'رقم التذكرة المرجعي: #' + Math.floor(Math.random() * 90000 + 10000),
                    icon: 'success',
                    confirmButtonColor: '#0f172a'
                });
                btn.innerHTML = originalText;
                btn.disabled = false;
                form.reset();
            }, 2000);
        });
    }
    
    // Initialize Icons
    feather.replace();
});

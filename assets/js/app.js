
class LogicDrivenApp {
    constructor() { this.init(); }
    init() {
        console.log("🚀 LogicDriven System: Online");
        this.setupScrollObserver();
        this.setupMobileMenu();
        this.setupContactForm();
        if (typeof feather !== 'undefined') feather.replace();
    }
    setupScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    }
    setupMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) btn.addEventListener('click', () => menu.classList.toggle('hidden'));
    }
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                const name = document.getElementById('input-name').value;
                const service = document.getElementById('input-service').value;
                
                btn.innerHTML = '<span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span> Processing...';
                btn.disabled = true;
                
                setTimeout(() => {
                    Swal.fire({
                        title: 'Request Received!',
                        text: `Thank you, ${name}. We have received your inquiry regarding "${service}". Our team will contact you shortly.`,
                        icon: 'success',
                        confirmButtonColor: '#0f172a',
                        confirmButtonText: 'Close'
                    });
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    form.reset();
                }, 1500);
            });
        }
    }
}
document.addEventListener('DOMContentLoaded', () => { new LogicDrivenApp(); });


// Interface Definitions
interface IContactForm {
    name: string;
    email: string;
    service: string;
    message: string;
}

class LogicDrivenApp {
    constructor() {
        this.init();
    }

    private init(): void {
        console.log("🚀 LogicDriven System: Online");
        this.setupScrollObserver();
        this.setupMobileMenu();
        this.setupContactForm();
        // @ts-ignore
        if (typeof feather !== 'undefined') feather.replace();
    }

    private setupScrollObserver(): void {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    }

    private setupMobileMenu(): void {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.addEventListener('click', () => menu.classList.toggle('hidden'));
        }
    }

    private setupContactForm(): void {
        const form = document.getElementById('contact-form') as HTMLFormElement;
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }
    }

    private async handleFormSubmit(form: HTMLFormElement): Promise<void> {
        const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        const originalText = btn.innerHTML;
        
        // Form Data
        const name = (document.getElementById('input-name') as HTMLInputElement).value;
        const service = (document.getElementById('input-service') as HTMLSelectElement).value;

        // Simulate API Call
        btn.innerHTML = '<span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span> Processing...';
        btn.disabled = true;

        await new Promise(resolve => setTimeout(resolve, 2000));

        // English Success Alert
        // @ts-ignore
        Swal.fire({
            title: 'Request Received!',
            text: `Thank you, ${name}. We have received your inquiry regarding "${service}". Our team will contact you shortly.`,
            icon: 'success',
            confirmButtonColor: '#0f172a',
            confirmButtonText: 'Great!'
        });

        btn.innerHTML = originalText;
        btn.disabled = false;
        form.reset();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LogicDrivenApp();
});

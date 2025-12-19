
// 1. تعريف واجهات البيانات (Data Interfaces)
interface IService {
    id: string;
    title: string;
}

interface IContactForm {
    name: string;
    email: string;
    service: string;
    message: string;
}

// 2. فئة إدارة التطبيق (Application Class)
class LogicDrivenApp {
    private appName: string;
    private version: string = "2.0.0-TS";

    constructor(name: string) {
        this.appName = name;
        this.init();
    }

    private init(): void {
        console.log(`🚀 System Initialized: ${this.appName} v${this.version}`);
        this.setupScrollObserver();
        this.setupMobileMenu();
        this.setupContactForm();
        
        // تفعيل أيقونات Feather
        // @ts-ignore
        if (typeof feather !== 'undefined') feather.replace();
    }

    // A. مراقب التمرير (Intersection Observer) مع Type Safety
    private setupScrollObserver(): void {
        const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.fade-up');
        elements.forEach(el => observer.observe(el));
    }

    // B. القائمة الجانبية
    private setupMobileMenu(): void {
        const btn = document.getElementById('mobile-menu-btn') as HTMLButtonElement | null;
        const menu = document.getElementById('mobile-menu') as HTMLDivElement | null;

        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });
        }
    }

    // C. نموذج الاتصال (Typed Form Handling)
    private setupContactForm(): void {
        const form = document.getElementById('contact-form') as HTMLFormElement | null;
        
        if (form) {
            form.addEventListener('submit', (e: Event) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }
    }

    private async handleFormSubmit(form: HTMLFormElement): Promise<void> {
        const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        const originalText = btn.innerHTML;

        // تجميع البيانات
        const formData: IContactForm = {
            name: (document.getElementById('input-name') as HTMLInputElement).value,
            email: (document.getElementById('input-email') as HTMLInputElement).value,
            service: (document.getElementById('input-service') as HTMLSelectElement).value,
            message: (document.getElementById('input-message') as HTMLTextAreaElement).value
        };

        // التحقق من البيانات (Validation Logic)
        if (!this.validateEmail(formData.email)) {
            // @ts-ignore
            Swal.fire('تنبيه', 'يرجى إدخال بريد إلكتروني صحيح', 'warning');
            return;
        }

        // محاكاة الإرسال للسيرفر
        btn.innerHTML = '<span class="loading-spinner"></span> جاري المعالجة...';
        btn.disabled = true;

        await new Promise(resolve => setTimeout(resolve, 2000));

        // @ts-ignore
        Swal.fire({
            title: 'تم بنجاح!',
            text: `شكراً لك ${formData.name}. تم تسجيل طلبك لخدمة "${formData.service}".`,
            icon: 'success',
            confirmButtonColor: '#0f172a'
        });

        btn.innerHTML = originalText;
        btn.disabled = false;
        form.reset();
    }

    private validateEmail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// تشغيل التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new LogicDrivenApp("LOGICDRIVEN Enterprise");
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 2. فئة إدارة التطبيق (Application Class)
class LogicDrivenApp {
    constructor(name) {
        this.version = "2.0.0-TS";
        this.appName = name;
        this.init();
    }
    init() {
        console.log(`🚀 System Initialized: ${this.appName} v${this.version}`);
        this.setupScrollObserver();
        this.setupMobileMenu();
        this.setupContactForm();
        // تفعيل أيقونات Feather
        // @ts-ignore
        if (typeof feather !== 'undefined')
            feather.replace();
    }
    // A. مراقب التمرير (Intersection Observer) مع Type Safety
    setupScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
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
    setupMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });
        }
    }
    // C. نموذج الاتصال (Typed Form Handling)
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }
    }
    handleFormSubmit(form) {
        return __awaiter(this, void 0, void 0, function* () {
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            // تجميع البيانات
            const formData = {
                name: document.getElementById('input-name').value,
                email: document.getElementById('input-email').value,
                service: document.getElementById('input-service').value,
                message: document.getElementById('input-message').value
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
            yield new Promise(resolve => setTimeout(resolve, 2000));
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
        });
    }
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}
// تشغيل التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new LogicDrivenApp("LOGICDRIVEN Enterprise");
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Logic
    setTimeout(() => {
        const loader = document.getElementById('preloader');
        if(loader) {
            loader.style.transform = 'translateY(-100%)';
        }
    }, 1800);

    // 2. Glitch Effect on Hover (Keeping it professional but alive)
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    document.querySelectorAll('[data-glitch]').forEach(el => {
        el.onmouseenter = event => {
            let iteration = 0;
            const originalText = event.target.dataset.value || event.target.innerText;
            clearInterval(event.target.interval);
            event.target.interval = setInterval(() => {
                event.target.innerText = originalText.split("").map((letter, index) => {
                        if(index < iteration) return originalText[index];
                        return letters[Math.floor(Math.random() * 26)]
                    }).join("");
                if(iteration >= originalText.length) clearInterval(event.target.interval);
                iteration += 1 / 3;
            }, 30);
        }
    });

    if(typeof feather !== 'undefined') feather.replace();
});

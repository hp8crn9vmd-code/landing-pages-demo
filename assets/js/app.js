
document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-dot');
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });
    document.querySelectorAll('a, button, .brutal-box').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.width = '50px'; cursor.style.height = '50px'; cursor.style.backgroundColor = 'transparent'; });
        el.addEventListener('mouseleave', () => { cursor.style.width = '20px'; cursor.style.height = '20px'; cursor.style.backgroundColor = 'var(--accent)'; });
    });

    // Glitch Effect on Hover (Works ON TOP of the dazzling effect)
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Select only elements that have the data-value attribute for glitching
    document.querySelectorAll('[data-value]').forEach(el => {
        el.onmouseover = event => {
            let iteration = 0;
            clearInterval(event.target.interval);
            event.target.interval = setInterval(() => {
                event.target.innerText = event.target.innerText.split("").map((letter, index) => {
                        if(index < iteration) return event.target.dataset.value[index];
                        return letters[Math.floor(Math.random() * 26)]
                    }).join("");
                if(iteration >= event.target.dataset.value.length) clearInterval(event.target.interval);
                iteration += 1 / 3;
            }, 30);
        }
    });

    if(typeof feather !== 'undefined') feather.replace();
});

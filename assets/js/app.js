
document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Logic
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-dot');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .brutal-box').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.backgroundColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'var(--accent)';
        });
    });

    // 2. Glitch Text Effect for Headings
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    document.querySelectorAll('h1').forEach(h1 => {
        h1.onmouseover = event => {
            let iteration = 0;
            clearInterval(event.target.interval);
            
            event.target.interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if(index < iteration) return event.target.dataset.value[index];
                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("");
                
                if(iteration >= event.target.dataset.value.length) { 
                    clearInterval(event.target.interval);
                }
                
                iteration += 1 / 3;
            }, 30);
        }
    });

    if(typeof feather !== 'undefined') feather.replace();
});


window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    const headerContent = document.querySelector('.header-content');
    if (headerContent) {
        setTimeout(() => headerContent.classList.add('show'), 1500);
    }
});

const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menu-toggle-btn');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close');
const container = document.getElementById('waveContainer');

menuBtn?.addEventListener('click', () => {
    menu.classList.toggle('visible');
});

window.addEventListener('scroll', () => {
    if (window.innerWidth < 768) return;
    menu.classList.toggle(
        'visible',
        window.scrollY > window.innerHeight * 0.15
    );
});

document.getElementById('menu')?.addEventListener('click', e => {
    if (e.target.tagName === 'A' && window.innerWidth < 768) {
        menu.classList.remove('visible');
    }
});

document.querySelector('.gallery-grid')?.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
        modal.style.display = 'flex';
        modalImg.src = e.target.src;
    }
});

closeBtn?.addEventListener('click', () => modal.style.display = 'none');
modal?.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
});

const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            imageObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-grid img').forEach(img => {
    imageObserver.observe(img);
});

if (container) {
    const NUM_WAVES = 60;
    const SEGMENTS = 20;
    const waves = [];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < NUM_WAVES; i++) {
        const wave = document.createElement('div');
        wave.className = 'wave';
        wave.style.top = `${(i * 100) / NUM_WAVES}%`;

        const segs = [];
        for (let j = 0; j < SEGMENTS; j++) {
            const seg = document.createElement('div');
            seg.className = 'wave-segment';
            wave.appendChild(seg);
            segs.push(seg);
        }
        fragment.appendChild(wave);
        waves.push(segs);
    }

    container.appendChild(fragment);
    requestAnimationFrame(() => container.classList.add('ready'));

    let time = 0;
    function animate() {
        time += 0.015;
        for (let i = 0; i < waves.length; i++) {
            const offset = i * 0.3;
            for (let j = 0; j < waves[i].length; j++) {
                const x = j / SEGMENTS;
                const rot = Math.sin(x * 6 + time + offset) * 15;
                const scale = 1.8 + Math.sin(x * 4 + time + offset) * 0.4;
                waves[i][j].style.transform = `rotateX(${rot}deg) scaleY(${scale})`;
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}



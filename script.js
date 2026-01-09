
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-toggle-btn");
const container = document.getElementById('waveContainer');
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");

menuBtn.onclick = () => menu.classList.toggle("visible");

let ticking = false;
window.addEventListener("scroll", () => {
    if (!ticking && window.innerWidth >= 768) {
        window.requestAnimationFrame(() => {
            menu.classList.toggle("visible", window.scrollY > 100);
            ticking = false;
        });
        ticking = true;
    }
});

document.querySelectorAll(".gallery-grid img").forEach(img => {
    img.onclick = () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
    };
});

closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

window.addEventListener('load', () => {
    const headerContent = document.querySelector('.header-content');
    if (headerContent) {
        setTimeout(() => {
            headerContent.classList.add('show');
        }, 1000);
    }
});

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            observer.unobserve(entry.target);
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
        wave.style.zIndex = i;
        
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
        time += 0.02;
        for (let i = 0; i < waves.length; i++) {
            const offset = i * 0.3;
            for (let j = 0; j < waves[i].length; j++) {
                const x = j / SEGMENTS;
                const rot = Math.sin(x * 6 + time + offset) * 15;
                const scale = 1.8 + Math.sin(x * 4 + time + offset) * 0.4;
                
                waves[i][j].style.transform = `rotateX(${rot}deg) scaleY(${scale})`;
                waves[i][j].style.filter = `brightness(${1.1 + rot / 50})`;
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}


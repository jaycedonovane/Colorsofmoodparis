const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-toggle-btn");
const container = document.getElementById('waveContainer');
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");

// Menu toggle
menuBtn.onclick = () => menu.classList.toggle("visible");

// Scroll menu (desktop)
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

// Gallery modal
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

// Wave animation
if (container) {
    const NUM_WAVES = 50;
    const SEGMENTS = 30;
    const waves = [];
    
    // Create waves
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < NUM_WAVES; i++) {
        const wave = document.createElement('div');
        wave.className = 'wave';
        wave.style.top = `${i * 1.8}%`;
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
    
    // Animate waves
    let time = 0;
    function animate() {
        time += 0.05;
        for (let i = 0; i < waves.length; i++) {
            const offset = i * 0.3;
            for (let j = 0; j < waves[i].length; j++) {
                const x = j / SEGMENTS;
                const rot = Math.sin(x * 6 + time + offset) * 15;
                const scale = 1 + Math.sin(x * 4 + time + offset) * 0.2;
                
                waves[i][j].style.transform = `rotateX(${rot}deg) scaleY(${scale})`;
                waves[i][j].style.filter = `brightness(${1 + rot / 60})`;
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}



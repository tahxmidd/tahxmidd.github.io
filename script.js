// Loading screen
const loader = document.getElementById('loader');
const bricksCount = document.getElementById('bricksCount');
const connectorsCount = document.getElementById('connectorsCount');

function animateCount(el, end, duration) {
    const start = performance.now();
    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * end);
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

animateCount(bricksCount, 1288, 1100);
animateCount(connectorsCount, 214, 1100);

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1300);
});

// Skip loader on click, in case someone doesn't want to wait
loader.addEventListener('click', () => {
    loader.classList.add('hidden');
});

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('navMobile');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
    });
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const siblings = [...entry.target.parentElement.querySelectorAll('.fade-in')];
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 80);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

// Inventory tabs
const invTabs = document.querySelectorAll('.inv-tab');
const invPanels = document.querySelectorAll('.inventory-grid');

invTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        invTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const target = tab.dataset.tab;
        invPanels.forEach(panel => {
            panel.hidden = panel.dataset.panel !== target;
        });
    });
});

// Placeholder links — company logos/URLs land here later
document.querySelectorAll('[data-placeholder-link]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});

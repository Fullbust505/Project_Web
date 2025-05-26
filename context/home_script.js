 function animateStatElement(el, finalValue, duration = 1200) {
let isPercent = el.textContent.trim().endsWith('%') || el.dataset.value.endsWith('%');
let isFloat = String(finalValue).includes('.');
const startTime = performance.now();
function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    let value;
    if (isFloat) {
        value = (progress * finalValue).toFixed(1);
    } else {
        value = Math.floor(progress * finalValue);
    }
    el.textContent = value + (isPercent ? '%' : '');
    if (progress < 1) {
        requestAnimationFrame(update);
    } else {
        el.textContent = finalValue + (isPercent ? '%' : '');
    }
}
requestAnimationFrame(update);
}

function isInViewport(element) {
const rect = element.getBoundingClientRect();
return (
    rect.top < window.innerHeight && rect.bottom > 0
);
}

let statsAnimated = false;
function checkAndAnimateStatsGrid() {
const grid = document.getElementById('stats_grid');
if (!statsAnimated && grid && isInViewport(grid)) {
    document.querySelectorAll('.stat_value').forEach(el => {
        let val = el.dataset.value;
        let num = parseFloat(val);
        animateStatElement(el, num);
    });
    statsAnimated = true;
}
}

window.addEventListener('scroll', checkAndAnimateStatsGrid);
window.addEventListener('DOMContentLoaded', checkAndAnimateStatsGrid);
// Animate satisfaction stat when visible
function animateStat(finalValue, duration = 1200) {
    const el = document.getElementById('satisfaction_value');
    if (!el) return;
    let start = 0;
    const startTime = performance.now();
    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * finalValue);
        el.textContent = value + '%';
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = finalValue + '%';
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

let statAnimated = false;
function checkAndAnimateStat() {
    const stat = document.getElementById('satisfaction_stat');
    if (!statAnimated && stat && isInViewport(stat)) {
        animateStat(70);
        statAnimated = true;
    }
}

window.addEventListener('scroll', checkAndAnimateStat);
window.addEventListener('DOMContentLoaded', checkAndAnimateStat);

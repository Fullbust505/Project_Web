document.addEventListener("DOMContentLoaded", function () {
    const numPairs = 6;
    const cardImages = Array(numPairs).fill('testcard.png'); // Pour l'instant, toutes les mêmes images
    let cards = [...cardImages, ...cardImages].map((img, i) => ({img, id: i}));
    cards = cards.sort(() => Math.random() - 0.5);

    const memoGame = document.getElementById('memo-game');
    const memoMessage = document.getElementById('memo-message');
    let firstCard = null, secondCard = null, lock = false, matched = 0;

    if (!memoGame) return;

    memoGame.style.display = "grid";
    memoGame.style.gridTemplateColumns = "repeat(4, 100px)";
    memoGame.style.gap = "16px";
    memoGame.style.justifyContent = "center";
    memoGame.style.margin = "32px 0";

    cards.forEach((card, idx) => {
        const container = document.createElement('div');
        container.className = "memo-card-container";
        container.innerHTML = `
            <div class="memo-card" data-idx="${idx}">
                <div class="memo-card-front"></div>
                <div class="memo-card-back"><img src="../images/${card.img}" alt="" style="width:80px;height:110px;border-radius:8px;"></div>
            </div>
        `;
        memoGame.appendChild(container);

        container.querySelector('.memo-card').onclick = function() {
            if (lock || this.classList.contains('matched') || this.classList.contains('flipped')) return;
            this.classList.add('flipped');
            if (!firstCard) {
                firstCard = this;
            } else if (!secondCard && this !== firstCard) {
                secondCard = this;
                lock = true;
                const idx1 = parseInt(firstCard.dataset.idx);
                const idx2 = parseInt(secondCard.dataset.idx);
                if (cards[idx1].img === cards[idx2].img) {
                    firstCard.classList.add('matched');
                    secondCard.classList.add('matched');
                    matched++;
                    if (matched === numPairs) {
                        memoMessage.textContent = "Congratulations! You found all pairs!";
                    }
                    setTimeout(() => {
                        firstCard = secondCard = null;
                        lock = false;
                    }, 800);
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove('flipped');
                        secondCard.classList.remove('flipped');
                        firstCard = secondCard = null;
                        lock = false;
                    }, 1000);
                }
            }
        };
    });
});
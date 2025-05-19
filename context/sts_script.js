document.addEventListener("DOMContentLoaded", function () {
    const numPairs = 6;
    // Chaque paire a un pairId unique, même si l'image est la même
    const cardImages = [        
        'card1.png',
        'card2.png',
        'card3.png',
        'card4.png',
        'card5.png',
        'card6.png',
        'card7.png',
        'card8.png'];
    let cards = [];
    cardImages.forEach((img, i) => {
        cards.push({ img, pairId: i, uniqueId: `a${i}` });
        cards.push({ img, pairId: i, uniqueId: `b${i}` });
    });
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
            <div class="memo-card" data-idx="${idx}" data-pairid="${card.pairId}" data-uniqueid="${card.uniqueId}">
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
                // On compare les pairId pour vérifier la paire, mais uniqueId pour éviter de cliquer deux fois sur la même carte
                const pairId1 = firstCard.getAttribute('data-pairid');
                const pairId2 = secondCard.getAttribute('data-pairid');
                const uniqueId1 = firstCard.getAttribute('data-uniqueid');
                const uniqueId2 = secondCard.getAttribute('data-uniqueid');
                if (pairId1 === pairId2 && uniqueId1 !== uniqueId2) {
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
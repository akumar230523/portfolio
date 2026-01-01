// ----------------------------------------------------------------------------------------- HEADER

// Primary navigation Interaction ---------------

const ptabs = document.querySelectorAll(".tn");
ptabs.forEach(tab => {
    tab.addEventListener("click", () => {
        ptabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
    });
});

// Toggle Mode Function -------------------------

function toggleMode() {
    const icon = document.getElementById("modeIcon");
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        icon.classList.replace("fa-sun", "fa-moon");
    }
    else {
        icon.classList.replace("fa-moon", "fa-sun");
    }
}

// Tooggle Menu Function ------------------------

function toggleMenu() {
    const nav = document.getElementById("text-nav");
    if (nav) {
        nav.classList.toggle("show");
    }
}

// ------------------------------------------------------------------------------- Projects Section

const indicators = document.getElementById('indicators');
const cards = document.querySelectorAll('.pj-card');
const totalCards = cards.length;
let currentIndex = 1;

// Create indicators
function createIndicators() {
    for (let i = 0; i < totalCards; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (i === currentIndex ? ' active' : '');
        indicator.onclick = () => goToCard(i);
        indicators.appendChild(indicator);
    }
}

// Update indicators
function updateIndicators() {
    const allIndicators = document.querySelectorAll('.indicator');
    allIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Show specific card ---------------------------
function showCard(index) {
    cards.forEach((card, i) => {
        card.classList.remove('active', 'prev');
        if (i === index) {
            card.classList.add('active');
        } else if (i < index) {
            card.classList.add('prev');
        }
    });
    updateIndicators();
}

// Go to specific card
function goToCard(index) {
    currentIndex = index;
    showCard(currentIndex);
}

// Next card
function nextCard() {
    currentIndex = (currentIndex + 1) % totalCards;
    showCard(currentIndex);
}

// Previous card
function prevCard() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    showCard(currentIndex);
}

// Keyboard navigation --------------------------
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevCard();
    if (e.key === 'ArrowRight') nextCard();
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;
const cardsContainer = document.getElementById('pj-cards');

cardsContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

cardsContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextCard();
    if (touchEndX > touchStartX + 50) prevCard();
}

// Initialize
createIndicators();



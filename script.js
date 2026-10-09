let cards = document.querySelectorAll(".card");

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let matchedCards = 0;


// ===============================
// CARD CLICK
// ===============================

cards.forEach(function(card) {

    card.addEventListener("click", function() {

        // Agar board locked hai
        if (lockBoard) {
            return;
        }

        // Same card dobara click na ho
        if (card === firstCard) {
            return;
        }

        // Already matched card ko click na karein
        if (card.classList.contains("matched")) {
            return;
        }

        // Card flip
        card.classList.add("flip");


        // ===========================
        // FIRST CARD
        // ===========================

        if (firstCard === null) {

            firstCard = card;

            return;
        }


        // ===========================
        // SECOND CARD
        // ===========================

        secondCard = card;

        checkMatch();

    });

});


// ===============================
// CHECK MATCH
// ===============================

function checkMatch() {

    let isMatch =
        firstCard.dataset.value === secondCard.dataset.value;


    if (isMatch) {

        // Cards matched
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedCards = matchedCards + 2;


        // Selected cards reset
        resetCards();


        // Check if game is completed
        if (matchedCards === cards.length) {

            document.getElementById("message").innerHTML =
                "🎉 Congratulations! You Won!";

        }

    }

    else {

        // Temporarily lock the board
        lockBoard = true;


        // Wait 1 second
        setTimeout(function() {

            // Unflip both cards
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");


            // Reset
            resetCards();

        }, 1000);

    }

}


// ===============================
// RESET CARDS
// ===============================

function resetCards() {

    firstCard = null;
    secondCard = null;

    lockBoard = false;

}


// ===============================
// RESTART GAME
// ===============================

function restartGame() {

    cards.forEach(function(card) {

        // Unflip card
        card.classList.remove("flip");

        // Remove matched status
        card.classList.remove("matched");

    });


    // Reset variables
    firstCard = null;
    secondCard = null;

    lockBoard = false;

    matchedCards = 0;


    // Remove winning message
    document.getElementById("message").innerHTML = "";

}
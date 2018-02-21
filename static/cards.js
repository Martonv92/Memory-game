let cardBack = "fa-universal-access";
let cardsCount;
let cardFacesArray = ["fa-trophy", "fa-moon", "fa-save", "fa-paw",
    "fa-puzzle-piece", "fa-shopping-cart", "fa-star", "fa-coffee", "fa-bomb", "fa-trash-alt"];
let board = [];
let flippedCardsNumber = 0;
let flippedCardsId = [];
let currentlyFlippedCards = [];
let timeOut = 0;
let matchedCards = document.getElementsByClassName("matched");

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function flipCard() {
    let cards = document.getElementsByClassName("memory_card");
    for(let i = 0; i < cards.length; i++) {
        let card = cards[i];
        card.addEventListener('click', function() {
            if (card.children[0].classList.contains("clickable") && timeOut === 0) {
                this.children[0].classList.remove(cardBack);
                this.children[0].classList.add(board[i]);
                flippedCardsId.push(this.children[0].id);
                flippedCardsNumber += 1;
                currentlyFlippedCards.push(board[i]);
                checkForPairs();
            }});}
    }


function checkForPairs() {
    if (flippedCardsNumber === 2 && timeOut === 0) {
        for(let i = 0; i < flippedCardsNumber; i++) {
            if (currentlyFlippedCards[0] === currentlyFlippedCards[1]) {
                let card1 = document.getElementById(flippedCardsId[0]);
                let card2 = document.getElementById(flippedCardsId[1]);
                card1.classList.remove("clickable");
                card2.classList.remove("clickable");
                card1.classList.add("matched");
                card2.classList.add("matched");
                flippedCardsNumber = 0;
                currentlyFlippedCards = [];
                flippedCardsId = [];
                setTimeout(function () {if
                    (matchedCards.length === cardsCount*2) {
                        timeOut = 1;
                        alert('Congrats! You won!')
                    }

                }, 500);
            }
            else if(currentlyFlippedCards[0] !== currentlyFlippedCards[1]) {


                let card1 = document.getElementById(flippedCardsId[0]);
                let card2 = document.getElementById(flippedCardsId[1]);

                timeOut = 1;
                setTimeout(function() {
                    card1.classList.remove(currentlyFlippedCards[0]);
                    card2.classList.remove(currentlyFlippedCards[1]);
                    card1.classList.add(cardBack);
                    card2.classList.add(cardBack);
                    flippedCardsNumber = 0;
                    currentlyFlippedCards = [];
                    timeOut = 0;
                    flippedCardsId = [];
                    }, 1000);
            }
            }
        }
    }


function main() {
    cardsCount = parseInt(document.getElementById('main_container').dataset.cardCount);
    for (let i=0; i < cardsCount; i++)
        if (timeOut === 0) {
        board.push(cardFacesArray[i]);
        board.push(cardFacesArray[i]);
    }
    shuffle(board);
    flipCard();
}
main();
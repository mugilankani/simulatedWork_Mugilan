document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    { name: "image1", img: "https://github.com/Kalvium-Program/Image-files/blob/main/images/cheeseburger.png?raw=true" },
    { name: "image2", img: "https://github.com/Kalvium-Program/Image-files/blob/main/images/fries.png?raw=true" },
    { name: "image3", img: "https://github.com/Kalvium-Program/Image-files/blob/main/images/hotdog.png?raw=true" },
    { name: "image4", img: "https://github.com/Kalvium-Program/Image-files/blob/main/images/ice-cream.png?raw=true" },
    { name: "image5", img: "https://github.com/Kalvium-Program/Image-files/blob/main/images/milkshake.png?raw=true" },
    { name: "image6", img: "https://github.com/Kalvium-Program/Image-files/blob/main/images/pizza.png?raw=true" },
    { name: "image1", img: "https://github.com/Kalvium-Program/Image-files/blob/main/images/cheeseburger.png?raw=true" },
    { name: "image2", img: "https://github.com/Kalvium-Program/Image-files/blob/main/images/fries.png?raw=true" },
    { name: "image3", img: "https://github.com/Kalvium-Program/Image-files/blob/main/images/hotdog.png?raw=true" },
    { name: "image4", img: "https://github.com/Kalvium-Program/Image-files/blob/main/images/ice-cream.png?raw=true" },
    { name: "image5", img: "https://github.com/Kalvium-Program/Image-files/blob/main/images/milkshake.png?raw=true" },
    { name: "image6", img: "https://github.com/Kalvium-Program/Image-files/blob/main/images/pizza.png?raw=true" },
  ];

  const cardBackImage = "https://github.com/Kalvium-Program/Image-files/blob/main/images/blank.png?raw=true";
  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");

  let score = 0;
  let chosenCards = [];
  let chosenCardIds = [];

  function createBoard() {
    cardArray.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.setAttribute("class", "card");
      cardElement.setAttribute("data-id", index);
      const cardBack = document.createElement("img");
      cardBack.setAttribute("src", cardBackImage);
      cardElement.appendChild(cardBack);
      grid.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
    });
  }

  function flipCard() {
    const cardId = this.getAttribute("data-id");
    if (!chosenCardIds.includes(cardId)) {
      chosenCards.push(cardArray[cardId].name);
      chosenCardIds.push(cardId);
      this.firstChild.setAttribute("src", cardArray[cardId].img);
      if (chosenCards.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const [cardOneId, cardTwoId] = chosenCardIds;

    if (chosenCards[0] === chosenCards[1]) {
      cards[cardOneId].classList.add("hidden");
      cards[cardTwoId].classList.add("hidden");
      score++;
      scoreDisplay.textContent = score;
      if (score === cardArray.length / 2) {
        setTimeout(() => alert("Congratulations! You found all the pairs!"), 200);
      }
    } else {
      cards[cardOneId].firstChild.setAttribute("src", cardBackImage);
      cards[cardTwoId].firstChild.setAttribute("src", cardBackImage);
    }

    chosenCards = [];
    chosenCardIds = [];
  }

  createBoard();
});
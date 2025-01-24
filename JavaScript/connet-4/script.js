document.addEventListener("DOMContentLoaded", () => {
	const squares = document.querySelectorAll(".grid div");
	const result = document.querySelector("#result");
	const displayCurrentPlayer = document.querySelector("#current-player");
	const resetButton = document.querySelector("#reset");
	let currentPlayer = 1;
	let gameOver = false;

	const winningArrays = [
		// Horizontal wins
		[0, 1, 2, 3],
		[1, 2, 3, 4],
		[2, 3, 4, 5],
		[3, 4, 5, 6],
		[7, 8, 9, 10],
		[8, 9, 10, 11],
		[9, 10, 11, 12],
		[10, 11, 12, 13],
		[14, 15, 16, 17],
		[15, 16, 17, 18],
		[16, 17, 18, 19],
		[17, 18, 19, 20],
		[21, 22, 23, 24],
		[22, 23, 24, 25],
		[23, 24, 25, 26],
		[24, 25, 26, 27],
		[28, 29, 30, 31],
		[29, 30, 31, 32],
		[30, 31, 32, 33],
		[31, 32, 33, 34],
		[35, 36, 37, 38],
		[36, 37, 38, 39],
		[37, 38, 39, 40],
		[38, 39, 40, 41],

		// Vertical wins
		[0, 7, 14, 21],
		[7, 14, 21, 28],
		[14, 21, 28, 35],
		[1, 8, 15, 22],
		[8, 15, 22, 29],
		[15, 22, 29, 36],
		[2, 9, 16, 23],
		[9, 16, 23, 30],
		[16, 23, 30, 37],
		[3, 10, 17, 24],
		[10, 17, 24, 31],
		[17, 24, 31, 38],
		[4, 11, 18, 25],
		[11, 18, 25, 32],
		[18, 25, 32, 39],
		[5, 12, 19, 26],
		[12, 19, 26, 33],
		[19, 26, 33, 40],
		[6, 13, 20, 27],
		[13, 20, 27, 34],
		[20, 27, 34, 41],

		// Diagonal wins
		[3, 9, 15, 21],
		[4, 10, 16, 22],
		[5, 11, 17, 23],
		[6, 12, 18, 24],
		[14, 22, 30, 38],
		[15, 23, 31, 39],
		[16, 24, 32, 40],
		[17, 25, 33, 41],
		[20, 26, 32, 38],
		[19, 25, 31, 37],
		[18, 24, 30, 36],
		[17, 23, 29, 35],
		[0, 8, 16, 24],
		[1, 9, 17, 25],
		[2, 10, 18, 26],
		[3, 11, 19, 27],
	];

	function checkWin() {
		for (let combo of winningArrays) {
			const [a, b, c, d] = combo;
			if (
				squares[a].classList.contains("player-one") &&
				squares[b].classList.contains("player-one") &&
				squares[c].classList.contains("player-one") &&
				squares[d].classList.contains("player-one")
			) {
				result.textContent = "Player One Wins!";
				gameOver = true;
				return true;
			}
			if (
				squares[a].classList.contains("player-two") &&
				squares[b].classList.contains("player-two") &&
				squares[c].classList.contains("player-two") &&
				squares[d].classList.contains("player-two")
			) {
				result.textContent = "Player Two Wins!";
				gameOver = true;
				return true;
			}
		}
		return false;
	}

	function checkTie() {
		return [...squares].every((square) =>
			square.classList.contains("taken")
		);
	}

	function handleClick(i) {
		if (gameOver || squares[i].classList.contains("taken")) return;

		// Find the lowest available spot in the column
		const column = i % 7;
		let placed = false;

		for (let row = 5; row >= 0; row--) {
			const index = column + row * 7;
			if (!squares[index].classList.contains("taken")) {
				squares[index].classList.add(
					"taken",
					currentPlayer === 1 ? "player-one" : "player-two"
				);
				placed = true;

				if (checkWin()) {
					setTimeout(() => alert(result.textContent), 10);
					break;
				}

				if (checkTie()) {
					result.textContent = "Game is a Tie!";
					gameOver = true;
					break;
				}

				currentPlayer = currentPlayer === 1 ? 2 : 1;
				displayCurrentPlayer.textContent = currentPlayer;
				break;
			}
		}

		if (!placed) alert("Column is full!");
	}

	// Initialize game
	squares.forEach((square, index) => {
		square.addEventListener("click", () => handleClick(index));
	});

	resetButton.addEventListener("click", () => {
		squares.forEach((square) => {
			square.className = "";
		});
		currentPlayer = 1;
		gameOver = false;
		result.textContent = "";
		displayCurrentPlayer.textContent = currentPlayer;
	});
});
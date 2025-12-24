// 🎮 Landing page buttons
const landingPage = document.querySelector(".landingpage");
const gameContent = document.querySelector(".gameContent");
const popUp = document.getElementById("pop-up");

const localModeBtn = document.getElementById("localMode");
const AIModeBtn = document.getElementById("AIMode");
const gameInfo = document.getElementById("gameInfo");
const moreOptions = document.getElementById("moreOptions");
const close = document.querySelector(".close");

//  Gameplay variables Declaration 
const board = document.getElementById("board");
const status = document.getElementById("status");
const reset = document.getElementById("reset");
const scoreboard = document.getElementById("scoreboard");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const modeBtn = document.getElementById("modeBtn")



//console.log(board, status, reset, playerId);

// General Step 1 — SETUP & INITIALIZATION 

// My step 1 — create Cells dynamically

let cell;
for(let i = 0; i < 9; i++) {
	cell = document.createElement("div");
	//  Append to the Body
	board.appendChild(cell);
	//  Give it a Class
	cell.classList.add("cell");
	//  Assign each cell a data- attribute
	cell.dataset.index = i;
	//console.log("running", cell.dataset.index);
//	console.log(cell.dataset.index);
}

//  My step 2 — initialize Game Data
let gameBoard = [null, null, null, null, null, null, null, null, null];
let isGameOver = false;
let index;
let Xscore = 1;
let Oscore = 1;
let playerX = "X";
let playerO = "O";
let Timer;
oTurn = 0;
let currentPlayer = playerX; //1
const cells = document.querySelectorAll(".cell");

// My step 3 — Handle click logic for each cell

//  Event listeners 
document.body.addEventListener("click", handleClick
);
modeBtn.addEventListener("click",
() => {
	if(modeBtn.value === "easy") {
		modeBtn.value = "hard";
	   modeBtn.textContent = "Hard 🥵";
	} else {
		modeBtn.value = "easy";
		modeBtn.textContent = "Easy 😎";
	}
}
);
//  Popup

//  Close pop-up 
//overlay.addEventListener('click', untoggle);
// Handle "vs AI"
AIModeBtn.addEventListener("click", () => {
  isVsAI = true;                // Human vs AI
  landingPage.style.display = "none";
  gameContent.style.display = "flex";
  gameInfo.textContent = "Challenge the AI!";
  startGame();
});

/*  Mode tracking and INITIALIZATION */

// 🧠 Mode tracking variable
let isVsAI = false;

// Handle "Local Play"
localModeBtn.addEventListener("click", () => {
  isVsAI = false;               // Human vs Human
  landingPage.style.display = "none";
  gameContent.style.display = "flex";
  gameInfo.textContent = "Challenge your friend!";
  startGame();
});

function toggle() {
 // moreOptions.classList.add("chevron2");
  popUp.style.display = "flex";
  overlay.style.display = "block";
}

close.addEventListener("click", () => {
	cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner", "playerX", "playerO");
    });
	gameContent.style.display = "none";
	landingPage.style.display = "flex";
});

function untoggle() {

  //  moreOptions.classList.remove("chevron2");
    popUp.style.display = "none";
  overlay.style.display = "none";
}


const handler = {
  count: 0,
  handleEvent(event) {
    if (event.type === 'click') {
      this.count++;
     if (this.count === 1) {
       toggle();
       this.count = 0;
     }  
   }
 }

};
moreOptions.addEventListener('click', handler);
//  Close pop-up 
overlay.addEventListener('click', untoggle);
// 🧩 Game starter (wrap your game logic setup inside)
function startGame() {
  console.log("Game started in mode:", isVsAI ? "AI mode" : "Local mode");
  
  // 1. Reset Data
    gameBoard = [null, null, null, null, null, null, null, null, null];
    isGameOver = false;
    
    // 2. FORCE Player X to start (Human always goes first in a new session)
    currentPlayer = playerX;
    oTurn = 0; // Reset the toggle counter
    
    // 3. UI Cleanup
    status.textContent = `Player ${currentPlayer}'s turn`;
    if( currentPlayer === playerX) {
    board.classList.remove("board-locked");
    }
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner", "playerX", "playerO");
    });
}





//  My step 4 — Reacts on a CLICK 
/*  Main function for checkGameStatus & AITurn  */
function handleClick(cell) {
	//  Make Click = eventtarget
	let clickSpot = event.target;
	//  Stop if not cell
	if(!(clickSpot.classList.contains("cell"))) return;
	//alert("bruh");
	
	//  Stop if conditions are True
	if(!(clickSpot) || clickSpot.textContent
	!== "" || isGameOver)	return;
	
	//  Get the index e.g 0-8 for each cell
	index = clickSpot.dataset.index;
	
		//alert("👻👻");
		//  Update the Array with currentPlayer   i.e "X" or "O"
		gameBoard[index] = currentPlayer;
		
		//  Switches color for either X or O 
		const colorStyle = currentPlayer === playerX ? "playerX" : "playerO" ;
		
		cells[index].classList.add(colorStyle);
		
		// Display it in Html
		clickSpot.textContent = `${currentPlayer}`;
		
		//  Checks for a WIN or DRAW
		checkGameStatus();
		
		//console.log(gameBoard[0]);
		//console.log(gameBoard[1]);
		
		// Stop if isGameOver = True
		if(!isGameOver) {
			
			// Switches players Turn in Memory 
		currentPlayer = currentPlayer === playerX ? playerO : playerX ; //2
		
		// Updates player Status
		status.textContent = `Player ${currentPlayer}'s turn`;
		
		//  Play with AI
		if( currentPlayer === playerO && isVsAI === true) { //1
			board.classList.add("board-locked");
			console.log("board Locked");
			setTimeout( AITurn, 1000);
		}
		
    }  /*   If block  */
    
 }  /*  Function   */
 
 //  Logic for "A Win" 
 const winCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6]  // diagonal
 	];
 	
 	//  Checks for a WIN if TRUE returns the cell index if FALSE returns either a draw or null
 	/*  Standalone Function  2 */
 	function checkWin(board = gameBoard) {
 		for (let combo of winCombos) {
 			const [a, b, c] = combo;
 			if(board[a] && board[a] === board[b] && board[a] === board[c]) {
 				 
 				 //  If condition is True returns TRUE 
 				 return board[a];
 			 }
 			
 		}  /*  Loop   */
 		
 		//  If Condition is False Function returns False
 		return board.includes(null) ? null : 'draw';
 		
 	}  /*  function   */
 	
 	//  checks and Reacts on a win or draw
 	/*  Main function for checkWin  */
 	function checkGameStatus() {
 		const winner = checkWin(gameBoard);
		//  Checks for a WIN!!
		if(winner && winner !== null &&
		winner !== 'draw') {
			
			for (let combo of winCombos) {
 			const [a, b, c] = combo;
 			if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
 				 cells[a].classList.add("winner");
 				 cells[b].classList.add("winner");
 				 cells[c].classList.add("winner");
 			}
			}
			
			if(currentPlayer === playerX) { //3
				scoreX.textContent = `${Xscore}`;
				Xscore++;
			} else {
				scoreO.textContent = `${Oscore}`;
				Oscore++;
			}
			
			status.textContent = `player ${currentPlayer} Won 🎉🎊`;
	   //  Ends the Game 
			isGameOver = true;
		
		}
		
		//  Checks for a DRAW!!
		if( !(gameBoard.includes(null)) && winner === 'draw') {
			status.textContent = `Its a Draw, well-done both!`;
			//  Ends the Game 
			isGameOver = true;
		}
		
		}
		
		//  AI logic
  /* Main function for easyAI & difficultAI */
 	function AITurn() {
 		if(modeBtn.value === "easy") {
 			 easyAI();
 		} else {
 			difficultAI();
 		}
 	}
		
	/*  Main function for chooseSmartMove & checkGameStatus  */
		function easyAI() {
 	
 		const chosenIndex = chooseSmartMove();
 		//  Stops if condition not met
 		if(chosenIndex === null) return;
 		
 		//  Update the array with Current player
 		gameBoard[chosenIndex] = currentPlayer;
 		
 		//  Grabs The HTML element 
 		const AIElEMENT = cells[chosenIndex];
 		console.log(AIElEMENT);
 		
 			// Style 
		const colorStyle = currentPlayer === playerX ? "playerX" : "playerO" ;
		
		cells[chosenIndex].classList.add(colorStyle);
 		
 		//  Updates the cell textContent
 		AIElEMENT.textContent = `${currentPlayer}`;
 		
 		//  Checks for a WIN or DRAW 
 	  checkGameStatus();
 		
 		// Stop if isGameOver = True
		if(!(isGameOver)) {
			// Switches players Turn in Memory 
		currentPlayer = currentPlayer === playerX ? playerO : playerX ; //5
		
		// Updates player Status
		status.textContent = `Player ${currentPlayer}'s turn`;
		
		if(currentPlayer === playerX) {
		board.classList.remove("board-locked");
		}
		
    }  /*  if condition   */
 	}
 	
 	/*  Main function for getAIMove & executeMove  */
 	function difficultAI() { 
 		const chosenIndex = getAIMove(gameBoard);
 		
 		if(chosenIndex === -1) return;
 		
 		executeMove(chosenIndex);
 	}
 	
 	/*   chooseSmartMove function   */
 	/*  Standalone function  */
 	function chooseSmartMove() {
 		const AI_MARK = playerO; // 4
 		const HUMAN_MARK = playerX; //6
 		
 		function findWinningMove(mark) {
 			for (const combo of winCombos) {
 			
 				let markCount = 0;
 				let emptySpot = -1;
 				for (let index of combo) {
 					if(gameBoard[index] === mark) {
 						markCount++;
 					} else if(gameBoard[index] === null) {
 						emptySpot = index;
 					}
 			 }  /*  Combo loop   */
 			 if(markCount === 2 && emptySpot !== -1) {
 			 	return emptySpot;
 			 }
 			}  /*   Wincombos loop   */
 			return null;
 		}  /*  findWinningMove   */
 		
 	  const winningSpot = findWinningMove(AI_MARK);
 	  if(winningSpot !== null) {
 		  return winningSpot;
 	  }
 	  
 	  const blockSpot = findWinningMove(HUMAN_MARK);
 	  if(blockSpot !== null) {
 	  	return blockSpot;
 	  }
 	  
 	  if(gameBoard[0] === null) {
 	  	return 0;
 	  } else if (gameBoard[0] === playerO && gameBoard[1] === null) {
 	  	return 1;
 	  }
 	
 	//  Picks MIDDLE SPOT IF EMPTY
 		if(gameBoard[4] === null) {
 			return 4;
 		}
 		
 		//  MIDDLE logic
 		const middle = [1, 4, 7]; // 0, 1
 		const availableMiddle = [];
 		for(index of middle) {
 			if(gameBoard[index] === null) {
 				availableMiddle.push(index);
 			}
 		}
 		
 		if(availableMiddle.length === 3) {
 		let randomMiddle = Math.floor(Math.random() * availableMiddle.length);
 		
 			return availableMiddle[randomMiddle];
 		} 
 		
 		const corners = [0, 2, 6, 8];
 		const availableCorners = [];
 		for (index of corners) {
 			if(gameBoard[index] === null) {
 				availableCorners.push(index);
 			}
 		}
 		
 		if(availableCorners.length > 0) {
 		 let randomIndex =	Math.floor(Math.random() * availableCorners.length);
 		console.log(availableCorners[randomIndex]);
 		 return availableCorners[randomIndex];
 		}
 		
 		return chooseRandomMove();
 	
 	} 
 	
 	/*  Main function for minimax  */
 	function getAIMove(realBoard) {
  let bestScore = -Infinity;
  let bestMove = -1;
  
  //  Create a ahallow copy of gameBoard
  let simBoard = [...realBoard];

  for (let i = 0; i < 9; i++) {
    if (simBoard[i] === null) {
      simBoard[i] = playerO;
      const score = minimax(simBoard, false, 0);
      simBoard[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

  /*  Sub function for checkGameStatus  */
  function executeMove(index) {
 		gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer === playerX ? "playerX" : "playerO");
    
    checkGameStatus();
    
    if (!isGameOver) {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        status.textContent = `Player ${currentPlayer}'s turn`;
        if(currentPlayer === playerX) {
        board.classList.remove("board-locked");
        }
    }  /*  if condition   */
    
 	}
 	
 	//  Randomly picks an AVAILABLE CELL
 	/*  Sub function for getAvailableMoves   */
 	function chooseRandomMove() {
 	const moves = getAvailableMoves();
 	//  Stops if Cells are not EMPTY 
 	if(moves.length === 0) return null;
 	//  Generate Random Numbers from 0 to 8
  const randomIndex =	Math.floor(Math.random() * moves.length);
  const chosenIndex = moves[randomIndex];
  
  return chosenIndex;
 	}
 	
 	/*  Sub function for checkWin  */
 	function minimax(simBoard, isMaximizing, depth) {
  const winner = checkWin(simBoard);

  // Base case: stop recursion when game ends
  if (winner === playerO) return 10 - depth;  // AI wins (good!)
  if (winner === playerX) return depth - 10;  // Human wins (bad)
  if (winner === "draw") return 0;        // Neutral

  // AI’s turn (maximize score)
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (simBoard[i] === null) {
        simBoard[i] = playerO;  // Try a move
        const score = minimax(simBoard, false, depth + 1); // Simulate human next
        simBoard[i] = null; // Undo move
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  }

  // Human’s turn (minimize score)
  else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (simBoard[i] === null) {
        simBoard[i] = playerX; // Simulate human move
        const score = minimax(simBoard, true, depth + 1); // Back to AI next
        simBoard[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

//  Checks for AVAILABLE MOVES for chooseRandomMove logic
  /*  Standalone function   */
 	function getAvailableMoves() {
 		//  Create an Empty array to store EMPTY SLOTS
 		const availableMoves = [];
 	//  Iterate through gameBoard to get EMPTY SLOTS
 	gameBoard.forEach((cellValue, index) => {
 		if(cellValue === null) {
 			availableMoves.push(index);
 		//	console.log(availableMoves);
 		}
 	} ); /*  loop  */
 	return availableMoves;
 	}   /*  function   */
 	
 	
 	
 	//  Restart function 
	function restart() {

 		gameBoard = [null, null, null, null, null, null, null, null, null];
 		
 		document.querySelectorAll(".cell").forEach(cell => {
 			cell.textContent = "";
 			cell.classList.remove("winner");
 			cell.classList.remove("playerX", "playerO");
 		});
 		
 		if(oTurn === 1) {
 			currentPlayer = playerX; //4
 			//  Clears setTimeout to counter spamming
 			clearTimeout(Timer);
 			board.classList.remove("board-locked");
 			oTurn = 0;
 		} else if(oTurn === 0 ) {
 			currentPlayer = playerO; //2
 		//	board.classList.add("board-locked");
		//	console.log("board Locked");
			//  Play with AI
		if( currentPlayer === playerO && isVsAI === true) { //1
			board.classList.add("board-locked");
			console.log("board Locked");
		  Timer =	setTimeout( AITurn, 1000);
		}
			oTurn++;
 		}
 		
 		status.textContent = `Player ${currentPlayer}'s turn`;
 		//  Continue Game
 		isGameOver = false;
 	}
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	reset.addEventListener('click', restart);
 	
// Monitor scroll to toggle Slim Scoreboard
/*window.addEventListener("scroll", () => {
  const scoreboard = document.getElementById("scoreboard");
  
  // Get the distance from the top of the page
  // Adjust '50' if you have a header or extra margin above the board
  if (window.scrollY > 140) {
    scoreboard.classList.add("slim");
  } else {
    scoreboard.classList.remove("slim");
  }
});*/

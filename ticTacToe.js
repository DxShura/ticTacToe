const player = (name, symbol) =>{
	let win = 'no';
	return{name, win, symbol}
};

let playerOne, playerTwo;
const createPlayers = () =>{
	playerOne = player(document.getElementById('player-One').value, 'x');
	playerTwo = player(document.getElementById('player-Two').value, 'o');
	return{playerOne, playerTwo};
};

const replay = function(){
	gameBoard.board = new Array(9);
	gameBoard.turn = 0;
	gameBoard.arrayIndex = 0;
	document.getElementById('displayWin').textContent = "";
	let index = 0;
	for(let i of gameBoard.board){
		document.getElementsByClassName('content')[index].textContent = "";
		index++;
	}
}



const render = function(e){
	let position = e.target.dataset.gridnum;
	let input;
	if((gameBoard.turn % 2 === 0) && (gameBoard.board[position] === undefined) && (playerTwo.win ==='no')){
		input = playerOne.symbol;
		gameBoard.turn++;
		gameBoard.board[position] = input;
		checkWin(playerOne);
	} else if((gameBoard.turn % 2 != 0) && (gameBoard.board[position] === undefined) && (playerTwo.win ==='no')){
		input = playerTwo.symbol;
		gameBoard.turn++;
		gameBoard.board[position] = input;
		checkWin(playerTwo);
	}
	let index = 0;
	for(let i of gameBoard.board){
		document.getElementsByClassName('content')[index].textContent = i;
		index++;
	}
}

const checkWin = function(playerObj){
	for (let i=0, j=0; i<6, j<3; i=i+3, j++){
		let rowCheck = [gameBoard.board[i],gameBoard.board[i+1],gameBoard.board[i+2]];
		let colCheck = [gameBoard.board[j],gameBoard.board[j+3],gameBoard.board[j+6]];
		let diagDownCheck = [gameBoard.board[i+0],gameBoard.board[i+4],gameBoard.board[i+8]];
		let diagUpCheck = [gameBoard.board[i+2],gameBoard.board[i+4],gameBoard.board[i+6]];
		if(rowCheck.every(x => x === playerObj.symbol)){
			displayWinner(playerObj.name);
			playerObj.win = "yes";
		} else if(colCheck.every(x => x === playerObj.symbol)){
			displayWinner(playerObj.name);
			playerObj.win = "yes";
		} else if(diagDownCheck.every(x => x === playerObj.symbol)){
			displayWinner(playerObj.name);
			playerObj.win = "yes";
		} else if(diagUpCheck.every(x => x === playerObj.symbol)){
			displayWinner(playerObj.name);
			playerObj.win = "yes";
		} else if((gameBoard.turn === 9) && (playerObj.win === 'no')){
			displayWinner('tie');
		}
	}
}

const displayWinner = function(winner){
	const buttonReplay = document.getElementById('buttonReplay');
	buttonReplay.addEventListener('click', replay);
	if(winner === 'tie'){
		document.getElementById('displayWin').textContent = `It's a tie!`;
	}else {
		document.getElementById('displayWin').textContent = `${winner} wins!`;
	}
}

const gameBoard = (() =>{
	const buttonPlay = document.getElementById('buttonPlay');
	buttonPlay.addEventListener('click', createPlayers);
	let board = new Array(9);
	let turn = 0;
	let arrayIndex = 0;
	for(let i of board){
		let gameboard = document.getElementById('container');
		const content = document.createElement('div');
		content.classList.add('content');
		content.dataset.gridnum = arrayIndex;
		arrayIndex++;
		content.addEventListener('click', render);
		gameboard.appendChild(content);
	}
	return{board, turn};
})();

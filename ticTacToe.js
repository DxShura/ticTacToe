const player = (name, symbol) =>{
	let win = 'no';
	return{name, win, symbol}
};

let playerOne;
let playerTwo;
const createPlayers = () =>{
	playerOne = player(document.querySelector('#player-One').value, '<i class="fas fa-times"></i>');
	playerTwo = player(document.querySelector('#player-Two').value, '<i class="far fa-circle"></i>');
};

const replay = function(){
	gameBoard.board = new Array(9);
	gameBoard.turn = 0;
	gameBoard.arrayIndex = 0;
	document.getElementById('displayWin').textContent = "";
	let index = 0;
	for(let i of gameBoard.board){
		document.getElementsByClassName('contentTicTacToe')[index].innerHTML = "";
		index++;
	}
	createPlayers();
}



const render = function(e){
	let position = e.target.dataset.gridnum;
	let input;
	if((gameBoard.turn % 2 === 0) && (gameBoard.board[position] === undefined) && (playerTwo.win ==='no')){
		input = playerOne.symbol;
		gameBoard.turn++;
		gameBoard.board[position] = input;
		checkWin(playerOne);
	} else if((gameBoard.turn % 2 != 0) && (gameBoard.board[position] === undefined) && (playerOne.win ==='no')){
		input = playerTwo.symbol;
		gameBoard.turn++;
		gameBoard.board[position] = input;
		checkWin(playerTwo);
	}
	let index = 0;
	for(let i of gameBoard.board){
		if(i !== undefined){
			document.getElementsByClassName('contentTicTacToe')[index].innerHTML = i;
		}
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
	const displayWin = document.querySelector('#displayWin');
	if(winner === 'tie'){
		displayWin.textContent = `Match nul!`;
	} else {
		displayWin.textContent = `${winner} gagne!`;
	}
}

const gameBoard = (() =>{
	const buttonReplay = document.querySelector('#buttonReplay');
	buttonReplay.addEventListener('click', replay);
	const buttonPlay = document.querySelector('#buttonPlay');
	buttonPlay.addEventListener('click', createPlayers);
	let board = new Array(9);
	let turn = 0;
	let arrayIndex = 0;
	for(let i of board){
		let gameboard = document.querySelector('#containerTicTacToe');
		const content = document.createElement('div');
		content.classList.add('contentTicTacToe');
		content.dataset.gridnum = arrayIndex;
		arrayIndex++;
		buttonPlay.addEventListener('click', function(){
			content.addEventListener('click', render);
		});
		gameboard.appendChild(content);
	}
	return{board, turn};
})();
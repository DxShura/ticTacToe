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


const buttonPlay = document.getElementById('buttonPlay');
buttonPlay.addEventListener('click', createPlayers);

const render = function(e){
	let position = e.target.dataset.gridnum;
	let input;
	if((gameBoard.turn % 2 === 0) && (gameBoard.board[position] === undefined) && (playerTwo.win ==='no')){
		input = playerOne.symbol;
		gameBoard.turn++;
		gameBoard.board[position] = input;
	} else if((gameBoard.turn % 2 != 0) && (gameBoard.board[position] === undefined) && (playerTwo.win ==='no')){
		input = playerTwo.symbol;
		gameBoard.turn++;
		gameBoard.board[position] = input;
	}
	let index = 0;
	for(let i of gameBoard.board){
		document.getElementsByClassName('content')[index].textContent = i;
		index++;
	}
}

const gameBoard = (() =>{
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

import Game from './game';
import Player from './player';

document.addEventListener('DOMContentLoaded', () => {
	let canvas = document.getElementById('survivePlaceholder');
	let ctx = canvas.getContext('2d');

	let game = new Game();
	let options =  { 
		pos: [50, 50],
		radius: 10,
		vel: 2,
		vector: [],
		game: game
 	}

	let player = new Player(options);

	setInterval( () => {
		draw(ctx, player, game);
	}, 20);
});


//Clear Board
function refresh(ctx) {
	ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.rect(0, 0, 400, 400);
	ctx.fill();
	ctx.closePath();
}

//Draw flea
function draw(ctx, player, game) {
	refresh(ctx);
	player.draw(ctx);
	player.update();
	// debugger;
	game.moveEnemy(ctx);
}





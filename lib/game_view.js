import Game from './game';
import Player from './player';

document.addEventListener('DOMContentLoaded', () => {
	let canvas = document.getElementById('survivePlaceholder');
	let ctx = canvas.getContext('2d');

	let options =  { 
		x: 50,
		y: 50,
		radius: 10,
		vel: 2,
		vector: []
 	}

	let player = new Player(options);

	setInterval( () => {
		draw(ctx, player);
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
function draw(ctx, player, x, y) {
	refresh(ctx);
	player.draw(ctx);
	player.update();
}





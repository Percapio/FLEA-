import Game from './game';


document.addEventListener('DOMContentLoaded', () => {
	let canvas = document.getElementById('survivePlaceholder');
	let ctx = canvas.getContext('2d');


	move(ctx);
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
function draw(ctx, x, y, radius) {
	refresh(ctx);

	ctx.beginPath();
	ctx.fillStyle = 'red';
	ctx.arc(x, y, radius, 0, Math.PI * 2);
	ctx.fill();
	ctx.closePath();
}

//Move Flea
function move(ctx) {
	let x = 50;
	let y = 50;
	let radius = 5;

	setInterval( () => {
		draw(ctx, x, y, 5);


	}, 20);
}

document.addEventListener('keypress', (event) => {
	let key = event.keyCode;

	if(key == 32) {
		x = someKey(x);
	}

	return x;
});


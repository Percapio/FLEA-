import Star from './star';
import Player from './player';

window.addEventListener('DOMContentLoaded', () => {
	const DIMENSIONS = 600;

	const canvas = document.getElementById('gateIsDown');
	const ctx = canvas.getContext('2d');

	const stars = [];
	const speed = 0.5;
	let player;

	function setup() {
		player = new Player(DIMENSIONS, DIMENSIONS);

		for (let i=0; i < 600; i++) {
			stars[i] = new Star(DIMENSIONS, DIMENSIONS);
		}
	}

	function background(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.rect(0, 0, DIMENSIONS, DIMENSIONS);
		ctx.fill();
		ctx.closePath();
	}

	function play(ctx) {
		setup();
		background(ctx);
		player.show(ctx);

		for (let i=0; i < stars.length; i++) {
			stars[i].show(ctx);
			// stars[i].update(DIMENSIONS);
		}			
	}

	play(ctx);
});
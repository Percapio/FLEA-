import Star from './star';
import Player from './player';
import Bug from './bug';

window.addEventListener('DOMContentLoaded', () => {
	const DIMENSIONS = 600;

	const canvas = document.getElementById('gateIsDown');
	const ctx = canvas.getContext('2d');

	const stars = [];
	const bugs = [];
	let velx = 1;
	let vely = 1;
	let player;

	// Callback functions to move background and determine its velocity
	function moveUp() {
		if (vely < 11) {
			vely += 1;
		}
	}

	function moveDown() {
		if (vely > -11) {
			vely -= 1;
		}
	}

	function moveLeft() {
		if (velx < 11) {
			velx += 1;
		}
	}

	function moveRight() {
		if (velx > -11) {
			velx -= 1;
		}
	}

	// Initial setup of player, stars, computer, and board
	function setup() {
		player = new Player(DIMENSIONS, 
			() => move().bind(this), 
			() => velocity().bind(this) );

		for (let i=0; i < 150; i++) {
			stars[i] = new Star(DIMENSIONS);
		}

		for (let i=0; i < 50; i++) {
			bugs[i] = new Bug(DIMENSIONS);
		}
	}

	function background(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.rect(0, 0, DIMENSIONS, DIMENSIONS);
		ctx.fill();
		ctx.closePath();
	}

	// Rendering function
	function play(ctx) {
		setup();

		setInterval( () => {
			background(ctx);
			moveObjects();
			player.show(ctx);
			player.update( 
				() => moveUp(),
				() => moveDown(),
				() => moveRight(),
				() => moveLeft() );
			moveBugs();
		}, 40);
	}

	function moveObjects() {
		for (let i=0; i < stars.length; i++) {
			stars[i].show(ctx);
			stars[i].update(velx, vely, DIMENSIONS);
		}
	}

	function moveBugs() {
		for (let i=0; i < bugs.length; i++) {
			bugs[i].show(ctx);
			bugs[i].update(velx, vely, DIMENSIONS);
		}
	}
	
	// Start the game
	play(ctx);
});
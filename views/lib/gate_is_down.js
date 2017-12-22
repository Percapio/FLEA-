import Star from './star';
import Player from './player';
import Bug from './bug';
import Timer from './timer';

window.addEventListener('DOMContentLoaded', () => {
	const DIMENSIONS = 800;
	const originPoint = DIMENSIONS / 2;

	const canvas = document.getElementById('gateIsDown');
	const ctx = canvas.getContext('2d');

	let player;
	const canvasPlayer = document.getElementById('player');
	const ctxPlayer = canvasPlayer.getContext('2d');

	let timer;

	const stars = [];
	const bugs = [];
	let movX = 0;
	let vely = 10;
	let flag = false

	let arcLength = 50 * Math.PI / 180;

	// Callback functions to move background and determine its velocity
	function moveUp() {
		if (vely < 20) {
			vely += 5;
		}
	}

	function moveDown() {
		if (vely > 9) {
			vely -= 5;
		}
	}

	function moveRight() {
		ctx.rotate(3 * Math.PI / 180);
		// ctx.setTransform(1, 0, 0, 1, 0, 0);
		// flag = true;
		moveObjects();
		ctx.rotate(-1 * Math.PI / 180);
		// ctxPlayer.rotate(-3 * Math.PI / 180);
		// playerX += 10;
		// ctx.translate( 0, 0 );
		// movX -= arcLength;
	}

	function moveLeft() {
		// ctx.rotate(-3 * Math.PI / 180);
		// playerX -= 10;

		movX += arcLength
	}

	function resetFlag() {
		flag = false;
	}

	// Initial setup of player, stars, computer, and board
	function setup() {
		ctx.translate( originPoint, originPoint );
		ctxPlayer.translate( originPoint, originPoint );
		
		timer = new Timer( originPoint );

		player = new Player( originPoint,
			() => move().bind(this), 
			() => velocity().bind(this) );

		for (let i=0; i < 200; i++) {
			stars[i] = new Star(originPoint, DIMENSIONS);
		}

		// for (let i=0; i < 50; i++) {
		// 	bugs[i] = new Bug(originPoint);
		// }
	}


	// Background & Backdrop
	function background() {
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.arc( 0, 50, DIMENSIONS, 0, Math.PI * 2 );
		ctx.fill();
		ctx.closePath();
	}

	function backdrop() {
		ctx.beginPath();
		ctx.strokeStyle = '#4682B4';
		ctx.lineWidth = 170;
		ctx.arc( 0, 0, originPoint + 145, 0, Math.PI * 2 );
		ctx.stroke();
		ctx.closePath();
	}

	// Rendering function
	function play() {
		setup();

		setInterval( () => {
			player.update( 
				() => moveUp(),
				() => moveDown(),
				() => moveRight(),
				() => moveLeft() );
			player.show(ctxPlayer);
			background();
			moveObjects();
			backdrop();
			timer.draw(ctx);
			// moveBugs();
		}, 20);
	}

	function moveObjects() {
		for (let i=0; i < stars.length; i++) {
			stars[i].show(ctx, flag, () => resetFlag());
			stars[i].update(movX, vely);
		}
	}

	function moveBugs() {
		for (let i=0; i < bugs.length; i++) {
			bugs[i].show(ctx);
			bugs[i].update(movX, vely);
		}
	}
	
	// Start the game
	play(ctx);
});
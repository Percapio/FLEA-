import Star from './star';
import Player from './player';
import Bug from './bug';
import Timer from './timer';

window.addEventListener('DOMContentLoaded', () => {
	const WIDTH = 1200;
	const HEIGHT = 500;
	const originPoint = [ 30, 30 ];

	const canvas = document.getElementById('gateIsDown');
	const ctx = canvas.getContext('2d');

	let player;
	const canvasPlayer = document.getElementById('player');
	const ctxPlayer = canvasPlayer.getContext('2d');

	let timer;
	const canvasUI = document.getElementById('ui');
	const ctxUI = canvasUI.getContext('2d');

	const stars = [];
	const bugs = [];
	let vely = 5;

	let arcLength = 50 * Math.PI / 180;

	// Callback functions to move background and determine its velocity
	function thrusters(vel) {
		velocity = vel;
	}

	function turns() {
		console.log('hi');
	}

	// Initial setup of player, stars, computer, and board
	function setup() {
		// ctxPlayer.translate( originPoint[0], originPoint[1] );
		player = new Player( originPoint, ctxPlayer, WIDTH, HEIGHT,
			() => thrusters(),
			() => turns() );
		
		timer = new Timer( WIDTH, 50, ctxUI );

		// ctx.translate( originPoint, originPoint );
		// for (let i=0; i < 200; i++) {
		// 	stars[i] = new Star( WIDTH, HEIGHT );
		// }
	}

	function createBugs() {
		if (timer.bugSpawn()) {
			bugs.push(new Bug( originPoint ));
		}
	}

	// Background & Backdrop
	function background() {
		ctx.beginPath();
		ctx.fillStyle = 'black';
		// ctx.arc( 0, 50, DIMENSIONS, 0, Math.PI * 2 );
		ctx.rect(0, 0, WIDTH, HEIGHT);
		ctx.fill();
		ctx.closePath();
	}

	// Rendering function
	function play() {
		setup();

		setInterval( () => {
			timer.draw();
			player.move();
			player.update();
			// createBugs();
			background();
			// moveObjects();
			// moveBugs();
			// backdrop();
		}, 20);
	}

	function moveObjects() {
		for (let i=0; i < stars.length; i++) {
			stars[i].show(ctx);
			stars[i].update(vely);
		}
	}

	function moveBugs() {
		for (let i=0; i < bugs.length; i++) {
			bugs[i].show(ctx);
			bugs[i].update(vely);
		}
	}
	
	// Start the game
	play(ctx);
});
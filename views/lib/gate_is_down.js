import Star from './star';
import Player from './player';
import Bug from './bug';
import Timer from './timer';

window.addEventListener('DOMContentLoaded', () => {
	const WIDTH = 1200;
	const HEIGHT = 500;
	const origin = [ 30, 30 ];

	const canvas = document.getElementById('gateIsDown');
	const ctx = canvas.getContext('2d');

	let player;
	const canvasPlayer = document.getElementById('player');
	const ctxPlayer = canvasPlayer.getContext('2d');
	const playerRadius = 5;

	let timer;
	const canvasUI = document.getElementById('ui');
	const ctxUI = canvasUI.getContext('2d');

	const stars = [];
	const bugs = [];
	let hostile = false;

	// Initial setup of player, stars, computer, and board
	function setup() {
		timer = new Timer( WIDTH, 50, ctxUI );
		player = new Player( WIDTH, HEIGHT, ctxPlayer, origin,
			() => thrusters(origin) );
		

		for (let i=0; i < 350; i++) {
			stars[i] = new Star( WIDTH, HEIGHT, ctx );
		}

		for (let j=0; j < 20; j++) {
			bugs[j] = new Bug( WIDTH, HEIGHT, ctx );
		}
	}

	// Background & Backdrop
	function background() {
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.rect(0, 0, WIDTH, HEIGHT);
		ctx.fill();
		ctx.closePath();
		
		for (let i=0; i < stars.length; i++) {
			stars[i].show(ctx);
		}
	}

	// Rendering function
	function play() {
		setup();

		setInterval( () => {
			background();
			timer.draw();
			player.move();
			player.update();
			// createBugs();
			// moveObjects();
			moveBugs(ctx);
			// backdrop();
		}, 20);
	}

	function moveObjects() {

	}

	// Handle enemies
	function moveBugs() {
		for (let i=0; i < bugs.length; i++) {
			bugs[i].spotPlayer(origin, hostile, playerRadius);
			bugs[i].show(ctx);
		}

		hostile = false;
	}

	function thrusters(originPlayer = origin) {
		origin[0] = originPlayer[0];
		origin[1] = originPlayer[1];
		hostile = true;

		moveBugs();
	}

	// Start the game
	play(ctx);
});
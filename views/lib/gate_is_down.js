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
		timer = new Timer( WIDTH, 50, ctxUI );
		player = new Player( WIDTH, HEIGHT, ctxPlayer, originPoint,
			() => thrusters(),
			() => turns() );
		

		for (let i=0; i < 350; i++) {
			stars[i] = new Star( WIDTH, HEIGHT, ctx );
		}
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
			// moveBugs();
			// backdrop();
		}, 20);
	}

	function moveObjects() {

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
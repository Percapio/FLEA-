import Star from './star';
import Player from './player';
import Bug from './bug';
import Hazard from './hazard';
import Timer from './timer';
import Gate from './gate';
import Fog from './fog';

window.addEventListener('DOMContentLoaded', () => {
	const WIDTH = 1200;
	const HEIGHT = 400;
	const origin = [ 30, 30 ];

	const canvas = document.getElementById('gateIsDown');
	const ctx = canvas.getContext('2d');

	let player;
	const canvasPlayer = document.getElementById('player');
	const ctxPlayer = canvasPlayer.getContext('2d');

	let gate, fog, timer;
	const canvasUI = document.getElementById('ui');
	const ctxUI = canvasUI.getContext('2d');

	const stars = [];
	const bugs = [];
	const hazards = [];
	let hostile = false;

	// Initial setup of player, stars, computer, and board
	function setup() {
		timer = new Timer( WIDTH, 50, ctxUI );
		gate = new Gate( WIDTH, HEIGHT, ctx );

		fog = new Fog( WIDTH, HEIGHT, ctxPlayer );
		player = new Player( WIDTH, HEIGHT, ctxPlayer, origin,
			() => thrusters(origin) );
		

		for (let i=0; i < 350; i++) {
			stars[i] = new Star( WIDTH, HEIGHT, ctx );

			if (i < 21) {
				bugs[i] = new Bug( WIDTH, HEIGHT, ctx );

				if (i < 11) {
					hazards[i] = new Hazard( WIDTH, HEIGHT, ctx );
				};
			};
		};
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

		gate.show(origin);
	}

	// Rendering function
	function play() {
		setup();

		setInterval( () => {
			background();
			moveObjects();
			timer.draw();
			player.move();
			player.update();
		}, 20);
	}

	function moveObjects() {
		for (let i=0; i < bugs.length; i++) {
			bugs[i].move(origin, hostile,
				() => endGame());
			bugs[i].show(ctx);

			if (i < hazards.length) {
				hazards[i].move(origin, 
					() => endGame());
				hazards[i].show(ctx);
			}
		}

		hostile = false;
		fog.render(origin);
	}

	// Handle enemies
	function thrusters(originPlayer = origin) {
		origin[0] = originPlayer[0];
		origin[1] = originPlayer[1];
		hostile = true;

		moveObjects();
	}

	// End of game
	function endGame() {
		console.log('YOU DIED.');
	}

	// Start the game
	play(ctx);
});
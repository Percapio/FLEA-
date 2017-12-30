import Player from './mechanics/player';

import Star from './mechanics/star';
import Util from './mechanics/util';
import GameView from './mechanics/game_view';

import Hacker from './mechanics/hacker';
import Hazard from './mechanics/hazard';

window.addEventListener('DOMContentLoaded', () => {
	const WIDTH = 1200;
	const HEIGHT = 400;
	const origin = [ 30, 30 ];
	const music = new Audio('../assets/Future_World_-_Press_On_loop_2.mp3');

	const canvas = document.getElementById('gateIsDown');
	const ctx = canvas.getContext('2d');

	let player;
	const canvasPlayer = document.getElementById('player');
	const ctxPlayer = canvasPlayer.getContext('2d');

	let view, util;
	const canvasUI = document.getElementById('ui');
	const ctxUI = canvasUI.getContext('2d');

	const stars = [];
	const hackers = [];
	const hazards = [];
	let hostile = false;

	// Initial setup of player, stars, and computer
	function setup() {
		player = new Player( WIDTH, HEIGHT, ctxPlayer, origin,
			() => thrusters(origin) );
		util = new Util( music );

		util.grabData( () => makeBoard() );
	}

	function makeBoard() {
		for (let i=0; i < 350; i++) {
			stars[i] = new Star( WIDTH, HEIGHT, ctx );

			if (i < util.data.length) {
				if ( util.data[i].websites.length === 1 ) {
					hackers[i] = new Hacker( WIDTH, HEIGHT, ctx, util.data[i].name );
				} else {
					hazards[i] = new Hazard( WIDTH, HEIGHT, ctx, util.data[i] );
				}
			};
		};

		view = new GameView( WIDTH, HEIGHT, ctx, ctxUI, stars );
	}

	// Rendering function
	function play() {
		setup();

		setInterval( () => {
			view.render();
			moveObjects();
			player.move();
			player.update();
		}, 40);
	}

	function moveObjects() {
		for (let i=0; i < util.data.length; i++) {
			if ( util.data[i].websites.length === 1 ) {
				hackers[i].move(origin, hostile,
					() => endGame());
				hackers[i].show(ctx);
			} else {
				hazards[i].move(origin, () => endGame());
				hazards[i].show();
			}
		}

		hostile = false;
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
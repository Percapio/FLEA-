import Player from './mechanics/player';

import Star from './mechanics/star';
import Util from './mechanics/util';
import GameView from './mechanics/game_view';

import Hacker from './mechanics/hacker';
// import Hazard from './mechanics/hazard';

import { pauseModal } from './ui/modal';

// Initial Settings
const WIDTH = 1200;
const HEIGHT = 400;
let origin = [ 30, 30 ];
const music = new Audio('./assets/Future_World_-_Press_On_loop_2.mp3');

const canvas = document.querySelector('#gateIsDown');
const ctx = canvas.getContext('2d');

let player;
const canvasPlayer = document.querySelector('#player');
const ctxPlayer = canvasPlayer.getContext('2d');

let view, util;
const canvasUI = document.querySelector('#ui');
const ctxUI = canvasUI.getContext('2d');

const stars = [];
const hackers = [];
// const hazards = [];

let hostile = false;
let pause   = true;
let inGame  = true;
let game, playerCtrl, time;
let gameState = 0;
let close = document.querySelector('close');

const createScore = document.querySelector('#enter-score'),
					 submit = document.querySelector('#submit'),
					 errors = document.querySelector('#error-message');




// Initial setup of player, stars, and computer
function setup() {
	player = new Player( WIDTH, HEIGHT, ctxPlayer, origin,
		() => thrusters(), () => pauseGame() );
	util = new Util( music );

	util.grabData( () => makeBoard());
}

function makeBoard() {		
	for (let i=0; i < 300; i++) {
		stars[i] = new Star( WIDTH, HEIGHT, ctx );

		if (i < util.data.length) {
			// if ( util.data[i].websites.length === 1 ) {
				hackers[i] = new Hacker( WIDTH, HEIGHT, ctx, util.data[i].name );
			// } 
			// else {
			// 	hazards[i] = new Hazard( WIDTH, HEIGHT, ctx, util.data[i] );
			// }
		}
	}

	view = new GameView( WIDTH, HEIGHT, ctx, ctxUI, stars,
							() => winGame(), player, () => endGame() );
}

// Rendering function
function draw() {
	view.render();
	moveObjects();
	player.move();
	player.update();
}

function moveObjects() {
	for (let i=0; i < util.data.length; i++) {
		// if ( util.data[i].websites.length === 1 ) {
			origin[0] = player.pos[0];
			origin[1] = player.pos[1];
			hackers[i].move(origin, hostile,
				() => endGame());
			hackers[i].show(ctx);
		// } 
		// else {
		// 	hazards[i].move(origin, () => endGame());
		// 	hazards[i].show();
		// }
	}

	hostile = false;
}

// Handle enemies
function thrusters() {
	hostile = true;

	moveObjects();
}

// End of game
function getTime() {
	return {
		minutes: view.timer.minutes,
		seconds: view.timer.seconds,
		milliseconds: view.timer.milliseconds,
	};
}

function endGame() {
	inGame = false;
	togglePause('lose');
}

function winGame() {
	togglePause('win');
	time = getTime();
	submit.onclick = () => {
		let missingName = true;
		
		while (missingName) {
			missingName = addInitials();
		}

		document.location.reload();
	};
}

function addInitials() {
	let initials = createScore.value;

	if (/^[A-Za-z]+$/.test(initials)) {
		util.createScore(time, initials);
		return false;
	} else {
		errors.insertAdjacentHTML('afterbegin', 'Letters only please.');
		document.querySelector('.button-win').style.marginTop = 0;
		return true;
	}
}


function pauseGame() {
	togglePause('player');
}

// Pause Event and Ctrls
function togglePause(propPause) {
	pause = !pause;
	gameState += 1;

	if (pause) {
		pauseModal(pause, propPause);

		util.music.pause();
		clearInterval(game);
		playerCtrl = setInterval( playerCtrlWhilePaused(), 40 );

	} else {
		pauseModal(pause, propPause);
		
		if (gameState === 1) {
			togglegame();
		} else {
			util.music.play();
			clearInterval(playerCtrl);
			game = setInterval(() => {
				draw();
			}, 40);
		}
	}
}

function playerCtrlWhilePaused() {
	// close.onclick = shut(() => togglePause());
	let down = true;

	document.onkeydown = (event) => {
		if (event.repeat != undefined) {
			down = !event.repeat;
		}

		if (!down) return;
		let keypress = event.key;

		switch (keypress) {
			case ' ':
				if (inGame) {
					togglePause('player');
				} else {
					document.location.reload();
				}
				break;
			case 'Escape':
				if (inGame) {
					togglePause('player')
				} else {
					document.location.reload();
				}
				break;
		}

		document.onkeyup = () => {
			down = true;
		};
	};
}

// Start the game
function togglegame() {
	clearInterval(playerCtrl);
	setup();
	game = setInterval(() => {
			draw();
	}, 40);
}

function play() {
	pauseModal(pause, 'player');
	playerCtrl = setInterval(playerCtrlWhilePaused(), 40);
}


play();
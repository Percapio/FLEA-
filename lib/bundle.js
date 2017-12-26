/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MovingObject {
	constructor(width, height, ctx) {
		this.COLORS = [
			"#CB3301", 
			"#FF0066", 
			"#FF6666", 
			"#FEFF99", 
			"#FFFF67", 
			"#CCFF66", //yellow-green
			"#99FE00", //neon-green
			"#EC8EED", //
			"#FF99CB", //pig-pink
			"#FE349A", //magenta
			"#CC99FE", //purple-hue
			"#6599FF", //light-blue
			"#03CDFF", //sky-blue
			"#FFFFFF"  //white
		];

		this.CONST = [
			0.2617994,
			0.0872665,
			1.047198
		];

		this.width = width;
		this.height = height;
		this.ctx = ctx;
	}

	backdrop(origin, ctx) {
		ctx.beginPath();
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 170;
		ctx.arc( origin[0], origin[1], 25, 0, Math.PI * 2 );
		ctx.stroke();
		ctx.closePath();
	}

	collisionCheck(otherPos) {
		let distX = Math.abs(this.pos[0] - otherPos[0]);
		let distY = Math.abs(this.pos[1] - otherPos[1]);

		return ((distX < this.radius) && (distY < this.radius));
	}

	outsideBorder() {
		// Left & Right walls
		if (this.pos[0] - this.radius <= 1) {
			return true;
		} else if (this.pos[0] + this.radius >= this.width - 1) {
			return true;
		}

		// Top & Bottom walls
		if (this.pos[1] - this.radius <= 1) {
			return true;
		} else if (this.pos[1] + this.radius >= this.height - 1) {
			return true;
		}

		return false;
	}

	wallBounce() {
		// Wall based bouncing 'physics'
		// Top Wall
		if (this.pos[1] + this.radius < 20) {
			this.vel[1] *= -1;
		} 

		// Left Wall
		else if (this.pos[0] + this.radius < 20) {
			this.vel[0] *= -1;
		}

		// Bottom Wall
		else if (Math.abs(this.pos[1] + this.radius - this.height) < 20) {
			this.vel[1] *= -1;
		}

		// Right Wall
		else if (Math.abs(this.pos[0] + this.radius - this.width) < 20) {
			this.vel[0] *= -1;
		}
	}

	checkLocation(radius) {
		if (this.outsideBorder()) {
			this.pos = [ Math.random() * ( this.width - 50 ) + 20 + radius, 
								Math.random() * ( this.height - 50 ) + 20 + radius ];
		}
	}

	randomStart() {
		return [ Math.random() * ( this.width - 150 ) + 125, 
								Math.random() * ( this.height - 150 ) + 125 ]
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MovingObject;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mechanics_player__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mechanics_star__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mechanics_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mechanics_game_view__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mechanics_bug__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mechanics_hazard__ = __webpack_require__(10);









window.addEventListener('DOMContentLoaded', () => {
	const WIDTH = 1200;
	const HEIGHT = 400;
	const origin = [ 30, 30 ];

	const canvas = document.getElementById('gateIsDown');
	const ctx = canvas.getContext('2d');

	let player;
	const canvasPlayer = document.getElementById('player');
	const ctxPlayer = canvasPlayer.getContext('2d');

	let view, util;
	const canvasUI = document.getElementById('ui');
	const ctxUI = canvasUI.getContext('2d');

	const stars = [];
	const bugs = [];
	const hazards = [];
	let hostile = false;

	// Initial setup of player, stars, and computer
	function setup() {
		player = new __WEBPACK_IMPORTED_MODULE_0__mechanics_player__["a" /* default */]( WIDTH, HEIGHT, ctxPlayer, origin,
			() => thrusters(origin) );
		util = new __WEBPACK_IMPORTED_MODULE_2__mechanics_util__["a" /* default */]();

		util.grabData( () => makeBoard() );
	}

	function makeBoard() {
		for (let i=0; i < 350; i++) {
			stars[i] = new __WEBPACK_IMPORTED_MODULE_1__mechanics_star__["a" /* default */]( WIDTH, HEIGHT, ctx );

			if (i < util.data.length) {
				if ( util.data[i].websites.length === 1 ) {
					bugs[i] = new __WEBPACK_IMPORTED_MODULE_4__mechanics_bug__["a" /* default */]( WIDTH, HEIGHT, ctx, util.data[i].name );
				} else {
					hazards[i] = new __WEBPACK_IMPORTED_MODULE_5__mechanics_hazard__["a" /* default */]( WIDTH, HEIGHT, ctx, util.data[i] );
				}
			};
		};

		view = new __WEBPACK_IMPORTED_MODULE_3__mechanics_game_view__["a" /* default */]( WIDTH, HEIGHT, ctx, ctxUI, stars );
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
				bugs[i].move(origin, hostile,
					() => endGame());
				bugs[i].show(ctx);
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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Player extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
	constructor(width, height, ctx, origin, thrusters) {
		super(width, height, ctx);
		this.pos = origin;

		this.radius = 5;
		this.rotation = 0;

		this.vel = [ 0, 0 ];
		this.thrusters = thrusters;

		this.head = this.drawSide(0);
	}

	move(thrusters) {
		let down = true;

		document.onkeydown = (event) => {
			if (event.repeat != undefined) {
				down = !event.repeat;
			}

			if (!down) return;
			let keypress = event.key;

			switch (keypress) {
				case 'w':
					this.thrust(true, false);
					this.thrusters(this.pos, this.radius);
					break;
				case 'ArrowUp':
					this.thrust(true, false);
					this.thrusters(this.pos, this.radius);
					break;
				case 's':
					this.thrust(false, true);
					break;				
				case 'ArrowDown':
					this.thrust(false, true);
					break;
				case 'a':
					this.turn(true, false);
					break;				
				case 'ArrowLeft':
					this.turn(true, false);
					break;
				case 'd':
					this.turn(false, true);
					break;				
				case 'ArrowRight':
					this.turn(false, true);
					break;
				default:
					return;
			}
		}

		document.onkeyup = (event) => { down = true };
	}

	update() {
		this.momentum();
		this.render();
	}

	render() {
		this.ctx.clearRect(this.pos[0] - 100, this.pos[1] - 100, this.pos[0] + 100, this.pos[1] + 100);

		this.ctx.beginPath();
		this.ctx.fillStyle = 'white';

		this.head = this.drawSide(0);
		this.ctx.lineTo( this.head[0], this.head[1] );

		for (let i=1; i < 3; i++) {
			let sides = this.drawSide(i);
			this.ctx.lineTo( sides[0], sides[1] );
		}

		this.ctx.fill();
		this.ctx.strokeStyle = 'green';
		this.ctx.arc( this.head[0], this.head[1], 0.5, 0, Math.PI * 2 );
		this.ctx.stroke();
		this.ctx.closePath();
	}

	drawSide(i) {
		let sides = Math.PI * 2 / 3;
		let results = [ this.pos[0] + this.radius * Math.cos( sides * i + this.rotation ),
										this.pos[1] + this.radius * Math.sin( sides * i + this.rotation ) ];
		return results;
	}

	thrust(pwr = false, breaks = false) {
		if (pwr && this.vel[0] < 3.2 || this.vel[1] < 3.2) {
			this.boost(pwr);
		}

		if (breaks && this.vel[0] > -3.2 && this.vel[1] > -3.2) {
			this.boost(pwr)
		}
	}

	boost(thrust) {
		// Inverse quadrant based boosts
		let speed = this.CONST[0];
		let direction = thrust ? 1 : -1;

		// Quadrant I
		if (this.pos[0] <= this.head[0] && this.pos[1] <= this.head[1]) {
			this.vel[0] += speed * direction;
			this.vel[1] += speed * direction;
		} 

		// Quadrant II
		else if (this.pos[0] > this.head[0] && this.pos[1] <= this.head[1]) {
			this.vel[0] -= speed * direction;
			this.vel[1] += speed * direction;
		}

		// Quadrant III
		else if (this.pos[0] > this.head[0] && this.pos[1] > this.head[1]) {
			this.vel[0] -= speed * direction;
			this.vel[1] -= speed * direction;
		}

		// Quadrant IV
		else if (this.pos[0] <= this.head[0] && this.pos[1] > this.head[1]) {
			this.vel[0] += speed * direction;
			this.vel[1] -= speed * direction;
		}
	}

	momentum() {
		if (this.outsideBorder()) {
			this.wallBounce();
			this.pos[0] += this.vel[0];
			this.pos[1] += this.vel[1];
		} else {
			this.pos[0] += this.vel[0];
			this.pos[1] += this.vel[1];
		}
	}

	turn(left = false, right = false) {
		if (left) {
			this.rotation -= this.CONST[0];
			this.head[0] -= this.CONST[0];
			this.head[1] -= this.CONST[0];
		}

		if (right) {
			this.rotation += this.CONST[0];
			this.head[1] += this.CONST[0];
			this.head[1] += this.CONST[0];
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Star extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
	constructor(width, height, ctx) {
		super(width, height, ctx);

		this.x = Math.random() * this.width;
		this.y = Math.random() * this.height;

		this.radius = Math.random() * 1;
		this.shade = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
	}

	show() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.shade;
		this.ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		this.ctx.fill();
		this.ctx.closePath();
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Star;
;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_json__ = __webpack_require__(5);


class Util {
	constructor() {
		this.data;
	}

	counter() {
		return this.data.length;
	}

	grabData( makeBoard ) {
		Object(__WEBPACK_IMPORTED_MODULE_0__data_json__["a" /* getData */])().then( data => {
			this.data = this.handleData(data);
			makeBoard();
		});
	}

	handleData(data) {
		let bigData, smallData;
		[ bigData, smallData ] = this.cherryPick(data);
		
		smallData = this.shuffleData(smallData);
		bigData = this.shuffleData(bigData);
		let newData = bigData.slice(0, bigData.length / 2)
										.concat(smallData.slice(0, smallData.length / 6));

		return this.shuffleData(newData);
	}

	shuffleData(data) {
		let currentIdx = data.length;
		let tempEl, randomIdx;

		while ( 0 !== currentIdx ) {
			randomIdx = Math.floor(Math.random() * currentIdx);
			currentIdx -= 1;

			tempEl = data[currentIdx];
			data[currentIdx] = data[randomIdx];
			data[randomIdx] = tempEl;
		}

		return data;
	}

	cherryPick(data) {
		const bigData = [];
		const smallData = [];

		data.forEach( el => {
			if ( el.websites.length > 1) {
				bigData.push( el );
			} else {
				smallData.push( el );
			}
		});

		return [ bigData, smallData ];
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Util;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getData;
function getData() {
	const KEYWORDS = [
		''
	]
	return new Promise( (resolve, reject) => {
		const request = new XMLHttpRequest();

		request.open('GET', 'https://rawgit.com/MISP/misp-galaxy/master/clusters/threat-actor.json');
		request.onload = () => {
			const data = JSON.parse( request.responseText ).values;
			const actors = [];

			for (let i=0; i < data.length; i++) {
				const websites = data[i].meta.refs;

				if (typeof websites != 'undefined') {
					// if (websites.length > 1) {

					// }

					let actorObject = { 
						[ 'name' ]: data[i].value,
						[ 'websites' ]: websites,
						// [ 'keywords' ]: keywords
					};
					actors.push( actorObject );
				}
			}

			resolve(actors);
		};
		request.send();
	})
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gate__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__timer__ = __webpack_require__(8);



class GameView {
	constructor(width, height, ctx, ctxUI, stars) {
		this.width = width;
		this.height = height;
		this.ctx = ctx;
		this.stars = stars;

		this.gate = new __WEBPACK_IMPORTED_MODULE_0__gate__["a" /* default */] ( width, height, ctx );
    this.timer = new __WEBPACK_IMPORTED_MODULE_1__timer__["a" /* default */]( width, 50, ctxUI );
	}

	// Background & Backdrop
	render(origin, endGame) {
		this.ctx.beginPath();
		this.ctx.fillStyle = 'black';
		this.ctx.rect(0, 0, this.width, this.height);
		this.ctx.fill();
		this.ctx.closePath();
		
		for (let i=0; i < this.stars.length; i++) {
			this.stars[i].show(this.ctx);
		}

		this.gate.update();
		this.timer.update();
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameView;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Gate extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
	constructor(width, height, ctx) {
		super(width, height, ctx);

		this.x = this.width - 50;
		this.y = this.height - 50;
		this.radius = 20;
		this.shade = 'blue';
	}

	update() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.shade;
		this.ctx.rect( this.x, this.y, 25, 25 );
		this.ctx.fill();
		this.ctx.closePath();
	}

	endScenario(player) {
		if (this.collisionCheck(player)) {
			console.log('YOU WIN!');
		};
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Gate;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Timer {
	constructor(width, height, ctx) {
		this.width = width;
		this.height = height;
		this.ctx = ctx;

		this.minute = 10;
		this.seconds = 0;
		this.milliseconds = 1; 
	}

	countdown() {
		this.millisecondsCheck();
		this.secondsCheck();
		// minuteCheck();
		let minutes = this.lessThanTen(this.minute);
		let milliseconds = this.lessThanTen(this.milliseconds);
		let seconds = this.lessThanTen(this.seconds);
		return `${minutes} : ${seconds} : ${milliseconds}`;
	}

	minuteCheck() {
	}

	secondsCheck() {
		if (this.seconds < 0) {
			this.minute -= 1;
			this.seconds = 59;
		}
	}

	millisecondsCheck() {
		this.milliseconds -= 1;

		if (this.milliseconds < 0) {
			this.seconds -= 1;
			this.milliseconds = 59;
		}
	}

	lessThanTen(num) {
		return (num < 10) ? '0' + num : num;
	}

	update() {
		this.ctx.clearRect( (this.width / 2 ) - 75, (this.height - 25), 120, 50 );

		this.ctx.font = '20px Georgia';
		this.ctx.fillStyle = 'red';
		this.ctx.fillText( this.countdown(), (this.width / 2 ) - 66, (this.height - 8 ) );
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Timer;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Bug extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
	constructor(width, height, ctx, name) {
		super(width, height, ctx);

		this.pos = this.randomStart();

		this.radius = 5;
		this.shade = 'red';
		this.name = name;

		for (let i=0; i < 3; i++) {
			this.checkLocation();
		}
	}

	show() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.shade;
		this.ctx.arc( this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2 );
		this.ctx.fill();
		this.ctx.closePath();

		this.ctx.font = '9px Arial';
		this.ctx.fillStyle = 'white';
		this.ctx.fillText( this.name, this.pos[0] - 15, this.pos[1] );
	}

	move(origin, hostile = false, endGame) {
		let rangeX = Math.abs(this.pos[0] - origin[0]);
		let rangeY = Math.abs(this.pos[1] - origin[1]);

		if (rangeX < 150 && rangeY < 150) {
			this.guideBug(0, origin, this.CONST[0]);
			this.guideBug(1, origin, this.CONST[0]);

			if (hostile) {
				this.guideBug(0, origin, this.CONST[1]);
				this.guideBug(1, origin, this.CONST[1]);
			}
		}

		this.collisionCheck(origin) ? endGame() : null;
	}

	guideBug(pos, origin, speed) {
		if ( this.pos[pos] < origin[pos] ) {
			this.pos[pos] += speed;
		} else if ( this.pos[pos] > origin[pos] ) {
			this.pos[pos] -= speed;
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bug;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Hazard extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
	constructor(width, height, ctx, data) {
		super(width, height, ctx);

		this.radius = Math.random() * data.websites.length;
		this.shade = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
		this.pos = this.randomStart();

		for (let i=0; i < 3; i++) {
			this.checkLocation();
		}

		this.vel = [ 
			this.CONST[ Math.floor(Math.random() * 3) ],
			this.CONST[ Math.floor(Math.random() * 3) ]
		];			
	}

	show() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.shade;
		this.ctx.arc( this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2 );
		this.ctx.fill();
		this.ctx.closePath();
	}

	move(otherPos, endGame) {
		// if(this.type === 'moving') {
		// 	this.pos[0] += this.vel[0];
		// 	this.pos[1] += this.vel[1];

		// 	if (this.pos[0] < -this.radius) {
		// 		this.pos[0] = this.width + this.radius;
		// 	} else if (this.pos[0] > this.width + 50) {
		// 		this.pos[0] = -this.radius;
		// 	}

		// 	if (this.pos[1] < -this.radius) {
		// 		this.pos[1] = this.height + this.radius;
		// 	} else if (this.pos[1] > this.height + this.radius) {
		// 		this.pos[1] = -this.radius;
		// 	}

		// }

		this.collisionCheck(otherPos) ? endGame() : null;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Hazard;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
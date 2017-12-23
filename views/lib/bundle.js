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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MovingObject {
	constructor(width, height, ctx) {
		this.COLORS = [
			'#F0E68C',
			'#40E0D0',
			'#BDB76B',
			'#3CB371',
			'#F4A460',
			'white',
			'white',
			'white',
			'white',
			'white',
			'white',
			'white',
			'white',
			'white',			
			'white',
			'white',
			'white',
			'white'
		];

		this.CONST = [
			0.2617994,
			0.0872665,
			1.047198
		];

		this.TYPE = [ 
			'moving',
			'stationary',
			'stationary',
			'stationary'
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

	outsideBorder(pos, radius) {
		if (pos[0] - radius <= 0) {
			return true;
		} else if (pos[0] + radius >= this.width) {
			return true;
		}

		if (pos[1] - radius <= 0) {
			return true;
		} else if (pos[1] + radius >= this.height) {
			return true;
		}

		return false;
	}

	bounceWidth(pos, radius) {
		if (pos - radius <= 0) {
			pos = pos + this.CONST[0];
		} else if (pos + radius >= this.width) {
			pos = pos - this.CONST[0];
		}

		return pos;
	}

	bounceHeight(pos, radius) {
		if (pos - radius <= 0) {
			pos = pos + this.CONST[0];
		} else if (pos + radius >= this.height) {
			pos = pos - this.CONST[0];
		}

		return pos;
	}

	checkLocation(radius) {
		if (this.outsideBorder(this.pos, radius)) {
			this.pos = [ Math.random() * ( this.width - 50 ) + 20 + radius, 
								Math.random() * ( this.height - 50 ) + 20 + radius ];
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MovingObject;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Player extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
	constructor(width, height, ctx, origin, thrusters) {
		super(width, height, ctx);
		this.origin = origin;

		this.radius = 5;
		this.rotation = 0;

		this.vel = [ 0, 0 ];
		this.thrusters = thrusters;

		this.head = this.drawSide(0);
	}

	move(thrusters, banking) {
		window.onkeydown = (e) => {
			let keypress = event.key;

			switch (keypress) {
				case 'w':
					this.thrust(true, false);
					this.thrusters(this.origin, this.radius);
					break;
				case 's':
					this.thrust(false, true);
					break;
				case 'a':
					this.turn(true, false);
					break;
				case 'd':
					this.turn(false, true);
					break;
				default:
					return;
			}
		}
	}

	update() {
		this.momentum();
		this.render();
	}

	render() {
		this.ctx.clearRect(this.origin[0] - 100, this.origin[1] - 100, this.origin[0] + 100, this.origin[1] + 100);

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
		let results = [ this.origin[0] + this.radius * Math.cos( sides * i + this.rotation ),
										this.origin[1] + this.radius * Math.sin( sides * i + this.rotation ) ];
		return results;
	}

	thrust(pwr = false, breaks = false) {
		if (pwr && this.vel[0] < 1 && this.vel[1] < 1) {
			this.boost(0);
			this.boost(1);
		}

		if (breaks && this.vel[0] > this.CONST[1] && this.vel[1] > this.CONST[1]) {
			this.breaking(0);
			this.breaking(0);
		}
	}

	boost(pos) {
		if (this.origin[pos] < this.head[pos]) {
			this.vel[pos] += this.CONST[1]; 
		} else if (this.origin[pos] > this.head[pos]) {
			this.vel[pos] -= this.CONST[1];
		}
	}

	breaking(pos) {
		if (this.origin[pos] < this.head[pos]) {
			this.vel[pos] -= this.CONST[1];
		} else if (this.origin[pos] > this.head[pos]) {
			this.vel[pos] -= this.CONST[1];
		}
	}

	momentum() {
		if (this.outsideBorder(this.origin, this.radius)) {
			this.origin[0] = this.bounceWidth(this.origin[0], this.radius);
			this.origin[1] = this.bounceHeight(this.origin[1], this.radius);
		} else {
			this.origin[0] += this.vel[0];
			this.origin[1] += this.vel[1];			
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__star__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bug__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hazard__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__timer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gate__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__fog__ = __webpack_require__(8);








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
		timer = new __WEBPACK_IMPORTED_MODULE_4__timer__["a" /* default */]( WIDTH, 50, ctxUI );
		gate = new __WEBPACK_IMPORTED_MODULE_5__gate__["a" /* default */]( WIDTH, HEIGHT, ctx );

		fog = new __WEBPACK_IMPORTED_MODULE_6__fog__["a" /* default */]( WIDTH, HEIGHT, ctxPlayer );
		player = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */]( WIDTH, HEIGHT, ctxPlayer, origin,
			() => thrusters(origin) );
		

		for (let i=0; i < 350; i++) {
			stars[i] = new __WEBPACK_IMPORTED_MODULE_0__star__["a" /* default */]( WIDTH, HEIGHT, ctx );

			if (i < 21) {
				bugs[i] = new __WEBPACK_IMPORTED_MODULE_2__bug__["a" /* default */]( WIDTH, HEIGHT, ctx );

				if (i < 11) {
					hazards[i] = new __WEBPACK_IMPORTED_MODULE_3__hazard__["a" /* default */]( WIDTH, HEIGHT, ctx );
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Bug extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
	constructor(width, height, ctx) {
		super(width, height, ctx);

		this.pos = [ Math.random() * ( this.width - 50 ) + 40, 
								Math.random() * ( this.height - 50 ) + 40 ];

		this.radius = 5;
		this.shade = 'red';

		for (let i=0; i < 3; i++) {
			this.checkLocation(this.radius);
		}
	}

	show() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.shade;
		this.ctx.arc( this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2 );
		this.ctx.fill();
		this.ctx.closePath();
	}

	move(origin, hostile = false, endGame) {
		let rangeX = Math.abs(this.pos[0] - origin[0]);
		let rangeY = Math.abs(this.pos[1] - origin[1]);

		if (rangeX < 150 && rangeY < 150) {
			this.guideBug(0, origin, this.CONST[1]);
			this.guideBug(1, origin, this.CONST[1]);
		}

		if (hostile) {
			this.guideBug(0, origin, this.CONST[2]);
			this.guideBug(1, origin, this.CONST[2]);
			this.show();
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Hazard extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
	constructor(width, height, ctx) {
		super(width, height, ctx);

		this.type = this.TYPE[Math.floor(Math.random() * 2)];

		this.radius = Math.random() * (50 - 20) + 20;
		this.shade = this.COLORS[Math.floor(Math.random() * 5)];

		this.pos = [ Math.random() * ( this.width - 50 ) + 20, 
								Math.random() * ( this.height - 50 ) + 20 ];

		for (let i=0; i < 3; i++) {
			this.checkLocation(this.radius);
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
		if(this.type === 'moving') {
			this.pos[0] += this.vel[0];
			this.pos[1] += this.vel[1];

			if (this.pos[0] < -this.radius) {
				this.pos[0] = this.width + this.radius;
			} else if (this.pos[0] > this.width + 50) {
				this.pos[0] = -this.radius;
			}

			if (this.pos[1] < -this.radius) {
				this.pos[1] = this.height + this.radius;
			} else if (this.pos[1] > this.height + this.radius) {
				this.pos[1] = -this.radius;
			}

			this.collisionCheck(otherPos) ? endGame() : null;
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Hazard;


/***/ }),
/* 6 */
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

	draw() {
		this.ctx.clearRect( (this.width / 2 ) - 75, (this.height - 25), 120, 50 );

		this.ctx.beginPath();
		this.ctx.fillStyle = 'ivory';
		this.ctx.rect( (this.width / 2 ) - 75, (this.height - 25), 120, 50 );
		this.ctx.fill();
		this.ctx.closePath();

		this.ctx.font = '20px Georgia';
		this.ctx.fillStyle = 'red';
		this.ctx.fillText( this.countdown(), (this.width / 2 ) - 66, (this.height - 8 ) );
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Timer;


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

	show() {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(1);


class Fog extends __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */] {
	constructor( width, height, ctx ){
		super(width, height, ctx);

		this.shade = 'black';
	}

	render(origin) {
		this.ctx.restore();
		this.ctx.beginPath();
		this.ctx.fillStyle = this.shade;
		this.ctx.rect(0, 0, this.width, this.height);
		this.ctx.fill();
		this.ctx.closePath();


		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.arc( origin[0], origin[1], 100, 0, Math.PI * 2 );
		this.ctx.clip();
		this.ctx.closePath();

		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.restore();
	}

	drawSide() {

	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Fog;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
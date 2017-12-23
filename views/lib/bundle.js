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
	constructor(width, height) {
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

		this.width = width;
		this.height = height;

		this.x;
		this.y;
		this.radius;
		this.shade;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MovingObject;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__star__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bug__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__timer__ = __webpack_require__(5);





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
		player = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */]( originPoint, ctxPlayer, WIDTH, HEIGHT,
			() => thrusters(),
			() => turns() );
		
		timer = new __WEBPACK_IMPORTED_MODULE_3__timer__["a" /* default */]( WIDTH, 50, ctxUI );

		// ctx.translate( originPoint, originPoint );
		// for (let i=0; i < 200; i++) {
		// 	stars[i] = new Star( WIDTH, HEIGHT );
		// }
	}

	function createBugs() {
		if (timer.bugSpawn()) {
			bugs.push(new __WEBPACK_IMPORTED_MODULE_2__bug__["a" /* default */]( originPoint ));
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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Star extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
	constructor(options) {
		super(options);

		this.x = this.randomPoint();
		this.y = this.randomPoint();

		this.radius = Math.random() * 3;
		this.shade = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
	}

	update(vely) {
		this.y += vely;

		if (this.y > this.originPoint) {
			this.y = -this.originPoint;
			this.x = this.randomPoint();
		} else if (this.y < -this.originPoint) {
			this.y = this.originPoint;
			this.x = this.randomPoint();
		}

		if (this.x > this.originPoint) {
			this.x = -this.originPoint;
			this.y = this.randomPoint();
		} else if (this.x < -this.originPoint) {
			this.x = this.originPoint;
			this.y = this.randomPoint();
		}
	}

	show(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.shade;
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
		ctx.closePath();
	}

	randomPoint() {
		return (
			( Math.random() * -this.originPoint )
						+ ( this.originPoint * Math.random() )
		);
	}
}
/* unused harmony export default */
;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
	constructor(origin, ctx, width, height, thrusters, turns) {
		this.origin = origin;
		this.ctx = ctx;
		this.width = width;
		this.height = height;

		this.radius = 4;
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
					// this.thrusters();
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
		this.show();
	}

	show() {
		this.ctx.clearRect(this.origin[0] - 100, this.origin[1] - 100, this.origin[0] + 100, this.origin[1] + 100);

		this.ctx.beginPath();
		this.ctx.fillStyle = 'green';
		// this.ctx.strokeStyle = 'green';
		// this.ctx.arc( this.originPoint[0], this.originPoint[1], this.radius, 0, Math.PI * 2 );
		// this.ctx.moveTo( this.x - 10, this.y - 10 );
		// this.ctx.lineTo( this.x - 10, this.y );
		// this.ctx.lineTo( this.x, this.y - 5 );

		this.head = this.drawSide(0);
		this.ctx.lineTo( this.head[0], this.head[1] );

		for (let i=1; i < 3; i++) {
			let sides = this.drawSide(i);
			this.ctx.lineTo( sides[0], sides[1] );
		}

		// this.ctx.stroke();
		this.ctx.fill();
		this.ctx.closePath();
	}

	drawSide(i) {
		let sides = Math.PI * 2 / 3;
		let results = [ this.origin[0] + this.radius * Math.cos( sides * i + this.rotation ),
										this.origin[1] + this.radius * Math.sin( sides * i + this.rotation ) ];
		return results;
	}

	thrust(pwr = false, breaks = false) {
		let speed = 0.0872665;

		if (pwr && this.vel[0] < 2 && this.vel[1] < 2) {
			this.boost(0, speed);
			this.boost(1, speed);
		}

		if (breaks && this.vel[0] > speed && this.vel[1] > speed) {
			this.breaking(0, speed);
			this.breaking(0, speed);
		}
	}

	boost(pos, speed) {
		if (this.origin[pos] < this.head[pos]) {
			this.vel[pos] += speed; 
		} else if (this.origin[pos] > this.head[pos]) {
			this.vel[pos] -= speed;
		}
	}

	breaking(pos, speed) {
		if (this.origin[pos] < this.head[pos]) {
			this.vel[pos] -= speed;
		} else if (this.origin[pos] > this.head[pos]) {
			this.vel[pos] -= speed;
		}
	}

	momentum() {
		this.origin[0] += this.vel[0];
		this.origin[1] += this.vel[1];
	}

	turn(left = false, right = false) {
		let arcLength = 0.2617994;

		if (left) {
			this.rotation -= arcLength;
			this.head[0] -= arcLength;
			this.head[1] -= arcLength;
		}

		if (right) {
			this.rotation += arcLength;
			this.head[1] += arcLength;
			this.head[1] += arcLength;
		}
	}

	backdrop() {
		this.ctx.beginPath();
		this.ctx.strokeStyle = 'black';
		this.ctx.lineWidth = 170;
		this.ctx.arc( this.originPoint[0], this.originPoint[1], 25, 0, Math.PI * 2 );
		this.ctx.stroke();
		this.ctx.closePath();
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Bug extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
	constructor(options) {
		super(options);

		this.x = this.randomPoint();
		this.y = -this.originPoint - 20;

		this.radius = 5;
		this.shade = 'red';
		this.hostile = false;
	}

	update(vely) {
		this.y += 1;

		if (this.y > 0) {
			this.y -= 1;
		} else if (this.y < -this.originPoint) {
			this.y = this.originPoint;
			this.x = this.randomPoint();
		}

		if (this.x > this.originPoint) {
			this.x = -this.originPoint;
			this.y = this.randomPoint();
		} else if (this.x < -this.originPoint) {
			this.x = this.originPoint;
			this.y = this.randomPoint();
		}
	}

	show(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.shade;
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
		ctx.closePath();
	}

	randomPoint() {
		return (
			( Math.random() * -this.originPoint )
						+ ( this.originPoint * Math.random() )
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bug;


/***/ }),
/* 5 */
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

	bugSpawn() {
		if (this.seconds % 12 === 0) {
			return true;
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Timer;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
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
	constructor(originPoint, dimensions) {
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

		this.originPoint = originPoint;
		this.dimensions = dimensions;

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
		
		timer = new __WEBPACK_IMPORTED_MODULE_3__timer__["a" /* default */]( originPoint );

		player = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */]( originPoint,
			() => move().bind(this), 
			() => velocity().bind(this) );

		for (let i=0; i < 200; i++) {
			stars[i] = new __WEBPACK_IMPORTED_MODULE_0__star__["a" /* default */](originPoint, DIMENSIONS);
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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(0);


class Star extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
	constructor(options) {
		super(options);

		this.velx, this.vely;

		this.x = this.randomPoint();
		this.y = this.randomPoint();

		this.radius = Math.random() * 3;
		this.shade = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
	}

	update(velx, vely) {
		// this.x += velx;

		this.y += vely;

		// this.velx = velx;
		// this.vely = vely;

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

		// this.x += velx;
		// this.y += 1;
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Star;
;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
	constructor(originPoint, horizontal, velocity) {
		this.originPoint = originPoint;
		this.horizontal = horizontal;

		this.y = 50;
		this.radius = 8;
	}

	update(up, down, right, left) {
		window.onkeydown = (e) => {
			let keypress = event.key;
			let horizontal;

			switch (keypress) {
				case 'w':
					up();
					break;
				case 's':
					down();
					break;
				case 'a':
					left();
					// this.x -= arcLength;
					// this.y -= arcLength;
					break;
				case 'd':
					right();
					// this.x += 10;
					// this.y -= 1;
					break;
				default:
					return;
			}
		}
	}	

	show(ctx) {
		// ctx.beginPath();
		// ctx.fillStyle = rgba(0, 0, 0, 0.1);
		// ctx.rect(0, 0, this.originPoint * 2, this.originPoint * 2);
		// ctx.fill();
		// ctx.closePath();

		ctx.clearRect(0, 0, this.originPoint * 2, this.originPoint * 2);
		ctx.beginPath();
		ctx.fillStyle = 'green';
		ctx.arc( 0, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
		ctx.closePath();
	}

	move() {

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

		this.x = this.velx > 0 
			? Math.random() * this.dimensions * - 1 + this.dimensions
			: Math.random() * this.dimensions + this.dimensions;		

		this.y = this.vely > 0 
			? Math.random() * this.dimensions * - 1
			: Math.random() * this.dimensions;

		this.radius = 5;
		this.shade = 'white';
		this.hostile = false;
	}

	update(velx, vely, container) {
		let arcLength = 2.1816;
		this.x += velx;
		this.y += vely;

		if (((this.x > 0) && (this.x < container)) &&
				((this.y > 0) && (this.y < container))) {
			this.shade = 'red';
			this.hostile = true;
		}

		if (this.y > container - 5) {
			this.y = -1 + Math.random();
		} else if (this.y < 0) {
			this.y = container - 4 + Math.random();
		}

		if (this.x > container - 5) {
			this.x = -1 + Math.random();
		} else if (this.x < 0) {
			this.x = container - 4 + Math.random();
		} 
	}

	show(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.shade;
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
		ctx.closePath();
	}
}
/* unused harmony export default */


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Timer {
	constructor(originPoint) {
		this.originPoint = originPoint;

		this.minute = 2;
		this.seconds = 0;
		this.milliseconds = 1; 
	}

	countdown() {
		this.millisecondsCheck();
		this.secondsCheck();
		// minuteCheck();
		let milliseconds = this.lessThanTen(this.milliseconds);
		let seconds = this.lessThanTen(this.seconds);
		return `0${this.minute} : ${seconds} : ${milliseconds}`;
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

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'ivory';
		ctx.rect( 210, -300, 120, 30 );
		ctx.fill();
		ctx.closePath();

		ctx.font = '20px Georgia';
		ctx.fillStyle = 'red';
		ctx.fillText( this.countdown(), 220, -280 );
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Timer;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
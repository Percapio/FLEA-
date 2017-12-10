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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(4);



document.addEventListener('DOMContentLoaded', () => {
	let canvas = document.getElementById('survivePlaceholder');
	let ctx = canvas.getContext('2d');

	let game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
	let options =  { 
		pos: [50, 50],
		radius: 10,
		vel: 2,
		vector: [],
		game: game
 	}

	let player = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](options);

	setInterval( () => {
		draw(ctx, player, game);
	}, 20);
});


//Clear Board
function refresh(ctx) {
	ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.rect(0, 0, 400, 400);
	ctx.fill();
	ctx.closePath();
}

//Draw flea
function draw(ctx, player, game) {
	refresh(ctx);
	player.draw(ctx);
	player.update();
	// debugger;
	game.moveEnemy(ctx);
}






/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__computer__ = __webpack_require__(2);


class Game {
	constructor() {
		this.enemyAIs = [];
		this.populate();
	}

	populate() {
		let options = {
			pos: [50, 50],
			vel: 1,
			radius: 10,
			vector: [ Game.MAX_X * Math.random(), Game.MAX_Y * Math.random() ],
			game: this
		}

		this.enemyAIs.push(new __WEBPACK_IMPORTED_MODULE_0__computer__["a" /* default */](options));
		debugger;
	}

	moveEnemy(ctx) {
		// debugger;
		this.enemyAIs[0].draw(ctx);
		this.enemyAIs[0].update();
	}

	outOfBounds(posX, posY) {
		return (posX < 0 || posX > Game.MAX_X || posY < 0 || posY > Game.MAX_Y);
	}
}

Game.MAX_X = 1000;
Game.MAX_Y = 600;

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game__ = __webpack_require__(1);




class Computer {
	constructor(options) {
		this.pos = options.pos;
		this.radius = options.radius;
		this.vel = options.vel;
		this.vector = options.vector;
		this.game = options.game;
		debugger;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'green';
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}

	update() {
		let newX = this.pos[0] + this.vel[0];
		let	newY = this.pos[1] + this.vel[1];

		if (this.game.outOfBounds(newX, newY)) {
			newX = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].wrap(newX, __WEBPACK_IMPORTED_MODULE_1__game__["a" /* default */].MAX_X);
			newY = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].wrap(newY, __WEBPACK_IMPORTED_MODULE_1__game__["a" /* default */].MAX_Y);
		}

		this.pos = [newX, newY];
		console.log(this.pos);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Computer);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game__ = __webpack_require__(1);



class MovingObject {
	constructor(options) {

	}

	move() {

	}
}

/* harmony default export */ __webpack_exports__["a"] = (MovingObject);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_objects__ = __webpack_require__(3);


class Player extends __WEBPACK_IMPORTED_MODULE_0__moving_objects__["a" /* default */] {
	constructor(options) {
		super(options);

		this.xAdjust = this.pos[0] + 50;
		this.yAdjust = this.pos[1];
	}


	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'red';
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2);
		ctx.fill();

		ctx.strokeStyle = 'red';
		ctx.moveTo(this.pos[0], this.pos[1]); 
		ctx.lineTo(this.xAdjust, this.yAdjust);
		ctx.stroke();
		ctx.closePath();
	}


	update() {
		window.onkeydown = (event) => {
			let keypress = event.key;
			let arcLength = 2.18166;

			switch(keypress) {

				case ' ':
				 	this.pos[0] = this.xAdjust;
				 	if (this.xAdjust >= this.pos[0]) {
					 	this.xAdjust += 25;
				 	} else if (this.xAdjust < this.pos[0]) {
				 		this.xAdjust -= 25;
				 	}


				 	this.pos[1] = this.yAdjust;
				 	if (this.yAdjust >= this.pos[1]) {
				 		this.yAdjust += arcLength;
				 	} else if (this.yAdjust < this.pos[1]) {
				 		this.yAdjust -= arcLength;
				 	}
				  break;

				case 'ArrowRight':
					//Quadrant 1
					if (this.xAdjust >= this.pos[0] && this.yAdjust >= this.pos[1]) {
						this.xAdjust -= arcLength;
						this.yAdjust += arcLength;
					}

					//Quadrant 2
					else if (this.xAdjust <= this.pos[0] && this.yAdjust >= this.pos[1]) {
						this.xAdjust -= arcLength;
						this.yAdjust -= arcLength;
					}

					//Quadrant 3
					else if (this.xAdjust <= this.pos[0] && this.yAdjust <= this.pos[1]) {
						this.xAdjust += arcLength;
						this.yAdjust -= arcLength;
					}

					//Quadrant 4
					else if (this.xAdjust >= this.pos[0] && this.yAdjust <= this.pos[1]) {
						this.xAdjust += arcLength;
						this.yAdjust += arcLength;
					}
					break;

				case 'ArrowLeft':
					//Quadrant 1
					if (this.xAdjust >= this.pos[0] && this.yAdjust >= this.pos[1]) {
						this.xAdjust += arcLength;
						this.yAdjust -= arcLength;
					}

					//Quadrant 2
					else if (this.xAdjust <= this.pos[0] && this.yAdjust >= this.pos[1]) {
						this.xAdjust += arcLength;
						this.yAdjust += arcLength;
					}

					//Quadrant 3
					else if (this.xAdjust <= this.pos[0] && this.yAdjust <= this.pos[1]) {
						this.xAdjust -= arcLength;
						this.yAdjust += arcLength;
					}

					//Quadrant 4
					else if (this.xAdjust >= this.pos[0] && this.yAdjust <= this.pos[1]) {
						this.xAdjust -= arcLength;
						this.yAdjust -= arcLength;
					}
					break;

				default:
					return;
			}
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Util {
	dist(pos1, pos2) {

	}

	wrap(coord, max) {
		if (coord > max) {
			return coord - max;
		} else {
			return coord;
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Util);

/***/ })
/******/ ]);